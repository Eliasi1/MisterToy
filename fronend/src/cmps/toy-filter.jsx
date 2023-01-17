import Select from 'react-select'
import makeAnimated from 'react-select/animated';

import { useEffect, useRef, useState } from "react"
import { toyService } from "../service/toy.service.js"
import { utilService } from "../service/util.service.js"

export function ToyFilter({ onSetFilters, labels }) {

    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())

    const elInputRef = useRef(null)

    const animatedComponents = makeAnimated()

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        // update father cmp that filters change very type
        let timer
        clearTimeout(timer)
        timer = setTimeout(() => { onSetFilters(filterByToEdit) }, 300)

    }, [filterByToEdit])

    // function _generateLabelOption(optionList) {
    //     let rows = []
    //     for (let i = 0; i < optionList.length; i++) {
    //         rows.push(<option key={i} value={optionList[i]}>{optionList[i]}</option>)
    //     }
    //     return rows
    // }
    function _generateLabelList(optionList) {
        let rows = []
        for (let i = 0; i < optionList.length; i++) {
            rows.push({ value: optionList[i], label: optionList[i] })
        }
        return rows
    }

    function handleFilterChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        value = (type === 'checkbox') ? target.checked : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        onSetFilters(filterByToEdit)
    }

    function handleSortByChange({ target }) {
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, sortBy: target.value }))
    }

    function handleCategoryChange(ev) {
        let selected = []
        ev.forEach((single) => selected.push(single.value) )
        setFilterByToEdit((prevFilter) => ({...prevFilter, labels: selected}))
    }
    return <section className="toy-filter full main-layout">
        <h2>Toys Filter</h2>
        <form onSubmit={onSubmitFilter}>
            <label htmlFor="name">Name:</label>
            <input type="text"
                id="text"
                name="text"
                placeholder="By name"
                value={filterByToEdit.text}
                onChange={handleFilterChange}
                ref={elInputRef}
            />

            <label htmlFor="maxPrice">Max price:</label>
            <input type="number"
                id="maxPrice"
                name="maxPrice"
                placeholder="By max price"
                value={filterByToEdit.maxPrice}
                onChange={handleFilterChange}
            />
            <label htmlFor="inStock">in stock</label>
            <input type='checkbox'
                id="inStock"
                name="inStock"
                onChange={handleFilterChange}
            />
            <label htmlFor="labels">Select Categories</label>
            {/* <select name="labels" onChange={handleFilterChange}>
                <option value={[]}>All</option>
                {_generateLabelOption(labels)}
            </select> */}
            <Select
                className="basic-multi-select"
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={[]}
                options={_generateLabelList(labels)}
                onChange={handleCategoryChange}
                isMulti>
            </Select>

            <label htmlFor="sortBy">Sort By</label>
            <select name="sortBy" onChange={handleSortByChange}>
                <option value='createdAt'>Create time</option>
                <option value='name'>Name</option>
                <option value='price'>Price</option>
            </select>
        </form>

    </section>
}