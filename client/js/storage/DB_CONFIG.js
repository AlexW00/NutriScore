export default {
  dbName: "NS_DB",
  version: 2,
  objectStores: {
    preTask: {
      keyPath: {
        keys: ["questionId"]
      },
      indexes: ["questionId"]
    },
    mainTask_Topic: {
      keyPath: {
        keys: ["topicId"]
      },
      indexes: ["topicId", "snippetIds", "hasCrediScore", "preKnowledge"]
    },
    mainTask_Snippet: {
      keyPath: {
        keys: ["snippetId"]
      },
      indexes: [
        "snippetId",
        "snippetTitle",
        "snippetText",
        "snippetCrediScore"
      ]
    },
    mainTask_SnippetRating: {
      keyPath: {
        keys: ["snippetId"]
      },
      indexes: ["snippetId", "snippetRating"]
    },
    postTask: {
      keyPath: {
        keys: ["questionId"]
      },
      indexes: ["questionId"]
    }

  }

}