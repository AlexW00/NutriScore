import Controller from "./Controller.js";
import NavigationView from "../views/mainTaskSurveyPage/NavigationView.js";
import EventBus from "../utils/EventBus.js";

export default class SurveyNavigationViewController extends Controller {
  constructor(state) {
    super(undefined, undefined);
  }

  _onCreateView(model) {
    const view = new NavigationView({
      left: "Zurück",
      right: "Weiter",
      warningMessage:
        "* Sie müssen alle Ergebnisse bewerten bevor sie die nächste Seite aufrufen können!",
    });

    view.addEventListener(
      NavigationView.EVENT_RIGHT_BUTTON_CLICKED,
      (event) => {
        //console.log("right button");
        EventBus.notifyAll(event);
      }
    );

    view.addEventListener(NavigationView.EVENT_LEFT_BUTTON_CLICKED, (event) => {
      //console.log("left button");
      EventBus.notifyAll(event);
    });

    this.$view = view;
    return view;
  }

  toggleWarningMessage() {
    this.$view.toggleWarningMessage();
  }

  activateNextButton() {
    if (this.$view && this.$view.$rightButton) this.$view.activateNextButton();
    else
      setTimeout(() => {
        this.activateNextButton();
      }, 100);
  }

  deactivateNextButton() {
    if (this.$view && this.$view.$rightButton)
      this.$view.deactivateNextButton();
    else
      setTimeout(() => {
        this.deactivateNextButton();
      }, 100);
  }

  setText(left, right) {
    this.$view.setText(left, right);
  }

  updateButtons(surveyId) {
    this._setNavigationText(surveyId);
  }

  _setNavigationText(surveyId) {
    if (surveyId === "postTask") this.setText(false, "Absenden");
    else if (surveyId === "mainTask") this.setText("Zurück", "Weiter");
    else if (surveyId === "preTask") this.setText("...", "Weiter");
  }
}
