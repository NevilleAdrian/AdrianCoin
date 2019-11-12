const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain')
const Block = require('./block')

const app = express();

app.use(express.static('static'))
app.use(bodyParser.json())

const adrianchain = new Blockchain();

const createAllBlocks = () => {
    for (i = 0; i < 5; i++) {
        adrianchain.addNewBlock(new Block({sender: 'Neville', receiver: 'Adrian', Message: `Block ${adrianchain.chain.length} has been added to the chain`}))
    }
    return adrianchain.chain;
}



const chains = createAllBlocks()

const createNewBlock = (block) =>{
    block.Message = `Block ${adrianchain.chain.length + 1} has been added to the chain`
    const addedBlock = adrianchain.addNewBlock(new Block(block))
    return addedBlock;
}


app.get('/', (req, res) => {
    return res.send();
})

app.get('/blocks', (req, res) => {
    chains;
    return res.json(chains);
})

app.post('/blocks', (req, res) => {
    console.log(req)
    const body = req.body;
    const block = createNewBlock(body)
    return res.json(block)
})

const PORT = 3001;

app.listen(PORT, () => console.log(`App running on port ${PORT}`))