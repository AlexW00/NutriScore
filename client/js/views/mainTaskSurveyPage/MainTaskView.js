import View from "../View.js";
import Event from "../../utils/Event.js";

// ====================================================== //
// ===================== MainTaskView =================== //
// ====================================================== //

export default class MainTaskView extends View {

    // static EVENT_LIKERT_CLICKED = "EVENT_LIKERT_CLICKED";

    // onLikertScalaClicked = (event) => {
    //     this.notifyAll(new Event(
    //         SnippetView.EVENT_LIKERT_CLICKED,
    //         this, {
    //             value: event.value
    //         }
    //     ));
    // }

    _render() {

        return this.$root;
    }

}