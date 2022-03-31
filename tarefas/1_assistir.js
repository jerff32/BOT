const passe = process.env['passe']
var {usa_GET,salvar_GET,_GET} = require("./GET.js");

var assistir = function() {
  usa_GET('ultimo').then(ultimo => {
var ultimo_post = ultimo.ultimo_post;
    _GET("https://vulcannovel.com.br/wp-json/api/v1/recentes").then(vulcan => {
    var add = [];
      primeiro = false;
if(vulcan[0].projeto == 'Erro 404') return

      for (var v = 0; v < 5; v++) {
        if (ultimo_post < vulcan[v].hora) {
       primeiro = true;
          add.push(vulcan[v]); 
        } // if
} // for
      if (primeiro) {
        primeiro = { "ultimo_post": add[0].hora };
ddd = JSON.stringify(add).replace(/\=/g,'$').replace(/\&/g,'¢');
         salvar_GET('pendente',ddd);        
        salvar_GET('ultimo', JSON.stringify(primeiro));
        
_GET(`https://Botv119.metal9000.repl.co/${passe}`);
      var add = [];
      }

    }); 
  }); 
}

assistir();

setInterval(() => {
  assistir();
}, 30000);
