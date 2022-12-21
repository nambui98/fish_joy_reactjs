import React from 'react'

type Props = {}

const Game = (props: Props) => {
    return (
        <div class='game_frame'>
            <canvas class='game_box' id='game_box' name='game_box' width='1200px' height='600px'></canvas>
        </div>
    )
}

export default Game