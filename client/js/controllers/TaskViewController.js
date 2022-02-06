import LikertScaleView from "../views/mainTaskSurveyPage/LikertScaleView.js";
import TaskView from "../views/mainTaskSurveyPage/TaskView.js";
import Controller from "./Controller.js";

export default class TaskViewController extends Controller {
    constructor(topicId) {
        // we provide the object store name and the key
        super("mainTask_Topic", topicId);
    }

    _onCreateView(model) {
        console.log(model);
        const view = new TaskView({
            topicId: this.key,
            question: model.data.query, //model.data.question, //TODO: missing
            snippetIds: model.data.snippetIds,
        });

        return view;
    }

    togglePreknowledgeVisiblility() {
        this.view.togglePreknowledgeVisiblility();
    }

    toggleSnippetViewsVisiblility() {
        this.view.toggleSnippetViewsVisiblility();
    }

    toggleWarningMessage() {
        this.view.toggleWarningMessage();
    }
}