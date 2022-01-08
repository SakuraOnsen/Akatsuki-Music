module.exports = {
    name: 'eval',
    aliases: [],
    permissions: [],
    cooldown: null,
    argsreq: 1,
    usage: '<code>',
    description: 'Change the bots status.',
    category: 'dev',
    dev: true,
  
    execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
      
      
        
        
        try{
          if(message.content.includes('client.token')) return message.channel.send('Nice try')
          if(message.content.includes('client.TOKEN')) return message.channel.send('Nice try')
          if(message.content.includes('client.login')) return message.channel.send('Nice try')
          if(message.content.includes('process.env.TOKEN')) return message.channel.send('Nice try')
        
          const { inspect } = require('util')
          const code = args.join(" ");
  
          const result = await eval(code)
          let output = result
          if(typeof result !== "string"){
            output = inspect(result)
          }
  
          message.channel.send(`\`\`\`js\n${output}\`\`\``).catch(() => message.channel.send('Guild Info/Message Info is too large to send'))
        
      
      }catch(err){
        console.log(err)
        new MsgError(err)
      }
      
    }
  }