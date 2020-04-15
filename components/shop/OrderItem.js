import React, {useState} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import Colors from "../../constants/Colors";
import CartItem from "./CartItem";
import Card from "../ui/Card";

/**
 * Created by Doa on 12-4-2020.
 */
const OrderItem = ({order}) => {

    const [showDetails, setShowDetails] = useState(false);

    return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${order.totalAmount.toFixed(2)}</Text>
                <Text style={styles.date}>{order.readableDate}</Text>
            </View>
            <Button
                title={showDetails ? "Hide Details" : "Show Details"}
                color={Colors.primary}
                onPress={() => setShowDetails(prevState => !prevState)}/>
            {showDetails && <View style={styles.detailItems}>
                {order.items.map(cartItem =>
                    <CartItem
                        key={cartItem.productId}
                        item={cartItem}/>)}
            </View>}
        </Card>
    )
};

const styles = StyleSheet.create({
    orderItem: {
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888'
    },
    detailItems: {
        width: '100%'
    }
});

export default OrderItem;