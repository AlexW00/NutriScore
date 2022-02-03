// ##################################################################### //
// ########################## surveyController ######################### //
// ##################################################################### //

import EventBus from "../utils/EventBus.js";
import SnippetView from "../views/mainTaskSurveyPage/SnippetView.js";

// ====================================================== //
// ==================== example code ==================== //
// ====================================================== //

// register event listeners for events on the EventBus
EventBus.addEventListener(SnippetView.EVENT_LIKERT_CLICKED, (event) => {
  // likert scale clicked
  console.log(event);
});
