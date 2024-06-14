// Home.js
import React from "react";
import Layout from "./Layout";
import Broadcast from "./componentshome/broadcast/Broadcast";
import Headsection from "./componentshome/headSection/Headsection";
import CryptoData from "./componentshome/cryptoData/CryptoData";
import Services from "./componentshome/services/Services";
import Help from "./componentshome/help/Help";
import RiskWarning from "./componentshome/Risk/Risk";
import Footer from "./componentshome/Footer/Footer";

const Home = () => {
  return (
    
      <div className="App">
        <Broadcast />
        <Headsection />
        <CryptoData />
        <Services />
        <Help />
        <RiskWarning />
        <Footer/>
      </div>
  
    
  );
};

export default Home;
