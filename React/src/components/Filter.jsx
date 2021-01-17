import '../App.css';

import React, { useEffect } from 'react'

import { mapTools } from '../tools/mapTool'

import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

export const Filter = () => {
    useEffect(() => {
        const slider = document.getElementById('slider');
        noUiSlider.create(slider, {
            start: [0, 5],
            connect: true,
            step: 1,
            tooltips: true,

            format: {
                // 'to' the formatted value. Receives a number.
                to: function (value) {
                    return value + '';
                },
                // 'from' the formatted value.
                // Receives a string, should return a number.
                from: function (value) {
                    return Number(value.replace('', ''));
                }
            },

            range: {
                min: 0,
                max: 5,
            },
        });
        slider.noUiSlider.on('update', function (values) {
            let items = document.querySelectorAll('.item');
            items = Array.from(items);
            items.map(item => {

                if (parseInt(item.getAttribute('data-ratting'), 10) >= parseInt(values[0], 10) && parseInt(item.getAttribute('data-ratting'), 10) <= parseInt(values[1], 10)) {
                    item.style.display = "grid"
                    const MarkerMatch = mapTools.markerResto.filter((marker) => {
                        if (item.getAttribute('title') === marker.title) {
                            return item;
                        }
                    });

                    MarkerMatch.map((marker) => {
                        marker.setMap(mapTools.obecjtMap)
                    });

                } else {
                    const MarkerNotMatch = mapTools.markerResto.filter((marker) => {
                        if (item.getAttribute('title') === marker.title) {
                            return item;
                        }
                    });

                    MarkerNotMatch.map((marker) => {
                        marker.setMap(null)
                    });
                    item.style.display = "none"
                }

            })
        });
    }, [])

    return <div>
        <p>FILTER</p>
        <div className="" id="slider"></div>
    </div>
}