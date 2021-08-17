//                  експорт данних із файлу
//                  експортується щось одне, текст, об'єкт, фнкція, але одне(одна)
//module.exports = 'Hello NODE world!';


//                  імпорт файлу
//                  після require данні з фалу який імпортується описуються і запускаються
//                  якщо require лише в папку, воно само шукатиме файл index.js
//const exportFile = require('./example/example')



//                  імпорт функції з файлу example з папки example
//exportFile.greeting(`Dima`);



//                  глобальні змінні

//                  шлях до поточного файлу
// A:\Projects\OKTEN\Node\dmkur-2021\lessons\lesson_1
//console.log(__dirname)

//                  шлях та назву поточного файлу
// A:\Projects\OKTEN\Node\dmkur-2021\lessons\lesson_1\app.js
//console.log(__filename)


//                  бібліотека fs - працює з файловою системою
const fs = require('fs');
//                  функція path - для будування правильного шлялу
const path = require('path');

const textPath_1 = path.join(__dirname, `example`, `text.txt`);


//                  створити файл, записати дані `Hello writeFile function`
//                  при повторнорму запиті, з іншими данними, попередні дані перезапишуться
// fs.writeFile(textPath_1, `Hello writeFile function 2`, err => {
//     console.log(err)
// });

//                  записати дані у файл, дані допишуться до вже існуючих
//                  при повторному записі додасить нові данні у файл
// fs.appendFile(textPath_1, 'Hello appendFile! \n', err => {
//     if (err) {
//         console.log(err);
//         return
//     }
//     console.log('Done')
// });


//                  зчитування файлу
//                   <Buffer 48 65 - машшиний код, додати toString()
// fs.readFile(textPath_1, (err, data) => {
//     if (err) {
//         console.log(err);
//         return
//     }
//     console.log('File was read', data.toString())
// });



//                  зчитування папки
//                  поверне [ 'example.js', 'text.txt' ]
const folderPath = path.join(__dirname, `example`)

// fs.readdir(folderPath, (err, files) => {
//     if (err) {
//         console.log(err);
//         return
//     }
//     console.log('File was read', files)
// });

//              щоб дізнатись що саме в папці використали ще додатково
//              fs.stat(уся статистика) в forEach
//              fs.stat.isFile() - та інші окремі методи
fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.log(err);
        return
    }
    files.forEach(myData => {
        const filesPath = path.join(folderPath, myData)
        fs.stat(filesPath, (err1, stats) => {
            console.log(`-----stats-----`)
            console.log(`dir -`,stats.isDirectory())
            console.log(`file -`,stats.isFile())
            console.log(`size -`,stats.size)
            console.log(`-----stats-----`)
        })
    })
});




//                  створення директорії
//                  для створення більше 1 папки використано {recursive : true}
// const folderPath_1 = path.join(__dirname, `folderExmpl`, `folderOneMore`, `lastFolder`)
// fs.mkdir(folderPath_1,{recursive : true}, err => {
//     if (err) {
//         console.log(err);
//         return
//     }
//     console.log('Folders created')
// });