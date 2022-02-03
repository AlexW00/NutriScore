// ABSTRACT CLASS, DO NOT INSTANTIATE - overridden by specific controllers
export default class Controller {
  constructor(storageProvider, storeName, keys) {
    this.storageProvider = storageProvider;
    this.storeName = storeName
    this.keys = keys
  }

  init() {
    return new Promise((resolve, reject) => {
      storageProvider.getItem(this.storeName, this.keys).then(initialData => {
        this.model = _model(initialData);
        this.view = _view();
        this._onCreate();
        resolve();
      }).catch((err) => reject(err));
    })
  }

  // called after init successful
  _onCreate() {
    throw new Error(
      "onCreate must be overridden in subclass"
    );
  }

  //override and define the model in subclass here
  _model(initialData) {
    throw new Error(
      "_model() method not implemented, override this in subclass"
    );
  }

  //override and define the view in subclass here
  _view() {
    throw new Error(
      "_view() method not implemented, override this in subclass"
    );
  }

  // dont override this method
  html() {
    return this.view.html();
  }
}