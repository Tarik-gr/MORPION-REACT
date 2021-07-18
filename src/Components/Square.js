import React from 'react'
import '../App.css'

function Square({val, handleSquare}) {


    return (
        <div className="square" onClick={handleSquare}>
            {val}
        </div>
    )
}

export default Square
