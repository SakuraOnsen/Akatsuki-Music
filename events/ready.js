const { client } = require("../index");
const { webhookClient } = require("../index")
client.on("ready", () => {
    //webhookClient.send({ content: `test` })
    console.log(`Akatsuki is online.`)
    console.log('Currently Self Hosted.')
}
);
