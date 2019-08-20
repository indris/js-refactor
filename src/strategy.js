export default class Strategy {
    constructor(name, handler) {
        this._name = name;
        this._handler = handler;
    }
    doAction() {
        return this._handler.apply(null, arguments);
    }
}
