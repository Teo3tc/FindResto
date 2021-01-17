import {mapTools} from './mapTools'
import {makeItem} from './item'

     function formAddResto(saveAdrress) {
        const formAddResto = document.querySelector('.formAddResto')
        const pageFormAddResto = document.querySelector('.pageFormAddResto')
        const injectAdress = document.querySelector('.injectAdress')
    
        formAddResto.classList.add('opacity1Zindex5');
        pageFormAddResto.classList.add('opacity1TranslateY');
        injectAdress.innerText = saveAdrress
    
    
    }
    function closeFormAddResto() {
        const formAddResto = document.querySelector('.formAddResto')
        const pageFormAddResto = document.querySelector('.pageFormAddResto')
        const btnaddResto = document.querySelector('.addResto');
        const valueToClear = document.querySelectorAll('.valueToClear');
        mapTools.obecjtMap.setOptions({draggableCursor: ''})
        mapTools.deleteMarkers2(mapTools.markerNewResto)
    
        google.maps.event.clearListeners(map, 'click');
    
        formAddResto.classList.remove('opacity1Zindex5');
        pageFormAddResto.classList.remove('opacity1TranslateY');
        btnaddResto.style.color = 'black'
        valueToClear.forEach(clear => {
            if (clear.value != undefined) {
                clear.value = ''
    
            }
        });
    
    }
    export const listenCloseForm = () =>{
        const arrowBAckAddResto = document.querySelector('.arrowBAckAddResto')
        arrowBAckAddResto.addEventListener('click', function (e) {
            closeFormAddResto()
        })
    }

    export const listenBtnAddResto = ()=>{
        const btnaddResto = document.querySelector('.addResto');
        let addIsTrue = true
        btnaddResto.addEventListener('click', function () {
                if (addIsTrue == true) {
                    btnaddResto.style.color = '#19C88E'
                    mapTools.obecjtMap.setOptions({
                        draggableCursor: 'pointer'
                    })
                    mapTools.obecjtMap.addListener('click', (event) => {
                        mapTools.addMarker(event.latLng);
                        mapTools.geocoder = new window.google.maps.Geocoder()
                        mapTools.geocoder.geocode({
                            location: event.latLng
                        }, (results, status) => {
                            if (status === "OK") {
                                if (results[0]) {
                                    formAddResto(results[0].formatted_address);
                                    const formToSubmit = document.querySelector('#formToSubmit')
                                    formToSubmit.addEventListener('submit', function(evt) {
                                        evt.preventDefault()
                                        
                                        let saveData = {}
                                        const nomResto = document.querySelector('#nomResto')
                                        const telephone = document.querySelector('#Telephone')
                                        const website = document.querySelector('#Website')
                                        const authorAddResto = document.querySelector('#authorAddResto')
                                        const rankAddResto = document.querySelector('#rankAddResto')
                                        const commentAddResto = document.querySelector('#commentAddResto')
                            
                                            saveData = {
                                                geometry: {
                                                    location: {
                                                        lat: results[0].geometry.location.lat(),
                                                        lng: results[0].geometry.location.lng()
                                                    }
                                                },
                                                name: nomResto.value,
                                                rating: rankAddResto.value,
                                                reviews: [{
                                                    "author_name": authorAddResto.value,
                                                    "rating": parseInt(rankAddResto.value),
                                                    "text": commentAddResto.value
                                                }, ],
                                                adr_address:results[0].formatted_address,
                                                formatted_phone_number: telephone.value == '' ? undefined : telephone.value,
                                                website: website.value == '' ? undefined : website.value
                                            };
                                
                                            makeItem(saveData)

                                            mapTools.makeMarkerResto(saveData)
                                            mapTools.deleteMarkers2(mapTools.markerNewResto)
                            
                                            
                                            document.querySelector('.reviewAdd').classList.add('moveY');
                                            setTimeout(function () {
                                                document.querySelector('.reviewAdd').classList.remove('moveY');
                                            }, 2000);
                                            closeFormAddResto()
                            
                                    })
    
                                } else {
                                    window.alert("No results found");
                                }
                            } else {
                                window.alert("Geocoder failed due to: " + status);
                            }
                        });
                    })
    
                } else {
                    btnaddResto.style.color = 'black'
                    addIsTrue = true
    
                }
    
        })
    }