
import { mapTools } from '../tools/mapTool'
import React, { useCallback, useEffect } from 'react'
import { listSelector } from '../store/listSelector'
import { switchListAction, resetListAction } from '../store/actions/listActions'

import { loader } from "../tools/loader"

import { useSelector, useDispatch } from 'react-redux'

const Map = ({ list, switchList, resetList }) => {

    // init Map
    useEffect(() => {
        loader.load().then(() => {

            // init map
            const map = document.querySelector('#map')
            mapTools.initMap(map, mapTools.defaultCordonner, 14)
            // put maker resto
            list.map(l => {
                mapTools.makeMarkerResto(l)
            })
            // ask for geoloc
            initFuckingGeloc()
        })
    }, [])

    const initFuckingMapIfGeoloc = (position) => {
        // save position geoloc
        mapTools.GeolocPostion = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        }

        const request = {
            location: mapTools.GeolocPostion,
            radius: '1000',
            type: 'restaurant',
            query: 'restaurant',
            fields: ['place_id'],
        };
        // first request
        const service = new window.google.maps.places.PlacesService(mapTools.obecjtMap);
        service.nearbySearch(request, ((results, status) => {
            if (status == window.google.maps.places.PlacesServiceStatus.OK) {

                //mapTools.nbrRequest = results.length

                // reset list Item
                resetList()
                // delete maker in map
                mapTools.deleteMarkers(mapTools.markerResto)
                // center map to Geoloc
                mapTools.setCenter(position, 12)
                //  put marker user in the map 
                mapTools.makeMarker(mapTools.GeolocPostion)
                results.map(r => {
                    /*if (list.length >= results.length) {
                        setGeoloc(geoloc => geoloc = true)
                    }*/
                    var requestDetails = {
                        placeId: r.place_id,
                        fields: [
                            'review',
                            'formatted_address',
                            'formatted_phone_number',
                            'geometry',
                            'website',
                            'name',
                            'rating'
                        ],
                    };
                    // secon request more details
                    const detailService = new window.google.maps.places.PlacesService(mapTools.obecjtMap);
                    detailService.getDetails(requestDetails, ((placeDetails, status) => {
                        if (status == window.google.maps.places.PlacesServiceStatus.OK) {
                            // maker marker resto
                            mapTools.makeMarkerResto(placeDetails)
                            // put result in the list 
                            switchList(placeDetails)
                        }
                    }));
                })
            }
        }));
    }
    const initFuckingGeloc = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(initFuckingMapIfGeoloc)
        }

    }

    return <div id="map">
    </div>
}

export const MapStore = () => {
    const list = useSelector(listSelector)
    const dispatch = useDispatch()
    // dispatch for swtich list JSON to GEO
    const switchList = useCallback((list) => {
        dispatch(switchListAction(list))
    }, [])
    // dispatch For reset the list resto 
    const resetList = useCallback((list) => {
        dispatch(resetListAction(list))
    }, [])
    return <Map list={list} switchList={switchList} resetList={resetList} />
}