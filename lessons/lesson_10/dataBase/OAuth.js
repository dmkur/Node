const { model, Schema } = require('mongoose');
const { USER, OAuth } = require('../config/database-tables.enum');

const OAuthSchema = new Schema({
  access_token: {
    type: String,
    required: true
  },
  refresh_token: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: USER
  }
}, { timestamps: true });

module.exports = model(OAuth, OAuthSchema);
