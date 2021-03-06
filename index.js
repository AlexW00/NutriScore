import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { fileExists, getContentType } from "./server/utils/utilFunctions.js";
import shuffleAsLatinSquare from "./server/utils/latinSquare.js";
import jsonToCSV from "./server/utils/jsonToCsv.js";

// ##################################################################### //
// ############################### Server ############################## //
// ##################################################################### //

const VP_WEBHOOK_URL = initEnvVariable("VP_WEBHOOK_URL"),
  SURVEY_WEBHOOK_URL = initEnvVariable("SURVEY_WEBHOOK_URL");
let nextNsIndexIsJust = false;

console.log("Starting server...");

async function handleRequest(request) {
  const { pathname } = new URL(request.url);

  // ~~~ handle different request methods ~~ //

  switch (request.method) {
    case "GET":
      return await handleGetRequest(request, pathname);
    case "POST":
      return await handlePostRequest(request, pathname);
  }
}

serve(handleRequest);

// ====================================================== //
// ================= GET request routes ================= //
// ====================================================== //

// ~~~~~~~~~~~~~~~ routing ~~~~~~~~~~~~~~~ //

const handleGetRequest = async (request, pathname) => {
  switch (pathname) {
    case "/":
      return await serveStartPage();
    case "/survey":
      return await serveSurveyPage();
    case "/getFakeData":
      return await serveFakeData();
    case "/getData":
      return await serveData();
    // other custom routes go here
    default: {
      return await serveStaticFile(pathname);
    }
  }
};

// ~~~~~~~~~~~~~~~~ routes ~~~~~~~~~~~~~~~ //

const serveStartPage = async () => {
  const file = await Deno.readFile("./client/html/start.html");
  return new Response(file, {
    headers: {
      "content-type": "text/html",
    },
  });
};

const serveSurveyPage = async () => {
  const file = await Deno.readFile("./client/html/survey.html");
  return new Response(file, {
    headers: {
      "content-type": "text/html",
    },
  });
};

const serveFakeData = async () => {
  const topic1 = await Deno.readFile("./server/data/fakeData/1.json"),
    topic2 = await Deno.readFile("./server/data/fakeData/2.json");
  const decoder = new TextDecoder("utf-8");
  const r = {
    topics: [
      JSON.parse(decoder.decode(topic1)),
      JSON.parse(decoder.decode(topic2)),
    ],
    uuid: crypto.randomUUID(),
  };
  return new Response(JSON.stringify(r), {
    headers: {
      "content-type": "application/json",
    },
  });
};

const serveData = async () => {
  const filenames = [];
  for await (const dirEntry of Deno.readDir("./server/data/data")) {
    if (dirEntry.isFile) filenames.push(dirEntry.name);
  }
  const files = await Promise.all(
    filenames.map(
      async (filename) => await Deno.readFile(`./server/data/data/${filename}`)
    )
  );
  const shuffledFiles = shuffleAsLatinSquare(files, nextNsIndexIsJust);
  const decoder = new TextDecoder("utf-8");
  const r = {
    topics: shuffledFiles.map((file, i) => {
      let topic = JSON.parse(decoder.decode(file));

      if (nextNsIndexIsJust) {
        if (i % 2 == 0)
          for (const snippet of topic.snippets) snippet.score = false;
      } else {
        if (i % 2 == 1)
          for (const snippet of topic.snippets) snippet.score = false;
      }

      topic.hasCrediScore = i % 2 == 0;
      return topic;
    }),
    uuid: crypto.randomUUID(),
  };

  nextNsIndexIsJust = !nextNsIndexIsJust;

  return new Response(JSON.stringify(r), {
    headers: {
      "content-type": "application/json",
    },
  });
};

