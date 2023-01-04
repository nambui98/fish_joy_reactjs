let user = JSON.parse(localStorage.getItem('user'));
let socket = io(`http://18.143.182.62/?playerId=${user.id}`);

// var socket = io('http://18.143.182.62/?playerId='); //add socket object
// debugger
//initializing the canvas
var canvas = document.getElementById("game_box"),
    ctx = canvas.getContext('2d'),
    W = window.innerWidth,
    H = window.innerHeight;
window.onload = async function () {
    // debugger
    await Spirit.loadResource(Assets.path, Assets.images)
    let dataFish = [
        {
            id: "033a86ee-3c76-436e-be7a-d5a5de383d87",
            x: 1920,
            y: 638,
            vx: -0.9876883405951377,
            vy: 0.15643446504023098,
            angle: 2.9845130209103035,
            level: 2,
            maxWidth: 1920,
            maxHeight: 1080,
            speed: 1
        },
        {
            id: "81cb2dde-5a4a-4149-af26-b167b320deea",
            x: 0,
            y: 775,
            vx: 0.882947592858927,
            vy: -0.4694715627858908,
            angle: -0.4886921905584123,
            level: 11,
            maxWidth: 1920,
            maxHeight: 1080,
            speed: 1
        },
        {
            id: "8d474ac7-c88d-41f0-ad33-0cb1cb3313d8",
            x: 1920,
            y: 738,
            vx: -0.8746197071393957,
            vy: 0.48480962024633717,
            angle: 2.6354471705114375,
            level: 8,
            maxWidth: 1920,
            maxHeight: 1080,
            speed: 1
        },
        {
            id: "2ea053f8-7b7b-45a1-9acf-4b34bb8c6543",
            x: 0,
            y: 939,
            vx: 0.9063077870366499,
            vy: 0.42261826174069944,
            angle: 0.4363323129985824,
            level: 3,
            maxWidth: 1920,
            maxHeight: 1080,
            speed: 1
        },
        {
            id: "f3eac8ac-47fc-4e13-b7bc-708c3e71282a",
            x: 1920,
            y: 392,
            vx: -0.9945218953682733,
            vy: 0.10452846326765373,
            angle: 3.036872898470133,
            level: 1,
            maxWidth: 1920,
            maxHeight: 1080,
            speed: 1
        },
        {
            id: "3c0d63bd-bd54-4403-b220-2ab80069ede4",
            x: 1920,
            y: 341,
            vx: -0.7986355100472928,
            vy: -0.6018150231520484,
            angle: 3.7873644768276953,
            level: 3,
            maxWidth: 1920,
            maxHeight: 1080,
            speed: 1
        },
        {
            id: "a2985991-29dd-46cc-a896-b46b7758f685",
            x: 1920,
            y: 906,
            vx: -0.8386705679454239,
            vy: 0.5446390350150273,
            angle: 2.5656340004316642,
            level: 8,
            maxWidth: 1920,
            maxHeight: 1080,
            speed: 1
        },
        {
            id: "583ef36e-9a2f-44bd-a905-d7683dde167d",
            x: 0,
            y: 903,
            vx: 0.9510565162951535,
            vy: -0.3090169943749474,
            angle: -0.3141592653589793,
            level: 11,
            maxWidth: 1920,
            maxHeight: 1080,
            speed: 1
        },
        {
            id: "d3c1a7c8-67d4-4577-989a-8d5321b0f31e",
            x: 1920,
            y: 99,
            vx: -0.9702957262759965,
            vy: 0.24192189559966773,
            angle: 2.897246558310587,
            level: 10,
            maxWidth: 1920,
            maxHeight: 1080,
            speed: 1
        },
        {
            id: "88681128-88d5-4337-8133-e5cf8324beb1",
            x: 0,
            y: 661,
            vx: 0.8910065241883679,
            vy: 0.45399049973954675,
            angle: 0.47123889803846897,
            level: 9,
            maxWidth: 1920,
            maxHeight: 1080,
            speed: 1
        }
    ];
    // dataFish = []
    game = new Game({ dataFish })
    game.play()


}
var keys = {};

window.addEventListener('keydown', function (e) {
    keys[e.keyCode] = true;
}, false);

//check if key is not being pressed or has lifted up
window.addEventListener('keyup', function (e) {
    delete keys[e.keyCode];
}, false);

//game loop to make the game smoother
// function gameLoop() {
//     if (keys[38]) {
//         socket.emit('pressed', 38);
//         console.log('You are UP');
//     }
//     if (keys[40]) {
//         socket.emit('pressed', 40);
//         console.log('You are DOWN');
//     }
//     if (keys[37]) {
//         socket.emit('pressed', 37);
//         console.log('You are LEFT');
//     }
//     if (keys[39]) {
//         socket.emit('pressed', 39);
//         console.log('You are RIGHT');
//     }
//     window.requestAnimationFrame(gameLoop);
// }
// window.requestAnimationFrame(gameLoop);
//the connected user joins and gets all the players on serve

