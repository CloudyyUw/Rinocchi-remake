Firebase = require "./FirebaseConnection"

class BlackListManager
  constructor: () ->
    @storage = new Map()
    @db = Firebase.database()

  validate: (userID) ->
    if @storage.has "#{userID}"
      return true
    else
      ref = await @db.ref "Blacklist/user/#{userID}"
        .once "value"

      if ref.val() and ref.val().ban == true
        @storage.set "#{userID}", true
        return true
      return false
  guild: (guildID) ->
    if @storage.has "#{guildID}"
      return true
    else
      ref = await @db.ref "Blacklist/guild/#{guildID}"
        .once "value"
      if ref.val() and ref.val().ban == true
        @storage.set "#{guildID}", true
        return true
      return false

module.exports = BlackListManager
