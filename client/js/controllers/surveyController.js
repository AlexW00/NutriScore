// ##################################################################### //
// ########################## surveyController ######################### //
// ##################################################################### //

import EventBus from "../utils/EventBus.js";
import SnippetView from "../views/mainTaskSurveyPage/SnippetView.js";
import LikertScaleSnippetViewController from "../controllers/LikertScaleSnippetViewController.js";
import IndexedDbStorageProvider from "../storage/IndexedDbStorageProvider.js";
import SnippetViewController from "./SnippetViewController.js";
import TopicViewController from "./TopicViewController.js";
import SurveyViewController from "./SurveyViewController.js";
// ====================================================== //
// ==================== example code ==================== //
// ====================================================== //

// // register event listeners for events on the EventBus
// EventBus.addEventListener(SnippetView.EVENT_LIKERT_CLICKED, (event) => {
//   // likert scale clicked
//   //console.log(event);
// });

// const lc = new LikertScaleSnippetViewController("11"),
//   lcHtml = await lc.html();
// document.body.appendChild(lcHtml);

/* var TopicView = new TopicViewController("2"),
  topicViewHTML = await TopicView.html(); */

const surveyView = new SurveyViewController(),
  surveyViewHTML = await surveyView.html();

document.body.appendChild(surveyViewHTML);
//console.log("survey");

// var snippetTest = new SnippetViewController("11"),
//   snippetTestHTML = await snippetTest.html();
// document.body.appendChild(snippetTestHTML);

setTimeout(() => {
  IndexedDbStorageProvider.getInstance()
    .then((sp) => sp.exportData())
    .then((data) => {
      // console.log(data);
    });
}, 2000);
