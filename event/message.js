module.exports={
  name:'messageCreate',

  execute(msg,client){

    if(msg.author.bot) return

//commandの設定
   const prefix = 'dw.'
   const args = msg.content.slice(prefix.length).trim().split(/ +/)
   const commandName = args.shift().toLowerCase()
   const command = client.commands.get(commandName) || client.commands.find(cmd =>  cmd.nickname && cmd.nickname.includes(commandName))


   if(!msg.content.toLowerCase().startsWith(prefix) || !command) return

  for (let perm of command.permissions){
    if (!msg.member.permissions.has(perm)) {
      msg.reply('このコマンドは使用できません')
      return
    }
  }

  try {
     command.execute(msg,args,client)
  }
  catch(erinfo){
    console.error(erinfo)
  }
    
  console.log('sended')
  }
}