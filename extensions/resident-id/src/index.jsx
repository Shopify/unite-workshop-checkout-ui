import React from 'react';
import {useExtensionApi, render, Banner} from '@shopify/checkout-ui-extensions-react';

render('Checkout::DeliveryAddress::RenderBefore', () => <App />);
render('Checkout::Contact::RenderAfter', () => <App />);
render('Checkout::Actions::RenderBefore', () => <App />);

function App() {
  const {extensionPoint, i18n} = useExtensionApi();
  return <Banner>{i18n.translate('welcome', {extensionPoint})}</Banner>;
}