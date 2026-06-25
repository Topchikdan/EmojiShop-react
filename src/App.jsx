import Header from './components/header'
import Footer from './components/footer'
import Home from './pages/home'
import Contacts from './pages/contacts'
import Cart from './pages/cart'
import ProductCard from './components/productCard'
import { Routes, Route } from 'react-router'
import { useCart } from './hooks/useCart'


function App() {

  // вся логика корзины (добавление/удаление/количество/localStorage) — в хуке useCart
  const {
    cart,
    addToCart,
    plusCart,
    minusCart,
    deleteCart,
    clearCart,
    isInCart,
    cartCount,
    cartTotal,
  } = useCart()

  return (
    <>
      <Header cartCount={cartCount} />

      <div className="page-content">
        <Routes>
          <Route path='/' element={<Home addToCart={addToCart} isInCart={isInCart} />} />
          <Route path='/product/:id' element={<ProductCard addToCart={addToCart} isInCart={isInCart} />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route
            path='/cart'
            element={
              <Cart
                cart={cart}
                plusCart={plusCart}
                minusCart={minusCart}
                deleteCart={deleteCart}
                clearCart={clearCart}
                cartTotal={cartTotal}
              />
            }
          />
        </Routes>
      </div>

      <Footer />
    </>
  )
}

export default App
