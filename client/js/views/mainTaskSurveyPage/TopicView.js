import View from "../View.js";
import SearchBarView from "./SearchBarView.js";
import PreKnowledgeView from "./PreKnowledgeView.js";
import SnippetViewController from "../../controllers/SnippetViewController.js";

// ====================================================== //
// ===================== TopicView =================== //
// ====================================================== //

// var data = {
//     topicId: 132,
//     question: "question?",
//     snippetIds: ["snippetId",
//         ...........
//     ],
// }

export default class TopicView extends View {
  async _render() {
    this.$root = document.createElement("div");

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
    //console.log(this.$resultContainer);
    this.$resultContainer.classList.add("results");

    this.snippetViews = [];

    for (let i = 0; i < this.data.snippetIds.length; i++) {
      const newSnippet = new SnippetViewController(this.data.snippetIds[i]),
        $newSnippet = await newSnippet.html();
      $newSnippet.classList.toggle("gone"); //hide snippets first
      this.$resultContainer.appendChild($newSnippet);
      this.snippetViews.push($newSnippet);
    }
    this.$root.appendChild(this.$resultContainer);

    if (this.data.isShowingPreknowledge) this.showPreknowledge();
    else this.showSnippets();

    return this.$root;
  }

  showPreknowledge() {
    this.$preKnowledge.classList.remove("gone");
    for (let i = 0; i < this.snippetViews.length; i++) {
      this.snippetViews[i].classList.add("gone");
    }
  }

  showSnippets() {
    for (let i = 0; i < this.snippetViews.length; i++) {
      this.snippetViews[i].classList.remove("gone");
    }
    this.$preKnowledge.classList.add("gone");
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
