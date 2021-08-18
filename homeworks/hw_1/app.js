//Посортувати юзерів по папках.
// У вас є дві папки. 1800 та 2000. В кожній з цих папок є файлики аля Karina.txt в якому міститься {"gender": "female"}
// Oleg.txt в якому міститься {"gender": "male"}
// 1) Студентів з 1800 перевести в групу на 2000. І навпаки
// 2) Перемістити всіх дівчат в папку girls а хлопців в папаку boys.
//
// * вам потрбіно перемісти всі файлики з вкладених папок в іншу папку. Зробити всі файли на одному рівні вкладеності.



const fs = require(`fs`);
const path = require(`path`);

const path1800 = path.join(__dirname, `1800`);
const path2000 = path.join(__dirname, `2000`);

const pathForBoys = path.join(__dirname, `boys`);
const pathForGirls = path.join(__dirname, `girls`);


// task 1
// fs.readdir(path1800, (err, files) => {
//     console.log(files)
//     files.forEach(fileData => {
//         fs.rename(path.join(path1800, fileData), path.join(path2000, fileData), err1 => {
//             console.log(err1)
//         })
//     })
// })
//
// fs.readdir(path2000, (err, files) => {
//     console.log(files)
//     files.forEach(fileData => {
//         fs.rename(path.join(path2000, fileData), path.join(path1800, fileData), err1 => {
//             console.log(err1)
//         })
//     })
// })

// task 2
// fs.readdir(path1800, (err, files) => {
//         files.forEach(data => {
//             fs.readFile(path.join(path1800, data), (err1, files1) => {
//                 const fileInfo = files1.toString();
//                 if (fileInfo.includes(`fe`)) {
//                     fs.rename(path.join(path1800, data), path.join(pathForGirls, data), err2 => {
//                         console.log(err2)
//                     })
//                 }  else {
//                     fs.rename(path.join(path1800, data), path.join(pathForBoys, data), err2 => {
//                         console.log(err2)
//                     })
//                 }
//             })
//         })
// });
//
// fs.readdir(path2000, (err, files) => {
//     files.forEach(data => {
//         fs.readFile(path.join(path2000, data), (err1, files1) => {
//             const fileInfo = files1.toString();
//             if (fileInfo.includes(`fe`)) {
//                 fs.rename(path.join(path2000, data), path.join(pathForGirls, data), err2 => {
//                     console.log(err2)
//                 })
//             }  else {
//                 fs.rename(path.join(path2000, data), path.join(pathForBoys, data), err2 => {
//                     console.log(err2)
//                 })
//             }
//         })
//     })
// });
