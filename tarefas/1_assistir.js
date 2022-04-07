const passe = process.env['passe']
var {usa_GET,salvar_GET,_GET} = require("./GET.js");

var assistir = function() {
  usa_GET('ultimo').then(ultimo => {
var ultimo_post = ultimo.ultimo_post;
    _GET("https://vulcannovel.com.br/wp-json/api/v1/recentes").then(vulcan => {
    var add = [];
var pri = false;
      for (var v = 0; v < vulcan.length; v++) {         
        if (ultimo_post < vulcan[v].hora) {
           add.push(vulcan[v]);  
          var pri = true;
                } // if
      } // for
      if (pri) {
  var ddd = JSON.stringify(add).replace(/\=/g,'$').replace(/\&/g,'¢');
console.log(ddd);
        salvar_GET('pendente',ddd);        
setTimeout(() => {   
      salvar_GET('ultimo', JSON.stringify({ "ultimo_post": add[0].hora }));
      _GET(`https://vulcan-bot-discord.herokuapp.com/${passe}`); 
},3000);

      }

    }); 
  }); 
}

assistir();

setInterval(() => {
  assistir();
}, 30000);
