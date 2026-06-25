import { useEffect, useState } from 'react';
import Product from '../product';
import Toast from '../toast';
import { useToast } from '../../hooks/useToast';
import styles from './products.module.scss'

const API_URL = 'https://6a3c21e6e4a07f202e167825.mockapi.io/smiles';

function Products({ addToCart, isInCart }) {

    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
    const { message, visible, showToast } = useToast();

    useEffect(() => {
        const fetchData = async () => {
            setStatus('loading');
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`Сервер ответил с ошибкой: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
                setStatus('success');
            } catch (error) {
                console.error('Не удалось получить список товаров:', error);
                setStatus('error');
            }
        };

        fetchData();
    }, []);

    const handleAddToCart = (product) => {
        const wasInCart = isInCart(product.id);
        addToCart(product);
        showToast(wasInCart ? 'Количество увеличено' : 'Добавлено в корзину');
    };

    const normalizedQuery = searchQuery.trim().toLowerCase();
    const filteredProducts = normalizedQuery
        ? products.filter(({ title, description }) =>
              title.toLowerCase().includes(normalizedQuery) ||
              (description ?? '').toLowerCase().includes(normalizedQuery)
          )
        : products;

    const renderContent = () => {
        if (status === 'loading') {
            return (
                <div className="state">
                    <span className="spinner"></span>
                    <p className="state__title">Загружаем смайлики…</p>
                </div>
            );
        }

        if (status === 'error') {
            return (
                <div className="state">
                    <span className="material-symbols-outlined state__icon">error</span>
                    <p className="state__title">Не удалось загрузить товары</p>
                    <p className="state__text">Проверьте подключение к интернету и попробуйте обновить страницу.</p>
                </div>
            );
        }

        if (filteredProducts.length === 0) {
            return (
                <div className="state">
                    <span className="material-symbols-outlined state__icon">search_off</span>
                    <p className="state__title">Ничего не найдено</p>
                    <p className="state__text">По запросу «{searchQuery}» смайликов не нашлось. Попробуйте другой запрос.</p>
                </div>
            );
        }

        return filteredProducts.map((product) => (
            <Product key={product.id} product={product} addToCart={handleAddToCart} isInCart={isInCart} />
        ));
    };

    return (
        <section className={styles.shop}>
            <div className={styles.shop__container}>
                <div className={styles.shop__top}>
                    <h2 className={styles.shop__header}>Магазин смайликов</h2>
                    <div className={styles['shop__search-wrap']}>
                        <span className={`material-symbols-outlined ${styles['shop__search-icon']}`} aria-hidden="true">search</span>
                        <input
                            className={styles.shop__search}
                            type="text"
                            placeholder="Поиск смайликов"
                            aria-label="Поиск смайликов"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                        />
                    </div>
                </div>
                {status === 'success' && (
                    <p className={styles.shop__count}>
                        {filteredProducts.length === products.length
                            ? `Всего товаров: ${products.length}`
                            : `Найдено: ${filteredProducts.length} из ${products.length}`}
                    </p>
                )}
                <div className={styles.shop__products}>
                    {renderContent()}
                </div>
            </div>
            <Toast message={message} visible={visible} />
        </section>
    )
}

export default Products;
