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
  isInitialised = false;
  // ====================================================== //
  // ================== Public methods   ================== //
  // ====================================================== //

  getInstance() {
    return new Promise((resolve, reject) => {
      if (!this.isInitialised) this._openDB().then(() => resolve(this));
      else resolve(this);
    });
  }

  async saveModel(model) {}

  retrieveModel(modelName) {
    // TODO: Implement
  }

  exportData() {
    // TODO: Implement, export database to csv
  }

  // returns an item that matches the (composite) key in the store (defined in DB_CONFIG)
  // primary key: key = ["key"]
  // composite key: key = ["key1", "key2"]
  getItem(storeName, key) {
    return new Promise((resolve, reject) => {
      const k = key,
        objectStore = this._getObjectStore(storeName, "readonly"),
        request = objectStore.get(k);
      request.onsuccess = (e) => {
        resolve({
          id: "ds",
        });
        resolve(e.target.result);
      };
      request.onerror = (e) => {
        console.log(e);
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
  keyExists(storeName, key) {
    return new Promise((resolve, reject) => {
      const transaction = this._database.transaction(storeName, "readwrite");
      const objectStore = transaction.objectStore(storeName);
      const req = objectStore.openCursor(key);
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
  _openDB() {
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
        this._initObjectStores().then(() => {
          this.isInitialised = true;
          resolve(true);
        });

        // DB doesn't exist yet, create it
      };
      request.onsuccess = (e) => {
        this._database = e.target.result;
        this.isInitialised = true;
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
  async _initObjectStores() {
    // create all necessary object stores here (= tables)
    // TODO: request intial data
    const objectStores = DB_CONFIG.objectStores,
      jobs = [];
    for (const key of Object.keys(objectStores)) {
      const objectStoreConfig = objectStores[key];
      const os = this._createObjectStore(key, objectStoreConfig.keyPath);
      for (const index of objectStoreConfig.indexes) {
        os.createIndex(index, index, {
          unique: false,
        });
      }
      jobs.push(
        new Promise((resolve) => {
          os.transaction.oncomplete = () => resolve(true);
        })
      );
    }
    await Promise.all(jobs); // wait for all jobs to finish
    return true;
  }

  // creates an object store
  _createObjectStore = (name, keyPath) => {
    return this._database.createObjectStore(name, {
      keyPath: keyPath.key,
    });
  };

  // returns the object store with the given name
  _getObjectStore(storeName, mode) {
    console.trace();
    return this._database.transaction(storeName, mode).objectStore(storeName);
  }

  // turns a single key into an array and keeps arrays as arrays
  // necessary because get function requires an array of key to find items, even tho it might only be 1 key
  /* _formatKey(key) {
    return key.constructor === Array ? key : [key];
  } */
}

export default new IndexedDbStorageProvider();
