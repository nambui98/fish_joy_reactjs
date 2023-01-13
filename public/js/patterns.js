let instance;
let fishs = [];

class SingletonFishs {
    constructor() {
        if (instance) {
            throw new Error("You can only create one instance!");
        }
        instance = this;
    }

    getInstance() {
        return this;
    }

    getFishs() {
        return fishs;
    }

    setFishs(data) {
        fishs = data;
    }
}

// const singletonFishs = Object.freeze(new Fishs());
// export default singletonFishs;