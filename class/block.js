const SHA256 = require("crypto-js/sha256");

module.exports = class Block {
  /**
   * It takes a timestamp, an array of transactions, and a previous hash, and returns a new block with a
   * hash based on the timestamp, transactions, and previous hash
   * @param timestamp - The time at which the block was created.
   * @param transactions - This is an array of transactions that are included in the block.
   * @param [previousHash] - The hash of the previous block in the chain.
   */
  constructor(timestamp, transactions, previousHash = "") {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  /**
   * It takes the previous block's hash, the timestamp, the transactions, and the nonce, and returns the
   * hash of all of that information
   * @returns The hash of the block.
   */
  calculateHash() {
    return SHA256(
      this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.nonce
    ).toString();
  }

  /**
   * While the first [difficulty] characters of the hash are not equal to [difficulty] zeros, increment
   * the nonce and recalculate the hash.
   * @param difficulty - The number of leading zeros in the hash.
   */
  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
};
