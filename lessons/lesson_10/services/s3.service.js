const S3 = require('aws-sdk/clients/s3');

// ліба для створення унікальної назви файлу
// в наш.випадку ім'я файлу
const uuid = require('uuid').v1;
const path = require('path');

const {
  AWS_S3_REGION,
  AWS_S3_SECRET_KEY,
  AWS_S3_ACCESS_KEY,
  AWS_S3_NAME
} = require('../config/variable');

// надаємо досступ до нашого відра в aws
const bucket = new S3({
  region: AWS_S3_REGION,
  accessKeyId: AWS_S3_ACCESS_KEY, // надається при створенні відра
  secretAccessKey: AWS_S3_SECRET_KEY // аналогічно
});

module.exports = {
  uploadFile: (file, itemType, itemId) => {
    // name повинен бути унікальним на s3
    // може перетерти як з бд
    const { data, mimetype, name } = file;

    // використали для itemId перетворення в стрінгу
    // оск в монго id це об'єкт
    const fileName = _fileNameBuilder(name, itemType, itemId.toString());

    return bucket
      .upload({
        Bucket: AWS_S3_NAME, // назва відра dmkur
        Body: data, // buffer файлу
        Key: fileName, // назва файлу
        ContentType: mimetype // тип фото mimetype
      })
      .promise();
  }

};

function _fileNameBuilder(fileName, itemTypes, itemId) {
  // формуємо нашу назву фотографії
  // і робимо її унікальною 'batman_17-wallpaper-1920x1080.jpg'
  // оск її розширення завжди в кінці викор. pop()
  // const fileExtension = fileName.split('.').pop();
  // фбо через path
  const fileExtension = path.extname(fileName);
  return path.join(itemId, itemId, `${uuid()}${fileExtension}`);
}
