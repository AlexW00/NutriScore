import LikertScaleView from "../views/mainTaskSurveyPage/LikertScaleView.js";
import Controller from "./Controller.js";

export default class LikertScaleSnippetViewController extends Controller {
  constructor(storageProvider, snippetId) {
    super(storageProvider, "mainTask_SnippetRating", [snippetId]);
  }

  _onCreateView(model) {
    const view = new LikertScaleView({
      id: this.keys[0],
      leftText: "Sehr unglaubwürdig",
      rightText: "Sehr glaubwürdig",
    });

    view.addEventListener(
      LikertScaleView.EVENT_RESULT_LIKERT_CLICKED,
      (event) => {
        console.log("likert clicked");
      }
    );
    return view;
  }
}
