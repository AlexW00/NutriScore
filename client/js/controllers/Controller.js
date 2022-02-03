// ABSTRACT CLASS, DO NOT INSTANTIATE - overridden by specific controllers
export default class Controller {
  constructor() {
    this.model = _model();
    this.view = _view();
  }

  //override and define the model in subclass here
  _model() {
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
