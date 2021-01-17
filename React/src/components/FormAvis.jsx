
import { addReviewsAction } from '../store/actions/listActions'

import {useDispatch } from 'react-redux'
import React, { useRef } from 'react'

export const FormAvis = ({ item }) => {

    const dispatch = useDispatch()
    const name = useRef('')
    const text = useRef('')
    const nbr = useRef(null)

    const onSubmit = (e) => {
        const review = {author_name: name.current.value , text: text.current.value,rating:parseInt(nbr.current.value,10)  }
        e.preventDefault()
        dispatch(addReviewsAction(review,item))

        name.current.value = ''
        text.current.value = ''
        nbr.current.value = ''

        name.current.focus()
    }


    return <form onSubmit={onSubmit}>
        <input type="text" placeholder='Pseudo' ref={name} required />
        <textarea  ref={text} placeholder="Commentaire" required/>
        <input type="number" ref={nbr} placeholder="Note"  min="0" max="5" required/>

        <button>Enregitrer</button>
    </form>
}