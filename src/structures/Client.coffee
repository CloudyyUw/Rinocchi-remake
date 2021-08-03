Commands = require "./CommandStore"
DistubeEvents = require "./DistubeEvents"
Events = require "./EventStore"
Lang = require "./Translate"
Distube = require "distube"
{ Client } = require "discord.js"
BlackListManager = require "../util/Blacklist"

class Custom extends Client
  constructor: (options) ->
    super options

    @translate = new Lang;
    @commands = new Commands(@)
    @events = new Events(@)
    @blacklist = new BlackListManager;
    # @distubeEvents = new DistubeEvents(@)

    @distube = new Distube @,
      searchSongs: true,
      emitNewSongOnly: true,
      leaveOnFinish: true

    @on("ready", @onReady.bind(@))

  onReady: ->
    console.log "Online"
    @ready = true
    @emit("botReady")

  login: (token) ->
    await @loadAll()
    super.login token

  loadAll: ->
    [commands, events] = await Promise.all([
        @commands.loadFiles(),
        @events.loadFiles(),
    ])
    # Adicionar o suporte aos eventos do Distube
    # @distubeEvents.loadFiles()
    # Distube: #{distubeE}"
    @translate.start();
    console.log("Comandos: #{commands} | Eventos: #{events} |")

module.exports = Custom;
