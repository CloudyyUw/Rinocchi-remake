const mentionUser = require("../../../util/getUserFromMention"),
    Request = require("../../../util/api"),
    Shards = require("../../../util/sharding/getData"),
    { MessageAttachment } = require("discord.js");
module.exports = {
    name: "blur",
    aliases: ["blurimage"],
    run: async (client, message, args, locale) => {
        try {
            const user = mentionUser(client, args[0]) || await Shards.GetUserByID(client,args[0]) || message.author;

            function checkUrl(url) {
                return (url.match(/\.(jpeg|jpg|png)$/) !== null)
            }

            let Image;
            if (message.attachments.size > 0 == true) Image = message.attachments.first().attachment;
            else if (args[0] && checkUrl(args[0]) == true) Image = args[0];
            else Image = user.avatarURL({ dynamic: false, format: "png", size: 1024 });

            const link = await new Request("blur", `image=${Image}&amount=${args[1] ? isNaN(args[1]) ? 20 : args[1] : isNaN(args[0]) ? 20 : args[0]}`).get()
            const attachment = new MessageAttachment(link, "blur.png");

            message.inlineReply(attachment)
        } catch (e) {
            message.channel.send(locale("err:runErr", { user: `<@${message.author.id}>`, message: e.message }))
        }
    }
}