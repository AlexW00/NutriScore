import Observable from "../utils/Observable.js";

// ====================================================== //
// ======================== View ======================== //
// ====================================================== //

// naming convention:
// $htmlElement: a reference to an html element
// _functionName: private function

export default class View extends Observable {
  data = {}; // data used in html()
  $root = null; // root element of the view

  constructor(_data) {
    super();
    this.data = _data;
  }

  // initiates all $html-elements and returns the root element
  // override this method in your view
  _render() {
    // your html code goes here
    // e.g. this.$root = document.createElement("div");
    return this.$root;
  }

  // returns the html-string of the view
  // do NOT override this method
  html() {
    if (this.$root !== null) return this.$root;
    else return this._render();
  }
}