const serveStaticFile = async (pathname) => {
  const filePath = "./" + pathname.substring(1);
  // check if the file exists
  if (await fileExists(filePath)) {
    const file = await Deno.readFile(filePath);
    return new Response(file, {
      headers: {
        "content-type": getContentType(filePath),
      },
    });
  } else {
    return new Response("File not found", {
      status: 404,
      headers: { "content-type": "text/plain" },
    });
  }
};

// ====================================================== //
// ================= POST request routes ================ //
// ====================================================== //

// ~~~~~~~~~~~~~~~ routing ~~~~~~~~~~~~~~~ //

const handlePostRequest = async (request, pathname) => {
  // TODO: handle post requests

  switch (pathname) {
    case "/postSurveyData":
      return await postSurveyData(request);
    case "/postVpData":
      return await postVpData(request);

    // other custom routes go here
    default: {
      return new Response("", {
        status: 404,
        headers: { "content-type": "text/plain" },
      });
    }
  }
};

// ~~~~~~~~~~~~~~~~ routes ~~~~~~~~~~~~~~~ //

const postSurveyData = async (request) => {
  try {
    const body = await request.text(),
      json = JSON.parse(body),
      csv = await jsonToCSV(json);

    sendSurveyDataToDiscord({ csv });
    return new Response("", {
      status: 200,
      headers: { "content-type": "text/plain" },
    });
  } catch (error) {
    return new Response("", {
      status: 500,
      headers: { "content-type": "text/plain" },
    });
  }
};

const postVpData = async (request) => {
  try {
    const body = await request.text(),
      json = JSON.parse(body);

    sendVpDataToDiscord(json);

    return new Response("", {
      status: 200,
      headers: { "content-type": "text/plain" },
    });
  } catch (error) {
    return new Response("", {
      status: 500,
      headers: { "content-type": "text/plain" },
    });
  }
};

// helper

function initEnvVariable(name) {
  if (!Deno.env.get(name)) {
    // console.error(`Environment variable ${name} not set!!!`);
  }
  return Deno.env.get(name) || "";
}

const sendSurveyDataToDiscord = async (data) => {
  try {
    await fetch(
      SURVEY_WEBHOOK_URL,
      getDiscordWebhookRequestOptions(
        data,
        "application/json",
        "SurveyData_Bot"
      )
    ).then((res) => {
      if (res.status < 300 && res.status >= 200)
        console.log(`Sent survey data to Discord!`);
      else console.log("res.status faulty", JSON.stringify(data));
    });
  } catch (error) {
    console.error("error", error, data);
  }
};

const sendVpDataToDiscord = async (data) => {
  try {
    await fetch(
      VP_WEBHOOK_URL,
      getDiscordWebhookRequestOptions(data, "application/json", "VP_Bot")
    ).then((res) => {
      if (res.status < 300 && res.status >= 200)
        console.log(`Sent VP data to Discord!`);
      else console.log("res.status faulty", JSON.stringify(data));
    });
  } catch (error) {
    console.error("error", error, data);
  }
};

function getDiscordWebhookRequestOptions(webHookContent, contentType, botName) {
  return {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": contentType,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: getDiscordWebhookBody(webHookContent, botName),
  };
}

function getDiscordWebhookBody(webHookContent, botName) {
  return JSON.stringify({
    username: botName,
    avatar_url:
      botName === "VP_Bot"
        ? "https://i.imgur.com/R66g1Pe.jpg"
        : "http://www.rw-designer.com/icon-image/21557-128x128x32.png",
    embeds: generateDiscordEmbed(webHookContent, botName),
  });
}

function generateDiscordEmbed(webHookContent, botName) {
  return [
    {
      title: `???? New ${botName === "VP_Bot" ? "VP" : "Survey"} data`,
      fields: generateDiscordEmbedFields(webHookContent),
      color: botName === "VP_Bot" ? 0x00ff00 : 0x3399ff,
    },
  ];
}

function generateDiscordEmbedFields(webHookContent) {
  return Object.keys(webHookContent).map((key) => {
    return {
      name: key,
      value: webHookContent[key],
    };
  });
}
