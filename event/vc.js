module.exports={
  name:'voiceStateUpdate',

  async execute(oldState,newState,client){

    // If VC creation channel
    
    if(client.ctedvc.create.includes(newState.channelId)){
      let cc = 1
      while(true){
        if (client.ctedvc.channels.find(x => x.counter == cc &&
            newState.channel.parentId == client.channels.cache.get(x.id).parentId)){
          cc += 1
        }
        else break
        
      }
      
      let usrAct = newState.member.presence.activities
      let usrname = newState.member.displayName
      let vcact = 'ななしのVC'
      for (a of usrAct){
        if(a.type === 'PLAYING'){
          vcact = a.name;
        }
      }
      
      let ctvc = await newState.guild.channels.create(vcact +"-" + usrname, 
{type:'GUILD_VOICE',parent: newState.channel.parentId})

      let kikisen = await newState.guild.channels.create(vcact +"-" + usrname, 
      {type:'GUILD_TEXT',parent: newState.channel.parentId})
      
      newState.setChannel(ctvc)
     
      client.ctedvc.channels.push({
        id: ctvc.id,
        counter: cc,
        textid: kikisen.id
      })    　

      cc += 1
    }

    if (client.ctedvc.channels.find(x => x.id == oldState.channelId) && !oldState?.channel?.members.filter(x => !x.user.bot).size){
      await oldState.channel.delete()
      
      let index = client.ctedvc.channels.findIndex(x => x.id == oldState.channelId)
      //Read channel ID
      let nakami = client.ctedvc.channels.find(x => x.id == oldState.channelId)
      let deltxtid = nakami.textid
      //Create and delete a channel object from the channel ID
      let deltxtch = client.channels.cache.get(deltxtid)
      deltxtch.delete()

      client.ctedvc.channels.splice(index,1)
      console.log('VC creation system starts normally')
    }
  }
}