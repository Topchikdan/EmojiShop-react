import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import styles from './productCard.module.scss';

const API_URL = 'https://6a3c21e6e4a07f202e167825.mockapi.io/smiles';

const ProductCard = ({ addToCart, isInCart }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'

    useEffect(() => {
        const fetchProduct = async () => {
            setStatus('loading');
            try {
                const response = await fetch(`${API_URL}/${id}`);
                if (!response.ok) {
                    throw new Error(`Сервер ответил с ошибкой: ${response.status}`);
                }
                const data = await response.json();
                setProduct(data);
                setStatus('success');
            } catch (error) {
                console.error('Не удалось загрузить товар:', error);
                setStatus('error');
            }
        };

        fetchProduct();
    }, [id]);

    if (status === 'loading') {
        return (
            <div className={styles.productCard}>
                <div className="state">
                    <span className="spinner"></span>
                    <p className="state__title">Загружаем товар…</p>
                </div>
            </div>
        );
    }

    if (status === 'error' || !product) {
        return (
            <div className={styles.productCard}>
                <div className="state">
                    <span className="material-symbols-outlined state__icon">error</span>
                    <p className="state__title">Товар не найден</p>
                    <p className="state__text">Возможно, он был удалён или ссылка указана неверно.</p>
                    <Link className={styles.productCard__backLink} to="/">
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span>
                        В магазин
                    </Link>
                </div>
            </div>
        );
    }

    const inCart = isInCart(product.id);

    return (
        <div className={styles.productCard}>
            <button className={styles.productCard__back} onClick={() => navigate(-1)}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
                Назад
            </button>
            <div className={styles.productCard__emojiWrap}>
                <div className={styles.productCard__emoji}>{product.title}</div>
            </div>
            <h1 className={styles.productCard__title}>{product.title}</h1>
            <p className={styles.productCard__description}>
                {product.description || 'Веселый смайлик, наделяет улыбкой'}
            </p>
            <p className={styles.productCard__price}>
                Цена: <span className={styles.productCard__priceValue}>{product.price} Coin</span>
            </p>
            <button
                className={`${styles.productCard__button} ${inCart ? styles['productCard__button--in-cart'] : ''}`}
                onClick={() => addToCart(product)}
            >
                {inCart && <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>check</span>}
                {inCart ? 'В корзине' : 'В корзину'}
            </button>
        </div>
    );
};

export default ProductCard;
