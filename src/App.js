import './App.css';
import {useState, useEffect} from 'react'
import Square from './Components/Square'
import { Patterns } from './Components/patterns'



function App() {
  
// STATES 
const [board, setBoard] = useState(["","","","","","","","",""]) // GAME BOARD
const [player, setPlayer] = useState('X') // PLAYER TURN
const [result, setResult] = useState( {winner:'none', state:'none'}); // THE WINNER 


// USEFFECTS
// FOR ANY CHANGE ON THE BOARD, WE PERFORME CHECKS
useEffect(()=>{
  checkWin();
  checkTied();
},[board])

// FOR ANY CHANGE ON RESULT, WE ALERT THE WINNER
useEffect(()=>{
  if (result.state !== 'none'){ 
    alert(`Partie finie, le gagant est ${result.winner}`)
    restartGame();
  }
},[result])
// HANDLERS

// HANDLE CLICK / FOR EACH CLICK, WE CHECK IF THE SQUARE IS EMPTY,  WE SET THE VALUE, CHANGE THE PLAYER 
const handleSquare = (index) => { 
  setBoard(board.map(
    (squareValue, squareIndex) => {
      if (squareIndex === index && squareValue === "") {
        return player;
      }
      return squareValue;
    } 
  ));
  if (player === 'X'){ setPlayer('O')}
  else{ setPlayer('X')}
}
// FUNCTIONS
// CHECK IF THE PLAYER HAS WON BASED THE KNOWN PATTERNS
const checkWin = ()=> {
  Patterns.map((pattern)=>{
    if (board[pattern[0]] === '') return;
    let win = true;
    pattern.forEach((index)=> {
      if (board[index] !== board[pattern[0]]) {
        win = false;
      }
    })
    if ( win ) {
      setResult({winner:board[pattern[0]], state: 'Gagné' });
    }
  })
}
// CHECK IF GAME IS TIED, NO ONE HAS WON
const checkTied =()=>{
  let filled = true;
  board.forEach((square)=>{
    if (square == ''){ filled = false;
    }
  })
  filled && setResult({winner:'Personne', state:'partie finie' }) 
}
// INITIALISE THE GAME IF GAME FINISHED OR CLICK ON RESTART BUTTON
const restartGame = () => {
  setBoard(["","","","","","","","",""])
  setPlayer('X')
}


  return (
    <div className="App">
      <h1>JEU DE MORPION</h1>
      <p>Cliquer pour commencer</p>
      <div className="board"> 
        <div className="row">
          <Square val={board[0]} handleSquare={() => handleSquare(0)} />
          <Square val={board[1]} handleSquare={() => handleSquare(1)}/>
          <Square val={board[2]} handleSquare={() => handleSquare(2)}/>
        </div>
        <div className="row">
          <Square val={board[3]} handleSquare={() => handleSquare(3)} />
          <Square val={board[4]} handleSquare={() => handleSquare(4)}/>
          <Square val={board[5]} handleSquare={() => handleSquare(5)}/>
        </div>
        <div className="row">
          <Square val={board[6]} handleSquare={() => handleSquare(6)} />
          <Square val={board[7]} handleSquare={() => handleSquare(7)}/>
          <Square val={board[8]} handleSquare={() => handleSquare(8)}/>
        </div>
      </div>
      <button className='btn-restart' onClick={()=>restartGame()}>Rejouer la partie</button>
    </div>
  );
}

export default App;
