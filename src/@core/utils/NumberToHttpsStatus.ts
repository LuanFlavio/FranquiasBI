declare global {
  export interface Number {
      IsHttpSuccess(): boolean;
      IsHttpError(): boolean;
  }
}
// eslint-disable-next-line no-extend-native
Number.prototype.IsHttpSuccess = function (this: number) {
  return this >= 100 && this <= 399;
};

// eslint-disable-next-line no-extend-native
Number.prototype.IsHttpError = function (this: number) {
  return this >= 400;
};

export default Number;