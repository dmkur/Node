//              ліба express -  фреймворк на ноді
const express = require('express');
//              ліба для рендеру темплейтів hbs
const expressHbs = require('express-handlebars');
const path = require('path');

const { PORT } = require('./config/variable')           // папака з змінною порта
const users = require('./db/users')                     // папака з базою данних про юзерів

//              вказівка app - виеористовуй лібу express
const app = express();

// вчимо node читати json
app.use(express.json());
// плюс деякі додаткові формати
// з extended: true - застосовує додаткову лібу query string
app.use(express.urlencoded({ extended: true }))

// налаштування hbs
// вказуємо, що двигуном для 'вюшок' будутьф файли .hbs
app.set('view engine', '.hbs');
// обробник для двигуна буде функція expressHbs
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


//               через hbs
app.get(`/users`, (req, res) => {
    // view - 'users' вже відмальовує файл users.hbs
    //в option - додаткові змінні, через кому, users - з bd наприклад
    // усе це прокидається у файл users.hbs  в HTML
    res.render(`users`, {userName: `Dima`, users})
});


// через hbs login
app.get(`/login`, (req, res) => {
    res.render(`login`);
})

app.post('/auth', (req, res) => {

    // щоб побачити дані які ми відправили у формі (Login .hbs) викор - body
    // щоб читати body - потрібно навчити node читати json
    // console.log(req.body) // отримуємо об'єкт  { name: 'aaa', password: '1212' }
    const { name, password } = req.body; // виносимо в окремі змінні


    res.json(`LoGINNNN!`)
})

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
app.listen(PORT, ()=>{
    console.log(`App listen`, PORT)
});