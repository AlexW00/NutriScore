import Controller from "./Controller.js";
import MainTaskView from "../views/mainTaskSurveyPage/MainTaskView.js";
import EventBus from "../utils/EventBus.js";
import Event from "../utils/Event.js";
export default class MainTaskViewController extends Controller {
  static EVENT_TASK_END_REACHED = "taskEndReached";
  static EVENT_TASK_START_REACHED = "taskStartReached";
  constructor() {
    // we provide the object store name and the key
    super("mainTask_Topics", "mainTask_Topics");
  }

  // called when everything is initalised, now create and return the view
  // set listeners and update view/model or Controller.storageProvider here
  _onCreateView(model) {
    this.model = model;
    const view = new MainTaskView(model.data);
    return view;
  }

  onNavigateNext() {
    if (
      this.view.getTopicViewById(this.model.data.activeTopicId).onNavigateNext()
    )
      return true;
    else {
      return this._navigate(true);
    }
  }

  onNavigateBack() {
    if (
      this.view.getTopicViewById(this.model.data.activeTopicId).onNavigateBack()
    )
      return true;
    else {
      return this._navigate(false);
    }
  }

  _navigate(doGoNext) {
    const activeTopicIndex = this.model.data.topicIds.indexOf(
      this.model.data.activeTopicId
    );
    const isAtLimit = doGoNext
      ? activeTopicIndex === this.model.data.topicIds.length - 1
      : activeTopicIndex === 0;
    if (isAtLimit) return false;
    else {
      const newActiveTopicId =
        this.model.data.topicIds[activeTopicIndex + (doGoNext ? 1 : -1)];
      this.model.updateDataPoint("activeTopicId", newActiveTopicId);
      Controller.storageProvider.saveModel(this.model);
      this.view.showTopicById(newActiveTopicId);
      return true;
    }
  }
}
