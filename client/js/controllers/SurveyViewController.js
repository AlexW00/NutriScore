import SurveyView from "../views/mainTaskSurveyPage/SurveyView.js";
import Controller from "./Controller.js";
import EventBus from "../utils/EventBus.js";
import nav from "../views/mainTaskSurveyPage/NavigationView.js";
export default class SurveyViewController extends Controller {
  constructor() {
    // we provide the object store name and the key
    super("mainTask_Surveys", "mainTask_Surveys");
  }

  // called when everything is initalised, now create and return the view
  // set listeners and update view/model or Controller.storageProvider here
  _onCreateView(model) {
    const view = new SurveyView(model.data);
    this.model = model;
    EventBus.addEventListener(nav.EVENT_LEFT_BUTTON_CLICKED, () => {
      this.onNavigateBack(); //if false, it did not navigate back because it was at the limit
      // TODO: show warning if it was at the limit
    });
    EventBus.addEventListener(nav.EVENT_RIGHT_BUTTON_CLICKED, () => {
      this.onNavigateNext(); //if false, it did not navigate forward because it was at the limit
    });
    // TODO: show confirmation and end survey here
    return view;
  }

  onNavigateBack() {
    if (
      !this.view.shouldUpdateActiveSurvey(this.model.data.activeSurveyId, true)
    )
      return true;
    else return this._navigate(false);
  }

  onNavigateNext() {
    if (
      !this.view.shouldUpdateActiveSurvey(this.model.data.activeSurveyId, false)
    )
      return true;
    else return this._navigate(true);
  }

  _navigate(doGoNext) {
    const currentSurveyIndex = this.model.data.surveyIds.indexOf(
      this.model.data.activeSurveyId
    );
    const isAtLimit = doGoNext
      ? currentSurveyIndex === this.model.data.surveyIds.length - 1
      : currentSurveyIndex === 0;
    if (isAtLimit) return false;
    else {
      this.model.updateDataPoint(
        "activeSurveyId",
        this.model.data.surveyIds[currentSurveyIndex + (doGoNext ? 1 : -1)]
      );
      Controller.storageProvider.saveModel(this.model);
      this.view.updateActiveSurvey(
        this.model.data.surveyIds[currentSurveyIndex],
        this.model.data.activeSurveyId
      );
      return true;
    }
  }
}
