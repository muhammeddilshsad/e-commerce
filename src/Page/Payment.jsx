import React, { useContext } from 'react';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../Context/CartContext';

const stripePromise = loadStripe('pk_test_51RMMo82MAKmVmSycFQBLXNZHvNmVu37MJJB1GEVN3bCV5h25D2zKQqxy0gSQdJkOooFurqo1w8UjJvLVe8gYSOZv000B3WPXeh');

export default function Payment() {
  const { clientSecret } = useCart();

  if (!clientSecret) {
    return <div className="text-center mt-20 text-xl text-red-500">Loading payment...</div>;
  }

  const options = { clientSecret };

  return (
    <div className='bg-gray-50'>
      <div className="m-auto max-w-3xl p-5 text-orange-900 pt-20 bg-gray-50">
        <h1 className="text-2xl py-3 text-center">Payment</h1>
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
}
