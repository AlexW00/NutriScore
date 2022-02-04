import View from "../View.js";
import Event from "../../utils/Event.js";

// ====================================================== //
// ===================== PreTaskView ==================== //
// ====================================================== //

export default class PreTaskView extends View {

    static EVENT_RIGHT_BUTTON_CLICKED = "EVENT_RIGHT_BUTTON_CLICKED";
    static EVENT_LEFT_BUTTON_CLICKED = "EVENT_LEFT_BUTTON_CLICKED";
    static EVENT_NUTRISCORE_GLAUBWÜRDIGKEIT_RATING_CLICKED = "EVENT_NS_glaubwürdig";
    static EVENT_KENNT_NUTRISCORE_CLICKED = "EVENT_NS_kennt";

    onLeftButtonClicked = (event) => {
        this.notifyAll(new Event(PreTaskView.EVENT_LEFT_BUTTON_CLICKED, this, event));
    }

    onRightButtonClicked = (event) => {
        this.notifyAll(new Event(PreTaskView.EVENT_RIGHT_BUTTON_CLICKED, this, event));
    }

    onNutriScoreGlaubwuerdigkeitsRatingClicked = (event) => {
        this.notifyAll(new Event(PreTaskView.EVENT_NUTRISCORE_GLAUBWÜRDIGKEIT_RATING_CLICKED, this, {
            value: event.target.getAttribute("value"),
        }));
    }

    onKenntNutriscoreClicked = (event) => {
        this.notifyAll(new Event(PreTaskView.EVENT_KENNT_NUTRISCORE_CLICKED, this, {
            value: event.target.getAttribute("value"),
        }));
    }

    _render() {
        this.$root = document.querySelector("body");
        this.$leftButton = this.$root.querySelector(".button-prev");
        this.$rightButton = this.$root.querySelector(".button-next");
        this.$warning = this.$root.querySelector("warning");

        //Init Navigation Buttons
        this.$leftButton.addEventListener("click", this.onLeftButtonClicked);
        this.$rightButton.addEventListener("click", this.onRightButtonClicked);
        this.toggleWarningMessage();

        //Init: Wie glaubwürdig finden Sie den NutriScore?
        this.$NutriScoreGlaubwuerdigkeitsRatingInputEls = document.querySelectorAll("[name='glaubwürdig']");
        for (let i = 0; i < this.$NutriScoreGlaubwuerdigkeitsRatingInputEls.length; i++) {
            this.$NutriScoreGlaubwuerdigkeitsRatingInputEls[i].addEventListener("change", this.onNutriScoreGlaubwuerdigkeitsRatingClicked);
        }

        //set invisible
        this.$nutriScoreGlaubwuerdigkeitsRating = this.$root.querySelector("[data-question-id='Nutriscore_Glaubwürdigkeits_Rating']");


        //Init: Kennen Sie den NutriScore aus der Lebensmittelbranche?
        this.$kenntNutriscoreInputEls = document.querySelectorAll("[name='NutriScore kennen']");
        for (let i = 0; i < this.$kenntNutriscoreInputEls.length; i++) {
            this.$kenntNutriscoreInputEls[i].addEventListener("change", this.onKenntNutriscoreClicked);
        }

        return this.$root;
    }

    toggleNutriScoreGlaubwürdigkeitsRating() {
        this.$nutriScoreGlaubwuerdigkeitsRating.classList.toggle("hidden");
    }

    toggleWarningMessage() {
        this.$warning.classList.toggle("hidden");
    }
}