import LikertScaleView from "../views/mainTaskSurveyPage/LikertScaleView";
import Model from "../models/Model.js";

export default class LikertScaleSnippetViewController extends Controller {
  constructor(storageProvider, snippetId) {
    super(storageProvider, "mainTask_SnippetRating", [snippetId]);
  }

  _onCreate(model) {
    const view = LikertScaleView({
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
