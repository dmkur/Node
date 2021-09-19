module.exports = {
  USERNormalizator: (userToNormalize) => {
    const fieldToRemove = ['password'];

    userToNormalize = userToNormalize.toJSON();

    fieldToRemove.forEach((field) => {
      delete userToNormalize[field];
    });

    return userToNormalize;
  }
};
