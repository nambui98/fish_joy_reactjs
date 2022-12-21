import React from 'react'

type Props = {}

const Game = (props: Props) => {
    return (
        <div className='game_frame'>
            <canvas className='game_box' id='game_box' width='1200px' height='600px'></canvas>
        </div>
    )
}

export default Game