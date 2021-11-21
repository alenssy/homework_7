import { useEffect } from 'react'

export const useOutsideClick = (ref, callback) => {
    useEffect(() => {
        const handleClick = (e) => {
            e.stopPropagation()
            if (!ref.current || ref.current.contains(e.target)) {
                return;
            }
            callback()
        }
        document.addEventListener("mousedown", handleClick);
        document.addEventListener("touchstart", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
            document.removeEventListener("touchstart", handleClick);
        };
    })
}