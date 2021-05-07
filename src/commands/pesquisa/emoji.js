const { MessageEmbed } = require("discord.js"),
    shardData = require("../../../util/sharding/getData");

module.exports = {
    name: "emoji",
    aliases: ["emojis", "emojisearch", "searcheemoji"],
    run: async (client, message, args) => {
        if(!args[0]){
            message.channel.send(`${message.author} | É necessário informar os parâmetros de pesquisa, informe um argumento.`);
            return;
        }
        const emojiObj = await shardData.GetEmojiByName(client, args[0]);
        if(message.member.hasPermission("MANAGE_EMOJIS")){
            const emb = new MessageEmbed()
            .setTitle(`Emoji: ${args[0]}`)
        }
    }
}