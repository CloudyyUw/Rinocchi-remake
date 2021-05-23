const i18next = require("i18next"),
    translationBackend = require("i18next-node-fs-backend"),
    { readdirSync } = require("fs");
class Lang {
    constructor() {
        this.langs = ["pt-BR", "en-US"];
        this.folders = ["commands", "err", "default"]
    }
    async load(language) {
        let locale;
        function setFixedT(translate) {
            locale = translate;
        };
        setFixedT(i18next.getFixedT(language));
        return locale;
    }
    async start() {
        i18next.use(translationBackend).init({
            ns: this.folders,
            preload: await readdirSync("./src/locales/"),
            fallbackLng: "pt-BR",
            backend: {
                loadPath: "./src/locales/{{lng}}/{{ns}}.json",
            },
            interpolation: {
                escapeValue: false,
            },
            returnEmptyString: false,
        });
    }
}

module.exports = Lang;