import React, { useState } from 'react';
import { render, TextField, useMetafield, useApplyMetafieldsChange, useBuyerJourneyIntercept } from '@shopify/checkout-ui-extensions-react';
render('Checkout::Dynamic::Render', () => <App />);

function App() {
  const [error, setError] = useState(false);
  const updateMetafield = useApplyMetafieldsChange();

  const METAFIELD_NAMESPACE = 'RESIDENT_ID_APP';
  const METAFIELD_KEY = 'resident_id';

  const residentIdState = useMetafield({
    namespace: METAFIELD_NAMESPACE,
    key: METAFIELD_KEY,
  });

  useBuyerJourneyIntercept(() => {
    if (!validateResidentId(residentIdState.value)) {
      return {
        behavior: 'block',
        reason: 'Form is not valid.',
        // if a partner tries block checkout, then `perform()` does not get called and nothing happens
        // acts like `behavior: allow` 
        perform: () => showValidationUI()
      }
    } else {
      setError(false);
      return {
        behavior: 'allow',
      }
    }
  });

  const showValidationUI = () => {
    console.log('validation UI');
    setError(true);
  }

  const handleFieldChange = (value) => {
    if (error) {
      let validId = validateResidentId(value);
      if (validId) {
        setError(false);
      }
    }
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


  const validateResidentId = (value) => {
    return value.length === 9;
  }

  return (
    <TextField
      label='Resident ID'
      value={residentIdState?.value}
      error={error ? 'Please provide a valid ID' : false}
      onChange={handleFieldChange}
    />
  );

}