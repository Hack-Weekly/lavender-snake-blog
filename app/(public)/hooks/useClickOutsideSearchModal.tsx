import { useRef, useState, useEffect } from "react";

export default function useOutsideEmojiPickerClick(initialValue: boolean){
    const ref = useRef<HTMLDivElement>(null);
    const [showSearchModal, setShowSearchModal] = useState(initialValue);
    const handleClickOutside = (event: any) => {
        if(ref.current && !ref.current.contains(event.target)) setShowSearchModal(false);
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        }
    }, [ref])

    return {showSearchModal, setShowSearchModal, ref};
}