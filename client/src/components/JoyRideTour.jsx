import React, { useContext } from 'react';
import Joyride, { STATUS } from 'react-joyride';
import { AppContext } from '../context/AppContext';

const steps = [
  {
    target: 'body',
    content: 'Welcome to SimpliTrac! This is a simple-to-use financial tracker that allows you to record expenses on the go.',
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '.chakra-container',
    content: 'This is your main dashboard where you can view, manage and manually enter your expenses.',
  },
  {
    target: '[data-tour="scan-receipt"]',
    content: 'Use our intuitive AI-driven camera to snap pictures of your receipts and record expenses instantly.',
  },
  {
    target: '[data-tour="edit-transactions"]',
    content: 'Easily modify or correct any of your recorded expenses here.',
  },
  {
    target: 'body',
    content: 'Be sure to check your achievements tab to see how you rank among other users and earn badges while maintaining financial peace of mind!',
    placement: 'center',
  },
];
const JoyrideTour = () => {
 
  const { runTour, setRunTour } = useContext(AppContext)

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunTour(false);
    }
  };
  return (
    <Joyride
      steps={steps}
      run={runTour}
      continuous={true}
      showSkipButton={true}
      showProgress={true}
      styles={{
        options: {
          zIndex: 10000,
        },
      }}
      callback={handleJoyrideCallback}
    />
  );
};
export default JoyrideTour;