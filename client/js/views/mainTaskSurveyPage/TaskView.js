import View from "../View.js";
import Event from "../../utils/Event.js";
import SearchBarView from "./SearchBarView.js";
import PreKnowledgeView from "./PreKnowledgeView.js";
import LikertScaleView from "./LikertScaleView.js";
import SnippetView from "./SnippetView.js";
import NavigationView from "./NavigationView.js";

// ====================================================== //
// ===================== TaskView =================== //
// ====================================================== //

var data = {
    topicId: 132,
    question: "question?",
    snippets: [{
            id: "snippetId",
            crediScore: "A",
            url: "url",
            title: "title",
            info: "info",
        },
        ...........
    ],
}

export default class TaskView extends View {

    _render() {
        this.$root = document.querySelector("body");

        this.question = new SearchBarView({
            question: this.data.question
        });
        this.$question = this.question.html();
        this.$root.appendChild(this.$question);

        this.preKnowledge = new PreKnowledgeView({
            id: this.data.topicId
        });
        this.$preKnowledge = this.preKnowledge.html();
        this.$question.appendChild(this.$preKnowledge);

        this.snippetViews = [];
        for (let i = 0; i < this.data.snippets.length; i++) {
            let newSnippet = new SnippetView(this.data.snippets[i]),
                $newSnippet = newSnippet.html();
            $newSnippet.classList.toggle("gone"); //hide snippets first
            this.$root.appendChild($newSnippet);
            this.snippetViews.push($newSnippet);
        }

        this.navigation = new NavigationView({
            left: "Zurück",
            right: "Weiter",
            warningMessage: "* Sie müssen alle Ergebnisse bewerten bevor sie die nächste Seite aufrufen können!",
        });
        this.$navigation = this.navigation.html();
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