import Controller from "./Controller.js";
import EventBus from "../utils/EventBus.js";
import Event from "../utils/Event.js";
import PreTaskView from "../views/mainTaskSurveyPage/PreTaskView.js";
import LikertScaleView from "../views/mainTaskSurveyPage/LikertScaleView.js";

export default class PreTaskViewController extends Controller {
    constructor(userId) {
        // we provide the object store name and the key
        super("preTask", userId);
    }

    _onCreateView(model) {
        const view = new PreTaskView({
            nutriScoreGlaubwuerdigkeitsRating: model.data.nutriScoreGlaubwuerdigkeitsRating,
            kenntNutri: model.data.kenntNutri,
        });

        view.addEventListener(
            PreTaskView.EVENT_NUTRISCORE_GLAUBWÜRDIGKEIT_RATING_CLICKED,
            (event) => {
                model.updateDataPoint("nutriScoreGlaubwuerdigkeitsRating", event.data.value);
                console.log(model);
                Controller.storageProvider.saveModel(model).then((didSucceed) => {
                    // save model to db
                    console.log(didSucceed);
                });
            }
        );

        view.addEventListener(
            PreTaskView.EVENT_KENNT_NUTRISCORE_CLICKED,
            (event) => {
                model.updateDataPoint("kenntNutri", event.data.value);
                console.log(model);
                Controller.storageProvider.saveModel(model).then((didSucceed) => {
                    // save model to db
                    EventBus.notifyAll(
                        new Event(LikertScaleView.EVENT_RESULT_LIKERT_CLICKED, undefined, { //TODO: wegen surveystart/maintask start beachten!
                            userId: this.key,
                        })
                    );
                    console.log(didSucceed);
                });
            }
        );
        return view;
    }
}