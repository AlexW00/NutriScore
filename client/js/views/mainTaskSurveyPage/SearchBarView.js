import View from "../View.js";
import Event from "../../utils/Event.js";

// ====================================================== //
// ===================== SearchBarView ================== //
// ====================================================== //

var data = {
    question: "question?",
};

export default class SearchBarView extends View {

    _render() {
        this.$template = document.querySelector("#question-bar").content.cloneNode(true);
        this.$root = this.$template.querySelector(".question-bar");
        this.$searchIcon = this.$root.querySelector(".search-icon").cloneNode(true);
        this.$question = this.$root.querySelector(".question");

        this.$question.innerHTML = this.data.question + this.$searchIcon;

        return this.$root;
    }

}