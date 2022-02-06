import ExampleView from "../views/examples/ExampleView.js";
import Model from "../models/Model.js";
import IndexedDbStorageProvider from "../storage/IndexedDbStorageProvider.js";

// ##################################################################### //
// ########################## startController ########################## //
// ##################################################################### //

// ~~~~~~~~ example showcase code ~~~~~~~~ //

// const exampleView = new ExampleView({ buttonValue: 1 }); // create a new view
// exampleView.addEventListener("buttonClicked", (event) => {
//   const view = event.view; // retrieve the view instance that triggered the event

//   // usually interaction with the Model would be done here
//   const newButtonValue = view.data.buttonValue + 1;

//   // update the view
//   view.data.buttonValue = newButtonValue;
//   view.$button.innerHTML = newButtonValue;
// });

// document.body.appendChild(exampleView.html()); // append the new view to the body

// Storage db testing

const startSurveyButton = document.querySelector(".button-next");
startSurveyButton.addEventListener("click", onStartSurveyClicked);

function onStartSurveyClicked() {
  window.location = window.location + "survey";
}