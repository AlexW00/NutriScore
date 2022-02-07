import LikertScaleView from "../views/mainTaskSurveyPage/LikertScaleView.js";
import Controller from "./Controller.js";
import EventBus from "../utils/EventBus.js";
import Event from "../utils/Event.js";

export default class LikertScaleSnippetViewController extends Controller {
  constructor(snippetId) {
    // we provide the object store name and the key
    super("mainTask_SnippetRating", snippetId);
  }

  // called when everything is initalised, now create and return the view
  // set listeners and update view/model or Controller.storageProvider here
  _onCreateView(model) {
    const view = new LikertScaleView({
      snippetId: this.key,
      leftText: "Sehr unglaubwürdig",
      rightText: "Sehr glaubwürdig",
      snippetRating: model.data.snippetRating,
    });

    view.addEventListener(
      LikertScaleView.EVENT_RESULT_LIKERT_CLICKED,
      (event) => {
        model.updateDataPoint("snippetRating", event.data.value); // update the model object
        console.log(model);
        Controller.storageProvider.saveModel(model).then((didSucceed) => {
          // save model to db
          EventBus.notifyAll(
            new Event(LikertScaleView.EVENT_RESULT_LIKERT_CLICKED, undefined, {
              snippetId: this.key,
            })
          );
          console.log(didSucceed);
        });
      }
    );
    return view;
  }
}
