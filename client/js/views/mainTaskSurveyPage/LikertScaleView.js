import View from "../View.js";
import Event from "../../utils/Event.js";

// ====================================================== //
// ===================== LikertScaleView ================ //
// ====================================================== //

//TODO: left and right text 

var data = {
    id: "snippetId",
    leftText: "Sehr unglaubwürdig", //WICHTIG DIESER TEXT
    rightText: "Sehr glaubwürdig",
};

export default class LikertScaleView extends View {
    static EVENT_RESULT_LIKERT_CLICKED = "EVENT_RESULT_LIKERT_CLICKED";

    // constructor: {snippetId: "snippetId"}

    onRadioButtonClicked = (event) => {
        this.notifyAll(
            new Event(LikertScaleView.EVENT_RESULT_LIKERT_CLICKED, this, {
                value: event.target.getAttribute("value"),
            })
        );
    };

    _render() {
        this.$root = document.createElement("ul");
        this.$root.classList.add("likertscala");
        this.$items = [];

        this.$root.appendChild(this._createInfoElement(this.data.leftText));

        for (let i = 0; i < 11; i++) {
            let $newRadio = document.createElement("input"),
                $liEl = document.createElement("li");
            $newRadio.setAttribute("type", "radio");
            $newRadio.setAttribute("value", i);
            $newRadio.setAttribute("name", this.data.id);
            $newRadio.addEventListener("change", this.onRadioButtonClicked);
            $liEl.appendChild($newRadio);
            this.$items.push($liEl);
            this.$root.appendChild($liEl);
        }
        this.$root.appendChild(this._createInfoElement(this.data.rightText));

        return this.$root;
    }

    _createInfoElement(text) {
        const $info = document.createElement("li");
        $info.classList.add("likertscala-info");
        $info.innerText = text;
        return $info;
    }
}