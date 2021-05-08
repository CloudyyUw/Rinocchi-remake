const request = require("../../../util/getUser"),
    { MessageEmbed } = require("discord.js"),
    mention = require("../../../util/getUserFromMention"),
    ShardData = require("../../../util/sharding/getData");

module.exports = {
    name: "avatar",
    aliases: [],
    run: async (client, message, args) => {
        const user = mention(client, args[0]) || await ShardData.GetUserByID(client, args[0]) || await request.obj(args[0]) || message.author;
        const emb = new MessageEmbed()
            .setTitle(user.username)
            .setImage(await request.avatar(user.id, 1024))
        if (user == message.author) {
            emb.setDescription("Você não mencionou nenhum usuário ou ID, então imaginei que você queria o seu próprio avatar.\nTips: Você pode mencionar um usuário para pegar o avatar dele nesse servidor, ou um ID para pegar de qualquer servidor do Discord.")
            message.inlineReply(emb)
            return
        }
        message.inlineReply(emb)
    }
}