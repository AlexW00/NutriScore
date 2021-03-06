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
    this.$template = document
      .querySelector("#crediscore")
      .content.cloneNode(true);
    this.$root = this.$template.querySelector(".crediscore");
    //console.log(this.$root);
    if (this.data.crediScore === false) {
      this.$root.classList.add("nonvisible");
    } else {
      //console.log(this.data.crediScore);
      this.$root
        .querySelector(`.class-${this.data.crediScore}`)
        .classList.add("selected");
    }

    this.$tooltip = document.createElement("div");
    this.$align = this.$root.querySelector(".crediscore-align");
    this.$align.addEventListener("mouseover", () => {
      this.$tooltip.style.position = "absolute";
      this.$tooltip.innerText =
        "Der CrediScore ist ein computergenerierter Wert, zur Einsch??tzung der Glaubw??rdigkeit eines Suchergebnisses.";
      this.$tooltip.classList.add("toolTip");

      let y = this.$align.getBoundingClientRect().bottom,
        x = this.$align.getBoundingClientRect().left;
      this.$root.querySelector(".crediscore-align").appendChild(this.$tooltip);
      this.$tooltip.style.left = x + "px";
      this.$tooltip.style.top = y + window.pageYOffset + "px";

      this.$root.append(this.$tooltip);
    });
    this.$align.addEventListener("mouseout", () => {
      this.$root.removeChild(this.$tooltip);
    });
    return this.$root;
  }
}
