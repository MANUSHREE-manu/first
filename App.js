import React from "react"; 
import { HashRouter, Route,Routes } from "react-router-dom";
//import {HashRouter,Route,Routes,Link} from 'react-router-dom';
import Brand from "./brand";
import Edit from "./bedit";
import Category from "./category";
import Nav from './nav';
import Product from "./product";
import Pedit from "./proedit";
import Projson from "./productjson";


function App() {
  return (
    <div>
      
      <HashRouter>
        <Routes>
        <Route exact path='/' element={<Brand/>} />
        <Route exact path="/brand" element={<Edit/>} />
        <Route exact path="/bedit/:brandid" element={<Edit/>} />
        <Route exact path="/category" element={<Category/>} />
        <Route exact path="/nav" element={<Nav/>} /> 
        <Route exact path="/product" element={<Product/>} />
        <Route exact path="/proedit/:productid" element={<Pedit/>} />
        <Route exact path="/productjson" element={<Projson/>} />
       
        </Routes>
      </HashRouter>

    </div>
  )
}

export default App;
