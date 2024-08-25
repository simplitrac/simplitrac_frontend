import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';

const HamburgerMenu = ({ setRunTour }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleStateChange = (state) => {
    setIsOpen(state.isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const startTour = () => {
    setRunTour(true);
    closeMenu();
  };

  return (
    <Menu 
      isOpen={isOpen}
      onStateChange={handleStateChange}
    >
      <a onClick={startTour}>Start Tour</a>
      {/* Add more menu items here */}
    </Menu>
  );
};

export default HamburgerMenu;