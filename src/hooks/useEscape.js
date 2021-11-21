import { useEffect } from 'react'

export const useEscape = (callback) => {
    useEffect(() => {
        const onClickEscHandler = (e) => {
            if (e.keyCode === 27) callback()
        }
        window.addEventListener('keydown', onClickEscHandler)
        return () => {
            window.removeEventListener('keydown', onClickEscHandler)
        }
    }, [callback])
}