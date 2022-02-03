// import CONFIG from "../../utils/Config.js";
// import View from "../View.js";
// import Event from "../../utils/Event.js";

// var testDataObj = {
//     id: "101_snippet2_crediscoreA",
//     crediScore: "A",
//     url: "testURL",
//     title: "testTitle",
//     description: "testDescription", //was info
// };

// function onRadioButtonClicked(event) {
//     this.notifyAll(new Event(CONFIG.EVENT_RESULT_LIKERT_CLICKED, this.$root, {
//         value: event.target.getAttribute("value"),
//         id: this.data.id
//     }));
// }

// class ResultView extends View {
//     constructor(data) {
//         super(data);
//     }

//     _render() {
//         let clone = document.querySelector("#snippet").content.cloneNode(true),
//             snippet = clone.querySelector(".snippet"),
//             radioInputs = clone.querySelectorAll("input");
//         if (this.data.crediScore === undefined) {
//             clone.querySelector(".crediscore").classList.add("nonvisible");
//         } else {
//             clone.querySelector(`.class-${this.data.crediScore}`).classList.add("selected");
//         }
//         snippet.querySelector(".url").innerHTML = this.data.url;
//         snippet.querySelector(".title").innerHTML = this.data.title;
//         snippet.querySelector(".info").innerHTML = this.data.info;
//         clone.querySelector(".result").setAttribute("data-id", this.data.id);
//         for (let i = 0; i < radioInputs.length; i++) {
//             radioInputs[i].addEventListener("change", onRadioButtonClicked.bind(this));
//             radioInputs[i].setAttribute("name", this.data.id);
//         }
//         this.$root = clone;
//         return this.$root; // return it
//     }
// }

// export default ResultView;