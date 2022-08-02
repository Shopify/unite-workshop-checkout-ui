import React from 'react';
import {render, TextField, useApplyMetafieldsChange, useBuyerJourneyIntercept, useMetafield} from '@shopify/checkout-ui-extensions-react';
import { useState } from 'react';

render('Checkout::Dynamic::Render', () => <App />);

function App() {

  const METAFIELD_NAMESPACE = 'RESIDENT_ID_APP';
  const METAFIELD_KEY = 'resident_id';


 const [error, setError] = useState(false);
  const updateMetafield = useApplyMetafieldsChange();
  const residentIdState = useMetafield({
    namespace: METAFIELD_NAMESPACE,
    key: METAFIELD_KEY,
  });


  useBuyerJourneyIntercept(() => {
    if(!validateResidentId(residentIdState.value)) {
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

  handleFieldChange = (value) => {
    if(error) {
      let validId = validateResidentId(value);
      if(validId) {
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

  validateResidentId = (value) => {
    if(value.length !== 9) {
      return false;
    } else {
      return true;
    }
  };

  return (
  <TextField 
    label='Resident ID'
    value={residentIdState?.value}
    error={error? 'error': false}
    onChange={handleFieldChange}
     />
  );
}