var socket = io('http://18.143.182.62/?playerId=271'); //add socket object
// debugger
//initializing the canvas
var canvas = document.getElementById("game_box"),
    ctx = canvas.getContext('2d'),
    W = window.innerWidth,
    H = window.innerHeight;
// window.onload = async function () {
//     await Spirit.loadResource(Assets.path, Assets.images)
//     game = new Game()
//     game.play()


// }
var keys = {};

window.addEventListener('keydown', function (e) {
    keys[e.keyCode] = true;
}, false);

//check if key is not being pressed or has lifted up
window.addEventListener('keyup', function (e) {
    delete keys[e.keyCode];
}, false);

//game loop to make the game smoother
function gameLoop() {
    if (keys[38]) {
        socket.emit('pressed', 38);
        console.log('You are UP');
    }
    if (keys[40]) {
        socket.emit('pressed', 40);
        console.log('You are DOWN');
    }
    if (keys[37]) {
        socket.emit('pressed', 37);
        console.log('You are LEFT');
    }
    if (keys[39]) {
        socket.emit('pressed', 39);
        console.log('You are RIGHT');
    }
    window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);
//the connected user joins and gets all the players on server
socket.on('welcome', async function (currentUser, currentUsers) {

    console.log(currentUser);

    console.log("welcome");

    // debugger
    // ctx.globalCompositeOperation = "source-over";
    // // Lets reduce the opacity of the BG paint to give the final touch
    // ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    // ctx.fillRect(0, 0, W, H);

    // //Lets blend the particle with the BG
    // ctx.globalCompositeOperation = "lighter";

    //players in lobby
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

    //player
    // ctx.beginPath();
    // //Time for some colors
    // var gradient = ctx.createRadialGradient(currentUser.x, currentUser.y, 0, currentUser.x, currentUser.y, currentUser.radius);
    // gradient.addColorStop(0, "white");
    // gradient.addColorStop(0.4, "white");
    // gradient.addColorStop(0.4, currentUser.color);
    // gradient.addColorStop(1, "black");

    // ctx.fillStyle = gradient;
    // ctx.arc(currentUser.x, currentUser.y, currentUser.radius, Math.PI * 2, false);
    // ctx.fill();
});
onUpdateLocationFish = (location) => {
    //x, y, id
    // debugger
    // socket.emit('updateLocation', location);
}
socket.on('connect', async () => {
    // debugger
    console.log('connected');


    // if (dataFish.length !== 0) {
    //     await Spirit.loadResource(Assets.path, Assets.images)
    //     game = new Game({ dataFish, onUpdateLocationFish: onUpdateLocationFish })
    //     game.play()
    // } else {
    //     // dataFish = data;
    //     dataFish = [
    //         {
    //             id: 3,
    //             x: -293.77688077808034,
    //             y: 90.35451388888889,
    //             vx: 0.9857764399592277,
    //             vy: 0.16806192436513148,
    //             angle: 0.16886329853979085,
    //             speed: 1,
    //             level: 11,
    //         },
    //         {
    //             id: 1,
    //             x: 1965.3684102893926,
    //             y: 170.9943115569273,
    //             vx: -0.7225036368995164,
    //             vy: -0.6913671200360716,
    //             angle: 3.90497219563685,
    //             speed: 1,
    //             level: 3,
    //         },

    //         // {
    //         //   id: 1,
    //         //   x: -126.35776751870131,
    //         //   y: 242.728759430727,
    //         //   vx: 0.9306887756376916,
    //         //   vy: -0.36581197752672684,
    //         //   angle: -0.37450510161041906,
    //         //   speed: 1,
    //         //   level: 9,
    //         // },
    //         {
    //             id: 2,
    //             x: 1965.3684102893926,
    //             y: 170.9943115569273,
    //             vx: -0.7225036368995164,
    //             vy: -0.6913671200360716,
    //             angle: 3.90497219563685,
    //             speed: 1,
    //             level: 3,
    //         },
    //         {
    //             id: 4,
    //             x: -71.70843592684079,
    //             y: 174.4636874142661,
    //             vx: 0.9784795393411914,
    //             vy: 0.20634386613284603,
    //             angle: 0.20783693168231865,
    //             speed: 1,
    //             level: 8,
    //         },
    //         {
    //             id: 5,
    //             x: -75.53948204448263,
    //             y: 456.716893861454,
    //             vx: 0.8882945917234611,
    //             vy: -0.459274121102909,
    //             angle: -0.47717786563206077,
    //             speed: 1,
    //             level: 5,
    //         },
    //         {
    //             id: 6,
    //             x: 1963.201053877661,
    //             y: 48.80549125514403,
    //             vx: -0.9444834985555467,
    //             vy: 0.3285588546307567,
    //             angle: 2.806815339736961,
    //             speed: 1,
    //             level: 3,
    //         },
    //         {
    //             id: 7,
    //             x: -59.43303404378473,
    //             y: 506.939356138546,
    //             vx: 0.9783626714449389,
    //             vy: 0.20689727674167768,
    //             angle: 0.20840254764361307,
    //             speed: 1,
    //             level: 6,
    //         },
    //         {
    //             id: 8,
    //             x: 2046.6035996747723,
    //             y: 361.7357724622771,
    //             vx: -0.9287945811709575,
    //             vy: 0.37059496217226934,
    //             angle: 2.761943140140934,
    //             speed: 1,
    //             level: 9,
    //         },
    //         {
    //             id: 9,
    //             x: 2043.82949727479,
    //             y: 287.7749871399177,
    //             vx: -0.9476076403482198,
    //             vy: -0.31943662901063646,
    //             angle: 3.4667275620072244,
    //             speed: 1,
    //             level: 9,
    //         },
    //         {
    //             id: 10,
    //             x: 2219.0960755411243,
    //             y: 518.8224322702332,
    //             vx: -0.7810884318957197,
    //             vy: -0.6244204205170468,
    //             angle: 3.8159819510598543,
    //             speed: 1,
    //             level: 11,
    //         },
    //     ];
    // }
    // await Spirit.loadResource(Assets.path, Assets.images)
    // game = new Game({ dataFish, onUpdateLocationFish: onUpdateLocationFish })
    // game.play()

    // game = new Game({ dataFish, onUpdateLocationFish: onUpdateLocationFish })
    // game.play()


})
let dataFish = [];
socket.on("start_game", async (data) => {
    console.log("map");
    console.log(data);
    // if (dataFish.length === 0) {
    //     // dataFish = data;
    //     dataFish = [
    //         {
    //             id: 3,
    //             x: -293.77688077808034,
    //             y: 90.35451388888889,
    //             vx: 0.9857764399592277,
    //             vy: 0.16806192436513148,
    //             angle: 0.16886329853979085,
    //             speed: 1,
    //             level: 11,
    //         },
    //         {
    //             id: 1,
    //             x: 1965.3684102893926,
    //             y: 170.9943115569273,
    //             vx: -0.7225036368995164,
    //             vy: -0.6913671200360716,
    //             angle: 3.90497219563685,
    //             speed: 1,
    //             level: 3,
    //         },

    //         // {
    //         //   id: 1,
    //         //   x: -126.35776751870131,
    //         //   y: 242.728759430727,
    //         //   vx: 0.9306887756376916,
    //         //   vy: -0.36581197752672684,
    //         //   angle: -0.37450510161041906,
    //         //   speed: 1,
    //         //   level: 9,
    //         // },
    //         {
    //             id: 2,
    //             x: 1965.3684102893926,
    //             y: 170.9943115569273,
    //             vx: -0.7225036368995164,
    //             vy: -0.6913671200360716,
    //             angle: 3.90497219563685,
    //             speed: 1,
    //             level: 3,
    //         },
    //         {
    //             id: 4,
    //             x: -71.70843592684079,
    //             y: 174.4636874142661,
    //             vx: 0.9784795393411914,
    //             vy: 0.20634386613284603,
    //             angle: 0.20783693168231865,
    //             speed: 1,
    //             level: 8,
    //         },
    //         {
    //             id: 5,
    //             x: -75.53948204448263,
    //             y: 456.716893861454,
    //             vx: 0.8882945917234611,
    //             vy: -0.459274121102909,
    //             angle: -0.47717786563206077,
    //             speed: 1,
    //             level: 5,
    //         },
    //         {
    //             id: 6,
    //             x: 1963.201053877661,
    //             y: 48.80549125514403,
    //             vx: -0.9444834985555467,
    //             vy: 0.3285588546307567,
    //             angle: 2.806815339736961,
    //             speed: 1,
    //             level: 3,
    //         },
    //         {
    //             id: 7,
    //             x: -59.43303404378473,
    //             y: 506.939356138546,
    //             vx: 0.9783626714449389,
    //             vy: 0.20689727674167768,
    //             angle: 0.20840254764361307,
    //             speed: 1,
    //             level: 6,
    //         },
    //         {
    //             id: 8,
    //             x: 2046.6035996747723,
    //             y: 361.7357724622771,
    //             vx: -0.9287945811709575,
    //             vy: 0.37059496217226934,
    //             angle: 2.761943140140934,
    //             speed: 1,
    //             level: 9,
    //         },
    //         {
    //             id: 9,
    //             x: 2043.82949727479,
    //             y: 287.7749871399177,
    //             vx: -0.9476076403482198,
    //             vy: -0.31943662901063646,
    //             angle: 3.4667275620072244,
    //             speed: 1,
    //             level: 9,
    //         },
    //         {
    //             id: 10,
    //             x: 2219.0960755411243,
    //             y: 518.8224322702332,
    //             vx: -0.7810884318957197,
    //             vy: -0.6244204205170468,
    //             angle: 3.8159819510598543,
    //             speed: 1,
    //             level: 11,
    //         },
    //     ];

    //     debugger
    //     await Spirit.loadResource(Assets.path, Assets.images)
    //     game = new Game({ dataFish, onUpdateLocationFish: onUpdateLocationFish })
    //     game.play()
    // }
    // else {

    //     dataFish = data;
    //     dataFish = [
    //         {
    //             id: 3,
    //             x: -293.77688077808034,
    //             y: 90.35451388888889,
    //             vx: 0.9857764399592277,
    //             vy: 0.16806192436513148,
    //             angle: 0.16886329853979085,
    //             speed: 1,
    //             level: 11,
    //         },
    //         {
    //             id: 1,
    //             x: 1965.3684102893926,
    //             y: 170.9943115569273,
    //             vx: -0.7225036368995164,
    //             vy: -0.6913671200360716,
    //             angle: 3.90497219563685,
    //             speed: 1,
    //             level: 3,
    //         },

    //         // {
    //         //   id: 1,
    //         //   x: -126.35776751870131,
    //         //   y: 242.728759430727,
    //         //   vx: 0.9306887756376916,
    //         //   vy: -0.36581197752672684,
    //         //   angle: -0.37450510161041906,
    //         //   speed: 1,
    //         //   level: 9,
    //         // },
    //         {
    //             id: 2,
    //             x: 1965.3684102893926,
    //             y: 170.9943115569273,
    //             vx: -0.7225036368995164,
    //             vy: -0.6913671200360716,
    //             angle: 3.90497219563685,
    //             speed: 1,
    //             level: 3,
    //         },
    //         {
    //             id: 4,
    //             x: -71.70843592684079,
    //             y: 174.4636874142661,
    //             vx: 0.9784795393411914,
    //             vy: 0.20634386613284603,
    //             angle: 0.20783693168231865,
    //             speed: 1,
    //             level: 8,
    //         },
    //         {
    //             id: 5,
    //             x: -75.53948204448263,
    //             y: 456.716893861454,
    //             vx: 0.8882945917234611,
    //             vy: -0.459274121102909,
    //             angle: -0.47717786563206077,
    //             speed: 1,
    //             level: 5,
    //         },
    //         {
    //             id: 6,
    //             x: 1963.201053877661,
    //             y: 48.80549125514403,
    //             vx: -0.9444834985555467,
    //             vy: 0.3285588546307567,
    //             angle: 2.806815339736961,
    //             speed: 1,
    //             level: 3,
    //         },
    //         {
    //             id: 7,
    //             x: -59.43303404378473,
    //             y: 506.939356138546,
    //             vx: 0.9783626714449389,
    //             vy: 0.20689727674167768,
    //             angle: 0.20840254764361307,
    //             speed: 1,
    //             level: 6,
    //         },
    //         {
    //             id: 8,
    //             x: 2046.6035996747723,
    //             y: 361.7357724622771,
    //             vx: -0.9287945811709575,
    //             vy: 0.37059496217226934,
    //             angle: 2.761943140140934,
    //             speed: 1,
    //             level: 9,
    //         },
    //         {
    //             id: 9,
    //             x: 2043.82949727479,
    //             y: 287.7749871399177,
    //             vx: -0.9476076403482198,
    //             vy: -0.31943662901063646,
    //             angle: 3.4667275620072244,
    //             speed: 1,
    //             level: 9,
    //         },
    //         {
    //             id: 10,
    //             x: 2219.0960755411243,
    //             y: 518.8224322702332,
    //             vx: -0.7810884318957197,
    //             vy: -0.6244204205170468,
    //             angle: 3.8159819510598543,
    //             speed: 1,
    //             level: 11,
    //         },
    //     ];
    // }


    //   groundMap = loadedMap.ground;
    //   decalMap = loadedMap.decal;
});
socket.on("game_play", async (data) => {
    console.log("map");
    console.log(data.fishAssets);
    if (dataFish.length === 0) {
        dataFish = data.fishAssets
        await Spirit.loadResource(Assets.path, Assets.images)

        game = new Game({ dataFish, onUpdateLocationFish: onUpdateLocationFish })
        game.play()

    }
    debugger
    //   groundMap = loadedMap.ground;
    //   decalMap = loadedMap.decal;
});
socket.on("map", async (data) => {
    console.log("map");
    console.log(data);
    let dataFish = data;
    await Spirit.loadResource(Assets.path, Assets.images)
    game = new Game({ dataFish, onUpdateLocationFish: onUpdateLocationFish })
    game.play()


    //   groundMap = loadedMap.ground;
    //   decalMap = loadedMap.decal;
});
//other users get updated with new players when teh new player joins

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