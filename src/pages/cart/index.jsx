import { Link } from 'react-router';
import styles from './cart.module.scss'


const Cart = ({ cart, plusCart, minusCart, deleteCart, clearCart, cartTotal }) => {

    if (cart.length === 0) {
        return (
            <section className={styles['cart-page']}>
                <div className={styles['cart-page__container']}>
                    <h1 className={styles['cart-page__header']}>Корзина</h1>
                    <div className={`state ${styles['cart-page__empty']}`}>
                        <span className="material-symbols-outlined state__icon">shopping_bag</span>
                        <p className="state__title">Корзина пуста</p>
                        <p className="state__text">Загляните в магазин — там есть отличные смайлики!</p>
                        <Link className={styles['cart-page__back-link']} to="/">
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span>
                            В магазин
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    const totalCount = cart.reduce((sum, item) => sum + item.amount, 0);

    return (
        <section className={styles['cart-page']}>
            <div className={styles['cart-page__container']}>
                <h1 className={styles['cart-page__header']}>Корзина</h1>
                <p className={styles['cart-page__subheader']}>{totalCount} {totalCount === 1 ? 'товар' : 'товара'} в корзине</p>

                <div className={styles['cart-page__layout']}>
                    <div className={styles['cart-page__items']}>
                        {cart.map((product) => (
                            <div className={styles['cart-page__item']} key={product.id}>
                                <div className={styles['cart-page__item-emoji']}>{product.title}</div>
                                <div className={styles['cart-page__item-info']}>
                                    <p className={styles['cart-page__item-name']}>{product.title}</p>
                                    <p className={styles['cart-page__item-desc']}>{product.description}</p>
                                    <div className={styles['cart-page__item-amount']}>
                                        <button onClick={() => minusCart(product.id)} aria-label="Уменьшить количество">-</button>
                                        <span>{product.amount}</span>
                                        <button onClick={() => plusCart(product.id)} aria-label="Увеличить количество">+</button>
                                        <p className={styles['cart-page__item-price']}>{product.price * product.amount} Coin</p>
                                    </div>
                                </div>
                                <button
                                    className={styles['cart-page__item-remove']}
                                    onClick={() => deleteCart(product.id)}
                                    aria-label={`Убрать ${product.title}`}
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className={styles['cart-page__summary']}>
                        <h2 className={styles['cart-page__summary-title']}>Итого</h2>
                        <div className={styles['cart-page__summary-row']}>
                            <span className={styles['cart-page__summary-label']}>Товаров</span>
                            <span className={styles['cart-page__summary-val']}>{totalCount} шт.</span>
                        </div>
                        <div className={`${styles['cart-page__summary-row']} ${styles['cart-page__summary-row--total']}`}>
                            <span className={styles['cart-page__summary-label']}>Сумма</span>
                            <span className={styles['cart-page__summary-val']}>{cartTotal} Coin</span>
                        </div>
                        <button className={styles['cart-page__checkout-btn']}>
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>shopping_cart_checkout</span>
                            Оформить заказ
                        </button>
                        <button className={styles['cart-page__clear-btn']} onClick={clearCart}>
                            Очистить корзину
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Cart
