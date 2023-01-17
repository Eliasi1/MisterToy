import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

async function query(filterBy = getDefaultFilter()) {
    // let toys = await httpService.get('toy', { params: { ...filterBy } })
    let toys = await httpService.get('toy')

    if (filterBy.text) {
        const regex = new RegExp(filterBy.text, 'i')
        toys = toys.filter(toy => regex.test(toy.name))
    }
    if (filterBy.maxPrice) {
        toys = toys.filter(toy => toy.price <= filterBy.maxPrice)
    }
    if (filterBy.inStock) {
        toys = toys.filter(toy => toy.inStock)
    }
    if (filterBy.labels.length > 0) {
        console.log(filterBy.labels)
        toys = [...toys].filter((toy) => {
            let filterLables = filterBy.labels
            let toyLables = toy.labels
            return toyLables.some(label => filterLables.includes(label))
        })

    }
    switch (filterBy.sortBy) {
        case 'createdAt':
            toys.sort((a, b) => a.createdAt - b.createdAt)
            break
        case 'price':
            toys.sort((a, b) => a.price - b.price)
            break
        case 'name':
            toys.sort((a, b) => a.name.localeCompare(b.name))
            break
    }
    return toys
}


async function getById(_id) {
    return await httpService.get(`toy/${_id}`)
}


async function save(toy) {
    if (toy._id) {
        return await httpService.put(`toy/${toy._id}`, toy)
    } else {
        console.log("processing")
        return await httpService.post('toy', toy)
    }
}

async function remove(toyId) {
    // return query().then((toys) => toys.filter((toy) => toy._id !== toyId)).then((toys) => {
    //     localStorage.setItem(STORAGE_KEY, JSON.stringify(toys))
    // })
    console.log("removing ", toyId)
    return await httpService.delete(`toy/${toyId}`)

}

 function getEmptyToy() {
    return { name: '', price: null, inStock: true, labels : [], image: utilService.getRandomIntInclusive(1, 60) }
}

function getDefaultFilter() {
    return { text: '', price: 0, inStock: false, sortBy: 'createdAt', labels: [] }
}
