//              ліба express -  фреймворк на ноді
const express = require('express');
const path = require('path');
//              ліба для рендеру темплейтів hbs
const expressHbs = require('express-handlebars');

//              вказівка app - виеористовуй лібу express
const app = express();

// налаштування hbs
// вказуємо, що двигуном для 'вюшок' будутьф файли .hbs
app.set('view engine', '.hbs');
// обробник для двигуна буде фукція expressHbs
app.engine('.hbs', expressHbs({ defaultLayout: false }));
// папка за замовучуванням де будуть наші .hbs файли
app.set('views', path.join(__dirname, 'static'));
// надали доступ до папки static, за замовчуванням нода не дозволяє ходитити по папкам
app.use(express.static(path.join(__dirname, 'static')))


//              routes - ендпоінти
// get - метод, тип відправки данних. Браузер шле лише get інші через Postman
// req - реквест, це дані які нажсилає браузер, коли в нього щось запитують
// res - наша реакція на реквест від браузера.
// реквест незакінчиться доки ми не надішлемо респонс, тобто нашу відповідь
// можуть бути різні респонси

app.get(`/`, (req, res) => {
    // console.log(req)

    // res.write('Helo World !')
    res.status(404).end('Not Found')
    // res.send('bye') // може щось надсилати додатково
    // res.status(200).json('Hello World, JSON') // обєкти масиви... як json
});

app.get(`/users`, (req, res) => {
    res.json([
        {name: `Dima`},
        {name: `Olia`}
    ])
});

//              Methods
// GET /users  (усі юзери)
// GET /users/:user_id (1 юзер з юзерів)
// GET /users?email=victor.fzs10 (фільтрація через query)
// PUT /users/:user_id (update юзера методом PUT) (для глобальних змін)
// DELETE /users/:user_id (delete юзера, методом DELETE, не конфліктує з іншими URL, через різний метод)
// PATCH /users/block/:user_id (блокування юзера) (для змін 1-2 дій)
// PATCH /users/unblock/:user_id

// Опис кодів помилки
// Інформаційні 100 - 199
// Успішні 200 - 299
// Перенаправлення 300 - 399
// Помилка клієнта 400 - 499
// СПомилка серверу 500 - 599



//              запуск серверна на порті 5000
app.listen(5000, ()=>{
    console.log(`App listen 5000`)
});