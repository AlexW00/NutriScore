import View from "../View.js";
import Event from "../../utils/Event.js";
import SurveyNavigationViewController from "../../controllers/SurveyNavigationViewController.js";

import PostTaskViewController from "../../controllers/PostTaskViewController.js";
import MainTaskViewController from "../../controllers/MainTaskViewController.js";
import PreTaskViewController from "../../controllers/PreTaskViewController.js";
// ====================================================== //
// ================ SurveyView       ==================== //
// ====================================================== //

export default class SurveyView extends View {
  async _render() {
    this.$root = document.createElement("div");
    this.$root.classList.add("survey");
    this.$content = document.createElement("div");
    this.$content.classList.add("survey-content");
    this.postTaskView = new PostTaskViewController(); //TODO:

    this.mainTopicViewController = new MainTaskViewController();
    this.preTaskView = new PreTaskViewController(this.data.userId); //TODO: Achtung! userId

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

  shouldUpdateActiveSurvey(currentSurveyId, doNavigateBack) {
    if (currentSurveyId === "preTask" || currentSurveyId === "postTask")
      return true;
    else if (doNavigateBack)
      return !this.mainTopicViewController.onNavigateBack();
    else return !this.mainTopicViewController.onNavigateNext();
  }

  async updateActiveSurvey(previousSurveyId, newSurveyId) {
    //console.log(previousSurveyId, newSurveyId);
    const prevHtml = await this._getContentByState(previousSurveyId);
    this.$content.removeChild(prevHtml);
    //console.log(newSurveyId);
    this.$content.appendChild(await this._getContentByState(newSurveyId));
  }

  async _getContentByState(state) {
    switch (state) {
      case "preTask":
        return await this.preTaskView.html();
      case "mainTask":
        return await this.mainTopicViewController.html();
      case "postTask":
        return await this.postTaskView.html();
    }
  }
}
