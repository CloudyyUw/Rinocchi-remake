const { MessageEmbed } = require("discord.js"),
    shardData = require("../../../util/sharding/getData");

module.exports = {
    name: "emoji",
    aliases: ["emojis", "emojisearch", "searcheemoji"],
    run: async (client, message, args) => {
        if(!args[0]){
            
        }
        if(message.member.hasPermission("MANAGE_EMOJIS")){

        }
    }
}