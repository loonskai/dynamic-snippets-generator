class Counter {
  private _value: number;
  constructor() {
    this._value = 1;
  }

  get value() {
    const oldValue = this._value;
    this._value += 1;
    return oldValue;
  }

  reset() {
    this._value = 1;
  }
}

export default Counter;
