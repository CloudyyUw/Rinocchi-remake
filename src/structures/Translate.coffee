i18next = require "i18next"
translationBackend = require "i18next-fs-backend"
{ readdirSync } = require "fs"

class Lang
  constructor: () ->
    @langs = ["pt-BR", "en-US"]
    @folders = ["commands", "err", "default", "rpg", "vip"]

  load: (language) ->
      locale = "";
      setFixedT = (translate) ->
        locale = translate
      setFixedT i18next.getFixedT language

  start: ->
    i18next.use(translationBackend);
    await i18next.init
      ns: this.folders,
      preload: readdirSync("./locales/"),
      fallbackLng: "pt-BR",
      initImmediate: false,
      load: "all",
      backend:
        loadPath: "./locales/{{lng}}/{{ns}}.json",
      interpolation:
        escapeValue: false,
      returnEmptyString: false,
    return;

module.exports = Lang;
