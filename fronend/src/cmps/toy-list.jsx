import {ToyPreview} from './toy-preview.jsx'

export function ToyList({toys, onRemoveToy, onEditToy, addToCart}){
    return <ul className='toy-list'>
        {toys.map((toy) =>
            <li className="toy-preview" key={toy._id}>
            <ToyPreview  toy={toy} />

            <div>
                <button onClick={() => { onRemoveToy(toy._id) }}>x</button>
                <button onClick={() => { onEditToy(toy) }}>Change price</button>
            </div>

            <button className="buy" onClick={() => { addToCart(toy) }}>
                Add to Cart
            </button>
        </li>)}


    </ul>
}