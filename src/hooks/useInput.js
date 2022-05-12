import React, { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export default function useInput(key, initialValue) {
    const [value, setValue] = useLocalStorage(key, initialValue || "");

    const resetUser = () => setValue(initialValue);

    const attributeObj = {
        value,
        onChange: (e) => setValue(e.target.value),
    };

    return [value, resetUser, attributeObj];
}
