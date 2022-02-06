import View from "../View.js";
import Event from "../../utils/Event.js";
import CrediScoreViewController from "../../controllers/CrediScoreViewController.js";
import LikertScaleSnippetViewController from "../../controllers/LikertScaleSnippetViewController.js";
// ====================================================== //
// ===================== SnippetView ==================== //
// ====================================================== //

var data = {
    id: "snippetId",
    crediScore: "A",
    url: "url",
    title: "title",
    info: "info",
};

export default class SnippetView extends View {

    _render() {
        this.$template = document.querySelector("#result").content.cloneNode(true);
        this.$root = document.createElement("div");
        this.$root.setAttribute("id", "result");
        this.$root.setAttribute("data-id", this.data.id);

        this.crediScore = new CrediScoreViewController(this.data.id);
        this.$crediScore = await this.crediScore.html();
        this.$root.appendChild(this.$crediScore);

        this.$content = this.$template.querySelector(".snippet");
        this.$content.querySelector(".url").innerHTML = this.data.url;
        this.$content.querySelector(".title").innerHTML = this.data.title;
        this.$content.querySelector(".info").innerHTML = this.data.info;

        this.likertScale = new LikertScaleSnippetViewController(this.data.id);
        this.$likertScale = await this.likertScale.html();
        this.$content.appendChild(this.$likertScale);
        this.$root.appendChild(this.$content);

        return this.$root;
    }
}