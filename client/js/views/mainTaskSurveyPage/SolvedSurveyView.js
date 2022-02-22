import View from "../View.js";
import Event from "../../utils/Event.js";

// ====================================================== //
// ===================== SolvedSurveyView =============== //
// ====================================================== //

export default class SolvedSurveyView extends View {
  // constructor data: {crediScore: string/undefined}

  _render() {
    this.$root = document.createElement("div");
    this.$root.classList.add("solved-survey");
    // Show a thank you page for participants
    {
      //console.log(this.data.crediScore);
      this.$root.innerHTML = `<h2>Vielen Dank für Ihre Zeit!</h2>
      <p>
      Vielen Dank für Ihre Teilnahme an dieser Studie.
      </p>
      <p>
      Sie können auf folgenden Button klicken um zur Startseite zurückzugelangen:
      </p>
      <button class="return-to-main-page">Zurück zur Startseite</button>`;
      this.$root
        .querySelector(".return-to-main-page")
        .addEventListener("click", () => {
          window.location.href = "../../";
        });
    }
    return this.$root;
  }
}
