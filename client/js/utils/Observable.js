// ====================================================== //
// ===================== Observable ===================== //
// ====================================================== //

// JS-Class by Alexander Bazo

export default class Observable {
  constructor() {
    this.listener = {};
  }

  addEventListener(type, callback) {
    if (this.listener[type] === undefined) {
      this.listener[type] = [];
    }
    this.listener[type].push(callback);
  }

  notifyAll(event) {
    if (this.listener[event.type] !== undefined) {
      for (let i = 0; i < this.listener[event.type].length; i++) {
        this.listener[event.type][i](event);
      }
    }
  }
}
