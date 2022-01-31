import View from "../View.js";
import Event from "../../utils/Event.js";

// ====================================================== //
// ===================== LikertScaleView ================ //
// ====================================================== //



export default class LikertScaleView extends View {

    static EVENT_RESULT_LIKERT_CLICKED = "EVENT_RESULT_LIKERT_CLICKED";

    // constructor: {id: "snippetId"}

    onRadioButtonClicked = (event) => {
        this.notifyAll(new Event(
            LikertScaleView.EVENT_RESULT_LIKERT_CLICKED,
            this, {
                value: event.target.getAttribute("value")
            }
        ));
    }

    _render() {
        this.$root = document.createElement("ul");
        this.$root.classList.add("likertscala");
        this.$items = [];

        this.$root.appendChild(this._createInfoElement("Sehr Unglaubwürdig"));

        for (let i = 0; i < 11; i++) {
            let $newRadio = document.createElement("input"),
                $liEl = document.createElement("li");
            $newRadio.setAttribute("type", "radio");
            $newRadio.setAttribute("value", i);
            $newRadio.setAttribute("name", this.data.snippetId);
            $newRadio.addEventListener("change", onRadioButtonClicked);
            $liEl.appendChild($newRadio);
            this.$items.push($liEl);
            this.$root.appendChild($liEl);
        }
        this.$root.appendChild(this._createInfoElement("Sehr Glaubwürdig"));

        return this.$root;
    }

    _createInfoElement(text) {
        const $info = document.createElement("li");
        $info.classList.add("likertscala-info");
        $info.innerText = text;
        return $info;
    }

}