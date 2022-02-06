import CrediScoreView from "../views/mainTaskSurveyPage/CrediScoreView.js";
import Controller from "./Controller.js";

export default class CrediScoreViewController extends Controller {
    constructor(snippetId) {
        super("mainTask_Snippet", snippetId);
    }

    _onCreateView(model) {
        const view = new CrediScoreView({
            crediScore: model.data.snippetCrediScore,
        });

        return view;
    }
}