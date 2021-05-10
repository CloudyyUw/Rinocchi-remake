module.exports = {
    data: {
        name: "stats",
        description: "Mostra os status do seu game",
    },
    run: async (client, send, i) => {
        await send(i, "seu satus do rpg é:")
    }
}