//          експорт данниз із файлу
//          експортується щось одне, текст, об'єкт, фнкція, але одне(одна)
// module.exports = 'Hello NODE world!';


//           імпорт файлу
//           після require данні з фалу який імпортується описуються і запускаються
const exportFile = require('./example/example')
console.log(exportFile)


console.log(__dirname)
console.log(__filename)