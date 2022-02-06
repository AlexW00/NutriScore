import View from "../View.js";
import Event from "../../utils/Event.js";
import SearchBarView from "./SearchBarView.js";
import PreKnowledgeView from "./PreKnowledgeView.js";
import LikertScaleView from "./LikertScaleView.js";
import SnippetView from "./SnippetView.js";
import NavigationView from "./NavigationView.js";
import SurveyNavigationViewController from "../../controllers/SurveyNavigationViewController.js";
import SnippetViewController from "../../controllers/SnippetViewController.js";

// ====================================================== //
// ===================== TaskView =================== //
// ====================================================== //

// var data = {
//     topicId: 132,
//     question: "question?",
//     snippetIds: ["snippetId",
//         ...........
//     ],
// }

export default class TaskView extends View {

    async _render() {
        this.$root = document.querySelector("body");

        this.question = new SearchBarView({
            question: this.data.question
        });
        this.$question = this.question.html();
        this.$root.appendChild(this.$question);

        this.preKnowledge = new PreKnowledgeView({
            id: this.data.topicId
        });
        this.$preKnowledge = await this.preKnowledge.html();
        this.$root.appendChild(this.$preKnowledge);

        this.$resultContainer = document.createElement("div");
        console.log(this.$resultContainer);
        this.$resultContainer.classList.add("results");

        this.snippetViews = [];
        for (let i = 0; i < this.data.snippetIds.length; i++) {
            let newSnippet = new SnippetViewController(this.data.snippetIds[i]),
                $newSnippet = await newSnippet.html();
            $newSnippet.classList.toggle("gone"); //hide snippets first
            this.$resultContainer.appendChild($newSnippet);
            this.snippetViews.push($newSnippet);
        }
        this.$root.appendChild(this.$resultContainer);

        this.navigation = new SurveyNavigationViewController();
        this.$navigation = await this.navigation.html();
        this.toggleWarningMessage(); //Hide Warning Message
        this.$root.appendChild(this.$navigation);

        return this.$root;
    }

    togglePreknowledgeVisiblility() {
        this.$preKnowledge.classList.toggle("gone");
    }

    toggleSnippetViewsVisiblility() {
        for (let i = 0; i < this.snippetViews.length; i++) {
            this.snippetViews[i].classList.toggle("gone");
        }
    }

    toggleWarningMessage() {
        this.navigation.toggleWarningMessage();
    }

}