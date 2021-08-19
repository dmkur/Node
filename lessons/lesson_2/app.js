//              ліба express -  фреймворк на ноді
const express = require('express');

//              вказівка app - виеористовуй лібу express
const app = express();

//              routes
// get - методи, виділяють наступні методи див нижче
app.get(`/`, (req, res) => {

});

//


//              запуск серверна на порті 5000
app.listen(5000, ()=>{
    console.log(`App listen 5000`)
});