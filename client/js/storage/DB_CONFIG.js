export default {
  dbName: "NS_DB",
  version: 2.1,
  objectStores: {
    preTask: {
      key: "questionId",
      indexes: "questionId",
    },
    mainTask_Surveys: {
      key: "x",
      indexes: ["x", "surveyIds", "activeSurveyId"],
      dataMapping: () => {
        return {
          x: "mainTask_Surveys",
          surveyIds: ["preTask", "mainTask", "postTask"],
          activeSurveyId: "preTask",
        };
      },
    },
    mainTask_Topics: {
      key: "x",
      indexes: ["x", "topicIds", "activeTopicId"],
      dataMapping: (topics) => {
        return {
          x: "mainTask_Topics",
          topicIds: topics.map((topic) => topic.id),
          activeTopicId: topics[0].id,
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
      // dataMapping describes how the data from the server should be mapped on the table structure
      dataMapping: (topic) => {
        return {
          topicId: topic.id,
          snippetIds: topic.snippets.map((snippet) => snippet.docId),
          hasCrediScore: topic.hasCrediScore,
          preKnowledge: topic.preKnowledge,
          query: topic.query,
          isShowingPreknowledge: true,
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
      dataMapping: (snippet) => {
        return {
          snippetId: snippet.docId,
          snippetTitel: snippet.title,
          snippetText: snippet.text,
          snippetCrediScore: snippet.score,
          snippetURL: snippet.url,
        }; //TODO: URL FEHLT
      },
    },
    mainTask_SnippetRating: {
      key: "snippetId",
      indexes: ["snippetId", "snippetRating"],
      dataMapping: (snippet) => {
        return {
          snippetId: snippet.docId,
          snippetRating: -1, // user sets this
        };
      },
    },
    postTask: {
      key: "questionId",
      indexes: "questionId",
    },
  },
};
