import '../App.css';


import { addItemAction } from '../store/actions/listActions'

import { useDispatch } from 'react-redux'
import React, { useRef, useState } from 'react'

import { loader } from "../tools/loader"
import { mapTools } from '../tools/mapTool'


export const FormResto = () => {
    const dispatch = useDispatch()

    const btnAddResto = useRef()
    const [adress, setAdress] = useState('');
    const [position, setPosition] = useState('');

    const [toogle, settoogle] = useState(false);
    const nom = useRef(null)
    const tel = useRef(null)
    const web = useRef(null)
    const pseudo = useRef(null)
    const comment = useRef(null)
    const note = useRef(null)


    const clickStop = () => {
        btnAddResto.current.disabled = false
        settoogle((t) => t = !t)
        window.google.maps.event.clearListeners(mapTools.obecjtMap, 'click');
        mapTools.obecjtMap.setOptions({ draggableCursor: '' })
        setAdress((a) => a = '')
        mapTools.deleteMarkers2(mapTools.markerNewResto)

    }
    const clickActiveAdd = () => {
        btnAddResto.current.disabled = true
        settoogle((t) => t = !t)
        mapTools.obecjtMap.setOptions({
            draggableCursor: 'pointer'
        })
        mapTools.obecjtMap.addListener('click', (event) => {
            mapTools.addMarker(event.latLng);
            loader.load().then(() => {
                mapTools.geocoder = new window.google.maps.Geocoder()
                mapTools.geocoder.geocode({
                    location: event.latLng
                }, (results, status) => {
                    if (status === "OK") {
                        if (results[0]) {
                            setAdress((a) => a = results[0].formatted_address)
                            setPosition((p) => p = results[0].geometry)
                        } else {
                            window.alert("No results found");
                        }
                    } else {
                        window.alert("Geocoder failed due to: " + status);
                    }
                });
            })
        })
    }
    const submit = (e) => {
        e.preventDefault()
        const newResto = {
            "geometry": {
                "location": {
                    "lat": position.location.lat(),
                    "lng": position.location.lng()
                }
            },
            "name": nom.current.value,
            "rating": parseInt(note.current.value, 10),
            "user_ratings_total": 1,
            "reviews": [{
                "author_name": pseudo.current.value,
                "rating": parseInt(note.current.value, 10),
                "text": comment.current.value
            },

            ],
            "adr_address": adress,
            "formatted_phone_number": tel.current.value !== "" ? tel.current.value : undefined,
            "website": web.current.value !== "" ? web.current.value : undefined
        }
        dispatch(addItemAction(newResto))

        nom.current.value = ''
        tel.current.value = ''
        web.current.value = ''
        pseudo.current.value = ''
        comment.current.value = ''
        note.current.value = ''

        setAdress((a) => a = '')
        settoogle((t) => t = !t)
        btnAddResto.current.disabled = false
        mapTools.makeMarkerNewResto(newResto)
        mapTools.deleteMarkers2(mapTools.markerNewResto)
    }
    return <div>
        <button ref={btnAddResto} onClick={clickActiveAdd}>Ajouter un restaurant</button>
        {toogle === true ? <button onClick={clickStop}>Stop</button> : ''}
        {toogle === true ? <form action="" onSubmit={submit}>
            <p>Adress : {adress !== '' ? adress : 'Pas encore choisie'}</p>
            <input type="text" ref={nom} placeholder='Nom du restaurant' required />
            <input type="text" ref={tel} placeholder='Numéro de téléphone' />
            <input type="text" ref={web} placeholder='Site internet' />
            <p>Avis</p>
            <input type="text" ref={pseudo} placeholder='Pseudo' required />
            <textarea placeholder="Commentaire" ref={comment} required />
            <input type="number" placeholder="Note" ref={note} min="0" max="5" required />
            <button>Enregitrer</button>
        </form> : ''}
    </div>
}