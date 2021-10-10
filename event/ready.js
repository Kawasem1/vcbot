const fs = require('fs')

module.exports={
  name:'ready',
  once:true,

  execute(client){
    console.log('ready...')

    // Check VC channels
      for (let c of client.ctedvc.channels){
        let d = client.channels.cache.get(c.id)

        if (!d) {
          let index = 
            client.ctedvc.channels.findIndex(x => x.id == c.id)

          client.ctedvc.channels.splice(index,1)
        }
 
        else if (!d.members.size){
          d.delete()
          let index = client.ctedvc.channels.findIndex(x => x.id == d.id)

          client.ctedvc.channels.splice(index,1)
        }
      }

      //作成チャンネル確認
      //for (let c of client.ctedvc.create){
        //et d = client.channels.cache.get(c)

        //if (!d) {
          //let index = 
            //client.ctedvc.create.findIndex(x => x == c.id)

          //client.ctedvc.create.splice(index,1)
        //}
      //}

    // Write every second
    setInterval(() => {
      let data = JSON.stringify(client.ctedvc,null,2)
      fs.writeFileSync('./vcdata.json',data)
    },1000)
  }
}