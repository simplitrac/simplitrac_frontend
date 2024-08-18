import React from 'react';
import Joyride, { STATUS } from 'react-joyride';

const steps = [
  {
    target: '.landing-header',
    content: 'Welcome to SimpliTrac! This is a simple to use financial tracker that allows you to record expenses on the go.',
    disableBeacon: true,
  },
  {
    target: '.buttons-container button:nth-child(2)',
    content: 'With our intuitive AI-driven camera setup, you can snap pictures of your receipts on the fly and record your daily expenses.',
  },
  {
    target: '.landing-content',
    content: 'You can manually enter your expenses on the main page with our easy to use Expense Table.',
  },
  {
    target: '.buttons-container button:nth-child(3)',
    content: 'See where your money is going in real time with our handy Chart feature.',
  },
  {
    target: '.buttons-container button:nth-child(4)',
    content: 'Use the Edit Transaction function to correct any errors in your expense processing.',
  },
  {
    target: 'body',
    content: 'Be sure to check your achievements tab to see how you rank among other users and earn badges while maintaining financial peace of mind!',
    placement: 'center',
  },
];

const JoyrideTour = ({ run, setRun }) => {
  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false);
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
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