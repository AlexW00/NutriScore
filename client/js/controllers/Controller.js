// ABSTRACT CLASS, DO NOT INSTANTIATE - overridden by specific controllers
import Model from "../models/Model.js";
import View from "../views/View.js";
import StorageProvider from "../storage/IndexedDbStorageProvider.js";

export default class Controller {
  static storageProvider = null;
  constructor(storeName, key) {
    this.storeName = storeName;
    this.key = key;
    this._isInitialised = this._init();
  }

  _init = () => {
    return new Promise((resolve, reject) => {
      StorageProvider.getInstance()
        .then((sp) => {
          Controller.storageProvider = sp;
          return sp.getItem(this.storeName, this.key);
        })
        .then((initialData) => {
          this.view = this._onCreateView(new Model(initialData));
          if (!(this.view instanceof View))
            throw new Error("_onCreateView() did not return a View instance");
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  //override and define the view in subclass here
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
