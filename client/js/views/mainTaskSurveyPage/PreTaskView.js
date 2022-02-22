import View from "../View.js";
import Event from "../../utils/Event.js";

// ====================================================== //
// ===================== PreTaskView ==================== //
// ====================================================== //

export default class PreTaskView extends View {
  static EVENT_NUTRISCORE_GLAUBWÜRDIGKEIT_RATING_CLICKED =
    "EVENT_NS_glaubwürdig";
  static EVENT_KENNT_NUTRISCORE_CLICKED = "EVENT_NS_kennt";
  static EVENT_HIDE_NUTRISCORE_GLAUBWÜRDIGKEIT_RATING =
    "EVENT_HIDE_NS_glaubwürdig";
  static EVENT_SHOW_NUTRISCORE_GLAUBWÜRDIGKEIT_RATING =
    "EVENT_SHOW_NS_glaubwürdig";

  onNutriScoreGlaubwuerdigkeitsRatingClicked = (event) => {
    this.notifyAll(
      new Event(
        PreTaskView.EVENT_NUTRISCORE_GLAUBWÜRDIGKEIT_RATING_CLICKED,
        this,
        {
          value: event.target.getAttribute("value"),
        }
      )
    );
  };

  onKenntNutriscoreClicked = (event) => {
    if (event.target.value == 1) this.showNutriScoreGlaubwürdigkeitsRating();
    else this.hideNutriScoreGlaubwürdigkeitsRating();
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
    this.$NutriScoreGlaubwuerdigkeitsRatingInputEls =
      this.$root.querySelectorAll("[name='glaubwürdig']");
    for (
      let i = 0;
      i < this.$NutriScoreGlaubwuerdigkeitsRatingInputEls.length;
      i++
    ) {
      this.$NutriScoreGlaubwuerdigkeitsRatingInputEls[i].addEventListener(
        "click",
        this.onNutriScoreGlaubwuerdigkeitsRatingClicked
      );
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
    this.$kenntNutriscoreInputEls = this.$root.querySelectorAll(
      "input[name='NutriScore kennen']"
    );

    for (let i = 0; i < this.$kenntNutriscoreInputEls.length; i++) {
      this.$kenntNutriscoreInputEls[i].addEventListener(
        "click",
        this.onKenntNutriscoreClicked
      );
      if (i == this.data.kenntNutri) {
        this.$kenntNutriscoreInputEls[i].checked = true;
      }
      // mark checked
    }

    if (this.data.kenntNutri == 1) this.showNutriScoreGlaubwürdigkeitsRating();
    else this.hideNutriScoreGlaubwürdigkeitsRating();

    return this.$root;
  }

  toggleNutriScoreGlaubwürdigkeitsRating = () => {
    this.$nutriScoreGlaubwuerdigkeitsRating.classList.toggle("hidden");
  };

  hideNutriScoreGlaubwürdigkeitsRating = () => {
    this.$nutriScoreGlaubwuerdigkeitsRating.classList.add("hidden");
    // this.model.set("nutriScoreGlaubwuerdigkeitsRating", -1); // add to viewcontroller
    for (
      let i = 0;
      i < this.$NutriScoreGlaubwuerdigkeitsRatingInputEls.length;
      i++
    ) {
      this.$NutriScoreGlaubwuerdigkeitsRatingInputEls[i].checked = false;
    }

    this.notifyAll(
      new Event(
        PreTaskView.EVENT_HIDE_NUTRISCORE_GLAUBWÜRDIGKEIT_RATING,
        this,
        {}
      )
    );
  };

  showNutriScoreGlaubwürdigkeitsRating() {
    this.$nutriScoreGlaubwuerdigkeitsRating.classList.remove("hidden");
    this.notifyAll(
      new Event(
        PreTaskView.EVENT_SHOW_NUTRISCORE_GLAUBWÜRDIGKEIT_RATING,
        this,
        {}
      )
    );
  }
}
