var {usa_GET,salvar_GET} = require("./tarefas/GET");
const {  MessageEmbed,  Client,  Intents} = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
  partials: ['GUILDS','MESSAGE', 'CHANNEL', 'REACTION'],
});
const passe = process.env['passe']
var express = require("express");
var app = express();


var { id_do_bot, emoji_reage } = require("./tarefas/referencias.json");

var {usa_GET,salvar_GET} = require("./tarefas/GET.js");
 require('./tarefas/1_assistir');

var {
  servidor,
  canal,
  emoji_reage,
  todas_as_obras,
  msg_embed
} = require("./tarefas/referencias.json");
//* *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *


client.on('messageReactionAdd', async (reaction, user) => {
  var href = "https://vulcannovel.com.br/"
  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.log(error)
      return;
    }
  }
  if (reaction.message.author.id == id_do_bot && user.bot === false && reaction.users.reaction._emoji.name == emoji_reage) {
    var usuario = user.id;
    mensagem = reaction.message.id;

    usa_GET('reagir/'+mensagem).then(array=>{
      
   
    if (array.off) return;
            
    var capa_dm = array[4].replace('-150x150', '-225x300');

    const embed0 = new MessageEmbed()
      .setColor(`${array[6]}`)
      .setTitle(`${array[1]}`)
      .setURL(`${href+array[2]}/`)
      .setDescription(`🏷️ [${array[5]}](${href+array[3]}/)`)
      .setThumbnail(`${capa_dm}`);

    client.users.fetch(usuario, false).then((user) => {
      user.send({ embeds: [embed0] });
    });
     })//get
  }
});


app.get("/", (req, res) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  res.sendStatus(200);
});


var Invocar = function(){
  
  usa_GET('pendente').then(ultimo => {
      ultimo.reverse();
    var x = 0;
   // console.log(ultimo)
    var trampando = function() {

 var juntando = [];

      while (x < ultimo.length) {
   
        (function(x) {
          setTimeout( function() {

            projeto = ultimo[x].projeto;
var guild = client.guilds.cache.get(servidor);
            
if(guild === undefined) return;
            
           try {
              var cargo = guild.roles.cache.find((r) => r.name == projeto);     
            } catch (e) {
                console.log(e);
            var cargo = projeto;
            }
            
            ut = ultimo[x].terra;
            if (ut == 'br') cor = '#56e757';
            else if (ut == 'ch') cor = '#ff8b84';
            else if (ut == 'co') cor = '#c889e0';
            else if (ut == 'jp') cor = '#ffffff';
            else if (ut == 'oci') cor = '#aae9ff';
            else cor = "black";


            cap = ultimo[x].capitulo
            if (cap.length > 35) {
              zz = "...";
            } else if (cap.length <= 35) {
              zz = "";
            }
            cap = cap.substring(0, 35) + zz;
            autor = ultimo[x].por;
            avatar = ultimo[x].avatar;
            capa = ultimo[x].capa;
            funcao = ultimo[x].funcao;

           const embed = new MessageEmbed()
              .setColor(cor)
              .setAuthor({
                name: `${cap}`,
                iconURL: `${capa}`
              })
              .setFooter({
                text: `${funcao}: ${autor}${msg_embed}`,
                iconURL: avatar
              });

            client.channels.cache.get(canal).send({
              content: `${cargo}||${todas_as_obras}||`,
              embeds: [embed]
            }).then(sent => {
              sent.react(emoji_reage);

              var id = sent.id;

              var o = ultimo[x];

              var mandar = {
                id:id,
                projeto: projeto,
                indice: o.indice, 
                slug: o.slug,
                capa: capa,
                cap: cap,
                cor: cor};             

              juntando.push(mandar);
              if (x == ultimo.length-1 ) {
                var m = JSON.stringify(juntando,null,0)
                  .replace(/\=/g,'$')
                  .replace(/\&/g,'¢')
                  .replace(/\#/g,'£');
         
              salvar_GET('tabela',m);                
             }

            }) // msg

          
           }, 4000 * x);
        })(x++)
      }
    };

    trampando();
  }); // Ler JSON
};

app.get(`/${passe}`, (req, res) => {
 setTimeout(() => { Invocar(); }, 2000);
   res.json({ok:"ok"});
});

setTimeout(() => { 
    usa_GET('ping');
}, 1000 * 60 * 2); 

app.listen(process.env.PORT);
client.login(process.env.BOT);
