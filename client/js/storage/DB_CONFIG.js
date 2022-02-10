export default {
  dbName: "NS_DB",
  version: 2.3,
  objectStores: {
    preTask: {
      key: "x",
      indexes: [
        "x",
        "userId",
        "kenntNutri",
        "nutriScoreGlaubwuerdigkeitsRating",
      ],
      importDataMapping: (uuid) => {
        return {
          x: "preTask",
          userId: uuid,
          kenntNutri: false,
          nutriScoreGlaubwuerdigkeitsRating: -1,
        };
      },
      exportDataMapping: (data) => {
        return {
          userId: data.userId,
          kenntNutri: data.kenntNutri,
          nutriScoreGlaubwuerdigkeitsRating:
            data.nutriScoreGlaubwuerdigkeitsRating,
        };
      },
    },
    mainTask_Surveys: {
      key: "x",
      indexes: ["x", "surveyIds", "activeSurveyId"], //TODO: add "userId"
      importDataMapping: () => {
        return {
          x: "mainTask_Surveys",
          surveyIds: ["preTask", "mainTask", "postTask"],
          activeSurveyId: "preTask",
        };
      },
      exportDataMapping: () => {
        return null;
      },
    },
    mainTask_Topics: {
      key: "x",
      indexes: ["x", "topicIds", "activeTopicId"],
      importDataMapping: (topics) => {
        return {
          x: "mainTask_Topics",
          topicIds: topics.map((topic) => topic.id),
          activeTopicId: topics[0].id,
        };
      },
      exportDataMapping: (data) => {
        return {
          topicIds: data.topicIds,
        };
      },
    },
    mainTask_Topic: {
      key: "topicId", // index thats used as key for identifying items
      indexes: [
        "topicId",
        "snippetIds",
        "hasCrediScore",
        "preKnowledge",
        "query",
        "isShowingPreknowledge",
      ], // the "rows" of the table //TODO: question fehlt
      // importDataMapping describes how the data from the server should be mapped on the table structure
      importDataMapping: (topic) => {
        return {
          topicId: topic.id,
          snippetIds: topic.snippets.map((snippet) => snippet.docId),
          hasCrediScore: topic.hasCrediScore,
          preKnowledge: topic.preKnowledge,
          query: topic.query,
          isShowingPreknowledge: true,
        };
      },
      exportDataMapping: (data) => {
        return {
          topicId: data.topicId,
          hasCrediScore: data.hasCrediScore,
          preKnowledge: data.preKnowledge,
        };
      },
    },
    mainTask_Snippet: {
      key: "snippetId",
      indexes: [
        "snippetId",
        "snippetTitle",
        "snippetText",
        "snippetCrediScore",
        "snippetURL",
      ],
      importDataMapping: (snippet) => {
        return {
          snippetId: snippet.docId,
          snippetTitel: snippet.title,
          snippetText: snippet.description,
          snippetCrediScore: snippet.score,
          snippetURL: snippet.url,
        }; //TODO: URL FEHLT
      },
      exportDataMapping: () => {
        return null;
      },
    },
    mainTask_SnippetRating: {
      key: "snippetId",
      indexes: ["snippetId", "snippetRating"],
      importDataMapping: (snippet) => {
        return {
          snippetId: snippet.docId,
          snippetRating: -1, // user sets this
        };
      },
      exportDataMapping: (data) => {
        return {
          snippetId: data.snippetId,
          snippetRating: data.snippetRating,
        };
      },
    },
    postTask: {
      key: "x",
      indexes: [
        "x",
        "D_age",
        "D_genderEls",
        "D_job",
        "CS_categories_not_enough",
        "CS_color_not_helpful",
        "CS_helpful_els",
        "CS_is_categories_enough_els",
        "CS_visualUnderstandable_els",
        "CS_color_helpful_els",
        "CS_category_good_els",
      ],
      importDataMapping: () => {
        return {
          x: "postTask",
          D_age: undefined,
          D_genderEls: undefined,
          D_job: undefined,
          CS_categories_not_enough: undefined,
          CS_color_not_helpful: undefined,
          CS_helpful_els: undefined,
          CS_is_categories_enough_els: undefined,
          CS_visualUnderstandable_els: undefined,
          CS_color_helpful_els: undefined,
          CS_category_good_els: undefined,
        };
      },
      exportDataMapping: (data) => {
        return {
          D_age: data.D_age,
          D_genderEls: data.D_genderEls,
          D_job: data.D_job,
          CS_categories_not_enough: data.CS_categories_not_enough,
          CS_color_not_helpful: data.CS_color_not_helpful,
          CS_helpful_els: data.CS_helpful_els,
          CS_is_categories_enough_els: data.CS_is_categories_enough_els,
          CS_visualUnderstandable_els: data.CS_visualUnderstandable_els,
          CS_color_helpful_els: data.CS_color_helpful_els,
          CS_category_good_els: data.CS_category_good_els,
        };
      },
    },
  },
};
