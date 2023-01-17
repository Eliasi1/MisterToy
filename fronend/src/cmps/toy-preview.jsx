import { Fragment } from "react"
export function ToyPreview({toy}){
    const {name,description,_id,inStock,price,image} = toy
    const imgUrl = `${image}.png`

    return <Fragment>
        <img src={require(`../assets/img/items/${imgUrl}`)}  />
        {/* <img src={require(`../assets/img/items/${imgUrl}`)}/> */}
        <h3>{name.toUpperCase()}</h3>
        <h3>{description}</h3>
        <h3 className="price">{price}$ <span>{price+10}$</span></h3>
        <h4>in Stock: {inStock ? "Yes":"No"}</h4>
        <h4>SKU: {_id}</h4>
        </Fragment>
}