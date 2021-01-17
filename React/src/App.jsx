import './App.css';
import React from 'react'
import { ListStore } from './components/List'
import { MapStore } from './components/Map'
import { FormResto } from './components/FormResto'
import { Filter } from './components/Filter'




function App() {

  return (
    <div className="App">
      <FormResto />
      <MapStore />
      <Filter />
      <ListStore />
    </div>

  );
}









export default App;
