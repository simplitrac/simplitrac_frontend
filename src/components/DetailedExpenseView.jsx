import { View, Text, Button, StyleSheet } from 'react-native';

const DetailedExpenseView = ({ onBack }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Detailed Expense View</Text>
            <Button title="Back" onPress={onBack} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e9ecef',
        padding: 20,
        borderRadius: 10,
    },
    text: {
        fontSize: 18,
        color: '#495057',
        marginBottom: 20,
    },
});

export default DetailedExpenseView;
