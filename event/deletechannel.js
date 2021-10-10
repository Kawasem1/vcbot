module.exports = {
name: 'channelDelete',

  execute(channel,client){
    if(client.ctedvc.create.includes(channel.id)){
      
      let index = client.ctedvc.create.findIndex(z => z.id == channel.id)
      client.ctedvc.create.splice(index,1)
    }
  }
}