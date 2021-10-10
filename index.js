// ================ CREATE WEBSERVER ==================
const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('poewr_on get_ready'))
app.listen(3000, () => console.log(`Listening at http://localhost:${3000}`))

const {Client,Collection} = require('discord.js')
const client = new Client({
  allowedMentions: {
    repliedUser: false
  },
  intents: [
    'GUILDS',
    'GUILD_MEMBERS',
    'GUILD_MESSAGE_REACTIONS',
    'GUILD_VOICE_STATES',
    'DIRECT_MESSAGES',
    'GUILD_MESSAGES',
    'GUILD_PRESENCES',
    'DIRECT_MESSAGES'
  ]
 })

// CODE DEPENDENCIES
const fs = require('fs')
const eventFiles = fs.readdirSync('./event').filter(file => file.endsWith('.js'))
const commandFolders = fs.readdirSync('./command')
// COMMAND HANDLER FOLDERS
client.commands = new Collection()
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./command/${folder}`).filter(file => file.endsWith('.js'))
  for (const file of commandFiles) {
    const command = require(`./command/${folder}/${file}`)
    client.commands.set(command.name, command)
  }
}

// VC DATA
let vcdata = fs.readFileSync('./vcdata.json')
    client.ctedvc = JSON.parse(vcdata)
if (!client.ctedvc.hasOwnProperty('channels')){
  client.ctedvc.channels = []
}
if (!client.ctedvc.hasOwnProperty('create')){
  client.ctedvc.create = []
}

for (const file of eventFiles){

const event = require(`./event/${file}`)
if(event.once){
client.once(event.name, (...args) => event.execute(...args, client))
  } 
  else {
    client.on(event.name, (...args) => {
      try{
        event.execute(...args, client)
      }
      catch (error) {console.error(error)}
    })
  }


}



// Login to Discord with your client's token
client.login(process.env.TOKEN);
