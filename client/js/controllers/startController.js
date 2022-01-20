import ExampleView from "../views/examples/exampleView.js";

// ##################################################################### //
// ########################## startController ########################## //
// ##################################################################### //

// ~~~~~~~~ example showcase code ~~~~~~~~ //

const exampleView = new ExampleView({ buttonValue: 1 }); // create a new view
exampleView.addEventListener("buttonClicked", (event) => {
  const view = event.view; // retrieve the view instance that triggered the event

  // usually interaction with the Model would be done here
  const newButtonValue = view.data.buttonValue + 1;

  // update the view
  view.data.buttonValue = newButtonValue;
  view.$button.innerHTML = newButtonValue;
});

document.body.appendChild(exampleView.html()); // append the new view to the body
