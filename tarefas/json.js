fs = require('fs');

//JSON.stringify(data, null, 2)
const EscreverJSON = (filePath, data, encoding = 'utf-8') => {
  const promiseCallback = (resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data), encoding, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(true);
    });
  };
  return new Promise(promiseCallback);
};

const LerJSON = (filePath, encoding = 'utf-8') => {
  const promiseCallback = (resolve, reject) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        const object = JSON.parse(data);
        resolve(object);
      } catch (e) {
        reject(e);
      }
    });
  };
  return new Promise(promiseCallback);
};


module.exports = { EscreverJSON, LerJSON };