const { Client, Collection, APIMessage } = require("discord.js"),
    fs = require("fs"),
    client = new Client(),
    Locale = require("../util/languages");

client.commands = new Collection();
client.aliases = new Collection();
client.categories = new fs.readdirSync('./src/commands');
const language = new Locale();
language.start();
client.languages = language;

["aliases", "commands"].forEach(x => client[x] = new Collection());
["commands", "events"].forEach(x => require(`./start/${x}`)(client))

var slash = [];
const files_slash = fs.readdirSync("./src/slash").filter((x) => x.endsWith(".js"));


client.on("ready", async () => {
    console.log("Online: Bot");
    // slash commands
    for (const files of files_slash) {
        const file = require(`./slash/${files}`);
        slash.push(file)
        await client.api.applications(client.user.id).guilds('825091907843653672').commands.post({ data: file.data })
    }
    client.ws.on('INTERACTION_CREATE', async (i) => {
        var command = slash.find(x => x.data.name === i.data.name.toLowerCase())
        if (command) command.run(client, send, i)
    });
    async function send(interaction, content) {
        return client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: await msg(interaction, content),
            },
        });
    }
    async function msg(interaction, content) {
        const apiMessage = await APIMessage.create(client.channels.resolve(interaction.channel_id), content)
            .resolveData().resolveFiles();

        return { ...apiMessage.data, files: apiMessage.files };
    }
});

client.login(process.env.TOKEN)

require("./server")(client)