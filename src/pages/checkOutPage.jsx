import React, { useEffect, useState } from 'react'
import Banner from '../comopnents/banner'
import CheckoutForm from '../comopnents/checkoutForm';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import stripe from "stripe";

const stripePromise = loadStripe("pk_test_51Qff5rSCkjXRURrpSeuQrqFUxXBFKwxtmwZyF0TCfjikiMNZre1wBgEXdtdQZoFmfCO1GWeNWyupr0z87kLYsKze00JeaAePbI");

export default function CheckOutPage() {

    const [clientSecret, setClientSecret] = useState("");
    const strp = stripe('sk_test_51Qff5rSCkjXRURrpD0WCUngMWDzqiZf0MogOK62AooxpQcingM3DKkF05KRtpTjqmXnZnhiQYfcfha6Wz6DKjEDI00zSrVlx2m')

    useEffect(() => {
        (async function () {
            // Create PaymentIntent as soon as the page loads
            try {
                let data = await strp.paymentIntents.create({
                    description: 'Software development services',
                    shipping: {
                        name: 'Jenny Rosen',
                        address: {
                            line1: '510 Townsend St',
                            postal_code: '98140',
                            city: 'San Francisco',
                            state: 'CA',
                            country: 'US',
                        },
                    },
                    amount: 1099,
                    currency: 'usd',
                    payment_method_types: ['card'],
                });
                if (data) {
                    setClientSecret(data.client_secret)
                };
            } catch (error) {
                console.log(error);
            }
        })()
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    // Enable the skeleton loader UI for optimal loading.
    const loader = 'auto';
    return (
        <>
            <main className="main">
                <Banner />
                {/* End .breadcrumb-nav */}
                <div className="page-content">
                    <div className="checkout">
                        <div className="container">
                            <div className="checkout-discount">
                                <form action="#">
                                    <input
                                        type="text"
                                        className="form-control"
                                        required=""
                                        id="checkout-discount-input"
                                    />
                                    <label
                                        htmlFor="checkout-discount-input"
                                        className="text-truncate"
                                    >
                                        Have a coupon? <span>Click here to enter your code</span>
                                    </label>
                                </form>
                            </div>
                            {/* End .checkout-discount */}
                            {clientSecret && (
                                <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
                                    <CheckoutForm />
                                </Elements>
                            )}
                        </div>
                        {/* End .container */}
                    </div>
                    {/* End .checkout */}
                </div>
                {/* End .page-content */}
            </main>
            {/* End .main */}
        </>
    )
}
