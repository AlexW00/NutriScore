import View from "../View.js";
import Event from "../../utils/Event.js";

// ====================================================== //
// ===================== ExampleView ==================== //
// ====================================================== //

export default class ExampleView extends View {
  // overriding constructor not necessary since there are no changes to the super class constructor

  // we only need to override _render() with custom our custom html
  _render() {
    // create all $html elements and append them to the coresponding $html elements
    this.$root = document.createElement("div");
    this.$button = this._renderButton(); // extra function, could be here too
    this.$root.appendChild(this.$button);
    return this.$root; // return the root element
  }

  _renderButton() {
    const button = document.createElement("button");
    button.innerHTML = this.data.buttonValue ?? 0;
    button.onclick = (e) => {
      this.notifyAll(new Event("buttonClicked", this, e)); // new Event(type, view, data)
    };
    return button;
  }
}
