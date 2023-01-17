import {toyService} from '../service/toy.service.js'
import {store} from '../store/store.js'
import {REMOVE_TOY, ADD_TOY, UPDATE_TOY, UNDO_REMOVE_TOY, SET_IS_LOADING, SET_TOYS} from '../store/toy.reducer.js'


export async function loadToys(filterBy){
    store.dispatch({typeof: SET_IS_LOADING, isLoading:true})
    return toyService.query(filterBy).then((toys)=>{
        store.dispatch( {type: SET_TOYS, toys})
    })

}

export function removeToy(toyId){
    return toyService.remove(toyId).then(() =>{
        store.dispatch({type: REMOVE_TOY, toyId})
    })
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