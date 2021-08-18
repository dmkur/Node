//                  бібліотека fs - працює з файловою системою
const fs = require('fs');
//                  бібліотека path - для будування правильного шлялу
const path = require('path');
//                  бібліотека util
const util = require(`util`);



//                  експорт данних із файлу
//                  експортується щось одне, текст, об'єкт, фнкція, але одне(одна)
//module.exports = 'Hello NODE world!';


//                  імпорт файлу
//                  після require данні з фалу який імпортується описуються і запускаються
//                  якщо require лише в папку, воно само шукатиме файл index.js
//const exportFile = require('./example/example')


//                  імпорт функції з файлу example з папки example
//exportFile.greeting(`Dima`);


//                  глобальні змінні __dirname __filename
//
//                  шлях до поточного файлу
// A:\Projects\OKTEN\Node\dmkur-2021\lessons\lesson_1
//console.log(__dirname)
//
//                  шлях та назву поточного файлу
// A:\Projects\OKTEN\Node\dmkur-2021\lessons\lesson_1\app.js
//console.log(__filename)


//                  створити файл, fs.writeFile, записати дані `Hello writeFile function`
//                  при повторнорму запиті, з іншими данними, попередні дані перезапишуться
// const textPath_1 = path.join(__dirname, `example`, `text.txt`);
// fs.writeFile(textPath_1, `Hello writeFile function 2`, err => {
//     console.log(err)
// });


//                  записати дані у файл, fs.appendFile, дані допишуться до вже існуючих
//                  при повторному записі додасить нові данні у файл
// const textPath_1 = path.join(__dirname, `example`, `text.txt`);
// fs.appendFile(textPath_1, 'Hello appendFile! \n', err => {
//     if (err) {
//         console.log(err);
//         return
//     }
//     console.log('Done')
// });


//                  зчитування файлу fs.readFile
//                   <Buffer 48 65 - машшиний код, додати toString()
// const textPath_1 = path.join(__dirname, `example`, `text.txt`);
//
// fs.readFile(textPath_1, (err, data) => {
//     if (err) {
//         console.log(err);
//         return
//     }
//     console.log('File was read', data.toString())
// });


//                  зчитування папки fs.readdir
//                  поверне масив [ 'example.js', 'text.txt' ]
// const folderPath = path.join(__dirname, `example`)
//
// fs.readdir(folderPath, (err, files) => {
//     if (err) {
//         console.log(err);
//         return
//     }
//     console.log('File was read', files)
// });
//
//              щоб дізнатись що саме в папці використали ще додатково
//              fs.stat(уся статистика) в forEach
//              fs.stat.isFile() - та інші окремі методи
// fs.readdir(folderPath, (err, files) => {
//     if (err) {
//         console.log(err);
//         return
//     }
//     files.forEach(myData => {
//         const filesPath = path.join(folderPath, myData)
//         fs.stat(filesPath, (err1, stats) => {
//             console.log(`-----stats-----`)
//             console.log(`dir -`,stats.isDirectory())
//             console.log(`file -`,stats.isFile())
//             console.log(`size -`,stats.size)
//             console.log(`-----stats-----`)
//         })
//     })
// });


//                  створення директорії fs.mkdir
//                  для створення більше 1 папки використано {recursive : true}
// const folderPath_1 = path.join(__dirname, `folderExmpl`, `folderOneMore`, `lastFolder`)
// fs.mkdir(folderPath_1,{recursive : true}, err => {
//     if (err) {
//         console.log(err);
//         return
//     }
//     console.log('Folders created')
// });


//                  стертми папку fs.rmdir
//                  стерає лише пусту директорію
//                  перед тим стрети усі файли через fs.unlink()
// const removePath = path.join(__dirname, `folderRemove`)
// fs.rmdir(removePath, err => {
//     console.log(err)
// });


//                  стерти файл fs.unlink
// fs.unlink(path.join(__dirname, `folderRemove`, `lol.js`), err => {
//     console.log(err)
// });


//                  перейменувати - перемістити файл fs.rename
// const renamePath_1 = path.join(__dirname,`dirOne`, `renameMe.js`);
// const renamePath_2 = path.join(__dirname,`dirTwo`, `renameMe.js`);
//
// fs.rename(renamePath_1, renamePath_2, err => {
//     console.log(err)
// });


//                  util calback function в promise function
//                  перетворює колбекізовану фнкцію в промісифіковану.....що?
//                  тобто синхронізувати асинхронність напевно
// const textPath_1 = path.join(__dirname, `example`, `text.txt`);
// ..
// const appendPromise =  util.promisify(fs.appendFile);
// appendPromise(textPath_1,`text data from promise \n`)
//     .catch(reason => {
//         console.log(reason)
//     });


//                  stream - зчитування файла чанками(шматочками)

//                  файл streamText.js - створить саме
//                  fs.createReadStream - зчитує дані кусками
//                  fs.createWriteStream - записує дані кусками
//
// const streamPathToRead = path.join(__dirname, `example`, `streamFolder`, `stream.js`);
// const streamPathToWrite = path.join(__dirname, `example`, `streamFolder`, `streamWrite`, `streamText.js`);
//
// const readStream = fs.createReadStream(streamPathToRead);
// const writeStream = fs.createWriteStream(streamPathToWrite);
//
// console.time(`Time`) // покаже час
//
// readStream.on(`data`, chunk => {
//     writeStream.write(chunk)
//     // console.log(chunk)
// });
//
// //              pipe - теж записує дані після readStream
// //              альтернативний код длоя запису данних - довший. Це як writeStream.write(chunk) 164 строка
// // readStream.pipe(writeStream)
//
// console.timeEnd(`Time`) // покаже час
