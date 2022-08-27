const { client } = require("../index");
const { webhookClient } = require("../index");
client.on("ready", async () => {
  console.log(`${client.user.username} is now online`);
});
