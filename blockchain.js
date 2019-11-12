const Block = require('./block')


class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock() {
        const genesisDate = '09/28/1994';
        return new Block('Genesis Block', 0, genesisDate, '0')
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addNewBlock(newBlock) {
        newBlock.previousHash = this.getLastBlock().hash
        newBlock.index = this.getLastBlock().index + 1;
        newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty)
        this.chain.push(newBlock)
    }

    isChainValid() {
        const chain = this.chain;
    
        for(let i = 0; i < chain.length; i++ ) {
            if (chain[i].hash !== chain[i].calculateHash()) {
                 console.log(`Block ${i} has been corrupted`)
                 return false
            }
            if (i > 0 && chain[i].previousHash !== chain[i - 1].hash) {
             console.log(`Block ${i - 1} has been corrupted`)
             return false
           }
        }

        console.log('Chain is Valid');
        return true
    
    }
}







//adrianchain.chain[3].data = {sender: 'Neville', receiver: 'Adrian', Message: 'Block has been tempered with'}
// adrianchain.chain.forEach((block) => {
//     console.log(block)
// })
module.exports = Blockchain;
