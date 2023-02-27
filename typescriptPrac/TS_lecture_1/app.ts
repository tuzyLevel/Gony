let userInput: unknown;

userInput = 10;

function generateError(msg: string, code: number): never {
  throw { msg: msg, code: code };
}
