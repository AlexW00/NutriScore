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

    this.topicViews = [];
    this.topicViewIds = [];
    for (const topicId of this.data.topicIds) {
      this.topicViews.push(new TopicViewController(topicId));
      this.topicViewIds.push(topicId);
    }
    console.log("oncreate maintask");
    console.log(this.data);
    this.showTopicById(this.data.activeTopicId);
    return this.$root;
  }

  getTopicViewById(id) {
    const index = this.topicViewIds.indexOf(id);
    return this.topicViews[index];
  }

  async showTopicById(id) {
    // remove all children

    console.log("this.$root.firstChild");
    console.log(this.topicViews);
    const index = this.topicViewIds.indexOf(id);

    while (this.$root.firstChild) {
      this.$root.removeChild(this.$root.firstChild);
    }
    this.$root.appendChild(await this.topicViews[index].html());
  }
}
