import Controller from "./Controller.js";
import EventBus from "../utils/EventBus.js";
import Event from "../utils/Event.js";
import PreTaskView from "../views/mainTaskSurveyPage/PreTaskView.js";
import LikertScaleView from "../views/mainTaskSurveyPage/LikertScaleView.js";
import SurveyViewController from "./SurveyViewController.js";

export default class PreTaskViewController extends Controller {
  constructor() {
    // we provide the object store name and the key
    super("preTask", "preTask");
  }

  _onCreateView(model) {
    const view = new PreTaskView({
      nutriScoreGlaubwuerdigkeitsRating:
        model.data.nutriScoreGlaubwuerdigkeitsRating,
      kenntNutri: model.data.kenntNutri,
    });

    view.addEventListener(
      PreTaskView.EVENT_NUTRISCORE_GLAUBWÜRDIGKEIT_RATING_CLICKED,
      (event) => {
        model.updateDataPoint(
          "nutriScoreGlaubwuerdigkeitsRating",
          event.data.value
        );
        Controller.storageProvider.saveModel(model).then(() => {
          // save model to db
          this._notifyShowNextTaskButton();
        });
      }
    );

    view.addEventListener(
      PreTaskView.EVENT_KENNT_NUTRISCORE_CLICKED,
      (event) => {
        model.updateDataPoint("kenntNutri", event.data.value);
        Controller.storageProvider.saveModel(model).then(() => {
          // save model to db
          EventBus.notifyAll(
            new Event(LikertScaleView.EVENT_RESULT_LIKERT_CLICKED, undefined, {
              //TODO: wegen surveystart/maintask start beachten!
              userId: this.key,
            })
          );
        });
      }
    );
    view.addEventListener(
      PreTaskView.EVENT_HIDE_NUTRISCORE_GLAUBWÜRDIGKEIT_RATING,
      () => {
        model.updateDataPoint("nutriScoreGlaubwuerdigkeitsRating", -1);
        Controller.storageProvider.saveModel(model).then(() => {
          // save model to db
          this._notifyShowNextTaskButton();
        });
      }
    );

    view.addEventListener(
      PreTaskView.EVENT_SHOW_NUTRISCORE_GLAUBWÜRDIGKEIT_RATING,
      () => {
        if (model.data.nutriScoreGlaubwuerdigkeitsRating == -1)
          this._notifyHideNextTaskButton();
      }
    );

    if (model.data.kenntNutri == "nan") {
      console.log("ERROR: kenntNutri is not 0 or 1");
      EventBus.notifyAll(
        new Event(SurveyViewController.EVENT_DEACTIVATE_NEXT_BUTTON, this, {})
      );
    }

    return view;
  }

  _notifyShowNextTaskButton = () => {
    EventBus.notifyAll(
      new Event(
        SurveyViewController.EVENT_ACTIVATE_NEXT_BUTTON,
        undefined,
        undefined
      )
    );
  };

  _notifyHideNextTaskButton = () => {
    EventBus.notifyAll(
      new Event(
        SurveyViewController.EVENT_DEACTIVATE_NEXT_BUTTON,
        undefined,
        undefined
      )
    );
  };
}
