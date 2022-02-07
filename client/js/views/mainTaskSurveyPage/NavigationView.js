import View from "../View.js";
import Event from "../../utils/Event.js";

// ====================================================== //
// ===================== NavigationView ================= //
// ====================================================== //

// var data = {
//     left: undefined,
//     right: "Weiter",
//     warningMessage: "* Sie müssen alle Ergebnisse bewerten bevor sie die nächste Seite aufrufen können!",
// };

export default class NavigationView extends View {
  static EVENT_RIGHT_BUTTON_CLICKED = "EVENT_RIGHT_BUTTON_CLICKED";
  static EVENT_LEFT_BUTTON_CLICKED = "EVENT_LEFT_BUTTON_CLICKED";

  onLeftButtonClicked = (event) => {
    this.notifyAll(
      new Event(NavigationView.EVENT_LEFT_BUTTON_CLICKED, this, event)
    );
  };

  onRightButtonClicked = (event) => {
    this.notifyAll(
      new Event(NavigationView.EVENT_RIGHT_BUTTON_CLICKED, this, event)
    );
  };

  _render() {
    this.$template = document
      .querySelector("#navigation")
      .content.cloneNode(true);
    this.$root = this.$template.querySelector(".navigation");
    this.$leftButton = this.$root.querySelector(".button-prev");
    this.$rightButton = this.$root.querySelector(".button-next");
    this.$warning = this.$root.querySelector(".warning");

    if (this.data.left === undefined) {
      this.$leftButton.classList.add("nonvisible");
    } else {
      this.$leftButton.innerHTML = this.data.left;
      this.$leftButton.addEventListener("click", this.onLeftButtonClicked);
    }

    if (this.data.right === undefined) {
      this.$rightButton.classList.add("nonvisible");
    } else {
      this.$rightButton.innerHTML = this.data.right;
      this.$rightButton.addEventListener("click", this.onRightButtonClicked);
    }

    if (this.data.warningMessage === undefined) {
      this.$warning.classList.add("nonvisible");
    } else {
      this.$warning.innerHTML = this.data.warningMessage;
    }

    return this.$root;
  }

  toggleWarningMessage() {
    this.$warning.classList.toggle("nonvisible");
  }

  activateNextButton() {
    this.$rightButton.classList.remove("nonvisible");
  }

  deactivateNextButton() {
    this.$rightButton.classList.add("nonvisible");
  }
}
