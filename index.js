//ODY2NTM0NTE2MTQyNTA2MDM0.YPT9KA.jROoKFJKlzWOahc5QGqPXLvex-A

const Discord = require('discord.js');
const bot = new Discord.Client({ws: {intents: Discord.Intents.ALL}});
const fs = require('fs');
bot.commands = new Discord.Collection();

bot.on('ready', () => {
    console.log('bot online')
   
    bot.user.setPresence({ activity: { name: "with Mikasa " } })
})


bot.on('ready' , () => {
    console.log('tatakae');
    
    fs.readdir('./commands', (err , files)=> {

        if(err) return console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() == 'js');

        if(jsfile.length == 0) {return console.log("Could not find commands!")};

        jsfile.forEach(f => {

        let props = require(`./commands/${f}`);
        bot.commands.set(props.help.name , props); 
        
        });
    })

});

bot.on('message' , (message) =>
{
   
    if(message.author.bot) return;
    if(message.channel.type !== 'text') return;
    let prefix = '-';
    // hello there ('hello' , 'there')
    let MessageArray = message.content.split(' ');
    let cmd = MessageArray[0].slice(prefix.length);
    let args = MessageArray.slice(1)
    
    if(!message.content.startsWith(prefix)) return;

    let commandfile = bot.commands.get(cmd);
    if(commandfile) {commandfile.run(bot,message,args)}
   

})



bot.login('ODY2NTM0NTE2MTQyNTA2MDM0.YPT9KA.857YOOlnTOqfKmGdi_chLoZ5X04');