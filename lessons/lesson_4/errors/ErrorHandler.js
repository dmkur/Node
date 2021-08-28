// створюємо власну можель помилок, так як часто необхідно видавати різні помилки
// через extends вдосконалюємо прості ерори
// простий error передає лише message
class ErrorHandler extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;

    // при використанні extends для Error
    // по документації вимагається наступне
    // допомагає відтрекати що і де пішло не так при ерорі
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = ErrorHandler;
