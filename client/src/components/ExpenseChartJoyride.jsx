import React, { useContext } from 'react';
import Joyride, { STATUS } from 'react-joyride';
import { AppContext } from '../context/AppContext';

const steps = [
  {
    target: 'body',
    content: 'Welcome to the Expense Chart! This guide will walk you through the features of this powerful visualization tool.',
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '#report-frame',
    content: 'This is your expense chart. It provides a detailed view of your spending patterns.',
  },
  {
    target: '#report-frame',
    content: 'In the top left corner, you can switch between Mobile and Desktop views.',
  },
  {
    target: '#report-frame',
    content: 'The three-dot menu in the top right allows you to export your data in various formats.',
  },
  {
    target: '#report-frame',
    content: 'Use the date range selector at the top to filter your expenses for specific time periods.',
  },
  {
    target: 'body',
    content: 'Explore your spending patterns and gain insights into your financial habits. Remember to refer back to these features as you use the chart!',
    placement: 'center',
  },
];

const ExpenseChartJoyride = () => {
  const { runChartTour, setRunChartTour } = useContext(AppContext);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunChartTour(false);
    }
  };

  return (
    <Joyride
      steps={steps}
      run={runChartTour}
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

export default ExpenseChartJoyride;