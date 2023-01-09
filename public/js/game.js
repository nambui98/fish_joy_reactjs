class Rand {
    constructor(_seed = Math.floor(new Date().getMilliseconds())) {
        this.seed = _seed
    }

    gen(min = 0, max = min + 1) {
        this.seed = (this.seed * 9301 + 49297) % 233280
        return min + this.seed / 233280.0 * (max - min)
    }
}

class Render {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d')
        this.spirits = []
        this.over = false
        this.sorted = false
        this.loop = this.loop.bind(this)
        this.tickElements = []
        this.members = []
        this.elements = { click: [], mouseMove: [] }
        this.mouseClick = this.mouseClick.bind(this), this.mouseMove = this.mouseMove.bind(this)
        canvas.addEventListener('click', this.mouseClick)
        canvas.addEventListener('mousemove', this.mouseMove)
    }

    mouseMove(event) {
        event = event || window.event
        console.log(event);
        this.ctx.save()
        // this.ctx.setTransform(1, 0, 0, 1, 0, 0)
        // this.ctx.setTransform(1, 0.2, 0.8, 1, 0, 0);
        this.ctx.fillStyle = '#444';
        // i
        // this.ctx.fillStyle = 'gray';
        // this.ctx.fillRect(0, 0, 500, 500);
        // console.log(this.elements);
        user = JSON.parse(localStorage.getItem('user'))
        this.elements.mouseMove.forEach(item => {
            if (item.mouse?.move)
                for (const { area, handle } of item.mouse.move) {

                    console.log(event.offsetY);
                    if (this.ctx.isPointInPath(area, event.offsetX, event.offsetY)) {
                        console.log("----------------");
                        console.log(event.offsetX);
                        if (user.id === item.id) {
                            console.log();
                            handle(event)
                            return
                        }
                    }
                }
        })
        this.ctx.restore()
    }

    mouseClick(event) {
        event = event || window.event
        this.ctx.save()
        this.ctx.setTransform(1, 0, 0, 1, 0, 0)

        user = JSON.parse(localStorage.getItem('user'))
        this.elements.click.forEach(item => {
            if (item.mouse?.click)
                for (const { area, handle } of item.mouse.click) {
                    if (this.ctx.isPointInPath(area, event.offsetX, event.offsetY)) {
                        if (user.id === item.id) {
                            socket.emit('common_data', 1111)
                            handle(event)
                            break

                        }
                    }
                }
        })
        this.ctx.restore()
    }

    restart() {
        this.over = false
        if (!this.handle) cancelAnimationFrame(this.handle)
        this.loop()
    }

    loop(time) {
        if (!this.over) {
            TWEEN.update()
            this.logic()
            this.draw()
            this.handle = requestAnimationFrame(this.loop)
        }
    }

    logic() {
        const len = this.tickElements.length
        const filterElements = this.tickElements.filter(spirit => {
            const e = spirit.item
            if (!e.dead) e.tick(this)
            return !e.dead
        })
        this.tickElements = [...filterElements, ...this.tickElements.slice(len, this.tickElements.length)]
    }

    draw() {
        if (!this.sorted) {
            this.spirits.sort((a, b) => { return a.visible && b.visible ? (a.zIndex < b.zIndex ? -1 : 1) : a.visible < b.visible ? 1 : -1 })
            this.sorted = true
        }
        this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height)
        const len = this.spirits.length, sortedArray = []
        for (let i = 0; i < len && this.spirits[i].visible; i++) {
            if (!this.spirits[i].cover) this.spirits[i].item.draw(this.ctx)
            sortedArray.push(this.spirits[i])
        }
        this.spirits = sortedArray
    }

    bindEvent(item) {
        if (item.mouse?.click) this.elements.click.push(item)
        if (item.mouse?.move) this.elements.mouseMove.push(item)
    }

    push(img, item, zIndex = 0) {
        item.bindEvent = this.bindEvent.bind(this)
        const spirit = new Spirit(item, img, this)
        if (spirit.item?.tick) this.tickElements.push(spirit)
        spirit.zIndex = zIndex
        this.sorted = false
        return item
    }
}

