Event = require "../structures/Event"
db = require "quick.db"
{ MessageEmbed } = require "discord.js"
Firebase = require "../util/FirebaseConnection"
ms = require "../util/parse-ms"
database = Firebase.database()
class Message extends Event
  constructor: (args...) ->
    super args...
    @userLang = (id) ->
      if not db.has "userLang.#{id}"
        db.set "userLang.#{id}", "pt-BR"
        return "pt-BR"
      else
        return db.get "userLang.#{id}"

  run: (message) ->
    return if message.author.bot or message.webhookID or message.channel.type == "dm" or not message.guild

    # Blacklist
    # <Client>.blacklist = class BlackListManager [util/Blacklist.coffee]
    return if @client.blacklist.validate(message.author.id) == true
    return if @client.blacklist.guild(message.guild.id) == true

    if not message.member
      await message.guild.members.fetch message.author.id

    prefix = db.get("prefix.#{message.guild.id}") || "r?"

    return if not message.content.startsWith prefix

    locale = await @client.translate.load @userLang message.author.id

    # Cooldown
    cooldown = 5000 # 5s
    cooldownStorage = await database.ref "Cooldown/Command/#{message.author.id}"
      .once "value"
    if cooldownStorage.val() and cooldown - (Date.now() - cooldownStorage.val().time) > 0
      timeObj = ms cooldown - (Date.now() - cooldownStorage.val().time)
      emb = new MessageEmbed;
      emb.setColor "RED"
      emb.setDescription locale "err:v2.cooldown.command", { seconds: timeObj.seconds }

      message.channel.send message.author, emb
      return

    args = message.content.slice(prefix.length).trim().split(/ +/g)
    cmd = args.shift().toLowerCase()
    command = @client.commands.get cmd

    if not command
      message.channel.send "#{message.author} | #{locale "err:unknown.command"}"
      return

    await command.run @client, message, args
    database.ref "Cooldown/Command/#{message.author.id}"
      .set {
        time: Date.now()
      }
    return;

module.exports = Message;
