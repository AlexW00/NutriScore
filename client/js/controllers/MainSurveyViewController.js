import Controller from "./Controller.js";
import MainSurveyView from "../views/mainTaskSurveyPage/MainSurveyView.js";
import EventBus from "../utils/EventBus.js";
import Event from "../utils/Event.js";
export default class MainSurveyViewController extends Controller {
  static EVENT_TASK_END_REACHED = "taskEndReached";
  static EVENT_TASK_START_REACHED = "taskStartReached";
  constructor() {
    // we provide the object store name and the key
    super("mainTask_Topics", "mainTask_Topics");
  }

  // called when everything is initalised, now create and return the view
  // set listeners and update view/model or Controller.storageProvider here
  _onCreateView(model) {
    console.log(model);
    const view = new MainSurveyView(model.data);
    return view;
  }

  showNextTask() {
    const activeTopicIndex = this.model.data.topicIds.indexOf(
      this.model.data.activeTopicId
    );
    const isLastTopic =
      activeTopicIndex === this.model.data.topicIds.length - 1;
    if (isLastTopic)
      EventBus.notifyAll(
        new Event(MainSurveyViewController.EVENT_TASK_END_REACHED, this, {})
      );
    else {
      this.model.updateDataPoint(
        "activeTopicId",
        this.model.data.topicIds[activeTopicIndex + 1]
      );
      Controller.storageProvider.saveModel(this.model);
      this.view.showTaskById(this.model.data.activeTopicId);
    }
  }

  showPreviousTask() {
    const activeTopicIndex = this.model.data.topicIds.indexOf(
      this.model.data.activeTopicId
    );
    const isFirstTopic = activeTopicIndex === 0;
    if (isFirstTopic)
      EventBus.notifyAll(
        new Event(MainSurveyViewController.EVENT_TASK_START_REACHED, this, {})
      );
    else {
      this.model.updateDataPoint(
        "activeTopicId",
        this.model.data.topicIds[activeTopicIndex - 1]
      );
      Controller.storageProvider.saveModel(this.model);
      this.view.showTaskById(this.model.data.activeTopicId);
    }
  }
}
