import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './components/CartProvider';
import { Toaster, toast } from 'sonner';
import { Check, X } from 'lucide-react';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Toaster
        position="top-right"
        toastOptions={{
          className: 'rounded-[1px] border p-4 mt-12 md:mt-10 shadow-md',
          duration: 3000,
        }}
      />
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);