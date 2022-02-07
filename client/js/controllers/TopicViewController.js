import LikertScaleView from "../views/mainTaskSurveyPage/LikertScaleView.js";
import TopicView from "../views/mainTaskSurveyPage/TopicView.js";
import Controller from "./Controller.js";

export default class TopicViewController extends Controller {
  constructor(topicId) {
    // we provide the object store name and the key
    super("mainTask_Topic", topicId);
  }

  _onCreateView(model) {
    console.log(model);
    this.model = model;
    const view = new TopicView({
      topicId: this.key,
      question: model.data.query, //model.data.question, //TODO: missing
      snippetIds: model.data.snippetIds,
      isShowingPreknowledge: model.data.isShowingPreknowledge,
    });

    return view;
  }

  // retruns true if navigation was successful
  onNavigateNext() {
    if (this.model.data.isShowingPreknowledge) {
      this._navigate(true);
      return true;
    }
    return false;
  }

  // retruns true if navigation was successful
  onNavigateBack() {
    if (!this.model.data.isShowingPreknowledge) {
      this._navigate(false);
      return true;
    }
    return false;
  }

  _navigate(doGoNext) {
    doGoNext ? this.view.showSnippets() : this.view.showPreknowledge();
    this.model.updateDataPoint("isShowingPreknowledge", !doGoNext);
    Controller.storageProvider.saveModel(this.model);
    return true;
  }

  toggleWarningMessage() {
    this.view.toggleWarningMessage();
  }
}
