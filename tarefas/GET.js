const axios = require('axios').default;
const https = require("https");
const banco = process.env['banco'];
const passe = process.env['passe'];

var usa_GET = function(arq) {    
 
    return new Promise ((sucesso, st) => {
    axios.get(banco+passe+arq)
  .then(function (response) {
     sucesso(response.data);
  }).catch(function (error) {  
      return
  })
    });
  
}
var salvar_GET = function(arq,dados) {    
 
    return new Promise ((sucesso, st) => {
        axios.get(banco+passe+'salvar?'+arq+'='+dados)
        .then(function (response) {
        sucesso(response.data);
    }).catch(function (error) {
    return
  })
      
    });
  
}
var _GET = function(Link) { 
  
    return new Promise ((sucesso, st) => {
         axios.get(Link)
        .then(function (response) {
     sucesso(response.data);
   }).catch(function (error) {
  return
  })
      
    });
  
}

module.exports = {usa_GET, salvar_GET, _GET};
