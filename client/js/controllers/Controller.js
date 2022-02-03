// ABSTRACT CLASS, DO NOT INSTANTIATE - overridden by specific controllers
export default class Controller {
  constructor(storageProvider, storeName, keys) {
    this.storageProvider = storageProvider;
    this.storeName = storeName;
    this.keys = keys;
    this._isInitialised = init();
  }

  init() {
    return new Promise((resolve, reject) => {
      storageProvider
        .getItem(this.storeName, this.keys)
        .then((initialData) => {
          this.view = _onCreateView(new Model(initialData));
          if (!(this.view instanceof View))
            throw new Error("_onCreate() did not return a View instance");
          this._isInitialised = true;
          resolve(true);
        })
        .catch((err) => reject(err));
    });
  }

  //override and define the view in subclass here
  _onCreate(model) {
    throw new Error(
      "_view() method not implemented, override this in subclass and return a new view instance"
    );
  }

  // dont override this method
  async html() {
    if (this._isInitialised === true) return this.view.html();
    await this.init();
    return this.view.html();
  }
}
