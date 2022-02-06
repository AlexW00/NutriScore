import SnippetView from "../views/mainTaskSurveyPage/SnippetView.js";
import Controller from "./Controller.js";

export default class SnippetViewController extends Controller {
    constructor(snippetId) {
        super("mainTask_Snippet", snippetId);
    }

    _onCreateView(model) {
        const view = new SnippetView({
            id: this.key,
        });
        return view;
    }
}