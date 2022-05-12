import React, { useEffect, useState } from "react";

const getLocalValue = (key, initialValue) => {
    if (typeof window === undefined) return initialValue;

    const localValue = JSON.parse(localStorage.getItem(key));
    if (localValue) return localValue;

    if (initialValue instanceof Function) return initialValue();

    return initialValue;
};

export const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => getLocalValue());

    useEffect(() => {
        console.log(key, value);
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};
