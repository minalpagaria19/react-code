import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import './App.css';

function App() {
  const [responseBid, setResponseBid] = useState("0");

  const handleResponseBid = (e) => {
    const cursorPosition = e.target.selectionStart;
    const oldValue = e.target.value;
    const oldLength = oldValue.length;

    // Strip non-digit characters
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    const numberValue = rawValue === '' ? '0' : rawValue;
    setResponseBid(numberValue);

    requestAnimationFrame(() => {
      const newLength = e.target.value.length;
      const cursorOffset = newLength - oldLength;
      const newPosition = cursorPosition + cursorOffset;
      e.target.setSelectionRange(newPosition, newPosition);
    });
  };

  return (
    <div className="App">
      <header className="App-header" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '40px' }}>
        {/* Name input */}
      
     

    

        {/* Currency-formatted numeric input */}
        <TextField
          id="formatted-bid"
          label="Bid (USD)"
          variant="outlined"
          value={
            responseBid
              ? responseBid.toString().match(/^0+$/)
                ? responseBid
                : new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(Number(responseBid))
              : "0"
          }
          onChange={handleResponseBid}
          inputMode="decimal"
          pattern="[0-9]*"
          sx={{ background: "white" }}
          InputProps={{
            inputProps: {
              className: "outline-none border border-gray-300 sm:p-1",
              sx: {
                fontWeight: "700",
                padding: "9.5px 14px",
                fontSize: { sm: "30px", xs: "1.25rem" },
                borderRadius: "18px",
                textAlign: "center",
                width: { sm: "400px", xs: "120px" },
              },
            },
          }}
        />
      </header>
    </div>
  );
}

export default App;
