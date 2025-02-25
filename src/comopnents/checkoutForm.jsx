import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = () => {

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/complete",
      },
      redirect:"always"
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion"
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-9">
          <h2 className="checkout-title">Billing Details</h2>
          <div className="row">
            <div className="col-sm-6">
              <label>First Name *</label>
              <input type="text" className="form-control" />
            </div>

            <div className="col-sm-6">
              <label>Last Name *</label>
              <input type="text" className="form-control" />
            </div>
          </div>

          <label>Company Name (Optional)</label>
          <input type="text" className="form-control" />

          <label>Country *</label>
          <input type="text" className="form-control" />

          <label>Street address *</label>
          <input type="text" className="form-control" placeholder="House number and Street name" />
          <input type="text" className="form-control" placeholder="Appartments, suite, unit etc ..." />

          <div className="row">
            <div className="col-sm-6">
              <label>Town / City *</label>
              <input type="text" className="form-control" />
            </div>

            <div className="col-sm-6">
              <label>State / County *</label>
              <input type="text" className="form-control" />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <label>Postcode / ZIP *</label>
              <input type="text" className="form-control" />
            </div>

            <div className="col-sm-6">
              <label>Phone *</label>
              <input type="tel" className="form-control" />
            </div>
          </div>

          <label>Email address *</label>
          <input type="email" className="form-control" />

          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="checkout-create-acc" />
            <label className="custom-control-label" for="checkout-create-acc">Create an account?</label>
          </div>

          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="checkout-diff-address" />
            <label className="custom-control-label" for="checkout-diff-address">Ship to a different address?</label>
          </div>

          <label>Order notes (optional)</label>
          <textarea className="form-control" cols="30" rows="4" placeholder="Notes about your order, e.g. special notes for delivery"></textarea>
        </div>
        <aside className="col-lg-3">
          <div className="summary">
            <h3 className="summary-title">Your Order</h3>

            <table className="table table-summary">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td><a href="#">Beige knitted elastic runner shoes</a></td>
                  <td>$84.00</td>
                </tr>

                <tr>
                  <td><a href="#">Blue utility pinafore denimdress</a></td>
                  <td>$76,00</td>
                </tr>
                <tr className="summary-subtotal">
                  <td>Subtotal:</td>
                  <td>$160.00</td>
                </tr>
                <tr>
                  <td>Shipping:</td>
                  <td>Free shipping</td>
                </tr>
                <tr className="summary-total">
                  <td>Total:</td>
                  <td>$160.00</td>
                </tr>
              </tbody>
            </table>

            <div className="accordion-summary" id="accordion-payment">
              <div className="card">
                <div className="card-header" id="heading-1">
                  <h2 className="card-title">
                    <a role="button" data-toggle="collapse" href="#collapse-1" aria-expanded="true" aria-controls="collapse-1">
                      Direct bank transfer
                    </a>
                  </h2>
                </div>
                <div id="collapse-1" className="collapse show" aria-labelledby="heading-1" data-parent="#accordion-payment">
                  <div className="card-body">
                    Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header" id="heading-2">
                  <h2 className="card-title">
                    <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-2" aria-expanded="false" aria-controls="collapse-2">
                      Check payments
                    </a>
                  </h2>
                </div>
                <div id="collapse-2" className="collapse" aria-labelledby="heading-2" data-parent="#accordion-payment">
                  <div className="card-body">
                    Ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header" id="heading-3">
                  <h2 className="card-title">
                    <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-3" aria-expanded="false" aria-controls="collapse-3">
                      Cash on delivery
                    </a>
                  </h2>
                </div>
                <div id="collapse-3" className="collapse" aria-labelledby="heading-3" data-parent="#accordion-payment">
                  <div className="card-body">Quisque volutpat mattis eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros.
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header" id="heading-4">
                  <h2 className="card-title">
                    <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-4" aria-expanded="false" aria-controls="collapse-4">
                      PayPal <small className="float-right paypal-link">What is PayPal?</small>
                    </a>
                  </h2>
                </div>
                <div id="collapse-4" className="collapse" aria-labelledby="heading-4" data-parent="#accordion-payment">
                  <div className="card-body">
                    Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header" id="heading-5">
                  <h2 className="card-title">
                    <a className="collapsed" role="button" data-toggle="collapse" href="#collapse-5" aria-expanded="false" aria-controls="collapse-5">
                      Credit Card (Stripe)
                      <img src="assets/images/payments-summary.png" alt="payments cards" />
                    </a>
                  </h2>
                </div>
                <div id="collapse-5" className="collapse" aria-labelledby="heading-5" data-parent="#accordion-payment">
                  <div className="card-body"> Donec nec justo eget felis facilisis fermentum.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Lorem ipsum dolor sit ame.
                  </div>
                </div>
              </div>
            </div>

            {/* <button type="submit" className="btn btn-outline-primary-2 btn-order btn-block">
              <span className="btn-text">Place Order</span>
              <span className="btn-hover-text">Proceed to Checkout</span>
            </button> */}

            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <button disabled={isLoading || !stripe || !elements} id="submit">
              <span id="button-text">
                {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
              </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
          </div>
        </aside>
      </div>
    </form>
  );
};

export default CheckoutForm;