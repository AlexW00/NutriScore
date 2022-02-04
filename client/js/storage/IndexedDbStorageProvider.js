// ##################################################################### //
// ###################### IndexedDbStorageProvider ##################### //
// ##################################################################### //

// Usage:
// 1. import IndexedDbStorageProvider from "....IndexedDbStorageProvider.js";
// 2. await IndexedDbStorageProvider.openDB(YOUR_INITIAL_DATA);
// 3. use public methods to add, get, update, delete items

import DB_CONFIG from "./DB_CONFIG.js";
class IndexedDbStorageProvider {
  _database = null;

  // ====================================================== //
  // ================== Public methods   ================== //
  // ====================================================== //

  async saveModel(model) {}

  retrieveModel(modelName) {
    // TODO: Implement
  }

  exportData() {
    // TODO: Implement, export database to csv
  }

  // returns an item that matches the (composite) key in the store (defined in DB_CONFIG)
  // primary key: keys = ["key"]
  // composite key: keys = ["key1", "key2"]
  getItem(storeName, keys) {
    return new Promise((resolve, reject) => {
      const objectStore = this._getObjectStore(storeName, "readonly");
      const request = objectStore.get(keys);
      request.onsuccess = (e) => {
        resolve(e.target.result);
      };
      request.onerror = (e) => {
        reject(e.target.error.message);
      };
    });
  }

  // adds an item to the store
  // returns: Promise → true if successful, false if not (e.g. already exists)
  addItem(storeName, item) {
    return new Promise((resolve, reject) => {
      const objectStore = this._getObjectStore(storeName, "readwrite");
      const request = objectStore.add(item);
      request.onsuccess = (e) => {
        resolve(true);
      };
      request.onerror = (e) => {
        resolve(false);
      };
    });
  }

  updateItem(storeName, item) {
    return new Promise((resolve, reject) => {
      const objectStore = this._getObjectStore(storeName, "readwrite");
      const request = objectStore.put(item);
      request.onsuccess = (e) => {
        resolve(true);
      };
      request.onerror = (e) => {
        resolve(false);
      };
    });
  }

  // checks if an object with the given key exists in the store
  // returns: Promise → true if exists, false if not
  keyExists(storeName, keys) {
    return new Promise((resolve, reject) => {
      const transaction = this._database.transaction(storeName, "readwrite");
      const objectStore = transaction.objectStore(storeName);
      const req = objectStore.openCursor(keys);
      req.onsuccess = function (e) {
        const cursor = e.target.result;
        if (cursor) {
          // key already exist
          console.log("key already exist");
          resolve(true);
        } else {
          // key not exist
          console.log("key not exist");
          resolve(false);
        }
      };
      req.onerror = function (e) {
        reject(e.target.error.message);
      };
    });
  }

  // close the database
  closeDatabase() {
    this._database.close();
  }

  // opens the database
  openDB(initialData) {
    return new Promise((resolve, reject) => {
      // create indexdb
      const indexedDB =
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB;

      const request = indexedDB.open(DB_CONFIG.dbName, DB_CONFIG.version);

      request.onupgradeneeded = (e) => {
        this._database = e.target.result;
        this._initObjectStores(e, initialData); // DB doesn't exist yet, create it
        resolve(true);
      };
      request.onsuccess = (e) => {
        this._database = e.target.result;
        resolve(true);
      };
      request.onerror = (e) => {
        console.error(e.target.error.message);
        reject(e.target.error.message);
      };
    });
  }

  // ====================================================== //
  // ================== Private methods   ================= //
  // ====================================================== //

  // create the object stores defined in DB_CONFIG
  _initObjectStores(e, initialData) {
    // create all necessary object stores here (= tables)
    // TODO: insert initial data here
    const objectStores = DB_CONFIG.objectStores;
    Object.keys(objectStores).forEach((key) => {
      console.log(objectStores);
      const objectStoreConfig = objectStores[key];
      this._createObjectStore(key, objectStoreConfig.keyPath, (e) => {
        objectStoreConfig.indixes.forEach((index) => {
          objectStore.createIndex(index, index, {
            unique: false,
          });
        });
      });
    });
  }

  // creates an object store
  _createObjectStore = (name, keyPath, onCreate) => {
    console.log(`creating os with ${name}, k ${keyPath}`);
    const objectStore = this._database.createObjectStore(name, {
      keyPath: keyPath.keys,
    });
    objectStore.transaction.oncomplete = onCreate;
  };

  // returns the object store with the given name
  _getObjectStore(storeName, mode) {
    return this._database.transaction(storeName, mode).objectStore(storeName);
  }
}

export default new IndexedDbStorageProvider();
