import View from "../View.js";
import Event from "../../utils/Event.js";
import TaskViewController from "../../controllers/TaskViewController.js";

// ====================================================== //
// ===================== MainSurveyView ================= //
// ====================================================== //

export default class MainSurveyView extends View {
  //Data: {topicIds: [], activeTopicId: int}

  _render() {
    // task number  =! index
    this.$root = document.createElement("div");

    this.$taskViews = [];
    for (const topicId of this.data.topicIds) {
      this.$taskViews.push(new TaskViewController(topicId));
    }
    this.showTaskById(this.data.activeTopicId);
    return this.$root;
  }

  async showTaskById(id) {
    // remove all children
    while (this.$root.firstChild) {
      this.$root.removeChild(this.$root.firstChild);
    }
    this.$root.appendChild(await this.$taskViews[id].html());
  }
}
