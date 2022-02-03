import View from "../View.js";
import Event from "../../utils/Event.js";
import CrediScoreView from "./CrediScoreView.js";
import LikertScaleView from "./LikertScaleView.js";
import EventBus from "../../utils/EventBus.js";

// ====================================================== //
// ===================== SnippetView ==================== //
// ====================================================== //

var data = {
    id: "snippetId",
    crediScore: "A",
    url: "url",
    title: "title",
    info: "info",
    likertScale: {
        id: "snippetId",
        leftText: "Sehr Unglaubwürdig",
        rightText: "Sehr Glaubwürdig",
    },
};

export default class SnippetView extends View {
  static EVENT_LIKERT_CLICKED = "EVENT_LIKERT_CLICKED";

  onLikertScalaClicked = (event) => {
    // send event to event bus
    console.log("click");
    EventBus.notifyAll(
      new Event(SnippetView.EVENT_LIKERT_CLICKED, this, {
        value: event.value,
      })
    );
  };

  _render() {
    this.$template = document.querySelector("#result").content.cloneNode(true);
    this.$root = document.createElement("div");
    this.$root.setAttribute("id", "result");
    this.$root.setAttribute("data-id", this.data.id);

    this.crediScore = new CrediScoreView({ crediScore: this.data.crediScore });
    this.$crediScore = this.crediScore.html();
    this.$root.appendChild(this.$crediScore);

    this.$content = this.$template.querySelector(".snippet");
    this.$content.querySelector(".url").innerHTML = this.data.url;
    this.$content.querySelector(".title").innerHTML = this.data.title;
    this.$content.querySelector(".info").innerHTML = this.data.info;

    this.likertScale = new LikertScaleView({ snippetId: this.data.id });
    this.likertScale.addEventListener(
      LikertScaleView.EVENT_RESULT_LIKERT_CLICKED,
      this.onLikertScalaClicked
    );
    this.$likertScale = this.likertScale.html();
    this.$content.appendChild(this.$likertScale);
    this.$root.appendChild(this.$content);

    return this.$root;
  }
}
