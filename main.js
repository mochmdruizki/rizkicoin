const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, '22/10/2021', 'Genesis Block', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false
            }
        }

        return true;
    }
}

let rizkiCoin = new BlockChain();
rizkiCoin.addBlock(new Block(1, '23/10/2021', { amount: 4 }));
rizkiCoin.addBlock(new Block(2, '25/10/2021', { amount: 10 }));

console.log(JSON.stringify(rizkiCoin, null, 4));
console.log('is blockchain valid? ', rizkiCoin.isChainValid());

rizkiCoin.chain[1].data = { amount: 20 };

console.log('is blockchain valid? ', rizkiCoin.isChainValid());