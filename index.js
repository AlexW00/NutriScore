import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { format } from "https://deno.land/std@0.91.0/datetime/mod.ts";

async function handler(req) {
  sendDiscordMessage();
  console.log("New visitor");
  const f = await Deno.readFile("./client/index.html");
  return new Response(f);
}

function sendDiscordMessage() {
  return fetch(webHookUrl, requestOptions);
}

const webHookUrl =
  "https://discord.com/api/webhooks/930004096222638100/keH8NfAHHtLOEvS1YUQJwMS_mUAhN7xGNO5mc2VXCMHYJigk4M27MJNUfrRXXLDb5cuN";

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
  body: JSON.stringify(webHookContent), // body data type must match "Content-Type" header
};

console.log("Listening on http://localhost:8000");
await serve(handler);
