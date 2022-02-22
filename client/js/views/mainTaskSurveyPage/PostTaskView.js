import View from "../View.js";
import Event from "../../utils/Event.js";

// ====================================================== //
// ==================== PostTaskView ==================== //
// ====================================================== //

export default class PostTaskView extends View {
  //Demographic Events
  static EVENT_DEMOGRAPHIC_AGE = "EVENT_DEMOGRAPHIC_AGE";
  static EVENT_DEMOGRAPHIC_GENDER = "EVENT_DEMOGRAPHIC_GENDER";
  static EVENT_DEMOGRAPHIC_JOB = "EVENT_DEMOGRAPHIC_JOB";

  //CrediScore Events
  static EVENT_CREDISCORE_CREDIBILITY_HELPFUL =
    "EVENT_CREDISCORE_CREDIBILITY_HELPFUL";

  static EVENT_CREDISCORE_VISUALLY_UNDERSTANDABLE =
    "EVENT_CREDISCORE_VISUALLY_UNDERSTANDABLE";

  static EVENT_CREDISCORE_IS_CATEGORIES_ENOUGH =
    "EVENT_CREDISCORE_IS_CATEGORIES_ENOUGH";
  static EVENT_CREDISCORE_CATEGORIES_NOT_ENOUGH_BECAUSE =
    "EVENT_CREDISCORE_CATEGORIES_NOT_ENOUGH_BECAUSE";

  static EVENT_CREDISCORE_IS_CATEGORY_GOOD =
    "EVENT_CREDISCORE_IS_CATEGORY_GOOD";
  static EVENT_CREDISCORE_CATEGORY_NOT_GOOD =
    "EVENT_CREDISCORE_CATEGORY_NOT_GOOD";

  static EVENT_CREDISCORE_IS_COLOR_HELPFUL =
    "EVENT_CREDISCORE_IS_COLOR_HELPFUL";
  static EVENT_CREDISCORE_COLOR_NOT_HELPFUL =
    "EVENT_CREDISCORE_COLOR_NOT_HELPFUL";

  //VP Events
  static EVENT_VP_FIRST_NAME_ENTERED = "EVENT_VP_FIRST_NAME_ENTERED";
  static EVENT_VP_LAST_NAME_ENTERED = "EVENT_VP_LAST_NAME_ENTERED";
  static EVENT_VP_MATRIKELNUMMER_NAME_ENTERED =
    "EVENT_VP_MATRIKELNUMMER_NAME_ENTERED";

  //Input type base listeners

  onLikertScaleInputEntered = (event, eventName, view) => {
    this.notifyAll(
      new Event(eventName, view, {
        value: event.target.getAttribute("value"),
      })
    );
  };

  onInputFieldInputEntered = (event, eventName, view) => {
    this.notifyAll(
      new Event(eventName, view, {
        value: event.target.value,
      })
    );
  };

  _render() {
    this.$template = document
      .querySelector("#postTask")
      .content.cloneNode(true);
    this.$root = this.$template.querySelector(".tasks");

    this.initDemographics();
    this.initCrediScore();
    this.initVPStunden();

    if (this.data.CS_is_categories_enough_els === undefined) {
      this.hideTextCategoriesEnough();
    }
    if (this.data.CS_category_good_els === undefined) {
      this.hideTextCategoriesGood();
    }
    if (this.data.CS_color_helpful_els === undefined) {
      this.hideTextColorHelpful();
    }

    this.fillDataIn();

    return this.$root;
  }

  clearTextCategoriesEnough() {
    this.$CS_categories_not_enough.value = "";
  }

  clearTextCategoriesGood() {
    this.$CS_category_not_good.value = "";
  }

  clearTextColorHelpful() {
    this.$CS_color_not_helpful.value = "";
  }

  hideTextCategoriesEnough() {
    this.$root
      .querySelector("[data-question-id='Stufen_Ausreichend_NO']")
      .classList.add("hidden");
    this.$CS_categories_not_enough.classList.add("hidden");
  }

  showTextCategoriesEnough() {
    this.$root
      .querySelector("[data-question-id='Stufen_Ausreichend_NO']")
      .classList.remove("hidden");
    this.$CS_categories_not_enough.classList.remove("hidden");
  }

  hideTextCategoriesGood() {
    this.$root
      .querySelector("[data-question-id='Anzeige_Kategorien_Passend_NO']")
      .classList.add("hidden");
    this.$CS_category_not_good.classList.add("hidden");
  }

  showTextCategoriesGood() {
    this.$root
      .querySelector("[data-question-id='Anzeige_Kategorien_Passend_NO']")
      .classList.remove("hidden");
    this.$CS_category_not_good.classList.remove("hidden");
  }

  hideTextColorHelpful() {
    this.$root
      .querySelector("[data-question-id='Farbliche_Unterteilung_Hilfreich_NO']")
      .classList.add("hidden");
    this.$CS_color_not_helpful.classList.add("hidden");
  }

  showTextColorHelpful() {
    this.$root
      .querySelector("[data-question-id='Farbliche_Unterteilung_Hilfreich_NO']")
      .classList.remove("hidden");
    this.$CS_color_not_helpful.classList.remove("hidden");
  }

