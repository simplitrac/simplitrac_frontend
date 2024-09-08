import React, { useContext } from 'react';
import Joyride, { STATUS } from 'react-joyride';
import { AppContext } from '../context/AppContext.jsx';

const steps = [
  {
    target: 'body',
    content: 'Welcome to the Edit Transactions page. Here you can modify your existing transactions or delete them if needed.',
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="transaction-list"]',
    content: 'This is the list of your recorded transactions. Each row represents a single transaction.',
  },
  {
    target: '[data-tour="date-field"]',
    content: 'You can modify the date of the transaction here. Click to open a calendar and select a new date.',
  },
  {
    target: '[data-tour="vendor-field"]',
    content: 'Edit the vendor name in this field. This is where you purchased the item or service.',
  },
  {
    target: '[data-tour="amount-field"]',
    content: 'Adjust the transaction amount here. Make sure to use the correct decimal format.',
  },
  {
    target: '[data-tour="category-field"]',
    content: 'You can change the category of the transaction using this dropdown menu. Choose the most appropriate category.',
  },
  {
    target: '[data-tour="delete-button"]',
    content: 'If you want to remove a transaction completely, use this delete button. Be careful, as this action cannot be undone!',
  },
  {
    target: '[data-tour="save-changes"]',
    content: 'After making your edits, don\'t forget to save your changes by clicking this button.',
  },
  {
    target: '[data-tour="cancel-button"]',
    content: 'If you want to discard your changes and return to the main page, use this cancel button.',
  },
  {
    target: 'body',
    content: 'That\'s it! You now know how to edit, delete, and manage your transactions. Remember to save your changes before leaving the page.',
    placement: 'center',
  },
];

const EditTransactionsJoyride = () => {
  const { runEditTransactionsTour, setRunEditTransactionsTour } = useContext(AppContext);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunEditTransactionsTour(false);
    }
  };

  return (
    <Joyride
      steps={steps}
      run={runEditTransactionsTour}
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

export default EditTransactionsJoyride;