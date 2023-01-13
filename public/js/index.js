// import singletonFishs from "./patterns";

let user = JSON.parse(localStorage.getItem('user'));
let socket = io(`http://18.143.182.62/?playerId=${user.id}`);

// var socket = io('http://18.143.182.62/?playerId='); //add socket object
// debugger
//initializing the canvas
var canvas = document.getElementById("game_box"),
    ctx = canvas.getContext('2d'),
    W = window.innerWidth,
    H = window.innerHeight;
let game;
let dataFish;
let singletonFishs = new SingletonFishs();

window.onload = async function () {
    // debugger
    await Spirit.loadResource(Assets.path, Assets.images)

    // let dataFish1 = [

    //     {
    //         id: "033a86ee-3c76-436e-be7a-d5a5de383d87",
    //         x: 1920,
    //         y: 638,
    //         vx: -0.9876883405951377,
    //         vy: 0.15643446504023098,
    //         angle: 2.9845130209103035,
    //         level: 2,
    //         maxWidth: 1920,
    //         maxHeight: 1080,
    //         speed: 1
    //     },

    // ];
    // // dataFish = []
    // game = new Game({
    //     // dataFish
    //     dataFish: dataFish1
    // })
    // game.play()


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
// let dataFish = [];
socket.on('common_data', (e) => {
    // debugger
})
socket.on("game_result", () => {
    console.log("GAME_RESULT");
    window.location.replace('/')
});
socket.on('room_members_changed', (res) => {
    console.log(res);
    // debugger
})
let game2;
socket.on('join_game', (res) => {
    console.log(res);
    localStorage.setItem("members", JSON.stringify(res.roomMembers));
    // game.handle = undefined;
    // game.loadGun();
    // game = new Game({
    //     // dataFish
    //     dataFish: [
    //         {
    //             id: "033a86ee-3c76-436e-be7a-d5a5de383d87",
    //             x: 1920,
    //             y: 638,
    //             vx: -0.9876883405951377,
    //             vy: 0.15643446504023098,
    //             angle: 2.9845130209103035,
    //             level: 2,
    //             maxWidth: 1920,
    //             maxHeight: 1080,
    //             speed: 1
    //         },
    //     ]
    // })
    // game.play()



    // game.play();
    debugger
})
socket.on("init_game", async () => {

})
socket.on("start_game", async (data) => {

    let countDown = document.getElementsByClassName("countDown");
    if (countDown.length == 0) {
        let element = document.createElement('div')
        element.classList.add('countDown')
        element.innerHTML = '<p class="second"></p>'
        document.body.append(element)
        let i = data.time;
        let x = setInterval(() => {
            let second = document.getElementsByClassName('second')[0];
            second.innerText = i--

            if (i === -1) {
                clearInterval(x)
                document.getElementsByClassName('countDown')[0].style.display = 'none'
            }
        }, 1000);


    }

});

socket.on("game_play", async (data) => {
    console.log(data.fishAssets);
    singletonFishs.setFishs(data.fishAssets)
    if (!dataFish || dataFish.length === 0) {
        await Spirit.loadResource(Assets.path, Assets.images)
        dataFish = data.fishAssets
        game = new Game()
        game.play()
    }
});

window.addEventListener('beforeunload', () => {
})