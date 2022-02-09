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

  async saveModel(model) {
    const wasSucessful = await this.updateItem(model.storeName, model.data);
    return wasSucessful;
  }

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
        this.didUpgrade = true;
        this._database = e.target.result;
        this._initObjectStores();

        // DB doesn't exist yet, create it
      };
      request.onsuccess = (e) => {
        this._database = e.target.result;
        this.isInitialised = true;
        console.log("succeed res");
        if (this.didUpgrade) this._initData().then(() => resolve(true));
        else resolve(true);
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
      const os = this._createObjectStore(key, objectStoreConfig.key);
      for (const index of objectStoreConfig.indexes) {
        try {
          os.createIndex(index, index, {
            unique: false,
          });
        } catch (e) {
          console.log(e);
          console.trace();
        }
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

  async _initData() {
    const data = await this._getFakeData();

    await this._mapData("mainTask_Surveys", {});
    await this._mapData("mainTask_Topics", data.topics);

    for (const topic of data.topics) {
      await this._mapData("mainTask_Topic", topic);
      for (const snippet of topic.snippets) {
        await this._mapData("mainTask_Snippet", snippet);
        await this._mapData("mainTask_SnippetRating", snippet);
      }
    }
    return true;
  }

  async _mapData(storeName, data) {
    const mappedData = DB_CONFIG.objectStores[storeName].dataMapping(data);
    await this.addItem(storeName, mappedData);
  }

  // creates an object store
  _createObjectStore = (name, key) => {
    return this._database.createObjectStore(name, {
      keyPath: key,
    });
  };

  // returns the object store with the given name
  _getObjectStore(storeName, mode) {
    return this._database.transaction(storeName, mode).objectStore(storeName);
  }

  async _getFakeData() {
    return await fetch("/getFakeData").then((r) => r.json());
  }

  // turns a single key into an array and keeps arrays as arrays
  // necessary because get function requires an array of key to find items, even tho it might only be 1 key
  /* _formatKey(key) {
    return key.constructor === Array ? key : [key];
  } */
}

export default new IndexedDbStorageProvider();