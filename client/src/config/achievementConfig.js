import badge1 from '../../../public/assets/icons/badge_1.png';

const achievementConfig = {
    transactions: [
        {
            check: (value) => value?.length >= 1,
            data: {
                id: 'first_transaction',
                title: 'First Transaction',
                description: 'Completed your first transaction',
                icon: badge1
            }
        },
        {
            check: (value) => value?.length >= 10,
            data: {
                id: 'ten_transactions',
                title: 'Ten Transactions',
                description: 'Completed ten transactions',
                icon: badge1
            }
        },
    ],
    categories: [
        {
            check: (value) => value?.length >= 1,
            data: {
                id: 'first_category',
                title: 'First Category',
                description: 'Created your first category',
                icon: badge1
            }
        },
        {
            check: (value) => value?.length >= 5,
            data: {
                id: 'five_categories',
                title: 'Five Categories',
                description: 'Created five categories',
                icon: badge1
            }
        },
    ],
};

export default achievementConfig;