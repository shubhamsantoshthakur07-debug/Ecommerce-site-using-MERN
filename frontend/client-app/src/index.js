import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import StateMgt from './AdminViews/StateMgt';
import ProductCatgMgt from './AdminViews/ProductCatgMgt';
import CityMgt from './AdminViews/CityMgt';
import VendorReg from './vendorviews/VendorReg';
import VenderLogin from './vendorviews/VenderLogin';
import CustomerReg from './CustomerViews/CustomerReg';
import CustomerLogin from './CustomerViews/CustomerLogin';
import Product from './ProductViews/Product';
import ProductListMain from "./ProductViews/ProductListforMainPage"
import ProductListforMainPage from './ProductViews/ProductListforMainPage';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <CustomerLogin/>
  </React.StrictMode>
);
