import View from "../View.js";
import Event from "../../utils/Event.js";
import TaskView from "./TaskView.js";

// ====================================================== //
// ===================== MainSurveyView ================= //
// ====================================================== //

var data = [{
        topicId: 132,
        question: "question?",
        snippets: [{
            id: "snippetId1",
            crediScore: "A",
            url: "url",
            title: "title",
            info: "info",
        }, ...]
    },
    {
        topicId: 311,
        question: "question2?",
        snippets: [{
            id: "snippetId1",
            crediScore: "B",
            url: "url21",
            title: "title21",
            info: "info21",
        }, ...]
    }, ...
];


export default class MainSurveyView extends View {

    _render() {
        this.$root = document.querySelector("body");

        this.$taskViews = [];
        for (let i = 0; i < this.data.length; i++) {
            let currTask = new TaskView(this.data[i]),
                currTaskView = currTask.html();
            this.$taskViews.push(currTaskView);
        }

        this.currentTaskNumber = 0;
        this.showNextTask();
        return this.$root;
    }

    showNextTask() {
        if (this.currentTaskNumber < this.data.length) {
            this.$root.appendChild(this.$taskViews[this.currentTaskNumber]);
            this.currentTaskNumber++;
        } else {
            //TODO: start post Task
        }
    }

}