import { useNavigate } from 'react-router';
import styles from './product.module.scss';

const Product = ({ product, addToCart, isInCart }) => {
    const navigate = useNavigate();
    const inCart = isInCart(product.id);

    const handleAddToCart = (event) => {
        event.stopPropagation();
        addToCart(product);
    };

    const goToProduct = () => navigate(`/product/${product.id}`);

    return (
        <div
            className={styles.shop__product}
            onClick={goToProduct}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && goToProduct()}
        >
            <div className={styles['shop__emoji-wrap']}>
                <h2 className={styles.shop__title}>{product.title}</h2>
            </div>
            <p className={styles.shop__name}>{product.title}</p>
            <p className={styles.shop__description}>{product.description || 'Веселый смайлик, наделяет улыбкой'}</p>
            <p className={styles.shop__price}>
                Цена: <span className={styles['shop__price-value']}>{product.price} Coin</span>
            </p>
            <div className={styles['shop__button-blok']}>
                <button
                    className={`${styles.shop__button} ${inCart ? styles['shop__button--in-cart'] : ''}`}
                    onClick={handleAddToCart}
                >
                    {inCart && <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>check</span>}
                    {inCart ? 'В корзине' : 'В корзину'}
                </button>
            </div>
        </div>
    );
};

export default Product;
