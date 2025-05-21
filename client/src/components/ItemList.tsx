import Card from "./Card"

const ItemList = () => {
    return (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
    </div>)
}
export default ItemList