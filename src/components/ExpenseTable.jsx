// ExpenseTable.js
import { useState } from 'react';
import CameraComponent from './../components/CameraComponent.jsx';

const ExpenseTable = () => {
    const [view, setView] = useState('table'); // 'table', 'details', 'camera'

    // Function to switch back to the table view
    const handleBack = () => {
        setView('table');
    };

    const renderContent = () => {
        switch (view) {
            case 'details':
                // Placeholder for the detailed view component
                // return <DetailedExpenseView onBack={handleBack} />;
                return <p>Details View Placeholder</p>;
            case 'camera':
                return <CameraComponent onBack={handleBack} />;
            case 'table':
            default:
                return (
                    <div style={styles.container}>
                        <div style={styles.topSection}>
                            <p style={styles.topSectionText}>Top Section (Add content here later)</p>
                        </div>
                        <div style={styles.bottomSection}>
                            <div style={styles.buttonContainer}>
                                <button onClick={() => setView('details')}>Show Details</button>
                            </div>
                            <div style={styles.buttonContainer}>
                                <button onClick={() => setView('camera')}>Camera</button>
                            </div>
                            <div style={styles.buttonContainer}>
                                <button onClick={() => alert('Button 3 pressed')}>Button 3</button>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return renderContent();
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        height: '100vh',
    },
    topSection: {
        flex: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e9ecef',
        marginBottom: '20px',
        padding: '20px',
        borderRadius: '10px',
    },
    topSectionText: {
        fontSize: '18px',
        color: '#495057',
    },
    bottomSection: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#dee2e6',
        padding: '10px',
        borderRadius: '10px',
    },
    buttonContainer: {
        flex: 1,
        margin: '5px',
    },
};

export default ExpenseTable;
