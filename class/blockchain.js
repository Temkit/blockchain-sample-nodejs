const Block = require("./block");
const Transaction = require("./transaction");

module.exports = class blockchain {
  /**
   * We create a constructor function that creates a genesis block, sets the difficulty to 2, sets the
   * mining reward to 100, and creates an empty array for pending transactions
   */
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.miningReward = 100;
    this.pendTransactions = [];
  }

  /**
   * It creates a new block with index 0, a timestamp of 01/01/2018, a data of "Genesis Block", and a
   * previous hash of 0
   * @returns A new block with the index of 0, the date of 01/01/2018, the data of Genesis Block, and
   * the previous hash of 0.
   */
  createGenesisBlock() {
    return new Block(0, "01/01/2018", "Genesis Block", "0");
  }

  /**
   * It returns the last block in the chain
   * @returns The last block in the chain.
   */
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  /**
   * It creates a new block, mines it, adds it to the chain, and then resets the pending transactions
   * array
   * @param miningRewardAddress - The address of the miner who mined the block.
   * @returns The block that was just mined.
   */
  minePendingTransactions(miningRewardAddress) {
    let block = new Block(
      Date.now(),
      this.pendTransactions,
      this.getLatestBlock().hash
    );
    block.mineBlock(this.difficulty);
    this.chain.push(block);

    console.log("Block successfully mined!");

    this.pendTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward),
    ];

    return block;
  }

  /**
   * It takes a transaction object as an argument and pushes it to the pendingTransactions array
   * @param transaction - The transaction object that you want to add to the pending transactions array.
   */
  createTransaction(transaction) {
    this.pendTransactions.push(transaction);
  }

  /**
   * It loops through the chain and checks if the current block's hash is equal to the calculated hash
   * of the current block, and if the previous block's hash is equal to the previous hash of the current
   * block
   * @returns A boolean value.
   */
  checkBlockValidity() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  /**
   * We loop through all the blocks in the chain, and for each block we loop through all the transactions
   * in that block. If the transaction is sending coins to the address we're checking, we add the amount
   * to the balance. If the transaction is sending coins from the address we're checking, we subtract the
   * amount from the balance
   * @param address - The address to get the balance of.
   * @returns The balance of the address.
   */
  getBalanceOfAddress(address) {
    let balance = 0;
    for (const block of this.chain) {
      for (const transaction of block.transactions) {
        if (transaction.fromAddress === address) {
          balance -= transaction.amount;
        }
        if (transaction.toAddress === address) {
          balance += transaction.amount;
        }
      }
    }
    return balance;
  }
};
