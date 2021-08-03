{ Permissions } = require "discord.js"
{ sep } = require "path"

class Command
  constructor: (client, file, options) ->
    @name = options.name ? file.name
    @client = client
    @file = file
    @aliases = options.aliases ? []
    @cooldown = options.cooldown ? 0
    path = file.path.split(sep)[0]
    @store = @client.commands

  _run: (msg, args) ->
    if @enabled
      try
        @run msg, args
      catch err
        @client.emit "commandError", msg, @, err

  run: (msg, args) ->

  reload: ->
    @store.load @file.path

  disable: ->
    @enabled = false
    @

  enable: ->
    @enabled = true
    @

module.exports = Command
