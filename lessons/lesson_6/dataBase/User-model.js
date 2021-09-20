// Опис моделі данних
// це потрібно для валідації данних
// коли ми викликатимемо функції монго
// це як інтерфейси в ангуларі
// відповідно якщо в схемі описано name + email,
// а вписуємо лише щось одне воно нас попередить
const { Schema, model } = require('mongoose');

const userRolesEnum = require('../config/users-roles.enum');

const userSchema = new Schema({
  name: {
    type: String,
    required: true, // вимагати name
    trim: true // збере лишні пробіли
  },
  password: {
    type: String,
    unique: true,
    required: true,
    trim: true
    // 1йспосіб- опція що не вертає пароль від бази
    // (іноді не працює, так як часом потрібно повернути пароль)
    // select: false
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  role: {
    type: String,
    default: userRolesEnum.USER, // значення за замовчуванням
    // поле можливих значення ролів(admins & users)
    enum: Object.values(userRolesEnum) // Object.values = візьме усі ключі
  }
}, { timestamps: true });
// timestamps: true допише два поля дата створення, дата оновлення

module.exports = model('user', userSchema);
// експорт нашої моделі де 'user' - назва моделі
