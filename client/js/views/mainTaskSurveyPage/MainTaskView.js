import View from "../View.js";
import Event from "../../utils/Event.js";

// ====================================================== //
// ===================== MainTaskView =================== //
// ====================================================== //

export default class MainTaskView extends View {

    // static EVENT_LIKERT_CLICKED = "EVENT_LIKERT_CLICKED";

    // onLikertScalaClicked = (event) => {
    //     this.notifyAll(new Event(
    //         SnippetView.EVENT_LIKERT_CLICKED,
    //         this, {
    //             value: event.value
    //         }
    //     ));
    // }

    _render() {
        // this.$template = document.querySelector("#snippet").content.cloneNode(true);
        // this.$root = this.$template.querySelector(".result");
        // this.$root.setAttribute("data-id", this.data.id);

        // this.crediScore = new CrediScoreView(this.data.crediScore);
        // this.$crediScore = this.crediScore.html();
        // this.$root.appendChild(this.$crediScore);

        // this.$content = $root.querySelector(".snippet");
        // this.$content.querySelector(".url").innerHTML = this.data.url;
        // this.$content.querySelector(".title").innerHTML = this.data.title;
        // this.$content.querySelector(".info").innerHTML = this.data.info;

        // this.likertScale = new LikertScaleView(this.data.likertScale);
        // this.likertScale.addEventListener(LikertScaleView.EVENT_LIKERT_CLICKED, this.onLikertScalaClicked);
        // this.$likertScale = this.likertScale.html();
        // this.$content.appendChild(this.$likertScale);


        return this.$root;
    }

}