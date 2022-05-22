module.exports = class Transaction {
  /**
   * The constructor function is a special function that is called when a new instance of the class is
   * created
   * @param fromAddress - The address of the sender
   * @param toAddress - The address of the recipient of the transaction.
   * @param amount - The amount of coins to be transferred.
   */
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
};
