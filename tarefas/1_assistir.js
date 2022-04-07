const passe = process.env['passe']
var {usa_GET,salvar_GET,_GET} = require("./GET.js");

var assistir = function() {
  usa_GET('ultimo').then(ultimo => {
var ultimo_post = ultimo.ultimo_post;
    _GET("https://vulcannovel.com.br/wp-json/api/v1/recentes").then(vulcan => {
    var add = [];
     
if(vulcan[0].projeto == 'Erro 404') return
var pri = false;
      for (var v = 0; v < vulcan.length; v++) {         
        if (ultimo_post < vulcan[v].hora) {
           add.push(vulcan[v]);  
          var pri = true;
                } // if
      } // for
      if (pri) {
        primeiro = { "ultimo_post": add[0].hora };
var ddd = JSON.stringify(add).replace(/\=/g,'$').replace(/\&/g,'¢');
        salvar_GET('pendente',ddd);        
setTimeout(() => {   
      salvar_GET('ultimo', JSON.stringify(primeiro));
      _GET(`https://vulcan-bot-discord.herokuapp.com/${passe}`); 
},1000);

        
      var add = [];
      }

    }); 
  }); 
}

assistir();

setInterval(() => {
  assistir();
}, 28000);
