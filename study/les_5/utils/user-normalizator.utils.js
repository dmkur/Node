module.exports = {
  userNormalizator: (userToNormalize) => {
    const fieldToRemove = ['password'];

    userToNormalize = userToNormalize.toJSON();

    fieldToRemove.forEach((field) => delete userToNormalize[field]);
  }
};
