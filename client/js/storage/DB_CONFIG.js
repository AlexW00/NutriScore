export default {
  dbName: "NS_DB",
  version: 2,
  objectStores: {
    preTask: {
      keyPath: {
        key: ["questionId"],
      },
      indexes: ["questionId"],
    },
    mainTask_Topic: {
      keyPath: {
        key: ["topicId"],
      },
      indexes: ["topicId", "snippetIds", "hasCrediScore", "preKnowledge"],
    },
    mainTask_Snippet: {
      keyPath: {
        key: ["snippetId"],
      },
      indexes: [
        "snippetId",
        "snippetTitle",
        "snippetText",
        "snippetCrediScore",
      ],
    },
    mainTask_SnippetRating: {
      keyPath: {
        key: ["snippetId"],
      },
      indexes: ["snippetId", "snippetRating"],
    },
    postTask: {
      keyPath: {
        key: ["questionId"],
      },
      indexes: ["questionId"],
    },
  },
};
