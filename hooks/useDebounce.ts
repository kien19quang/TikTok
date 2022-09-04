import React, { useEffect, useState } from 'react';

export function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState<string>(value);

    useEffect(() => {
        let handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
