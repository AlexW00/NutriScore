export default {
  dbName: "NS_DB",
  version: 2.1,
  objectStores: {
    preTask: {
      key: "questionId",
      indexes: "questionId",
    },
    mainTask_Topic: {
      key: "topicId", // index thats used as key for identifying items
      indexes: ["topicId", "snippetIds", "hasCrediScore", "preKnowledge"], // the "rows" of the table
      // dataMapping describes how the data from the server should be mapped on the table structure
      dataMapping: (topic) => {
        return {
          topicId: topic.id,
          snippetIds: topic.snippets.map((snippet) => snippet.docId),
          hasCrediScore: topic.hasCrediScore,
          preKnowledge: topic.preKnowledge,
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
      ],
      dataMapping: (snippet) => {
        return {
          snippetId: snippet.docId,
          snippetTitel: snippet.title,
          snippetText: snippet.text,
          snippetCrediScore: snippet.score,
        };
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
