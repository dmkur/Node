// 3й-спосіб функція що видалить поле password, щоб він не повертався з бази
module.exports = {
  userNormalizator: (userToNormalize) => {
    const fieldsToRemove = ['password'];

    // монго нам вертає монго об'єкт, це поле поверне JSON
    // (toObject() ще можна використати)
    userToNormalize = userToNormalize.toJSON();

    fieldsToRemove.forEach((field) => delete userToNormalize[field]);
  }

};
