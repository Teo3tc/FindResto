import '../App.css';



import { listSelector } from '../store/listSelector'

import { useSelector } from 'react-redux'
import React from 'react'

import {Item} from './Item'







const List = ({ list}) => {
    return <ul>
        {list.map(l => <Item item={l} key={l.name} />)}
    </ul>
}

export const ListStore = () => {
    const list = useSelector(listSelector)
    console.log(list);
    return <List list={list} />
}