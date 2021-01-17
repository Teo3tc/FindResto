import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';


var slider = document.getElementById('slider');
// creation du filter
noUiSlider.create(slider, {
    start: [0, 5],
    connect: true,
    step: 1,
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
    tooltips: true,

    range: {
        min: 0,
        max: 5,
    },
});
export const lookChangeFilter = () =>{
    // check on change
    slider.noUiSlider.on('update', function (values, handle) {
        let items = document.querySelectorAll('.item');
        items = Array.from(items);
        items.map(item => {

            if (parseInt(item.getAttribute('rankglobal'), 10) >= parseInt(values[0], 10) && parseInt(item.getAttribute('rankglobal'), 10) <= parseInt(values[1], 10)) {
                item.style.display = "block"
                return item
    
            } else {
                item.style.display = "none"
            }
    
        })
    });
}
export const listenBtnFilter = ()=>{
    const btnRangeStar = document.querySelector('.rangeStar2');
    btnRangeStar.addEventListener('click', function () {
        const RangeStar = document.querySelector('.box__RangeStar');
        RangeStar.classList.toggle('openRangeStar')
    })
}