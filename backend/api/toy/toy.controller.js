const toyService = require('./toy.service.js')
const logger = require('../../services/logger.service.js')

async function getToys(req,res){
    try{
        console.log("hi")
        logger.debug('getting Toys')
        console.log(req.query.params)
        // const filterBy = {
        //     name: req.query.params.name || '',
        //     price: req.query.params.price || Infinity,
        //     sortBy: req.query.params.sort || '',
        //     labels:req.query.params.labels ||[]
        //   }
      
        const toys = await toyService.query()
        res.json(toys)
    } catch (err) {
        console.log('failed to get toys',err)
        res.status(500).send({err: 'Failed to get toys'})
    }
}

async function getToy(req,res){
    const toy = await toyService.query()
    res.json(toy)
}

async function getToyById(){}

async function addToy(){}

async function updateToy(){}

async function removeToy(){}

module.exports = {
    getToy,
    getToys,
    getToyById,
    addToy,
    updateToy,
    removeToy
}