/* The above code is creating a new blockchain, creating two transactions, mining the pending
transactions and then checking the balance of the addresses. */
const Transaction = require("./class/transaction");
const Blockchain = require("./class/blockchain");

console.log("Starting the application...");
const scpCoin = new Blockchain();

console.log("Creating new transaction...");
const Transaction1 = new Transaction("sidali", "hamdi", 1000);
scpCoin.createTransaction(Transaction1);

console.timeLog("Creating new transaction...");
const Transaction2 = new Transaction("hamdi", "sidali", 300);
scpCoin.createTransaction(Transaction2);

console.log("\n Starting the miner...");
scpCoin.minePendingTransactions("mehdi");

console.log("\n Balance of sidali: ", scpCoin.getBalanceOfAddress("sidali"));
console.log("\n Balance of hamdi: ", scpCoin.getBalanceOfAddress("hamdi"));
console.log("\n Balance of mehdi: ", scpCoin.getBalanceOfAddress("mehdi"));

scpCoin.minePendingTransactions("mehdi");

console.log("\n Balance of sidali: ", scpCoin.getBalanceOfAddress("sidali"));
console.log("\n Balance of hamdi: ", scpCoin.getBalanceOfAddress("hamdi"));
console.log("\n Balance of mehdi: ", scpCoin.getBalanceOfAddress("mehdi"));
