import React, { useEffect } from 'react'

type Props = {}

const Game = (props: Props) => {
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
        LoadExternalScript(`../../public/js/test.js`);
    }, [])

    return (
        <div className='game_frame'>
            <canvas className='game_box' id='game_box' width='1200px' height='600px'></canvas>
        </div>
    )
}

export default Game