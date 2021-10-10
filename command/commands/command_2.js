module.exports = {
  name:'createvc',
  nickname:['cvc'],
  permissions: ['ADMINISTRATOR'],
  
  async execute(msg,args,client){
    let ctvc = await msg.guild.channels.create(args.join(' '),{type:'GUILD_VOICE'})
    

    client.ctedvc.create.push(ctvc.id)
    msg.reply({content: '作成完了'})
  }
}
