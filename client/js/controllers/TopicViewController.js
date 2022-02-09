import LikertScaleView from "../views/mainTaskSurveyPage/LikertScaleView.js";
import TopicView from "../views/mainTaskSurveyPage/TopicView.js";
import Controller from "./Controller.js";
import EventBus from "../utils/EventBus.js";
import SurveyViewController from "./SurveyViewController.js";

export default class TopicViewController extends Controller {
  constructor(topicId) {
    // we provide the object store name and the key
    super("mainTask_Topic", topicId);
  }

  _onCreateView(model) {
    //console.log(model);
    this.model = model;
    const view = new TopicView({
      topicId: this.key,
      question: model.data.query, //model.data.question, //TODO: missing
      snippetIds: model.data.snippetIds,
      isShowingPreknowledge: model.data.isShowingPreknowledge,
    });

    EventBus.addEventListener(
      LikertScaleView.EVENT_RESULT_LIKERT_CLICKED,
      (event) => {
        if (event.data.topicId !== undefined) {
          //console.log(event.data);
          if (this.key === event.data.topicId) {
            EventBus.notifyAll(
              new Event(
                SurveyViewController.EVENT_ACTIVATE_NEXT_BUTTON,
                undefined,
                undefined
              )
            );
            //console.log("update model to ", event.data.preKnowledge);
            model.updateDataPoint("preKnowledge", event.data.preKnowledge);
          }
        } else {
          if (this.model.data.snippetIds.indexOf(event.data.snippetId) !== -1) {
            this.didAnswerAllQuestions().then((didAnswer) => {
              if (didAnswer) {
                EventBus.notifyAll(
                  new Event(
                    SurveyViewController.EVENT_ACTIVATE_NEXT_BUTTON,
                    undefined,
                    undefined
                  )
                );
              }
            });
          }
        }
      }
    );
    return view;
  }

  didAnswerAllQuestions = async () => {
    let doSendEvent = true;

    if (this.model.data.isShowingPreknowledge) {
      doSendEvent = this.model.data.preKnowledge !== -1;
    } else {
      for (let i = 0; i < this.model.data.snippetIds.length; i++) {
        //console.log(this.model.data.snippetIds[i]);
        const snippetId = this.model.data.snippetIds[i];
        const data = await Controller.storageProvider.getItem(
          "mainTask_SnippetRating",
          snippetId
        );
        //console.log(data);
        if (data.snippetRating === -1) {
          doSendEvent = false;
          break;
        }
      }
    }
    //console.log("doSendEvent", doSendEvent);
    return doSendEvent;
  };
  // retruns true if navigation was successful
  onNavigateNext() {
    if (this.model.data.isShowingPreknowledge) {
      this._navigate(true);
      this.didAnswerAllQuestions().then((didAnswer) => {
        if (!didAnswer) {
          EventBus.notifyAll(
            new Event(
              SurveyViewController.EVENT_DEACTIVATE_NEXT_BUTTON,
              undefined,
              undefined
            )
          );
        }
      });

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
