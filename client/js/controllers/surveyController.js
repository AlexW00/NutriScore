// ##################################################################### //
// ########################## surveyController ######################### //
// ##################################################################### //

import EventBus from "../utils/EventBus.js";
import SnippetView from "../views/mainTaskSurveyPage/SnippetView.js";
import LikertScaleSnippetViewController from "../controllers/LikertScaleSnippetViewController.js";
import Model from "../models/Model.js";
import IndexedDbStorageProvider from "../storage/IndexedDbStorageProvider.js";
// ====================================================== //
// ==================== example code ==================== //
// ====================================================== //

const sp = IndexedDbStorageProvider;
await sp.openDB();

await sp.addItem("mainTask_SnippetRating", {
  snippetId: "1",
  snippetRating: "4",
});

// register event listeners for events on the EventBus
EventBus.addEventListener(SnippetView.EVENT_LIKERT_CLICKED, (event) => {
  // likert scale clicked
  console.log(event);
});

const sn = new SnippetView({
  id: "ddd",
  url: "dsadsad",
  title: "title",
  info: "info",
});

document.body.appendChild(sn.html());

const lc = new LikertScaleSnippetViewController(sp, "1"),
  lcHtml = await lc.html();
document.body.appendChild(lcHtml);
