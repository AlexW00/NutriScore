import View from "../View.js";
import Event from "../../utils/Event.js";
import LikertScalePreKnowledgeViewController from "../../controllers/LikertScalePreKnowledgeViewController.js";

// ====================================================== //
// ================ PreKnowledgeView ==================== //
// ====================================================== //

var data = {
    id: "topicID",
};

export default class PreKnowledgeView extends View {

    async _render() {
        this.$template = document.querySelector("#preKnowledge").content.cloneNode(true);
        this.$root = this.$template.querySelector(".preKnowledge");

        this.likertScale = new LikertScalePreKnowledgeViewController(this.data.id);
        this.$likertScale = await this.likertScale.html();
        this.$root.appendChild(this.$likertScale);

        return this.$root;
    }

}