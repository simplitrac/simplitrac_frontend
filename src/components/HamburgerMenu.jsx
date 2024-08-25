import React, { useContext } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { AppContext } from '../context/AppContext';

const HamburgerMenu = ({ setRunTour }) => {
  const {showHamburger, setShowHamburger} = useContext(AppContext);
  
  

  const startTour = () => {
    setShowHamburger(false);
    setRunTour(true);
  };

  return (
    <Menu 
    
    >
      <a onClick={startTour}>Start Tour</a>
      {/* Add more menu items here */}
    </Menu>
  );
};

export default HamburgerMenu;