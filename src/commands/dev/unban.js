module.exports = {
    name: '+unban',
    aliases: [],
    run: async (client, message, args, database) => {
       if (message.author.id !== '415663316854112256') return;
       if(args[0] === "user"){
         const y = await client.users.cache.get(args[1]);
         if(!y) return message.reply('invalid user');
         database.ref(`Blacklist/user/${y.id}`).set({
           ban: false
         })
         message.reply('unbanned')
         return
       };
       if(args[0] === "guild"){
         const y = await client.guilds.cache.get(args[1]);
         if(!y) return message.reply('invalid guild');
         database.ref(`Blacklist/guild/${y.id}`).set({
           ban: false
         })
         message.reply('unbanned')
         return
       }   
    }
  }