import View from "../View.js";
import Event from "../../utils/Event.js";

// ====================================================== //
// ===================== CrediScoreView ================= //
// ====================================================== //

{
  // <!-- CrediScore nonvisible? -->
  // <span class="crediscore">
  //     <div class="crediscore-align">
  //         <span class="crediscore-name">
  //             CrediScore
  //         </span>
  //         <span class="crediscore-class">
  //             <!-- Set selected CrediScore Class -->
  //             <ul>
  //                 <li class="class-A">
  //                     A
  //                 </li>
  //                 <li class="class-B">
  //                     B
  //                 </li>
  //                 <li class="class-C">
  //                     C
  //                 </li>
  //                 <li class="class-D">
  //                     D
  //                 </li>
  //                 <li class="class-E">
  //                     E
  //                 </li>
  //             </ul>
  //         </span>
  //     </div>
  // </span>
  // if (this.data.crediScore === undefined) {
  //     clone.querySelector(".crediscore").classList.add("nonvisible");
  // } else {
  //     clone.querySelector(`.class-${this.data.crediScore}`).classList.add("selected");
  // }
}

export default class CrediScoreView extends View {
  // constructor data: {crediScore: string/undefined}

  _render() {
    this.$root = document.querySelector("#crediscore").cloneNode(true);
    if (this.data.crediScore === undefined) {
      this.$root.classList.add("nonvisible");
    } else {
      this.$root
        .querySelector(`.class-${this.data.crediScore}`)
        .classList.add("selected");
    }
    return this.$root;
  }
}