const { Client, Collection } = require("discord.js"),
    fs = require("fs"),
    client = new Client();

client.commands = new Collection();
client.aliases = new Collection();
client.categories = new fs.readdirSync('./src/commands');

["aliases", "commands"].forEach(x => client[x] = new Collection());
["commands", "events"].forEach(x => require(`./start/${x}`)(client))

client.on("ready", () => {
    console.log("Online: Bot")
})

client.login(process.env.TOKEN)

require("./server")(client)