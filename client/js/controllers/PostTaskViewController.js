import Controller from "./Controller.js";
import EventBus from "../utils/EventBus.js";
import Event from "../utils/Event.js";
import LikertScaleView from "../views/mainTaskSurveyPage/LikertScaleView.js";
import PostTaskView from "../views/mainTaskSurveyPage/PostTaskView.js";
import SurveyViewController from "./SurveyViewController.js";

export default class PostTaskViewController extends Controller {
  constructor() {
    // we provide the object store name and the key
    super("postTask", "postTask");
  }

  _onCreateView(model) {
    //console.log(model);
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

    view.html();

    EventBus.addEventListener(SurveyViewController.EVENT_SURVEY_LOADED, (e) => {
      if (e.data.activeSurveyId === "postTask") {
        this.checkButton();
      }
    });

    EventBus.addEventListener(
      SurveyViewController.EVENT_POST_TASK_DISPLAYED,
      (e) => {
        this.checkButton();
      }
    );

    if (
      model.data.CS_is_categories_enough_els !== undefined &&
      model.data.CS_is_categories_enough_els !== "1"
    ) {
      view.showTextCategoriesEnough();
    } else {
      view.hideTextCategoriesEnough();
    }

    if (
      model.data.CS_category_good_els !== undefined &&
      model.data.CS_category_good_els !== "1"
    ) {
      console.log(model.data.CS_category_good_els);
      view.showTextCategoriesGood();
    } else {
      view.hideTextCategoriesGood();
    }

    if (
      model.data.CS_color_helpful_els !== undefined &&
      model.data.CS_color_helpful_els !== "1"
    ) {
      view.showTextColorHelpful();
    } else {
      view.hideTextColorHelpful();
    }

    //Demographics
    view.addEventListener(PostTaskView.EVENT_DEMOGRAPHIC_AGE, (event) => {
      if (event.data.value > 99 || event.data.value < 7) {
        view.$D_age.value = "";
        return;
      }
      model.updateDataPoint("D_age", event.data.value);
      //console.log(model);
      Controller.storageProvider.saveModel(model).then((didSucceed) => {
        //console.log(didSucceed);
        this.checkButton();
      });
    });

    view.addEventListener(PostTaskView.EVENT_DEMOGRAPHIC_GENDER, (event) => {
      model.updateDataPoint("D_genderEls", event.data.value);
      //console.log(model);
      Controller.storageProvider.saveModel(model).then((didSucceed) => {
        //console.log(didSucceed);
        this.checkButton();
      });
    });

    view.addEventListener(PostTaskView.EVENT_DEMOGRAPHIC_JOB, (event) => {
      model.updateDataPoint("D_job", event.data.value);
      //console.log(model);
      Controller.storageProvider.saveModel(model).then((didSucceed) => {
        //console.log(didSucceed);
        this.checkButton();
      });
    });

    //CrediScore
    view.addEventListener(
      PostTaskView.EVENT_CREDISCORE_CATEGORIES_NOT_ENOUGH_BECAUSE,
      (event) => {
        model.updateDataPoint("CS_categories_not_enough", event.data.value);

        // console.log(model);
        Controller.storageProvider.saveModel(model).then((didSucceed) => {
          this.checkButton();
        });
      }
    );

    view.addEventListener(
      PostTaskView.EVENT_CREDISCORE_CATEGORY_NOT_GOOD,
      (event) => {
        model.updateDataPoint("CS_category_not_good", event.data.value);
        //console.log(model);
        Controller.storageProvider.saveModel(model).then((didSucceed) => {
          this.checkButton();
        });
      }
    );

    view.addEventListener(
      PostTaskView.EVENT_CREDISCORE_COLOR_NOT_HELPFUL,
      (event) => {
        model.updateDataPoint("CS_color_not_helpful", event.data.value);
        //console.log(model);
        Controller.storageProvider.saveModel(model).then((didSucceed) => {
          this.checkButton();
        });
      }
    );

    view.addEventListener(
      PostTaskView.EVENT_CREDISCORE_CREDIBILITY_HELPFUL,
      (event) => {
        model.updateDataPoint("CS_helpful_els", event.data.value);
        //console.log(model);
        Controller.storageProvider.saveModel(model).then((didSucceed) => {
          //console.log(didSucceed);
          this.checkButton();
        });
      }
    );

    view.addEventListener(
      PostTaskView.EVENT_CREDISCORE_IS_CATEGORIES_ENOUGH,
      (event) => {
        model.updateDataPoint("CS_is_categories_enough_els", event.data.value);
        // console.log(event.data.value);
        if (event.data.value === "0") {
          // console.log("toggle categories enough");
          view.showTextCategoriesEnough();
        } else {
          view.hideTextCategoriesEnough();
          view.clearTextCategoriesEnough();
          model.updateDataPoint("CS_categories_not_enough", undefined);
        }
        //console.log(model);
        Controller.storageProvider.saveModel(model).then((didSucceed) => {
          //console.log(didSucceed);
          this.checkButton();
        });
      }
    );

    view.addEventListener(
      PostTaskView.EVENT_CREDISCORE_VISUALLY_UNDERSTANDABLE,
      (event) => {
        model.updateDataPoint("CS_visualUnderstandable_els", event.data.value);
        //console.log(model);
        Controller.storageProvider.saveModel(model).then((didSucceed) => {
          //console.log(didSucceed);
          this.checkButton();
        });
      }
    );

    view.addEventListener(
      PostTaskView.EVENT_CREDISCORE_IS_COLOR_HELPFUL,
      (event) => {
        model.updateDataPoint("CS_color_helpful_els", event.data.value);
        // console.log(event.data.value);
        if (event.data.value === "0") {
          view.showTextColorHelpful();
        } else {
          view.hideTextColorHelpful();
          view.clearTextColorHelpful();
          model.updateDataPoint("CS_color_not_helpful", undefined);
        }
        //console.log(model);
        Controller.storageProvider.saveModel(model).then((didSucceed) => {
          //console.log(didSucceed);
          this.checkButton();
        });
      }
    );

    view.addEventListener(
      PostTaskView.EVENT_CREDISCORE_IS_CATEGORY_GOOD,
      (event) => {
        model.updateDataPoint("CS_category_good_els", event.data.value);
        // console.log(event.data.value);
        if (event.data.value === "0") {
          // console.log("toggle CategoriesGood");
          view.showTextCategoriesGood();
        } else {
          view.hideTextCategoriesGood();
          view.clearTextCategoriesGood();
          model.updateDataPoint("CS_category_not_good", undefined);
        }
        //console.log(model);
        Controller.storageProvider.saveModel(model).then((didSucceed) => {
          //console.log(didSucceed);
          this.checkButton();
        });
      }
    );

    //VP Stunden

    return view;
  }

