module.exports={
  name:'voiceStateUpdate',

  async execute(oldState,newState,client){

    if(client.ctedvc.create.includes(newState.channelId)){
      let cc = 1
      while(true){
        if (client.ctedvc.channels.find(x => x.counter == cc &&
            newState.channel.parentId == client.channels.cache.get(x.id).parentId)){
          cc += 1
        }
        else break
      }

      let ctvc = await newState.guild.channels.create('vc #'+ cc,{type:'GUILD_VOICE',parent: newState.channel.parentId})
      
      newState.setChannel(ctvc)
      
      client.ctedvc.channels.push({
        id: ctvc.id,
        counter: cc
      })
      
      cc += 1
    }

    if (client.ctedvc.channels.find(x => x.id == oldState.channelId) && !oldState?.channel?.members.size){
      oldState.channel.delete()

      let index = client.ctedvc.channels.findIndex(x => x.id == oldState.channelId)

      client.ctedvc.channels.splice(index,1)
      console.log('VC creation system starts normally')
    }
  }
}