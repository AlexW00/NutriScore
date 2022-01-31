import IndexedDbStorageProvider from "../storage/IndexedDbStorageProvider.js";
export default class Model {
  data = {}; // the data stored in this model, format: e.g. { "key1": "value1", "key2": "value2" }
  constructor(data, storeName) {
    this.data = data;
    this.storeName = storeName;
  }

  updateDataPoint(key, value, provider) {
    this.data[key] = value;
    provider.saveModel(this); // save to indexedDB
  }

  saveModel(provider) {
    provider.saveModel(this); // save to indexedDB
  }
}
