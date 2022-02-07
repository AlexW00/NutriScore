import View from "../View.js";
import Event from "../../utils/Event.js";
import SearchBarView from "./SearchBarView.js";
import PreKnowledgeView from "./PreKnowledgeView.js";
import LikertScaleView from "./LikertScaleView.js";
import SnippetView from "./SnippetView.js";
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
    this.$root = document.createElement("div"); //TODO: DIV, dont use Body tag

    this.question = new SearchBarView({
      question: this.data.question,
    });
    this.$question = this.question.html();
    this.$root.appendChild(this.$question);

    this.preKnowledge = new PreKnowledgeView({
      id: this.data.topicId,
    });
    this.$preKnowledge = await this.preKnowledge.html();
    this.$root.appendChild(this.$preKnowledge);

    this.$resultContainer = document.createElement("div");
    console.log(this.$resultContainer);
    this.$resultContainer.classList.add("results");

    this.snippetViews = [];
    console.log("DATA");
    console.log(this.data);
    for (let i = 0; i < this.data.snippetIds.length; i++) {
      let newSnippet = new SnippetViewController(this.data.snippetIds[i]),
        $newSnippet = await newSnippet.html();
      $newSnippet.classList.toggle("gone"); //hide snippets first
      this.$resultContainer.appendChild($newSnippet);
      this.snippetViews.push($newSnippet);
    }
    this.$root.appendChild(this.$resultContainer);

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
}
