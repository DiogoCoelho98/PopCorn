import { useEffect } from "react";

export default function useKey(key, func) {
    useEffect(() => {
        const callBack = (event) => {
            if (event.code.toLowerCase() === key.toLowerCase()) return func();
        }
        document.addEventListener("keydown", callBack);
    
        return function() {
            return document.removeEventListener("keydown", callBack);
        }
    }, [key, func]);
}
