import { readCSV } from "https://deno.land/x/csv/mod.ts";

async function getSnippetMapping() {
  var snippetMapping = {};

  const f = await Deno.open(
    "server/data/dataFormatting/bm25_cut_10_score_descr_EXTENDED.csv"
  );

  let rowCounter = 0;
  for await (const row of readCSV(f)) {
    let oldId, newId;
    let i = 0;
    for await (const cell of row) {
      if (rowCounter !== 0) {
        if (i === 1) {
          oldId = cell;
        }
        if (i === 7) {
          newId = cell.replace("\r", "");
        }
        i = i + 1;
      }
    }
    i = 0;
    if (newId !== "nan" && rowCounter !== 0 && newId != undefined) {
      snippetMapping[oldId] = newId;
    }
    rowCounter = rowCounter + 1;
  }

  f.close();

  return snippetMapping;
}

var snippetMapping = null;

export default async function jsonToCSV(json) {
  if (snippetMapping === null) snippetMapping = await getSnippetMapping();

  let result = "";

  result = add(result, json.preTask);

  let topics = json.mainTask_Topic,
    snippets = {};

  for (let i = 0; i < topics.length; i++) {
    let snippetIds = topics[i].snippetIds;
    for (let j = 0; j < snippetIds.length; j++) {
      let newId = snippetMapping[snippetIds[j]];
      let rating = getRatingForID(json.mainTask_SnippetRating, snippetIds[j]);
      if (topics[i].hasCrediScore) {
        newId = "CS_" + newId;
      }
      snippets[newId] = rating;
    }
  }

  for (let i = 0; i < 60; i++) {
    if (snippets["S_" + i] === undefined) {
      snippets["S_" + i] = "nan";
    }
  }

  for (let i = 0; i < 60; i++) {
    if (snippets["CS_S_" + i] === undefined) {
      snippets["CS_S_" + i] = "nan";
    }
  }

  for (let i = 0; i < 60; i++) {
    result = result + snippets["S_" + i] + "," + snippets["CS_S_" + i] + ",";
  }

  //pre_knowledge_102,pre_knowledge_105,pre_knowledge_114,pre_knowledge_122,pre_knowledge_128,pre_knowledge_143
  let preKnowledge = {};
  for (let i = 0; i < topics.length; i++) {
    let topicID = topics[i].topicId;
    let preKnowledgeRating = topics[i].preKnowledge;
    preKnowledge["pre_knowledge_" + topicID] = preKnowledgeRating;
  }

  let preKnowledgeReihenfolge = ["102", "105", "114", "122", "128", "143"];
  for (let i = 0; i < preKnowledgeReihenfolge.length; i++) {
    console.log(preKnowledgeReihenfolge[i]);
    result =
      result +
      preKnowledge["pre_knowledge_" + preKnowledgeReihenfolge[i]] +
      ",";
  }

  //postTsk_DEMOGRAPHIC_AGE,postTsk_DEMOGRAPHIC_GENDER,postTsk_DEMOGRAPHIC_JOB,
  result = result + json.postTask.D_age + ",";
  result = result + json.postTask.D_genderEls + ",";
  result = result + json.postTask.D_job + ",";

  //postTsk_CREDISCORE_CREDIBILITY_HELPFUL,postTsk_CREDISCORE_VISUALLY_UNDERSTANDABLE,postTsk_CREDISCORE_IS_CATEGORIES_ENOUGH,
  result = result + json.postTask.CS_helpful_els + ",";
  result = result + json.postTask.CS_visualUnderstandable_els + ",";
  result = result + json.postTask.CS_is_categories_enough_els + ",";

  //postTsk_CREDISCORE_CATEGORIES_NOT_ENOUGH_BECAUSE,postTsk_CREDISCORE_IS_CATEGORY_GOOD,postTsk_CREDISCORE_CATEGORY_NOT_GOOD,postTsk_CREDISCORE_IS_COLOR_HELPFUL,postTsk_CREDISCORE_COLOR_NOT_HELPFUL
  result = result + json.postTask.CS_categories_not_enough + ",";
  result = result + json.postTask.CS_category_good_els + ",";
  result = result + json.postTask.CS_category_not_good + ",";
  result = result + json.postTask.CS_color_helpful_els + ",";
  result = result + json.postTask.CS_color_not_helpful;
  return result;
}

function getRatingForID(array, id) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].snippetId === id) {
      return array[i].snippetRating;
    }
  }
}

function add(string, obj) {
  let text = string;
  let keys = Object.keys(obj);
  console.log(keys);
  for (let i = 0; i < keys.length; i++) {
    text = text + "," + obj[keys[i]];
  }
  if (string.length === 0) {
    text = text.substring(1);
  }
  return text + ",";
}
