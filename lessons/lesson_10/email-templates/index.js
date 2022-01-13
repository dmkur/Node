const { emailActionsENUM } = require('../config');

module.exports = {
  // динамічний ключ, воно зайде по шляху і візьме ключ WELCOME
  [emailActionsENUM.WELCOME]: {
    templateName: 'welcome',
    subject: 'lol'
  },
  [emailActionsENUM.USER_BLOCKED_ADMIN]: {
    templateName: 'blocked by admin',
    subject: 'lol your acc was blocked'
  },
  [emailActionsENUM.FORGOT_PASSWORD]: {
    templateName: 'forgot password',
    subject: 'dont worry'
  }
};
