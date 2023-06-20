// App.js

import { useState } from "react";
import Board from "./components/Board";
// App.css 를 import 필수 !
import './App.css';

function App() {

  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  // useState Snippet 사용하면 편하게 작성가능
  const [stepNumber, setStepNumber] = useState(0);


  const calculateWinner = (squares) => {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]

    for (let index = 0; index < lines.length; index++) {
      const [a,b,c] = lines[index];
      // 동일한 값(O 또는 X)이 a,b,c에 모두 할당된지를 판별함. 
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a]; 
      }
    }
    return null;
  }

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  let status;
  if(winner){
    status = 'Winner: ' + winner; // 승자가 있으면 알려줌.
  } else {
    status = `Next player: ${xIsNext ?  'X' : 'O'}`; // 승자가 없음녀 다음 플레이어 알려줌.
  }

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const newCurrent = newHistory[newHistory.length - 1];
    const newSquares = newCurrent.squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]){
      return;
    }

    // newSquares = current.squares.slice(); // slice()로 모든 squre배열을 복사

    // 승패가 나면 더 이상 클릭 못하게 하기.
    // newSquares[i] 는 중복 클릭 방지. [i]가 있으면 null 아니라 이미 클릭이 됬다는 거니까.
    // if(calculateWinner(newSquares) || newSquares[i]){
    //   return;
    // }

    newSquares[i] = xIsNext? 'X' : 'O';
    setHistory([...newHistory, { squares: newSquares }]); 
    setXIsNext(prev =>!prev); // X 다음에 O 가 나오게 하기위해 bool값을 !로 부정함

    setStepNumber(newHistory.length)
  }

  // 플레이 history 만들기
  const moves = history.map((step, move) => {
    const desc = move?
    'Go to move #' + move :
    'Go to game start';
    return(
      <li key={move}>
        <button className="move-button" onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  })

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }


  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)}/>
      </div>
      <div className="game-info">
        <div className='status'>{status}</div>
        <ol style={{listStyle: 'none'}}>{moves}</ol>
      </div>
    </div>
  );
}

export default App;
