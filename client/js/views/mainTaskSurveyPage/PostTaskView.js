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
    static EVENT_CREDISCORE_CREDIBILITY_HELPFUL = "EVENT_CREDISCORE_CREDIBILITY_HELPFUL";

    static EVENT_CREDISCORE_VISUALLY_UNDERSTANDABLE = "EVENT_CREDISCORE_VISUALLY_UNDERSTANDABLE";

    static EVENT_CREDISCORE_IS_CATEGORIES_ENOUGH = "EVENT_CREDISCORE_IS_CATEGORIES_ENOUGH";
    static EVENT_CREDISCORE_CATEGORIES_NOT_ENOUGH_BECAUSE = "EVENT_CREDISCORE_CATEGORIES_NOT_ENOUGH_BECAUSE";

    static EVENT_CREDISCORE_IS_CATEGORY_GOOD = "EVENT_CREDISCORE_IS_CATEGORY_GOOD";
    static EVENT_CREDISCORE_CATEGORY_NOT_GOOD = "EVENT_CREDISCORE_CATEGORY_NOT_GOOD";

    static EVENT_CREDISCORE_IS_COLOR_HELPFUL = "EVENT_CREDISCORE_IS_COLOR_HELPFUL";
    static EVENT_CREDISCORE_COLOR_NOT_HELPFUL = "EVENT_CREDISCORE_COLOR_NOT_HELPFUL";


    //VP Events
    static EVENT_VP_FIRST_NAME_ENTERED = "EVENT_VP_FIRST_NAME_ENTERED";
    static EVENT_VP_LAST_NAME_ENTERED = "EVENT_VP_LAST_NAME_ENTERED";
    static EVENT_VP_MATRIKELNUMMER_NAME_ENTERED = "EVENT_VP_MATRIKELNUMMER_NAME_ENTERED";


    //NAVIGATION Events
    static EVENT_END_SURVEY_BUTTON_CLICKED = "EVENT_END_SURVEY_BUTTON_CLICKED";
    static EVENT_GO_BACK_BUTTON_CLICKED = "EVENT_LEFT_BUTTON_CLICKED";



    //Input type base listeners

    onLikertScaleInputEntered = (event, eventName, view) => {
        this.notifyAll(new Event(eventName, view, {
            value: event.target.getAttribute("value"),
        }));
    }

    onInputFieldInputEntered = (event, eventName, view) => {
        this.notifyAll(new Event(eventName, view, {
            value: event.target.value,
        }));
    }




    //Navigation
    onEndSurveyButtonClicked = (event) => {
        this.notifyAll(new Event(PostTaskView.EVENT_END_SURVEY_BUTTON_CLICKED, this, event));
    }

    onGoBackButtonClicked = (event) => {
        this.notifyAll(new Event(PostTaskView.EVENT_GO_BACK_BUTTON_CLICKED, this, event));
    }

    _render() {
        this.$root = document.querySelector("body");

        initNavigation.call(this);
        initDemographics.call(this);
        initCrediScore.call(this);
        initVPStunden.call(this);

        this.toggleTextCategoriesEnough();
        this.toggleTextCategoriesGood();
        this.toggleTextColorHelpful();

        this.toggleWarningMessage();

        return this.$root;
    }

    toggleWarningMessage() {
        this.$warning.classList.toggle("hidden");
    }

    toggleTextCategoriesEnough() {
        this.$CS_categories_not_enough.classList.toggle("hidden");
    }

    toggleTextCategoriesGood() {
        this.$CS_category_not_good.classList.toggle("hidden");
    }

    toggleTextColorHelpful() {
        this.$CS_color_not_helpful.classList.toggle("hidden");
    }
}

function initNavigation() {
    this.$leftButton = this.$root.querySelector(".button-prev");
    this.$rightButton = this.$root.querySelector(".button-next");
    this.$warning = this.$root.querySelector("warning");

    //Init Navigation Buttons
    this.$leftButton.addEventListener("click", this.onGoBackButtonClicked);
    this.$rightButton.addEventListener("click", this.onEndSurveyButtonClicked);
}

