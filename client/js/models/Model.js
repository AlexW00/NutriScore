import IndexedDbStorageProvider from "../storage/IndexedDbStorageProvider.js";
export default class Model {
  data = {}; // the data stored in this model, format: e.g. { "key1": "value1", "key2": "value2" }
  constructor(data) {
    this.data = data;
  }
}
