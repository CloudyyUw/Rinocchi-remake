const fs = require('fs')

module.exports = (client) => {
    console.log('Carregando eventos')

    const c = local => {
        const events = fs.readdirSync(`./src/events/${local}/`).filter(x => x.endsWith('.js'));
        for (let file of events) {
            const l = require(`../events/${local}/${file}`);
            let name = file.split('.')[0];
            client.on(name, l.bind(null, client));
        }
    }

    ["client"].forEach(x => c(x))
    console.log('Eventos Carregados')
};