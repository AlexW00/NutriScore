import SnippetView from "../views/mainTaskSurveyPage/SnippetView.js";
import Controller from "./Controller.js";

export default class SnippetViewController extends Controller {
  constructor(snippetId) {
    super("mainTask_Snippet", snippetId); //brauchen wir da nicht auch noch die User Einträge???
  }

  _onCreateView(model) {
    //console.log(model);
    const view = new SnippetView({
      id: this.key,
      url: model.data.snippetURL,
      title: model.data.snippetTitel,
      info: model.data.snippetText,
      crediScore: model.data.snippetCrediScore,
    });
    return view;
  }
}
