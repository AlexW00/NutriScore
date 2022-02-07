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
      this._updateCurrentSurvey(true);
    });
    EventBus.addEventListener(nav.EVENT_RIGHT_BUTTON_CLICKED, () => {
      this._updateCurrentSurvey(false);
    });
    return view;
  }

  // todo: refactor this crap
  _updateCurrentSurvey(didNavigateBack) {
    const currentSurveyIndex = this.model.data.surveyIds.indexOf(
      this.model.data.activeSurveyId
    );
    console.log(this.model.data.surveyIds);
    console.log(currentSurveyIndex);
    if (didNavigateBack) this._onNavigateBack(currentSurveyIndex);
    else this._onNavigateForward(currentSurveyIndex);
  }

  _onNavigateBack(currentSurveyIndex) {
    if (currentSurveyIndex === 0) {
      EventBus.notifyAll(
        new Event(SurveyViewController.EVENT_TASK_START_REACHED, this, {})
      );
    } else {
      this.model.updateDataPoint(
        "activeSurveyId",
        this.model.data.surveyIds[currentSurveyIndex - 1]
      );
      Controller.storageProvider.saveModel(this.model);
      this.view.updateActiveSurvey(
        this.model.data.surveyIds[currentSurveyIndex],
        this.model.data.activeSurveyId
      );
    }
  }

  _onNavigateForward(currentSurveyIndex) {
    const isLastSurvey =
      currentSurveyIndex === this.model.data.surveyIds.length - 1;
    if (isLastSurvey)
      EventBus.notifyAll(
        new Event(SurveyViewController.EVENT_TASK_END_REACHED, this, {})
      );
    else {
      this.model.updateDataPoint(
        "activeSurveyId",
        this.model.data.surveyIds[currentSurveyIndex + 1]
      );
      Controller.storageProvider.saveModel(this.model);
      this.view.updateActiveSurvey(
        this.model.data.surveyIds[currentSurveyIndex],
        this.model.data.activeSurveyId
      );
    }
  }

  //TODO: Listen to event bus and update surveyview
}
