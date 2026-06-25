import { useState, useRef, useCallback } from 'react';

/** Хук простого тост-уведомления с автоскрытием. */
export const useToast = (duration = 1800) => {
    const [message, setMessage] = useState('');
    const [visible, setVisible] = useState(false);
    const timeoutRef = useRef(null);

    const showToast = useCallback((text) => {
        setMessage(text);
        setVisible(true);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setVisible(false), duration);
    }, [duration]);

    return { message, visible, showToast };
};
