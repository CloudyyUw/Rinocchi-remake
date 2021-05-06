async function GetEmojiByName(client, name) {
    const req = await client.shard.broadcastEval(`this.emojis.cache.find(x => x.name == '${name}')`);
    return (req.find((res) => !!res) || false)
};

async function GetEmojiByID(client, id) {
    const req = await client.shard.broadcastEval(`this.emojis.cache.find(x => x.id == '${id}')`);
    return (req.find((res) => !!res) || false)
};

async function GetUserByID(client, id) {
    const req = await client.shard.broadcastEval(`this.users.cache.find(x => x.id == '${id}')`);
    return (req.find((res) => !!res) || false)
};

async function GetGuildByID(client, id) {
    const req = await client.shard.broadcastEval(`this.guilds.cache.find(x => x.id == '${id}')`);
    return (req.find((res) => !!res) || false)
};

module.exports = { GetEmojiByID, GetEmojiByName, GetGuildByID, GetUserByID };