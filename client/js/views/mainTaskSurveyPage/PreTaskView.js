import View from "../View.js";
import Event from "../../utils/Event.js";

// ====================================================== //
// ===================== PreTaskView ==================== //
// ====================================================== //

export default class PreTaskView extends View {
  static EVENT_NUTRISCORE_GLAUBWÜRDIGKEIT_RATING_CLICKED =
    "EVENT_NS_glaubwürdig";
  static EVENT_KENNT_NUTRISCORE_CLICKED = "EVENT_NS_kennt";

  onNutriScoreGlaubwuerdigkeitsRatingClicked = (event) => {
    this.notifyAll(
      new Event(
        PreTaskView.EVENT_NUTRISCORE_GLAUBWÜRDIGKEIT_RATING_CLICKED,
        this, {
          value: event.target.getAttribute("value"),
        }
      )
    );
  };

  onKenntNutriscoreClicked = (event) => {
    this.notifyAll(
      new Event(PreTaskView.EVENT_KENNT_NUTRISCORE_CLICKED, this, {
        value: event.target.getAttribute("value"),
      })
    );
  };

  _render() {
    this.$template = document.querySelector("#preTask").content.cloneNode(true);
    this.$root = this.$template.querySelector(".tasks");

    //Init: Wie glaubwürdig finden Sie den NutriScore?
    this.$NutriScoreGlaubwuerdigkeitsRatingInputEls = document.querySelectorAll("[name='glaubwürdig']");
    for (let i = 0; i < this.$NutriScoreGlaubwuerdigkeitsRatingInputEls.length; i++) {
      this.$NutriScoreGlaubwuerdigkeitsRatingInputEls[i].addEventListener("change", this.onNutriScoreGlaubwuerdigkeitsRatingClicked);
      if (i == this.data.nutriScoreGlaubwuerdigkeitsRating) {
        this.$NutriScoreGlaubwuerdigkeitsRatingInputEls[i].checked = true;
        // mark checked
      }
    }

    //set invisible
    this.$nutriScoreGlaubwuerdigkeitsRating = this.$root.querySelector(
      "[data-question-id='Nutriscore_Glaubwürdigkeits_Rating']"
    );

    //Init: Kennen Sie den NutriScore aus der Lebensmittelbranche?
    this.$kenntNutriscoreInputEls = document.querySelectorAll(
      "[name='NutriScore kennen']"
    );
    for (let i = 0; i < this.$kenntNutriscoreInputEls.length; i++) {
      this.$kenntNutriscoreInputEls[i].addEventListener("change", this.onKenntNutriscoreClicked);
      if (i == this.data.kenntNutri) {
        this.$kenntNutriscoreInputEls[i].checked = true;
        this.toggleNutriScoreGlaubwürdigkeitsRating(); //show instantly
        // mark checked
      }
    }

    this.toggleNutriScoreGlaubwürdigkeitsRating(); //hide if no answer yet
    return this.$root;
  }

  toggleNutriScoreGlaubwürdigkeitsRating() {
    this.$nutriScoreGlaubwuerdigkeitsRating.classList.toggle("hidden");
  }
}