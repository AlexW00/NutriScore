// ##################################################################### //
// ########################## surveyController ######################### //
// ##################################################################### //

import EventBus from "../utils/EventBus.js";
import SnippetView from "../views/mainTaskSurveyPage/SnippetView.js";
import LikertScaleSnippetViewController from "../controllers/LikertScaleSnippetViewController.js";
import IndexedDbStorageProvider from "../storage/IndexedDbStorageProvider.js";
import SnippetViewController from "./SnippetViewController.js";
import TaskViewController from "./TaskViewController.js";
// ====================================================== //
// ==================== example code ==================== //
// ====================================================== //

// // register event listeners for events on the EventBus
// EventBus.addEventListener(SnippetView.EVENT_LIKERT_CLICKED, (event) => {
//   // likert scale clicked
//   console.log(event);
// });

// const lc = new LikertScaleSnippetViewController("11"),
//   lcHtml = await lc.html();
// document.body.appendChild(lcHtml);


var taskView = new TaskViewController("1"),
  taskViewHTML = await taskView.html();

taskView.togglePreknowledgeVisiblility();
taskView.toggleSnippetViewsVisiblility();

// var snippetTest = new SnippetViewController("11"),
//   snippetTestHTML = await snippetTest.html();
// document.body.appendChild(snippetTestHTML);

/* setTimeout(() => {
  IndexedDbStorageProvider.getInstance().then((sp) => sp.closeDatabase());
}, 2000);
 */