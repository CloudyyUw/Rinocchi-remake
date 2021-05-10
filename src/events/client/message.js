const db = require("../../../util/database"),
    Firebase = require("../../../util/FirebaseConnection"),
    database = Firebase.database(),
    ms = require("../../../util/parse-ms"),
    { MessageEmbed } = require("discord.js");
require("../../../util/inlineReply");

module.exports = async (client, message) => {
    if (message.author.bot) return;
    if (message.webhookID) return;
    if (message.channel.type == "dm") return;
    // cache
    if (!message.member) {
        await message.guild.members.fetch(message.author.id);
    }
    // BlackList
    const Gdb = await database.ref(`Blacklist/guild/${message.guild.id}`).once('value')
    let gBanned;
    if (Gdb.val() == null) gBanned = false;
    else gBanned = Gdb.val().ban;
    if (gBanned == true) {
        const g = await client.guilds.cache.get(message.guild.id);
        g.leave().catch(e => {
            console.log(e)
        })
        return;
    }
    const Udb = await database.ref(`Blacklist/user/${message.author.id}`).once("value");
    let UBanned;
    if (Udb.val() == null) UBanned = false;
    else UBanned = Udb.val().ban;
    if (UBanned == true) return;
    // --
    db.get("SELECT prefix FROM prefix WHERE guild_id = ?", [message.guild.id], async function (err, row) {
        if (err) {
            message.reply(`houve um erro inesperado, tente novamente. Código de erro: \`${err.message}\``)
            return;
        }
        var prefixo;
        if (!row) {
            prefixo = { default: true, value: "r?" }
            //metion prefix
            const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefixo.value)})\\s*`);
            if (!prefixRegex.test(message.content)) return;
            const [, matchedPrefix] = message.content.match(prefixRegex);
            const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
            //--
            // cooldown
            const cooldown = 5000;
            const Cdb = await database.ref(`Cooldown/Command/${message.author.id}`).once('value');
            var lastUse;
            if (Cdb.val() == null) lastUse = null;
            else lastUse = Cdb.val().time;
            if (lastUse !== null && cooldown - (Date.now() - lastUse) > 0) {
                const timeObj = ms(cooldown - (Date.now() - lastUse));
                const emb = new MessageEmbed()
                    .setColor('RED')
                    .setDescription(`Aguarde \`${timeObj.seconds}\` segundos para executar um comando novamente.`)
                message.channel.send(message.author, emb)
                return;
            }
            //--
            const cmd = args.shift().toLowerCase();
            if (cmd.length == 0) {
                if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) {
                    message.inlineReply(`Meu prefixo neste servidor é \`${prefixo.value}\`, use o comando **cmds** para a lista de comandos`);
                    return;
                }
                return;
            }
            var command = client.commands.get(cmd);
            if (!command) command = client.commands.get(client.aliases.get(cmd));
            if (command) command.run(client, message, args, database, prefixo);
            if (!command) {
                const emb = new MessageEmbed()
                    .setColor('RED')
                    .setDescription(`Comando \`${cmd}\` não encontrado.`)
                message.channel.send(message.author, emb)
                return;
            }
            database.ref(`Cooldown/Command/${message.author.id}`).set({
                time: Date.now()
            })
        } else {
            prefixo = row.prefix;
            //metion prefix
            const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefixo)})\\s*`);
            if (!prefixRegex.test(message.content)) return;
            const [, matchedPrefix] = message.content.match(prefixRegex);
            const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
            //--
            // cooldown
            const cooldown = 3000;
            const Cdb = await database.ref(`Cooldown/Command/${message.author.id}`).once('value');
            var lastUse;
            if (Cdb.val() == null) lastUse = null;
            else lastUse = Cdb.val().time;
            if (lastUse !== null && cooldown - (Date.now() - lastUse) > 0) {
                const timeObj = ms(cooldown - (Date.now() - lastUse));
                const emb = new MessageEmbed()
                    .setColor('RED')
                    .setDescription(`Aguarde \`${timeObj.seconds}\` segundos para executar um comando novamente.`)
                message.channel.send(message.author, emb)
                return;
            }
            //--
            const cmd = args.shift().toLowerCase();
            if (cmd.length == 0) {
                if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) {
                    message.inlineReply(`Meu prefixo neste servidor é \`${prefixo}\``);
                    return;
                }
                return;
            }
            var command = client.commands.get(cmd);
            if (!command) command = client.commands.get(client.aliases.get(cmd));
            if (command) command.run(client, message, args, database, prefixo);
            if (!command) {
                const emb = new MessageEmbed()
                    .setColor('RED')
                    .setDescription(`Comando \`${cmd}\` não encontrado.`)
                message.channel.send(message.author, emb)
                return;
            }
            database.ref(`Cooldown/Command/${message.author.id}`).set({
                time: Date.now()
            })
        }

    })
}