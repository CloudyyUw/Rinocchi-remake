module.exports = {
    name: 'ping',
    aliases: ['latencia', 'ms'],
    run: async (client, message, args) => {
        const envio = await message.channel.send(`Ping...`)
        envio.edit(`**Shard: #${Number(client.shard.ids) + 1}**\nLatência: **${parseInt(envio.createdAt - message.createdAt)} ms**\nAPI: **${parseInt(client.ws.ping)} ms**`)
    }
}