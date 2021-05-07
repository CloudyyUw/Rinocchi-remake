const { MessageEmbed } = require("discord.js"),
    shardData = require("../../../util/sharding/getData");

module.exports = {
    name: "emoji",
    aliases: ["emojis", "emojisearch", "searcheemoji"],
    run: async (client, message, args) => {
        if (!args[0]) {
            message.channel.send(`${message.author} | É necessário informar os parâmetros de pesquisa, informe um argumento.`);
            return;
        }
        const emojiObj = await shardData.GetEmojiByName(client, args[0]);
        const emb = new MessageEmbed()
            .setTitle(`Emoji: ${args[0]}`)
            .setImage(emojiObj.url)
        if (message.member.hasPermission("MANAGE_EMOJIS")) {
            message.inlineReply(emb).then(async msg => {
                msg.react("➕");

                const filter = (reaction, user) =>
                    reaction.emoji.name === "➕" && user.id === message.author.id;
                const collector = msg.createReactionCollector(filter, {
                    max: 1,
                    time: 120000
                });

                collector.on("collect", x => {
                    try {
                        message.guild.emojis.create(emojiObj.url, emojiObj.name).then(emoji => {
                            message.channel.send(`${message.author} | Emoji (${emoji}) criado!`)
                        })
                    } catch (e) {
                        message.inlineReply(`Não foi possível criar o emoji, verifique se o limite de emojis foi atingido ou as minhas permissões.`)
                    }
                })
            })
            return
        }
        message.inlineReply(emb);
    }
}