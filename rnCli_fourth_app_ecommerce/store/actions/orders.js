import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const GET_ORDERS = 'GET_ORDERS';

export const getOrders = () => {
    try {
        return async (dispatch, getState) => {
            const userID = getState().auth.userID;
            const response = await fetch(
                `https://rn-practice-ecommerce.firebaseio.com/orders/${userID}.json`
            );
            if (!response.ok) {
                throw new Error("Error occured! Response code: " + response.status);
            }

            const resData = await response.json();
            // console.log(resData);
            const loadOrders = [];
            for (const key in resData) {
                loadOrders.push(new Order(
                    key,
                    resData[key].cartItems,
                    resData[key].totalAmount,
                    resData[key].date)
                );
            }

            dispatch({
                type: GET_ORDERS,
                orders: loadOrders,
            });
        }
    } catch (err) {
        console.log("Error occured while fetching orders from firebase.---", err.message);
        throw err;
    }
};

export const addOrder = (cartItems, totalAmount) => {
    try {
        return async (dispatch, getState) => {
            const token = getState().auth.token;
            const userID = getState().auth.userID;
            const date = new Date().toISOString()
            const response = await fetch(`https://rn-practice-ecommerce.firebaseio.com/orders/${userID}.json?auth=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cartItems,
                    totalAmount,
                    date,
                })
            });
            if (!response.ok) {
                throw new Error("Error occured! Response code: " + response.status);
            }

            const resData = await response.json();
            // console.log(resData);
            dispatch({
                type: ADD_ORDER,
                orderData: {
                    id: resData.name,
                    items: cartItems,
                    amount: totalAmount,
                    date: date
                }
            });
        };
    } catch (err) {
        console.log("Error occured while adding order at firebase.---", err.message);
        throw err;
    }
};