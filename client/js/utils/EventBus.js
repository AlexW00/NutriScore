// ====================================================== //
// ====================== EventBus ====================== //
// ====================================================== //

// Usage:
// 1. import EventBus from "...EventBus.js";
// 2. Send event to EventBus: EventBus.notifyAll(new Event(...));
// 3. Listen to events via: EventBus.addEventListener(EVENT_TYPE, (event) => {...});

import Observable from "./Observable.js";
const EventBus = new Observable();
export default EventBus;

// lol 2 lines of code
