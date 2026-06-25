import { useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router';
import styles from './header.module.scss'

function Header({ cartCount = 0 }) {
    const countRef = useRef(null);
    const prevCount = useRef(cartCount);

    useEffect(() => {
        if (countRef.current && prevCount.current !== cartCount) {
            countRef.current.classList.remove(styles['header__count--bump']);
            requestAnimationFrame(() => {
                countRef.current?.classList.add(styles['header__count--bump']);
            });
        }
        prevCount.current = cartCount;
    }, [cartCount]);

    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <nav className={styles.header__menu}>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? `${styles.header__link} ${styles['header__link--active']}` : styles.header__link
                        }
                        to="/"
                        end
                    >
                        Главная
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? `${styles.header__link} ${styles['header__link--active']}` : styles.header__link
                        }
                        to="/contacts"
                    >
                        Контакты
                    </NavLink>
                </nav>
                <Link className={styles.header__cart} to="/cart" aria-label="Корзина">
                    <span className={`material-symbols-outlined ${styles['header__cart-icon']}`}>shopping_bag</span>
                    <p className={styles.header__count} ref={countRef}>{cartCount}</p>
                </Link>
            </div>
        </header>
    )
}

export default Header;
