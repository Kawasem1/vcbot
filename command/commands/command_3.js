module.exports = {
  name:'userLimitset',
  nickname:['limset'],
  permissions: ['ADMINISTRATOR'],
  
  execute(msg,args,client){
    //vcに入っているかのcheck
    const voiceChannel = msg.member.voice.channel;
    if (!voiceChannel){
     return msg.channel.send('人数制限を設定するにはボイスチャンネルに参加してください')
    }
　　//main
    let cmderId = msg.author.id
    let invc = msg.member.voice.channel
    let cnt = parseInt(args[0])
    if (cnt <= 99 && cnt >= 0) {
      invc.setUserLimit(cnt)
      return msg.channel.send('セット完了！！' + cnt + '人')}
    else msg.channel.send('1~99人までの人数制限ができます。また、０にすると人数制限がなくなります。')
    
    
  }    
      
}