  didAnswerAllQuestions = async () => {
    let model = await Controller.storageProvider.getItem(
      "postTask",
      "postTask"
    );
    // console.log(model);
    let showButton = true;

    const dataToCheck = [
      model.D_age,
      model.D_genderEls,
      model.D_job,
      model.CS_helpful_els,
      model.CS_is_categories_enough_els,
      model.CS_visualUnderstandable_els,
      model.CS_color_helpful_els,
      model.CS_category_good_els,
    ];

    console.log(dataToCheck);
    for (let i = 0; i < dataToCheck.length; i++) {
      if (
        dataToCheck[i] === undefined ||
        dataToCheck[i] === "" ||
        dataToCheck[i] === "nan"
      ) {
        showButton = false;
      }
    }
    return showButton;
  };

  checkButton = () => {
    this.didAnswerAllQuestions().then((result) => {
      // console.log(result);
      if (result) {
        EventBus.notifyAll(
          new Event(
            SurveyViewController.EVENT_ACTIVATE_NEXT_BUTTON,
            undefined,
            undefined
          )
        );
      } else {
        EventBus.notifyAll(
          new Event(
            SurveyViewController.EVENT_DEACTIVATE_NEXT_BUTTON,
            undefined,
            undefined
          )
        );
      }
    });
  };

  getVpInfo = () => {
    const vorname = this.view.$VP_Vorname.value,
      nachname = this.view.$VP_Nachname.value,
      matrikelnummer = this.view.$VP_Matrikelnummer.value;

    return {
      vorname,
      nachname,
      matrikelnummer,
    };
  };
}
