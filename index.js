import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { fileExists, getContentType } from "./server/utilFunctions.js";

// ##################################################################### //
// ############################### Server ############################## //
// ##################################################################### //

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

console.log("Listening on http://localhost:8000");
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
  };
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
  return await new Response("", {
    status: 404,
    headers: { "content-type": "text/plain" },
  });
};

// ~~~~~~~~~~~~~~~~ routes ~~~~~~~~~~~~~~~ //

// TODO: implement custom routes if necessary
