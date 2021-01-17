import '../App.css';




import React, {  useEffect, useRef, useState } from 'react'


import {FormAvis} from './FormAvis'




const ListAvis = ({ review }) => {
    return <ul>
        <li>{review.rating} {review.author_name} {review.text}</li>
    </ul>
}
export const Item = ({ item }) => {
    const [avis, setAvis] = useState(false);
    const [show, setShow] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const btnForm = useRef(null)
    const btnAvis = useRef(null)

    useEffect(() => {
        if (item.reviews == undefined) {
            console.log('Aucun avis');
        } else {
            setAvis(avis => avis = true)
        }
    },[item])

    const showAvis = () => {
        setShow(show => show = !show)
        if (showForm === true) {
            setShowForm(showForm => showForm = false)
        }
    }
    const showFormAvis = () => {
        setShowForm(showForm => showForm = !showForm)

        if (show === true) {
            setShow(show => show = false)
        }
    }
    return <li className="item" title={item.name} data-ratting={item.rating != undefined ?item.rating : 0} >
        <h2>{item.name} </h2>
        <h3>Note: {item.rating != undefined ?item.rating : 0}</h3>
        <p>{item.formatted_address}</p>
        <div>
            <p>Avis {item.reviews == undefined ? 0 : item.reviews.length} </p>
            <button ref={btnForm} onClick={showFormAvis}>Ajouter un Avis</button>
            {avis === true && <button ref={btnAvis} onClick={showAvis}>Voir les avis</button>}
            
            {showForm === true && <FormAvis item={item} />}

            {show === true && item.reviews.map(review => <ListAvis review={review} key={review.author_name} />)}
        </div>
    </li>
}



