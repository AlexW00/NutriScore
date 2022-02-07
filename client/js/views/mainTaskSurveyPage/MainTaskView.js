import View from "../View.js";
import Event from "../../utils/Event.js";
import TopicViewController from "../../controllers/TopicViewController.js";

// ====================================================== //
// ===================== MainTaskView ================= //
// ====================================================== //

export default class MainTaskView extends View {
  //Data: {topicIds: [], activeTopicId: int}

  _render() {
    // task number  =! index
    this.$root = document.createElement("div");

    this.$topicViews = [];
    for (const topicId of this.data.topicIds) {
      this.$topicViews.push(new TopicViewController(topicId));
    }
    this.showTaskById(this.data.activeTopicId);
    return this.$root;
  }

  async showTaskById(id) {
    // remove all children
    while (this.$root.firstChild) {
      this.$root.removeChild(this.$root.firstChild);
    }
    this.$root.appendChild(await this.$topicViews[id].html());
  }
}
