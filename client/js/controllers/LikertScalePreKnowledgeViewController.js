import LikertScaleView from "../views/mainTaskSurveyPage/LikertScaleView.js";
import Controller from "./Controller.js";
import EventBus from "../utils/EventBus.js";
import Event from "../utils/Event.js";

export default class LikertScalePreKnowledgeViewController extends Controller {
  constructor(topicId) {
    super("mainTask_Topic", topicId);
  }

  // called when everything is initalised, now create and return the view
  // set listeners and update view/model or Controller.storageProvider here
  _onCreateView(model) {
    const view = new LikertScaleView({
      id: this.key,
      leftText: "Sehr gering",
      rightText: "Sehr hoch",
      preKnowledge: model.data.preKnowledge,
    });

    view.addEventListener(
      LikertScaleView.EVENT_RESULT_LIKERT_CLICKED,
      (event) => {
        model.updateDataPoint("preKnowledge", event.data.value); // update the model object
        console.log(model);
        Controller.storageProvider.saveModel(model).then((didSucceed) => {
          // save model to db
          console.log(model);
          EventBus.notifyAll(
            new Event(LikertScaleView.EVENT_RESULT_LIKERT_CLICKED, undefined, {
              topicId: this.key,
            })
          );
          console.log(didSucceed);
        });
      }
    );
    return view;
  }
}
