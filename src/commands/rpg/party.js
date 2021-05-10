const IdGen = require("../../../util/makeID"),
    db = require("../../../util/database");

module.exports = {
    name: "party",
    aliases: [],
    run: async (client, message, args, database, prefixo) => {
        switch (args[0]) {
            case "create":
                db.get("select * from party_members where member = ?", [message.author.id], function (err, row) {
                    if (err) {
                        message.reply(`houve um erro inesperado, tente novamente. Código de erro: \`${err.message}\``)
                        return;
                    }
                    if (row) {
                        message.inlineReply(`Você já está em uma party, use \`${prefixo.value ? prefixo.value : prefixo}party leave\` para sair da sua party atual.`)
                        return
                    }
                    const id = IdGen(15);
                    db.run("insert into party_main (owner, id) values (?, ?)", [message.author.id, id], (err, result) => {
                        if (err) {
                            message.reply(`houve um erro inesperado, tente novamente. Código de erro: \`${err.message}\``)
                            return;
                        }
                        db.run("insert into party_members (member, id) values (?, ?)", [message.author.id, id], (err, result) => {
                            if (err) {
                                message.reply(`houve um erro inesperado, tente novamente. Código de erro: \`${err.message}\``)
                                return;
                            }
                            message.channel.send(`${message.author} | Party criada! ID: \`${id}\``)
                        })
                    })
                })
                break
            case "leave":
                db.run("delete from party_main where owner = ?", [message.author.id], (err, result) => {
                    if (err) {
                        message.reply(`houve um erro inesperado, tente novamente. Código de erro: \`${err.message}\``)
                        return;
                    }
                    db.run("delete from party_members where member = ?", [message.author.id], (err, result) => {
                        if (err) {
                            message.reply(`houve um erro inesperado, tente novamente. Código de erro: \`${err.message}\``)
                            return;
                        }
                        message.channel.send(`${message.author} | Você saiu da party atual e partys em que você é dono, foram excluídas.`)
                    })
                })
                break
            case "join":
                
                break
            default:
                message.inlineReply(`Informe os argumentos corretamente. Use \`${prefixo.value ? prefixo.value : prefixo}party join <ID>\`, \`${prefixo.value ? prefixo.value : prefixo}party create\` ou \`${prefixo.value ? prefixo.value : prefixo}party leave\``);
                break
        }
    }
}