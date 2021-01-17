
import data from '../data/data.json';
import '@babel/polyfill';

import {mapTools} from './mapTools'
import {makeItem} from './item'
import {lookChangeFilter,listenBtnFilter} from './filter'

import {listenBtnAddResto,listenCloseForm} from './formAddResto'

// init MAP 
const map = document.querySelector('#map')
mapTools.initMap(map, mapTools.defaultCordonner, 14)
// put maker resto
data.map(d => {
    mapTools.makeMarkerResto(d)
    makeItem(d)
})


// ask for geoloc
mapTools.initFuckingGeloc()

// Filter restaurant  filter.js
listenBtnFilter()
lookChangeFilter()

// Add new resto formAddResto.js
listenBtnAddResto()
listenCloseForm()


    


    