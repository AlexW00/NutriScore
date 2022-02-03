import View from "../View.js";
import Event from "../../utils/Event.js";
import LikertScaleView from "./LikertScaleView.js";

// ====================================================== //
// ================ PreKnowledgeView ==================== //
// ====================================================== //

var data = {
    id: "topicID",
};

export default class PreKnowledgeView extends View {

    _render() {
        this.$template = document.querySelector("#preKnowledge").content.cloneNode(true);
        this.$root = this.$template.querySelector(".preKnowledge");

        this.likertScale = new LikertScaleView({
            id: this.data.id,
            leftText: "Sehr gering", //WICHTIG DIESER TEXT
            rightText: "Sehr hoch",
        });
        this.$likertScale = this.likertScale.html();
        this.$root.appendChild(this.$likertScale);

        return this.$root;
    }

}