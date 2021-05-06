const { MessageEmbed } = require("discord.js"),
    db = require("../../../util/database");
module.exports = {
    name: "setprefix",
    aliases: ["prefix", "newprefix"],
    run: async (client, message, args, database, prefixo) => {
        if (!message.member.hasPermission("MANAGE_GUILD")) {
            message.channel.send(`${message.author} | Para que você possa alterar o prefixo, é necessário possuir a permissão \`GERENCIAR SERVIDOR\``)
            return
        }
        if (!args[0] || args[0].length > 3 || isNaN(args[0]) == false) {
            message.channel.send(`${message.author} | Você está utilizando os argumentos da forma errada, é necessário informar o novo prefixo, ele deve ter o comprimento máximo de 3 caracteres e não pode ser um número.`);
            return;
        }
        if (prefixo.value && prefixo.default == true) {
            db.run("INSERT INTO prefix (guild_id, prefix) VALUES (?, ?)", [message.guild.id, args[0]], function (err, result) {
                if (err) {
                    message.channel.send(`${message.author} | ocorreu um erro inesperado, por favor tente novamente. Código de erro: \`${err.message}\``)
                    return;
                }
                const embed = new MessageEmbed()
                    .setTitle("Prefixo alterado")
                    .setColor("GREEN")
                    .setDescription(`O prefixo foi alterado com êxito!`)
                    .addField("Prefixo anterior:", `\`${prefixo.value}\``, true)
                    .addField("Novo prefixo", `\`${args[0]}\``, true)

                message.channel.send(message.author, embed)
            })
            return
        }
        db.run("UPDATE prefix SET prefix = COALESCE(?,prefix) WHERE guild_id = ?", [args[0], message.guild.id], function (err, result) {
            if (err) {
                message.channel.send(`${message.author} | ocorreu um erro inesperado, por favor tente novamente. Código de erro: \`${err.message}\``)
                return;
            }
            const embed = new MessageEmbed()
                .setTitle("Prefixo alterado")
                .setColor("GREEN")
                .setDescription(`O prefixo foi alterado com êxito!`)
                .addField("Prefixo anterior:", `\`${prefixo}\``, true)
                .addField("Novo prefixo", `\`${args[0]}\``, true)

            message.channel.send(message.author, embed)
        })
    }
}