  //D_age, D_genderEls, D_job,
  //CS_categories_not_enough, CS_category_not_good, CS_color_not_helpful,
  //CS_helpful_els, CS_is_categories_enough_els, CS_visualUnderstandable_els, CS_color_helpful_els, CS_category_good_els
  fillDataIn = () => {
    //Demographics data
    //console.log(this.data);
    this.$D_age.value = this.data.D_age;
    this.checkLikert(this.data.D_genderEls, this.$D_genderEls);
    //console.log(this.$D_genderEls);
    this.$D_job.value = this.data.D_job ?? "";

    //CrediScore data
    this.$CS_categories_not_enough.value =
      this.data.CS_categories_not_enough ?? "";
    this.$CS_category_not_good.value = this.data.CS_category_not_good ?? "";
    this.$CS_color_not_helpful.value = this.data.CS_color_not_helpful ?? "";

    this.checkLikert(this.data.CS_helpful_els, this.$CS_helpful_els);
    this.checkLikert(
      this.data.CS_is_categories_enough_els,
      this.$CS_is_categories_enough_els
    );
    this.checkLikert(
      this.data.CS_visualUnderstandable_els,
      this.$CS_visualUnderstandable_els
    );
    this.checkLikert(
      this.data.CS_color_helpful_els,
      this.$CS_color_helpful_els
    );
    this.checkLikert(
      this.data.CS_category_good_els,
      this.$CS_category_good_els
    );
  };

  checkLikert(data, array) {
    for (let i = 0; i < array.length; i++) {
      if (i == data) {
        array[i].checked = true;
      }
    }
  }

  initDemographics() {
    this.$D_age = this.setValueEventListener(
      "Alter",
      PostTaskView.EVENT_DEMOGRAPHIC_AGE
    );
    this.$D_genderEls = this.setLikertEventListener(
      "Geschlecht",
      PostTaskView.EVENT_DEMOGRAPHIC_GENDER
    );
    this.$D_job = this.setValueEventListener(
      "Beruf",
      PostTaskView.EVENT_DEMOGRAPHIC_JOB
    );
  }

  initCrediScore() {
    this.$CS_helpful_els = this.setLikertEventListener(
      "Bewertung_Glaubwürdigkeit_Hilfreich",
      PostTaskView.EVENT_CREDISCORE_CREDIBILITY_HELPFUL
    );
    this.$CS_visualUnderstandable_els = this.setLikertEventListener(
      "Darstellung_Visuell_Einschätzung",
      PostTaskView.EVENT_CREDISCORE_VISUALLY_UNDERSTANDABLE
    );

    this.$CS_is_categories_enough_els = this.setLikertEventListener(
      "Stufen_Ausreichend_YES_NO",
      PostTaskView.EVENT_CREDISCORE_IS_CATEGORIES_ENOUGH
    );
    this.$CS_categories_not_enough = this.setValueEventListener(
      "Stufen_Ausreichend_NO",
      PostTaskView.EVENT_CREDISCORE_CATEGORIES_NOT_ENOUGH_BECAUSE
    );

    this.$CS_category_good_els = this.setLikertEventListener(
      "Anzeige_Kategorien_Passend_YES_NO",
      PostTaskView.EVENT_CREDISCORE_IS_CATEGORY_GOOD
    );
    this.$CS_category_not_good = this.setValueEventListener(
      "Anzeige_Kategorien_Passend_NO",
      PostTaskView.EVENT_CREDISCORE_CATEGORY_NOT_GOOD
    );

    this.$CS_color_helpful_els = this.setLikertEventListener(
      "Farbliche_Unterteilung_Hilfreich_YES_NO",
      PostTaskView.EVENT_CREDISCORE_IS_COLOR_HELPFUL
    );
    this.$CS_color_not_helpful = this.setValueEventListener(
      "Farbliche_Unterteilung_Hilfreich_NO",
      PostTaskView.EVENT_CREDISCORE_COLOR_NOT_HELPFUL
    );
  }

  initVPStunden() {
    this.$VP_Vorname = this.$root.querySelector("[name='Vorname']");
    this.$VP_Vorname.addEventListener("change", (e) =>
      this.onInputFieldInputEntered(
        e,
        PostTaskView.EVENT_VP_FIRST_NAME_ENTERED,
        this.$VP_Vorname
      )
    );

    this.$VP_Nachname = this.$root.querySelector("[name='Nachname']");
    this.$VP_Nachname.addEventListener("change", (e) =>
      this.onInputFieldInputEntered(
        e,
        PostTaskView.EVENT_VP_LAST_NAME_ENTERED,
        this.$VP_Nachname
      )
    );

    this.$VP_Matrikelnummer = this.$root.querySelector(
      "[name='Matrikelnummer']"
    );
    this.$VP_Matrikelnummer.addEventListener("change", (e) =>
      this.onInputFieldInputEntered(
        e,
        PostTaskView.EVENT_VP_MATRIKELNUMMER_NAME_ENTERED,
        this.$VP_Matrikelnummer
      )
    );
  }

  setValueEventListener(data_question_id, eventName) {
    //console.log(data_question_id, eventName);
    let element = this.$root
      .querySelector(`[data-question-id='${data_question_id}']`)
      .querySelector("input");
    element.addEventListener("change", (e) => {
      // console.log(e);
      this.onInputFieldInputEntered(e, eventName, element);
    });
    return element;
  }

  setLikertEventListener(data_question_id, eventName) {
    let elements = this.$root
      .querySelector(`[data-question-id='${data_question_id}']`)
      .querySelectorAll("input");
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener("change", (e) =>
        this.onLikertScaleInputEntered(e, eventName, elements[i])
      );
    }
    return elements;
  }
}
