import View from "../View.js";
import Event from "../../utils/Event.js";
import LikertScaleView from "./LikertScaleView.js";

// ====================================================== //
// ================ PreKnowledgeView ==================== //
// ====================================================== //

var data = {
    likertScale: {
        id: "snippetId",
        leftText: "Sehr gering", //WICHTIG DIESER TEXT
        rightText: "Sehr hoch",
    },
};

export default class PreKnowledgeView extends View {

    static EVENT_LIKERT_CLICKED = "EVENT_LIKERT_CLICKED_PRE_KNOWLEDGE";

    onLikertScalaClicked = (event) => {
        this.notifyAll(new Event(
            SnippetView.EVENT_LIKERT_CLICKED,
            this, {
                value: event.value
            }
        ));
    }

    _render() {
        this.$template = document.querySelector("#preKnowledge").content.cloneNode(true);
        this.$root = this.$template.querySelector(".preKnowledge");

        this.likertScale = new LikertScaleView(this.data.likertScale);
        this.likertScale.addEventListener(LikertScaleView.EVENT_LIKERT_CLICKED, this.onLikertScalaClicked);
        this.$likertScale = this.likertScale.html();
        this.$root.appendChild(this.$likertScale);

        return this.$root;
    }

}