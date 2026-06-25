import { useState } from 'react';
import styles from './contacts.module.scss';

const contactCards = [
    { icon: 'mail', label: 'Email', value: 'support@smiles-shop.com', href: 'mailto:support@smiles-shop.com' },
    { icon: 'call', label: 'Телефон', value: '+7 (900) 123-45-67', href: 'tel:+79001234567' },
    { icon: 'location_on', label: 'Адрес', value: 'г. Москва, ул. Смайликов, 1' },
];

const infoItems = [
    { icon: 'schedule', label: 'Часы работы', text: 'Пн–Пт: 9:00–20:00, Сб–Вс: 10:00–18:00' },
    { icon: 'support_agent', label: 'Поддержка', text: 'Отвечаем в течение 1 рабочего дня' },
    { icon: 'local_shipping', label: 'Доставка', text: 'Мгновенно — это же эмодзи' },
];

const Contacts = () => {
    const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'sent'

    const handleSubmit = (event) => {
        event.preventDefault();
        setStatus('sending');

        // Имитация отправки (как в исходной vanilla JS версии)
        setTimeout(() => {
            event.target.reset();
            setStatus('sent');
            setTimeout(() => setStatus('idle'), 2500);
        }, 1200);
    };

    return (
        <section className={styles.contacts}>
            <div className={styles.contacts__container}>
                <h1 className={styles.contacts__header}>Контакты</h1>
                <p className={styles.contacts__subheader}>Свяжитесь с нами любым удобным способом</p>

                <div className={styles.contacts__cards}>
                    {contactCards.map((card) => (
                        <div className={styles.contacts__card} key={card.label}>
                            <span className={`material-symbols-outlined ${styles['contacts__card-icon']}`}>{card.icon}</span>
                            <p className={styles['contacts__card-label']}>{card.label}</p>
                            {card.href ? (
                                <a className={styles['contacts__card-link']} href={card.href}>{card.value}</a>
                            ) : (
                                <p className={styles['contacts__card-value']}>{card.value}</p>
                            )}
                        </div>
                    ))}
                </div>

                <div className={styles['contacts__form-section']}>
                    <div>
                        <h2 className={styles['contacts__form-title']}>Напишите нам</h2>
                        <form className={styles.contacts__form} onSubmit={handleSubmit}>
                            <div className={styles.contacts__field}>
                                <label className={styles.contacts__label} htmlFor="contact-name">Имя</label>
                                <input className={styles.contacts__input} id="contact-name" type="text" name="name" placeholder="Ваше имя" required />
                            </div>
                            <div className={styles.contacts__field}>
                                <label className={styles.contacts__label} htmlFor="contact-email">Email</label>
                                <input className={styles.contacts__input} id="contact-email" type="email" name="email" placeholder="you@example.com" required />
                            </div>
                            <div className={styles.contacts__field}>
                                <label className={styles.contacts__label} htmlFor="contact-message">Сообщение</label>
                                <textarea className={styles.contacts__textarea} id="contact-message" name="message" placeholder="Чем можем помочь?" required />
                            </div>
                            <button className={styles.contacts__submit} type="submit" disabled={status === 'sending'}>
                                {status === 'sending' ? 'Отправляем…' : 'Отправить сообщение'}
                            </button>
                            {status === 'sent' && (
                                <p className={styles.contacts__success}>Сообщение отправлено! Мы ответим в ближайшее время 💌</p>
                            )}
                        </form>
                    </div>

                    <div className={styles['contacts__info-block']}>
                        <h2 className={styles['contacts__info-title']}>Полезно знать</h2>
                        <ul className={styles['contacts__info-list']}>
                            {infoItems.map((item) => (
                                <li className={styles['contacts__info-item']} key={item.label}>
                                    <span className={`material-symbols-outlined ${styles['contacts__info-icon']}`}>{item.icon}</span>
                                    <p className={styles['contacts__info-text']}>
                                        <span className={styles['contacts__info-label']}>{item.label}</span>
                                        {item.text}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contacts
