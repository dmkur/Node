const { model, Schema } = require('mongoose');
const { USER, ActionToken } = require('../config/database-tables.enum');

const ActionTokenSchema = new Schema({
  token: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: USER
  }
}, { timestamps: true });

module.exports = model(ActionToken, ActionTokenSchema);
