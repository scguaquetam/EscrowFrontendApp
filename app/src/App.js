import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}

function App() {

  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

