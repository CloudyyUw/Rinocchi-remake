module.exports = {
    data: {
        name: "say",
        description: "teste",
        options: [{
            name: "text",
            description: "texto",
            type: 3,
            required: false
        }],
    },
    run: async (client, send, i) => {

        var args = i.data.options

        var texto = args.find(args => args.name.toLowerCase() === "text").value;
        console.log(i.data.options)
        await send(i, texto)

    }
}