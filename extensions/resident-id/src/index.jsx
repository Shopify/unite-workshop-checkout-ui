import React, { useState } from 'react';
import  {render, TextField } from '@shopify/checkout-ui-extensions-react';

render('Checkout::Dynamic::Render', () => <App />);

function App() {
  const [error, setError] = useState(false);
  const residentIdState = useMetafield({
    namespace: METAFIELD_NAMESPACE,
    key: METAFIELD_KEY,
  });

  handleFieldChange = (value) => {
    updateMetafield(
         {
           type: 'updateMetafield',
           namespace: METAFIELD_NAMESPACE,
           key: METAFIELD_KEY,
           valueType: 'string',
           value: value
         }
       );
   };

    return (
      <TextField 
        label='Resident ID'
        value={residentIdState?.value}
        error={error? 'Please provide a valid ID': false}
        onChange={handleFieldChange}
         />
      );

}