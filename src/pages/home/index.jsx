import Products from '../../components/products'

const Home = ({ addToCart, isInCart }) => {
    return <div>
        <Products addToCart={addToCart} isInCart={isInCart} />
    </div>
}

export default Home
