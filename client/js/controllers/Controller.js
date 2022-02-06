// ABSTRACT CLASS, DO NOT INSTANTIATE - overridden by specific controllers
import Model from "../models/Model.js";
import View from "../views/View.js";
import StorageProvider from "../storage/IndexedDbStorageProvider.js";

// ====================================================== //
// ===================== Controller ===================== //
// ====================================================== //

// Usage:
// 1. extend this class and call super(NAME_OF_OBJECT_STORE, KEY_OF_OBJECT_STORE)
//  - both these values can be found in DB_CONFIG
// 2. override _onCreateView(model) and return the corresponding view instance
// 3. use html().then((html) =>  ...) to get the html code

export default class Controller {
  static storageProvider = null;
  constructor(storeName, key) {
    this.storeName = storeName; // the name of the object store as defined in DB_CONFIG.objectStores
    this.key = key; // the key of the object store as defined in DB_CONFIG.objectStores.x.keyPath.key
    this._isInitialised = this._init();
  }

  // initializes the controller
  _init = () => {
    return new Promise((resolve, reject) => {
      StorageProvider.getInstance()
        .then((sp) => {
          Controller.storageProvider = sp;
          return sp.getItem(this.storeName, this.key);
        })
        .then((initialData) => {
          this.view = this._onCreateView(
            new Model(initialData, this.storeName)
          );
          if (!(this.view instanceof View))
            throw new Error("_onCreateView() did not return a View instance");
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  //override in subclass and return an instance of rhe corresponding view
  _onCreateView(model) {
    throw new Error(
      "_view() method not implemented, override this in subclass and return a new view instance"
    );
  }

  // dont override this method
  // ASYNCHRONOUS, use await or .then to use the result of this function
  html = async () => {
    if (this._isInitialised === true) return this.view.html();
    await this._isInitialised;
    return this.view.html();
  };
}
