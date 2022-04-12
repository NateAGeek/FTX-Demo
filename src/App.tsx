import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import tw, { useDeviceContext } from 'twrnc';
import NFTCollectionPage from './pages/NFTCollectionPage/NFTCollectionPage';
import NFTDetailsPage from './pages/NFTDetailsPage/NFTDetailsPage';
import NFTsPage from './pages/NFTsPage/NFTsPage';

export default function App() {
  useDeviceContext(tw);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NFTsPage/>}/>
        <Route path='/:nftCollection' element={<NFTCollectionPage/>}/>
        <Route path='/:nftCollection/:nftName/' element={<NFTDetailsPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
