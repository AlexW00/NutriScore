// ##################################################################### //
// ########################## surveyController ######################### //
// ##################################################################### //

import EventBus from "../utils/EventBus.js";
import SnippetView from "../views/mainTaskSurveyPage/SnippetView.js";
import LikertScaleSnippetViewController from "../controllers/LikertScaleSnippetViewController.js";
import IndexedDbStorageProvider from "../storage/IndexedDbStorageProvider.js";
// ====================================================== //
// ==================== example code ==================== //
// ====================================================== //

// register event listeners for events on the EventBus
EventBus.addEventListener(SnippetView.EVENT_LIKERT_CLICKED, (event) => {
  // likert scale clicked
  console.log(event);
});

const lc = new LikertScaleSnippetViewController("11"),
  lcHtml = await lc.html();
document.body.appendChild(lcHtml);

/* setTimeout(() => {
  IndexedDbStorageProvider.getInstance().then((sp) => sp.closeDatabase());
}, 2000);
 */
