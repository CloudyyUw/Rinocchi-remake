require("dotenv").config()
if(require("./version.json").sha !== process.env.SHA){
    throw new Error("Invalid version")
}
const { ShardingManager } = require("discord.js"),
    shard = new ShardingManager("./src/main.js", {
        token: process.env.TOKEN,
        totalShards: "auto"
    })

shard.on('shardCreate', shard => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Launched shard #${shard.id + 1}`);
});

shard.spawn()