class Game {
    constructor({ dataFish, members }) {
        const scene = document.querySelector('#game_box')
        Game.dpiOptimize(scene)
        this.render = new Render(scene)
        this.data = { score: 0 }
        this.dataFish = dataFish;
        this.members = members;
        this.init()
    }
    loadGun() {
        let members = JSON.parse(localStorage.getItem('members'))
        debugger
        if (members.length === 2) {
            members.forEach((element, index) => {
                const gun = this.render.push(
                    Assets.images.cannon1,
                    new Gun({
                        ctx: this.render.ctx, x: 100, y: 0, speed: 0, level: 1,
                        id: element.id,
                        initX: 0,
                        initY: index === 1 ? - this.render.ctx.height + 65 : 0,
                        initAngle: index === 1 ? Math.PI : 0,
                        isDown: index === 1,
                        game: this,
                    }), 6
                ).attach(item => {
                    const mouseMove = []
                    {
                        const path = new Path2D()
                        path.rect(0, 0, this.render.ctx.width, this.render.ctx.height)
                        // path.rect(-500, -500, this.render.ctx.width, this.render.ctx.height)
                        // console.log("===========");
                        // console.log(path);
                        mouseMove.push({ area: path, handle: item.aim.bind(item) })
                    }
                    const mouseClick = []
                    {
                        const path = new Path2D()
                        path.rect(1, 0, this.render.ctx.width, this.render.ctx.height)
                        mouseClick.push({ area: path, handle: item.click.bind(item, this.render) })
                    }
                    item.mouse = { move: mouseMove, click: mouseClick }
                })

                this.render.push(
                    index === 1 ? Assets.images.bottomTop : Assets.images.bottom,
                    new Bar({ gun: gun, game: this, initY: index === 0 ? -15 : 0, initX: index === 1 ? this.render.ctx.width - 250 : 0, offsetY: index === 1 ? 1 : 0 }), 4
                ).attach(item => {
                    // const listeners = []
                    // const button = item.gunButton
                    // const relative = { x: button.pos.x + button.divide, y: this.render.ctx.height - button.data.h, spacing: 130 }
                    // {
                    //     const path = new Path2D()
                    //     path.rect(relative.x, relative.y, button.data.w, button.data.h)
                    //     listeners.push({ area: path, handle: item.add.bind(item, true) })
                    // }
                    // {
                    //     const path = new Path2D()
                    //     path.rect(relative.x + relative.spacing, relative.y, button.data.w, button.data.h)
                    //     listeners.push({ area: path, handle: item.add.bind(item, false) })
                    // }
                    // item.mouse = { click: listeners }
                })

            });
        } else {
            members.forEach((element, index) => {
                const gun = this.render.push(
                    Assets.images.cannon1,
                    new Gun({
                        ctx: this.render.ctx, x: 100, y: 0, speed: 0, level: 1,
                        id: element.id,
                        isDown: index === 2 || index === 3,
                        initX: index === 0 || index === 2 ? 300 : index === 1 || index === 3 ? -300 : 0,
                        initY: index === 2 || index === 3 ? - this.render.ctx.height + 65 : 0,
                        initAngle: index === 2 || index === 3 ? Math.PI : 0,
                        game: this,
                    }), 6
                ).attach(item => {
                    const mouseMove = []
                    {
                        const path = new Path2D()
                        path.rect(0, 0, this.render.ctx.width, this.render.ctx.height)
                        // path.rect(-500, -500, this.render.ctx.width, this.render.ctx.height)
                        // console.log("===========");
                        // console.log(path);
                        mouseMove.push({ area: path, handle: item.aim.bind(item) })
                    }
                    const mouseClick = []
                    {
                        const path = new Path2D()
                        path.rect(1, 0, this.render.ctx.width, this.render.ctx.height)
                        mouseClick.push({ area: path, handle: item.click.bind(item, this.render) })
                    }
                    item.mouse = { move: mouseMove, click: mouseClick }
                })

                this.render.push(
                    index === 2 || index === 3 ? Assets.images.bottomTop : Assets.images.bottom,
                    new Bar({ gun: gun, game: this, initY: index === 0 || index === 1 ? -15 : 0, initX: index === 0 || index === 2 ? this.render.ctx.width - 550 : 400, offsetY: index === 2 || index === 3 ? 1 : 0, offsetX: index === 0 || index === 2 ? 300 : -300 }), 4
                ).attach(item => {
                    // const listeners = []
                    // const button = item.gunButton
                    // const relative = { x: button.pos.x + button.divide, y: this.render.ctx.height - button.data.h, spacing: 130 }
                    // {
                    //     const path = new Path2D()
                    //     path.rect(relative.x, relative.y, button.data.w, button.data.h)
                    //     listeners.push({ area: path, handle: item.add.bind(item, true) })
                    // }
                    // {
                    //     const path = new Path2D()
                    //     path.rect(relative.x + relative.spacing, relative.y, button.data.w, button.data.h)
                    //     listeners.push({ area: path, handle: item.add.bind(item, false) })
                    // }
                    // item.mouse = { click: listeners }
                })

            });

        }

    }
    init() {
        const stage = this.render.push(Assets.images.game_bg, new Stage({ game: this }))
        this.render.members = JSON.parse(localStorage.getItem('members'))
        // console.log(this.dataFish);
        // Fish.onUpdateLocationFish = this.onUpdateLocationFish;
        // debugger
        Fish.generator.create = Fish.generator.create.bind(this, this.render, Stage.boundary, this.dataFish)

        this.loadGun();
        for (let i = 0; i < Fish.generator.amount; i++) Fish.generator.create()
        // this.render.push(Assets.images.web, new Web({ x: 200, y: 200, level: 1 }), 2)
    }

