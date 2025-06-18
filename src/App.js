import logo from './logo.svg';
import './App.css';
import Navbar from './pages/navbar';
import Accordian from './pages/Accordian';
import { use, useState } from 'react';
import Task from './pages/Task';
import HighOrder from './pages/HighOrder';
import SayHello from './pages/SayHello';
import TextField from '@mui/material/TextField';
function App() {
  const Enhance = HighOrder(SayHello)
  const [count,setCount]=useState(0);
  let [inputValue,setValue]=useState("");
  const [show,setShow]=useState(true)
      const handleClick = (e) => {
  e.preventDefault(); 
  console.log("Link clicked");
};
const handleSubmit = (e) => {
const handleSubmit = (e) => {
  // e.preventDefault(); 
  console.log("Form submitted");
};
  console.log("Form submitted");
};



// <Enhance />

     
//          <p>{count} </p>
//           <button onClick={()=>setCount(count+1)}>+</button>
//           <button onClick={()=>setCount(count-1)}>-</button>

//           <input type="text" value={inputValue} onChange={(e)=>{setValue(e.target.value)}}/>
//           <p>{inputValue}</p>
//           {show&&<p>This is paragraph with toggle visiblity</p>}
//           <button onClick={()=>setShow(!show)}>Click me </button>
//       <form onSubmit={handleSubmit}>
//   <input type="text" />
//   <button type="submit">Submit</button>
// </form>
//           <button onClick={()=>setShow(!show)}>Click me </button>
//           <button onClick={()=>setShow(!show)}>Click me </button>
//           <button onClick={()=>setShow(!show)}>Click me </button>
//           <button onClick={()=>setShow(!show)}>Click me </button>
//           <a href="google.com" onClick={handleClick}>Click me</a>

  return (
    <div className="App">

      <header className="App-header">

          <TextField
        id="name"
        label="Name"
        variant="outlined"
        sx={{background:"white"}}
        inputProps={{ inputMode: "text", autoComplete: "name" }}
      />

      {/* Mobile input: numeric keypad */}
      <TextField
        id="mobile"
        label="Mobile"
        variant="outlined"
        type="tel"
        sx={{background:"white"}}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*", autoComplete: "tel" }}
      />

      {/* Email input: email keyboard */}
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        type="email"
        sx={{background:"white"}}
        inputProps={{ autoComplete: "email" }}
      />
        <TextField id="quantity" label="Quantity" inputProps={{ inputMode: 'numeric' }}/>
        <TextField id="quantity" label="Quantity" inputProps={{ inputMode: 'numeric' }}/>
        <input type="number" pattern="[0-9]*" inputmode="numeric"></input>
        <input type="tel" pattern="[0-9]*" inputmode="numeric"></input>
              </header>
    </div>
  );
}

export default App;
