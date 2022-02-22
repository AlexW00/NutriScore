import SurveyView from "../views/mainTaskSurveyPage/SurveyView.js";
import Controller from "./Controller.js";
import EventBus from "../utils/EventBus.js";
import Event from "../utils/Event.js";
import nav from "../views/mainTaskSurveyPage/NavigationView.js";
import SolvedSurveyView from "../views/mainTaskSurveyPage/SolvedSurveyView.js";
import WindowTooSmallView from "../views/mainTaskSurveyPage/WindowTooSmallView.js";
export default class SurveyViewController extends Controller {
  static EVENT_ACTIVATE_NEXT_BUTTON = "EVENT_ACTIVATE_NEXT_BUTTON";
  static EVENT_DEACTIVATE_NEXT_BUTTON = "EVENT_DEACTIVATE_NEXT_BUTTON";
  static EVENT_SURVEY_LOADED = "EVENT_SURVEY_LOADED";
  static EVENT_POST_TASK_DISPLAYED = "EVENT_POST_TASK_DISPLAYED";

  constructor() {
    // we provide the object store name and the key
    super("mainTask_Surveys", "mainTask_Surveys");
  }

  // called when everything is initalised, now create and return the view
  // set listeners and update view/model or Controller.storageProvider here
  _onCreateView(model) {
    const DEV_MODE = false;
    const windowIsTooSmall = window.innerWidth < 1045;
    //console.log("windowIsTooSmall", windowIsTooSmall);
    if (windowIsTooSmall) return new WindowTooSmallView();

    const hasCompletedSurvey = localStorage.getItem("hasCompletedSurvey");
    if (hasCompletedSurvey === "true" && !DEV_MODE) {
      return new SolvedSurveyView();
    }

    const view = new SurveyView(model.data);
    this.model = model;
    EventBus.addEventListener(nav.EVENT_LEFT_BUTTON_CLICKED, () => {
      this.onNavigateBack(); //if false, it did not navigate back because it was at the limit
      // TODO: show warning if it was at the limit
    });
    EventBus.addEventListener(nav.EVENT_RIGHT_BUTTON_CLICKED, () => {
      const isAtEnd = !this.onNavigateNext(); //if false, it did not navigate forward because it was at the limit
      if (isAtEnd) {
        const vpInfo = this.view.postTaskView.getVpInfo();
        Controller.storageProvider.exportData().then((surveyData) => {
          this._sendDataToServer(surveyData, vpInfo);
        });
      }
    });

    EventBus.addEventListener(
      SurveyViewController.EVENT_ACTIVATE_NEXT_BUTTON,
      () => {
        view.navController.activateNextButton();
      }
    );

    EventBus.addEventListener(
      SurveyViewController.EVENT_DEACTIVATE_NEXT_BUTTON,
      () => {
        view.navController.deactivateNextButton();
      }
    );
    view.html().then(() => {
      view.navController.updateButtons(model.data.activeSurveyId);
      //console.log("send survey load", model.data);
      EventBus.notifyAll(
        new Event(SurveyViewController.EVENT_SURVEY_LOADED, this, model.data)
      );
    });

    // console.log("survey loaded");

    return view;
  }

  onNavigateBack() {
    //console.log("navigate back");
    this.view.navController.activateNextButton();
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

  _sendDataToServer = (surveyData, vpData) => {
    // save localstorage that we have sent the data to the server

    localStorage.setItem("hasCompletedSurvey", true);
    // console.log(surveyData, vpData);
    const jobs = [];
    jobs.push(this._sendSurveyDataToServer(surveyData));

    if (this._vpDataIsValid(vpData))
      jobs.push(this._sendVpDataToServer(vpData));

    Promise.all(jobs).then(() => {
      // refresh site
      window.location.reload();
    });
  };

  _vpDataIsValid(vpData) {
    for (const key of Object.keys(vpData)) {
      if (!vpData[key] || vpData[key] === "nan" || vpData[key] === "")
        return false;
      else return true;
    }
  }

  _sendJson = (json, url) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    });
  };

  _sendSurveyDataToServer = (surveyData) => {
    return this._sendJson(surveyData, "../../postSurveyData")
      .then((response) => {
        if (response.status === 200) return true;
      })
      .catch((e) => {
        // console.log(e);
        return false;
      });
  };

  _sendVpDataToServer = (vpData) => {
    return this._sendJson(vpData, "../../postVpData")
      .then((response) => {
        if (response.status === 200) return true;
      })
      .catch((e) => {
        // console.log(e);
        return false;
      });
  };

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
      // console.log(this.model.data.activeSurveyId);
      this.view.navController.updateButtons(this.model.data.activeSurveyId);

      if (this.model.data.activeSurveyId === "postTask")
        EventBus.notifyAll(
          new Event(SurveyViewController.EVENT_POST_TASK_DISPLAYED),
          this,
          null
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
