import View from "../View.js";
import SurveyViewController from "../../controllers/SurveyViewController.js";
import TopicViewController from "../../controllers/TopicViewController.js";
import EventBus from "../../utils/EventBus.js";
import Event from "../../utils/Event.js";

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
      const topicViewController = new TopicViewController(topicId);
      this.topicViews.push(topicViewController);
      this.topicViewIds.push(topicId);
    }
    //console.log("oncreate maintask");
    //console.log(this.data);
    this.showTopicById(this.data.activeTopicId);
    return this.$root;
  }

  getTopicViewById(id) {
    const index = this.topicViewIds.indexOf(id);
    return this.topicViews[index];
  }

  async showTopicById(id) {
    // remove all children

    //console.log("this.$root.firstChild");
    //console.log(this.topicViews);
    const index = this.topicViewIds.indexOf(id);

    while (this.$root.firstChild) {
      this.$root.removeChild(this.$root.firstChild);
    }
    const newTopic = this.topicViews[index],
      newTopicHtml = await newTopic.html();

    newTopic.didAnswerAllQuestions().then((didAnswer) => {
      if (!didAnswer) {
        EventBus.notifyAll(
          new Event(
            SurveyViewController.EVENT_DEACTIVATE_NEXT_BUTTON,
            undefined,
            undefined
          )
        );
      }
    });

    this.$root.appendChild(newTopicHtml);
  }
}
