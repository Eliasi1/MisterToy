import {toyService} from '../service/toy.service.js'
import {store} from '../store/store.js'
import {REMOVE_TOY, ADD_TOY, UPDATE_TOY, UNDO_REMOVE_TOY, SET_IS_LOADING, SET_TOYS} from '../store/toy.reducer.js'


export async function loadToys(filterBy){

    const toys = await toyService.query(filterBy)
    store.dispatch({type: SET_TOYS, toys})
    return toys
}

export async function removeToy(toyId){
    // return toyService.remove(toyId).then(() =>{
    //     store.dispatch({type: REMOVE_TOY, toyId})
    // })
    const toy = await toyService.remove(toyId)
    store.dispatch({type: REMOVE_TOY, toyId})
    return toy
}

export function addToy(name, price, inStock){
    console.log(`adding: ${name},${price},${inStock}`)
    let toy = toyService.getEmptyToy()
    toy.name = name
    toy.price = +price
    toy.inStock = inStock

    return toyService.save(toy)
    .then((toy) =>{
        console.log("succesfully added to database, dispatching: ", toy)
        return store.dispatch({type: ADD_TOY, toy})
    })
}