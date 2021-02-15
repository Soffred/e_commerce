import React from 'react';
import {Typography, CardElement, ElementsConsumer} from '@stripe/react-stripe-js';
import {loadStrip, loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('...');

const PaymentForm = ({backStep}) =>{
    return (
        <>
        <Elements stripe={stripePromise}>
        <ElementsConsumer>
            {({elements, stripe}) =>(
                <form>
                    <CardElement/>
                    <br/> <br/>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button variant="outlined" onClick={backStep}>Back</Button>
                        <Button type="submit" variant="contained" disabled={!stripe} color="primary">Pay</Button>

                    </div>
                </form>
            )}
        </ElementsConsumer>
        </Elements>
        
        </>
    );
}

export default PaymentForm;