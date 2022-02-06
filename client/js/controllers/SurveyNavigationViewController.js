import Controller from "./Controller.js";
import NavigationView from "../views/mainTaskSurveyPage/NavigationView.js";
import EventBus from "../utils/EventBus.js";

export default class SurveyNavigationViewController extends Controller {
    constructor() {
        super(undefined, undefined);
    }

    _onCreateView(model) {
        const view = new NavigationView({
            left: "Zurück",
            right: "Weiter",
            warningMessage: "* Sie müssen alle Ergebnisse bewerten bevor sie die nächste Seite aufrufen können!",
        });

        view.addEventListener(
            NavigationView.EVENT_RIGHT_BUTTON_CLICKED,
            (event) => {
                console.log("right button");
                EventBus.notifyAll(event);
            }
        );

        view.addEventListener(
            NavigationView.EVENT_LEFT_BUTTON_CLICKED,
            (event) => {
                console.log("left button");
                EventBus.notifyAll(event);
            }
        );

        this.$view = view;
        return view;
    }

    toggleWarningMessage() {
        this.$view.toggleWarningMessage();
    }
}