socket.on('connect', async () => {
    console.log('connected');
})
let dataFish = [];
socket.on('common_data', (e) => {
    // debugger
})
socket.on("game_result", () => {
    console.log("GAME_RESULT");
    window.location.replace('/')
});
socket.on("init_game", async () => {
    // await Spirit.loadResource(Assets.path, Assets.images)
    // game = new Game({ dataFish, onUpdateLocationFish: onUpdateLocationFish })
    // game.play()

})
socket.on("start_game", async (data) => {
    console.log("map");
    console.log(data);
    await Spirit.loadResource(Assets.path, Assets.images)
    game = new Game({ dataFish, onUpdateLocationFish: () => { } })

    if (dataFish.length === 0) {
        // dataFish = data.fishAssets
        // await Spirit.loadResource(Assets.path, Assets.images)
        // game = new Game({ dataFish, onUpdateLocationFish: onUpdateLocationFish })
        // game.play()
    }

});
function startGame() {
    // debugger
    // Spirit.loadResource(Assets.path, Assets.images)
    // debugger
    // game = new Game({ dataFish, onUpdateLocationFish: onUpdateLocationFish })
}
startGame();
socket.on("game_play", async (data) => {
    // debugger
    console.log("map");
    console.log(data.fishAssets);
    if (dataFish.length === 0) {
        dataFish = data.fishAssets
        // await Spirit.loadResource(Assets.path, Assets.images)
        // game = new Game({ dataFish, onUpdateLocationFish: onUpdateLocationFish })
        game.play()
    }
    //   groundMap = loadedMap.ground;
    //   decalMap = loadedMap.decal;
});
socket.on("map", async (data) => {
    console.log("map");
    console.log(data);
    let dataFish = data;
    await Spirit.loadResource(Assets.path, Assets.images)
    game = new Game({ dataFish, onUpdateLocationFish: () => { } })
    game.play()


    //   groundMap = loadedMap.ground;
    //   decalMap = loadedMap.decal;
});
//other users get updated with new players when teh new player joins
window.addEventListener('beforeunload', () => {
    // debugger
    socket.disconnect();
    // socket.off('disconnect')
})
socket.on('currentUsers', function (currentUsers) {
    // debugger
    console.log("currentUsers ", currentUsers);
    // ctx.globalCompositeOperation = "source-over";
    // //Lets reduce the opacity of the BG paint to give the final touch
    // ctx.fillStyle = "rgba(0, 0, 0, 0.3)";

    // //Lets blend the particle with the BG
    // ctx.globalCompositeOperation = "lighter";

    for (var i = 0; i < currentUsers.length; i++) {

        // ctx.beginPath();

        // //Time for some colors
        // var gradient = ctx.createRadialGradient(currentUsers[i].x, currentUsers[i].y, 0, currentUsers[i].x, currentUsers[i].y, currentUsers[i].radius);
        // gradient.addColorStop(0, "white");
        // gradient.addColorStop(0.4, "white");
        // gradient.addColorStop(0.4, currentUsers[i].color);
        // gradient.addColorStop(1, "black");

        // ctx.fillStyle = gradient;
        // ctx.arc(currentUsers[i].x, currentUsers[i].y, currentUsers[i].radius, Math.PI * 2, false);
        // ctx.fill();
    }
    console.log('A new User has joined');
});

//if a player leaves, everyone gets new set of players
socket.on('playerLeft', function (currentUsers) {
    // ctx.fillRect(0, 0, W, H);
    // ctx.globalCompositeOperation = "source-over";
    // //Lets reduce the opacity of the BG paint to give the final touch
    // ctx.fillStyle = "rgba(0, 0, 0, 0.3)";

    // //Lets blend the particle with the BG
    // ctx.globalCompositeOperation = "lighter";

    for (var i = 0; i < currentUsers.length; i++) {

        // ctx.beginPath();

        // //Time for some colors
        // var gradient = ctx.createRadialGradient(currentUsers[i].x, currentUsers[i].y, 0, currentUsers[i].x, currentUsers[i].y, currentUsers[i].radius);
        // gradient.addColorStop(0, "white");
        // gradient.addColorStop(0.4, "white");
        // gradient.addColorStop(0.4, currentUsers[i].color);
        // gradient.addColorStop(1, "black");

        // ctx.fillStyle = gradient;
        // ctx.arc(currentUsers[i].x, currentUsers[i].y, currentUsers[i].radius, Math.PI * 2, false);
        // ctx.fill();
    }
    console.log('A Player Has left');
});


socket.on('PlayersMoving', function (players) {
    // ctx.globalCompositeOperation = "source-over";
    // //Lets reduce the opacity of the BG paint to give the final touch
    // ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    // ctx.fillRect(0, 0, W, H);

    // //Lets blend the particle with the BG
    // ctx.globalCompositeOperation = "lighter";

    // var players = players;
    // var i = 0;
    // function allPlayers() {
    //     for (i; i < players.length; i++) {

    //         ctx.beginPath();

    //         //Time for some colors
    //         var gradient = ctx.createRadialGradient(players[i].x, players[i].y, 0, players[i].x, players[i].y, players[i].radius);
    //         gradient.addColorStop(0.5, "white");
    //         gradient.addColorStop(0.5, players[i].color);
    //         gradient.addColorStop(1, "black");

    //         ctx.fillStyle = gradient;
    //         ctx.arc(players[i].x, players[i].y, players[i].radius, Math.PI * 2, false);
    //         ctx.fill();
    //     }
    // }
    // allPlayers();

});