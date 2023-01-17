export function ToyAdd({ onTogglePostToy, onPostSubmit }) {


    return <form className="post-container flex" onSubmit={onPostSubmit}>
        <input
            className="text-input"
            type='text'
            name='name'
            placeholder="Enter name" />
        <input
            className="text-input"
            type='number'
            name='price'
            placeholder="Enter price" />
        <label htmlFor="inStock">in stock</label>
        <input type='checkbox'
            id="inStock"
            name="inStock" />
        <button>Submit</button>
        <button onClick={onTogglePostToy}>Cancel</button>
    </form>
}