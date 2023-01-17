import { ToyList } from '../cmps/toy-list.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { store } from "../store/store.js"
import { useEffect, useState } from 'react'
import { loadToys, removeToy, addToy } from '../store/toy.action.js'
import { ToyAdd } from '../cmps/toy-add.jsx'
import { ToyFilter } from '../cmps/toy-filter.jsx'
import { toyService } from '../service/toy.service.js'


export function ToyIndex() {

    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const [filters, setFilters] = useState(toyService.getDefaultFilter())
    const [isSignedup, setIsSignedUp] = useState()
    const [labels, setLabels] = useState([])
    const [isPostShow, setIsPostShow] = useState(false)


    useEffect(() => {
        onLoadToys(filters).then(() => _generateLabelsList())
    }, [isPostShow, filters])

    function _generateLabelsList() {
        let labelList = toys.reduce((acc, toy) => {
            toy.labels.forEach(label => {
                if (!acc.includes(label)) acc.push(label)
            });
            return acc
        }, [])
        setLabels(labelList)
    }

    function onPostSubmit(ev) {
        ev.preventDefault()
        const { name, price, inStock } = ev.target
        addToy(name.value, +price.value, inStock.checked)
        onTogglePostToy()
    }

    function onTogglePostToy() {
        setIsPostShow((prevState) => !prevState)
    }

    function onLoadToys(filters) {
        return loadToys(filters)
    }

    function onSetFilters(filterBy) {
        setFilters(filterBy)
    }

    function onRemoveToy(toyId) {
        return removeToy(toyId)
    }

    function onEditToy() {
        console.log("editing")
    }

    function addToCart() {
        console.log("adding to cart")
    }

    function onTogglePostToy() {
        setIsPostShow((prevState) => !prevState)
    }

    function onLogin(){}

    return <section className="toys-list">
        <div className='flex'>
            <button className="add-btn" role="button" onClick={onTogglePostToy}>post a toy</button>
            {isPostShow && <ToyAdd onTogglePostToy={onTogglePostToy} onPostSubmit={onPostSubmit} />}
        </div>
        <ToyFilter onSetFilters={onSetFilters} labels={labels} />
        <ToyList toys={toys} onRemoveToy={onRemoveToy} onEditToy={onEditToy} addToCart={addToCart} />
    </section>
}