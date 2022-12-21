import React, { useEffect, useState } from 'react'

import io, { Manager } from 'socket.io-client';
type Props = {}

const Game = (props: Props) => {

    const [socket, setSocket] = useState<any>();
    const loadError = (onError: any) => {
        console.error(`Failed ${onError.target.src} didn't load correctly`);
    }
    useEffect(() => {
        const LoadExternalScript = (url: any) => {
            const externalScript = document.createElement("script");
            externalScript.onerror = loadError;
            externalScript.id = "external";
            externalScript.async = true;
            externalScript.type = "text/javascript";
            externalScript.setAttribute("crossorigin", "anonymous");
            document.body.appendChild(externalScript);
            externalScript.src = url;
        };
        // LoadExternalScript(`../js/.js`);
        LoadExternalScript(`../js/tween.js`);
        LoadExternalScript(`../js/resource.js`);
        LoadExternalScript(`../js/game.js`);
        LoadExternalScript(`../js/graph.js`);
        LoadExternalScript(`../js/spirit.js`);
    }, [])
    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user')!);
        setSocket(io(`http://api.fuwo.vn/?playerId=${user.id}`))

    }, [])


    return (
        <div className='game_frame'>
            <canvas className='game_box' id='game_box' width='1200px' height='600px'></canvas>
        </div>
    )
}

export default Game