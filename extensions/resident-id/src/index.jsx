import React, { useState } from 'react';
import  {render, TextField } from '@shopify/checkout-ui-extensions-react';

render('Checkout::Dynamic::Render', () => <App />);

function App() {
  const [error, setError] = useState(false);
  const [residentID, setResidentID] = useState('');

  handleFieldChange = (value) => {
    setResidentID(value);
  };

    return (
      <TextField 
        label='Resident ID'
        value={residentID}
        error={error? 'Please provide a valid ID': false}
        onChange={handleFieldChange}
         />
      );

}