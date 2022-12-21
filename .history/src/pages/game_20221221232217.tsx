import React, { useEffect, useState } from 'react'

import io, { Manager } from 'socket.io-client';
import '../js/game.js';

import '../js/graph.js';
import '../js/resource.js';

import '../js/spirit.js';
import '../js/tween.js';
type Props = {}

const Game = (props: Props) => {

    const [socket, setSocket] = useState<any>();
    let game: any;
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
        //   v      LoadExternalScript(`../js/tween.js`);
        //         LoadExternalScript(`../js/resource.js`);
        //         LoadExternalScript(`../js/game.js`);
        //         LoadExternalScript(`../js/graph.js`);
        //         LoadExternalScript(`../js/spirit.js`);
    }, [])
    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user')!);
        setSocket(io(`http://api.fuwo.vn/?playerId=${user.id}`))

    }, [])
    useEffect(() => {
        if (socket) {
            socket.on('connect', () => {
                console.log("Connected")
                // setIsConnected(true);
            });
            socket.on('room_members_changed', () => {
                console.log("room_members_changed");
                // setIsReload((isReload) => !isReload);
            });
            socket.on('start_game', (res: any) => {
                debugger
                // setTimeCountDown(res.time);
                // setStartCountDown(res.time);
                console.log('start_game');
            });
            socket.on('game_play', async (res: any) => {
                console.log("map");

                console.log(res.data);
                let dataFish = res.data;
                await Spirit.loadResource(Assets.path, Assets.images)
                game = Game({ dataFish, onUpdateLocationFish: () => { } })
                game.play()
                console.log('game_play');
            });
            socket.on('disconnect', () => {
                // setIsConnected(false);
            });
            return () => {
                socket.off('connect');
                socket.off('game_play');
                socket.off('start_game');
                socket.off('room_members_changed');
                socket.off('disconnect');
            };
        }

    }, [socket]);


    return (
        <div className='game_frame'>
            <canvas className='game_box' id='game_box' width='1200px' height='600px'></canvas>
        </div>
    )
}

export default Game