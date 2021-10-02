module.exports = {
  userNormalizator: (user) => {
    const fieldsToRemove = ['password'];

    // eslint-disable-next-line no-param-reassign
    user = user.toJSON();

    fieldsToRemove.forEach((field) => delete user[field]);

    return user;
  }
};
