import { useState } from "react";

export const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing((state) => !state);
  };

  return {
    isModalOpen: isShowing,
    toggleModal: toggle,
  };
};
