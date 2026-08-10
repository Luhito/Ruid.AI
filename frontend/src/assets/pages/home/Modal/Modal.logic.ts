import { useState } from "react";

export function useModal() {
    const [hidden, setHidden] = useState(true);

    const openModal = () => {
        setHidden(false);
    }
    const closeModal = () => {
        setHidden(true);
    }

    return {
        hidden,
        openModal,
        closeModal,
    };
}