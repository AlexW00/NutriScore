import Controller from "./Controller.js";
import EventBus from "../utils/EventBus.js";
import Event from "../utils/Event.js";
import LikertScaleView from "../views/mainTaskSurveyPage/LikertScaleView.js";
import PostTaskView from "../views/mainTaskSurveyPage/PostTaskView.js";

export default class PostTaskViewController extends Controller {
    constructor(userId) {
        // we provide the object store name and the key
        super("postTask", userId);
    }

    _onCreateView(model) {
        const view = new PostTaskView({
            D_age: model.data.D_age,
            D_genderEls: model.data.D_genderEls,
            D_job: model.data.D_job,

            CS_categories_not_enough: model.data.CS_categories_not_enough,
            CS_category_not_good: model.data.CS_category_not_good,
            CS_color_not_helpful: model.data.CS_color_not_helpful,

            CS_helpful_els: model.data.CS_helpful_els,
            CS_is_categories_enough_els: model.data.CS_is_categories_enough_els,
            CS_visualUnderstandable_els: model.data.CS_visualUnderstandable_els,
            CS_color_helpful_els: model.data.CS_color_helpful_els,
            CS_category_good_els: model.data.CS_category_good_els,
        });

        //Demographics
        view.addEventListener(
            PostTaskView.EVENT_DEMOGRAPHIC_AGE,
            (event) => {
                model.updateDataPoint("D_age", event.data.value);
                console.log(model);
                Controller.storageProvider.saveModel(model).then((didSucceed) => {
                    console.log(didSucceed);
                });
            }
        );

        view.addEventListener(
            PostTaskView.EVENT_DEMOGRAPHIC_GENDER,
            (event) => {
                model.updateDataPoint("D_genderEls", event.data.value);
                console.log(model);
                Controller.storageProvider.saveModel(model).then((didSucceed) => {
                    console.log(didSucceed);
                });
            }
        );

        view.addEventListener(
            PostTaskView.EVENT_DEMOGRAPHIC_JOB,
            (event) => {
                model.updateDataPoint("D_job", event.data.value);
                console.log(model);
                Controller.storageProvider.saveModel(model).then((didSucceed) => {
                    console.log(didSucceed);
                });
            }
        );


        //CrediScore
        view.addEventListener(
            PostTaskView.EVENT_CREDISCORE_CATEGORIES_NOT_ENOUGH_BECAUSE,
            (event) => {
                model.updateDataPoint("CS_categories_not_enough", event.data.value);
                console.log(model);
                Controller.storageProvider.saveModel(model).then((didSucceed) => {
                    console.log(didSucceed);
                });
            }
        );

        view.addEventListener(
            PostTaskView.EVENT_CREDISCORE_CATEGORY_NOT_GOOD,
            (event) => {
                model.updateDataPoint("CS_category_not_good", event.data.value);
                console.log(model);
                Controller.storageProvider.saveModel(model).then((didSucceed) => {
                    console.log(didSucceed);
                });
            }
        );

        view.addEventListener(
            PostTaskView.EVENT_CREDISCORE_COLOR_NOT_HELPFUL,
            (event) => {
                model.updateDataPoint("CS_color_not_helpful", event.data.value);
                console.log(model);
                Controller.storageProvider.saveModel(model).then((didSucceed) => {
                    console.log(didSucceed);
                });
            }
        );

        view.addEventListener(
            PostTaskView.EVENT_CREDISCORE_CREDIBILITY_HELPFUL,
            (event) => {
                model.updateDataPoint("CS_helpful_els", event.data.value);
                console.log(model);
                Controller.storageProvider.saveModel(model).then((didSucceed) => {
                    console.log(didSucceed);
                });
            }
        );

        view.addEventListener(
            PostTaskView.EVENT_CREDISCORE_IS_CATEGORIES_ENOUGH,
            (event) => {
                model.updateDataPoint("CS_is_categories_enough_els", event.data.value);
                console.log(model);
                Controller.storageProvider.saveModel(model).then((didSucceed) => {
                    console.log(didSucceed);
                });
            }
        );

        view.addEventListener(
            PostTaskView.EVENT_CREDISCORE_VISUALLY_UNDERSTANDABLE,
            (event) => {
                model.updateDataPoint("CS_visualUnderstandable_els", event.data.value);
                console.log(model);
                Controller.storageProvider.saveModel(model).then((didSucceed) => {
                    console.log(didSucceed);
                });
            }
        );

        view.addEventListener(
            PostTaskView.EVENT_CREDISCORE_IS_COLOR_HELPFUL,
            (event) => {
                model.updateDataPoint("CS_color_helpful_els", event.data.value);
                console.log(model);
                Controller.storageProvider.saveModel(model).then((didSucceed) => {
                    console.log(didSucceed);
                });
            }
        );

        view.addEventListener(
            PostTaskView.EVENT_CREDISCORE_IS_CATEGORY_GOOD,
            (event) => {
                model.updateDataPoint("CS_category_good_els", event.data.value);
                console.log(model);
                Controller.storageProvider.saveModel(model).then((didSucceed) => {
                    console.log(didSucceed);
                });
            }
        );


        //VP Stunden

        return view;
    }
}