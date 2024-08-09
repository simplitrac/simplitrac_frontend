const achievementConfig = {
    transactions: [
        {
            check: (value) => value.length >= 1,
            data: {
                id: 'first_transaction',
                title: 'First Transaction',
                description: 'Completed your first transaction',
                icon: './src/assets/icons/badge_1.png'
            }
        },
        {
            check: (value) => value.length >= 10,
            data: {
                id: 'ten_transactions',
                title: 'Ten Transactions',
                description: 'Completed ten transactions',
                icon: './src/assets/icons/badge_1.png'
            }
        },
    ],
    categories: [
        {
            check: (value) => value.length >= 1,
            data: {
                id: 'first_category',
                title: 'First Category',
                description: 'Created your first category',
                icon: './src/assets/icons/badge_1.png'
            }
        },
        {
            check: (value) => value.length >= 5,
            data: {
                id: 'five_categories',
                title: 'Five Categories',
                description: 'Created five categories',
                icon: './src/assets/icons/badge_1.png'
            }
        },
    ],
};

export default achievementConfig;