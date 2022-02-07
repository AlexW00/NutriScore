import View from "../View.js";
import Event from "../../utils/Event.js";
import SurveyNavigationViewController from "../../controllers/SurveyNavigationViewController.js";
import PreTaskView from "./PreTaskView.js";
import PostTaskView from "./PostTaskView.js";
import MainTaskViewController from "../../controllers/MainTaskViewController.js";
// ====================================================== //
// ================ SurveyView       ==================== //
// ====================================================== //

var data = {
  activeSurveyId: 0,
  surveyIds: ["preTask", "mainTask", "postTask"],
};

export default class SurveyView extends View {
  async _render() {
    this.$root = document.createElement("div");
    this.$root.classList.add("survey");
    this.$content = document.createElement("div");
    this.$content.classList.add("survey-content");
    this.postTaskView = new PostTaskView();
    // TODO MainTaskViewController
    this.mainTopicViewController = new MainTaskViewController();
    this.preTaskView = new PreTaskView();

    this.$root.appendChild(this.$content);
    this.navController = new SurveyNavigationViewController(
      this.data.activeSurveyId
    );

    this.$content.appendChild(
      await this._getContentByState(this.data.activeSurveyId)
    );
    this.$root.appendChild(await this.navController.html());
    return this.$root;
  }

  async updateActiveSurvey(previousSurveyId, newSurveyId) {
    console.log(previousSurveyId, newSurveyId);
    const prevHtml = await this._getContentByState(previousSurveyId);
    this.$content.removeChild(prevHtml);
    console.log(newSurveyId);
    this.$content.appendChild(await this._getContentByState(newSurveyId));
  }

  async _getContentByState(state) {
    switch (state) {
      case "preTask":
        return this.preTaskView.html();
      case "mainTask":
        return await this.mainTopicViewController.html();
      case "postTask":
        return this.postTaskView.html();
    }
  }
}