    play() {
        console.log("restart");
        this.render.restart()
    }

    static dpiOptimize(canvas) {
        function getPixelRatio(context) {
            let backingStore = context.backingStorePixelRatio ||
                context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio || 1
            return (window.devicePixelRatio || 1) / backingStore
        }
        const ctx = canvas.getContext('2d'), ratio = getPixelRatio(ctx)
        // canvas.style.width = canvas.width + 'px'
        // canvas.style.height = canvas.height + 'px'
        // canvas.width = canvas.width * ratio
        // canvas.height = canvas.height * ratio

        // canvas.style.width = window.innerWidth + 'px'
        // canvas.style.height = window.innerHeight + 'px'

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight


        // ctx.scale(1.2, 1.2)
        // ctx.width = window.innerWidth
        // ctx.height = window.innerHeight
        // ctx.scale(ratio, ratio)
        ctx.width = canvas.width, ctx.height = canvas.height
    }
}

let game
// (function () {
//     const canvas = document.getElementById('game_box');
//     const context = canvas.getContext('2d');

//     // resize the canvas to fill browser window dynamically
//     window.addEventListener('resize', resizeCanvas, false);

//     function resizeCanvas() {
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;

//         /**
//          * Your drawings need to be inside this function otherwise they will be reset when
//          * you resize the browser window and the canvas goes will be cleared.
//          */
//         drawStuff();
//     }

//     resizeCanvas();

//     async function drawStuff() {
//         await Spirit.loadResource(Assets.path, Assets.images)
//         game = new Game()
//         game.play()
//         // do your drawing stuff here
//     }
// })();
// window.onload = async function () {
//     await Spirit.loadResource(Assets.path, Assets.images)
//     game = new Game()
//     game.play()


// }