function initDemographics() {
    this.$D_age = setValueEventListener("Alter", PostTaskView.EVENT_DEMOGRAPHIC_AGE).call(this);
    this.$D_genderEls = setLikertEventListener("Geschlecht", PostTaskView.EVENT_DEMOGRAPHIC_GENDER).call(this);
    this.$D_job = setValueEventListener("Beruf", PostTaskView.EVENT_DEMOGRAPHIC_JOB).call(this);
}

function initCrediScore() {
    this.$CS_helpful_els = setLikertEventListener("Bewertung_Glaubwürdigkeit_Hilfreich", PostTaskView.EVENT_CREDISCORE_CREDIBILITY_HELPFUL).call(this);
    this.$CS_visualUnderstandable_els = setLikertEventListener("Darstellung_Visuell_Einschätzung", PostTaskView.EVENT_CREDISCORE_VISUALLY_UNDERSTANDABLE).call(this);

    this.$CS_is_categories_enough_els = setLikertEventListener("Stufen_Ausreichend_YES_NO", PostTaskView.EVENT_CREDISCORE_IS_CATEGORIES_ENOUGH).call(this);
    this.$CS_categories_not_enough = setValueEventListener("Stufen_Ausreichend_NO", PostTaskView.EVENT_CREDISCORE_CATEGORIES_NOT_ENOUGH_BECAUSE).call(this);

    this.$CS_category_good_els = setLikertEventListener("Anzeige_Kategorien_Passend_YES_NO", PostTaskView.EVENT_CREDISCORE_IS_CATEGORY_GOOD).call(this);
    this.$CS_category_not_good = setValueEventListener("Anzeige_Kategorien_Passend_NO", PostTaskView.EVENT_CREDISCORE_CATEGORY_NOT_GOOD).call(this);

    this.$CS_color_helpful_els = setLikertEventListener("Farbliche_Unterteilung_Hilfreich_YES_NO", PostTaskView.EVENT_CREDISCORE_IS_COLOR_HELPFUL).call(this);
    this.$CS_color_not_helpful = setValueEventListener("Farbliche_Unterteilung_Hilfreich_NO", PostTaskView.EVENT_CREDISCORE_COLOR_NOT_HELPFUL).call(this);
}

function initVPStunden() {
    this.$VP_Vorname = this.$root.querySelector("[name='Vorname']");
    this.$VP_Vorname.addEventListener("change", (e) => this.onInputFieldInputEntered(e, PostTaskView.EVENT_VP_FIRST_NAME_ENTERED, this.$VP_Vorname));

    this.$VP_Nachname = this.$root.querySelector("[name='Nachname']");
    this.$VP_Nachname.addEventListener("change", (e) => this.onInputFieldInputEntered(e, PostTaskView.EVENT_VP_LAST_NAME_ENTERED, this.$VP_Nachname));

    this.$VP_Matrikelnummer = this.$root.querySelector("[name='Matrikelnummer']");
    this.$VP_Matrikelnummer.addEventListener("change", (e) => this.onInputFieldInputEntered(e, PostTaskView.EVENT_VP_MATRIKELNUMMER_NAME_ENTERED, this.$VP_Matrikelnummer))
}

function setValueEventListener(data_question_id, eventName) {
    let element = this.$root.querySelector(`[data-question-id='${data_question_id}'] > input`);
    element.addEventListener("change", (e) => this.onInputFieldInputEntered(e, eventName, element));
    return element;
}

function setLikertEventListener(data_question_id, eventName) {
    let elements = this.$root.querySelectorAll(`[data-question-id='${data_question_id}'] > input`);
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("change", (e) => this.onLikertScaleInputEntered(e, eventName, elements[i]));
    }
    return elements;
}