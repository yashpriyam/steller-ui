import { useState } from 'react'

export const useDebounce = (value, delay) => {
    const [debouncedCallBack] = useState(() => debounce(value, delay));
    function debounce(func, timeout = 0) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.call(this, ...args); }, timeout);
        };
    };
    return debouncedCallBack;
}
