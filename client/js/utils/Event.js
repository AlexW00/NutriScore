// ====================================================== //
// ======================== Event ======================= //
// ====================================================== //

// Modified JS-Class by Alexander Bazo

export default class Event {
  constructor(type, view, data) {
    this.type = type; // event type
    this.view = view; // the view that triggered the event
    this.data = data; // extra data (e.g. click event data)
    Object.freeze(this);
  }
}
