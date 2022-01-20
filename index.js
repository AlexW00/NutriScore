import { format } from "https://deno.land/std@0.91.0/datetime/mod.ts";
import pogo from "https://deno.land/x/pogo/main.ts";

// ##################################################################### //
// ############################### Server ############################## //
// ##################################################################### //

const webHookUrl = Deno.env.get("WEBHOOK_URL");
const server = pogo.server({ port: 8000 });

// ====================================================== //
// ======================= routes ======================= //
// ====================================================== //

// ~~~~~~~~~~~~ static routes ~~~~~~~~~~~~ //

// all static files in the client folder (css, js, images...)
server.router.get("/client/{file*}", (request, h) => {
  return h.directory("client");
});

// ~~~~~~~~~~~~ custom routes ~~~~~~~~~~~~ //

// start page
server.router.get("/", (request, h) => {
  return h.file("client/html/start.html");
});

// survey page
server.router.get("/survey", (request, h) => {
  return h.file("client/html/survey.html");
});

// ====================================================== //
// ==================== server setup ==================== //
// ====================================================== //

server.start();
console.log("Listening on http://localhost:" + 8000);

// ====================================================== //
// ================ legacy stuff (remove) =============== //
// ====================================================== //

function sendDiscordMessage() {
  return fetch(webHookUrl, requestOptions);
}

const webHookContent = {
  username: "Deno Webhook",
  content:
    "Sent from Deno playground at " + format(new Date(), "yyyy-MM-dd HH:mm:ss"),
};

const requestOptions = {
  method: "POST",
  mode: "cors", // no-cors, *cors, same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "same-origin", // include, *same-origin, omit
  headers: {
    "Content-Type": "application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  redirect: "follow", // manual, *follow, error
  referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  body: JSON.stringify(webHookContent),
};
