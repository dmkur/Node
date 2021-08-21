// Вам потрібно реалізувати мінімум 3 строрінки.
// 1) Реєстрація
// 2) Логінація.
// 3) Список всіх юзерів.
//
//     Створити файлик з юзерами, який буде виступати в ролі бази данних.
//
//     При реєстрації юзер вводин логін та пороль і ви його данні дописуєте у файлик.
//     Якщо такий мейл вже є, то видаємо помилку.
//
//     При логінації юзер так само ввоить мейл та пароль і вам необхідно знайти юзера в файлі.
//     Якщо такий мейлик з таким паролем є, то привіти юзера на платформі показати інформацію про нього та кнопочку, яка перекине нас на список всіх юзерів.
//     В інакшому випадку сказати, що необхідно реєструватись.
//
//     І відображення всіх юзерів це відповідно просто виведення списку вісх юзерів.
//
//     При реєстрації мейли не можуть повторюватись
const express = require('express');
const expressHbs = require('express-handlebars');
const fs = require('fs');
const path = require('path');

const users = require('./db/usersDB');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));
app.use(express.static(path.join(__dirname, 'static')));


//users
// app.get('/users', (req, res) => {
//     res.render('users', {users});
// });
//
// app.get('/users/:user_id', (req, res) => {
//     const { user_id } = req.params;
//     const currentUser = users[user_id];
//     res.json(currentUser);
// });

//registration
app.get('/registration', (req, res) => {
    res.render('registration')
});

app.post('/registration', (req, res) => {
    const { email, password } = req.body;

});




//login
app.get('/login', (req, res) => {
    res.render('login');
});
// login post
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    for ( const userFromDB of users ) {
        if (userFromDB.email === email && userFromDB.password === password) {
            res.end('Welcome my friend');
        }
        res.end('User not found. Create your account, please');
    }
});




// app
app.listen('5000', ()=>{
    console.log(`App listen 5000`)
});

const pathUsersBD = path.join(__dirname, 'db', 'usersDB.js')
fs.appendFile(pathUsersBD, 'Lola', err => {
    console.log(err)
});