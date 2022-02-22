import View from "../View.js";
import Event from "../../utils/Event.js";

// ====================================================== //
// ===================== WindowTooSmallView =============== //
// ====================================================== //

export default class WindowTooSmallView extends View {
  // constructor data: {crediScore: string/undefined}

  _render() {
    this.$root = document.createElement("div");
    this.$root.classList.add("solved-survey");
    // Show a thank you page for participants
    {
      //console.log(this.data.crediScore);
      this.$root.innerHTML = `<h2>Das Fenster ist zu klein</h2>
      <p>
      Bitte führen sie die Studie am PC durch, das Browserfenster ist zu klein.
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
