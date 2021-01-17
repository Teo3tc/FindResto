export function deleteItem(){
    const items = document.querySelectorAll('.item')
    items.forEach(item => {
        item.remove()
    });
}

export function makeItem(place) {
    const list = document.querySelector('#list');
    const item = document.createElement('div');
    item.setAttribute('title', place.name);
    item.setAttribute('rankGlobal', place.rating);

    const desc = document.createElement('div');
    const title = document.createElement('h2');
    const rank = document.createElement('p');
    const adress = document.createElement('p');
    const phone = document.createElement('p');
    const website = document.createElement('p');
    const img = document.createElement('img');
    let listavis = document.createElement('div');
    let tiltleListe = document.createElement('h6');
    let btnAvis = document.createElement('p');
    let ulAvis = document.createElement('ul');
    ulAvis.setAttribute('title', place.name);

    rank.classList.add('globalRank');
    ulAvis.classList.add('ulAvis');
    listavis.classList.add('listAvis');

    tiltleListe.setAttribute('title', place.name);
    btnAvis.setAttribute('title', place.name);

    if (place.reviews === undefined) {
        let zero = 0;
        tiltleListe.innerHTML = `
        <span class="nbrAvis">Avis (${zero})</span> 
        `;
    } else {
        tiltleListe.innerHTML = `<span class="nbrAvis" >Avis (${place.reviews.length})</span>`;
        tiltleListe.classList.add('underline');

        place.reviews;
        place.reviews.forEach((review) => {
            const ratingReview = makeStar(review.rating);
            let avis = document.createElement('li');
            avis.classList.add('avis');
            avis.innerHTML = `
            <span class='auhtor'>${review.author_name}</span><br>
            <span>${review.rating} ${ratingReview}</span><br>
            <span class='auhtor__text'>- ${review.text}</span>`;
            ulAvis.appendChild(avis);
        });
    }
    btnAvis.classList.add('btnAddAvis');
    btnAvis.innerHTML = ` <span class="btnAddAvisTexte">Rédiger un avis</span> <span class="back"></span>`;
    listavis.appendChild(tiltleListe);
    listavis.appendChild(btnAvis);


    let lat;
    let lng;
    try {
      lat = place.geometry.location.lat();
      lng = place.geometry.location.lng();
    } catch (e) {
      if (e instanceof TypeError) {
        lat = place.geometry.location.lat;
        lng = place.geometry.location.lng;
      }
    }
    img.src = `https://maps.googleapis.com/maps/api/streetview?size=400x200&location=${lat},${lng}&fov=90&heading=90&pitch=0&key=KEY_API`;

    
    const ratingReview = makeStar(place.rating);
    title.innerHTML = `${place.name}`;
    if (place.rating === undefined) {
        rank.innerHTML = `0 none`;
    } else {
        rank.innerHTML = `${place.rating} ${ratingReview}`;
    }
    adress.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${place.adr_address}`;
    phone.innerHTML = `<i class="fas fa-phone-alt"></i> ${place.formatted_phone_number}`;
    if (place.website === undefined) {
        website.innerHTML = `<i class="fas fa-globe"></i> non renseigné `;
    } else {
        website.innerHTML = `<i class="fas fa-globe"></i> <a href= "${place.website}">Website</a>`;
    }

    item.classList.add('item');
    desc.classList.add('desc');
    item.appendChild(img);
    desc.appendChild(title);
    desc.appendChild(rank);
    desc.appendChild(adress);
    desc.appendChild(phone);
    desc.appendChild(website);
    desc.appendChild(listavis);
    desc.appendChild(ulAvis);

    item.appendChild(desc);
    list.appendChild(item);

    openFormForAddAvis()
    closeFormulaire()
    submitAvis()
    showAvis()
}

export let itemData = []

function makeStar(rank) {
    const zeroStar =
        '<i style="color: gold;" class="far fa-star"></i><i style="color: gold;" class="far fa-star"></i><i style="color: gold;" class="far fa-star"></i><i style="color: gold;" class="far fa-star"></i><i style="color: gold;" class="far fa-star"></i>';
    const zeroHafStar =
        '<i style="color: gold; "class="fas fa-star-half-alt" ></i><i style="color: gold;" class="far fa-star"><i style="color: gold;" class="far fa-star"></i><i style="color: gold;" class="far fa-star"></i><i style="color: gold;" class="far fa-star"></i>';

    const oneStar =
        '<i style="color: gold;" class="fas fa-star"></i><i style="color: gold;" class="far fa-star"></i><i style="color: gold;" class="far fa-star"></i><i style="color: gold;" class="far fa-star"></i><i style="color: gold;" class="far fa-star"></i>';
    const oneHafStar =
        '<i style="color: gold;" class="fas fa-star"></i><i style="color: gold;" "class="fas fa-star-half-alt"></i><i style="color: gold;" class="far fa-star"></i><i style="color: gold;" class="far fa-star"></i><i style="color: gold;" class="far fa-star"></i>';

    const twoStar =
        '<i style="color: gold;" class="fas fa-star"></i><i style="color: gold;" class="fas fa-star"></i><i style="color: gold;" class="far fa-star"></i><i style="color: gold;" class="far fa-star"></i><i style="color: gold;" class="far fa-star"></i>';
    const twoHafStar =
        '<i style="color: gold;" class="fas fa-star"></i><i style="color: gold;" class="fas fa-star"></i><i style="color: gold;" class="fas fa-star-half-alt"></i><i style="color: gold;" class="far fa-star"></i><i style="color: gold;" class="far fa-star"></i>';

    const threeStar =
        '<i style="color: gold;" class="fas fa-star"></i><i style="color: gold;" class="fas fa-star"></i><i style="color: gold;" class="fas fa-star"></i><i style="color: gold;" class="far fa-star"></i><i style="color: gold;" class="far fa-star"></i>';
    const threeHafStar =
        '<i style="color: gold;" class="fas fa-star"></i><i style="color: gold;" class="fas fa-star"></i><i style="color: gold;" class="fas fa-star"></i><i style="color: gold;" class="fas fa-star-half-alt"></i><i style="color: gold;" class="far fa-star"></i>';

    const forStar =
        '<i style="color: gold;" class="fas fa-star"></i><i style="color: gold;" class="fas fa-star"></i><i style="color: gold;" class="fas fa-star"></i><i style="color: gold;" class="fas fa-star"></i><i style="color: gold;" class="far fa-star"></i>';
    const forHafStar =
        '<i style="color: gold;" class="fas fa-star"></i><i style="color: gold;" class="fas fa-star"></i><i style="color: gold;" class="fas fa-star"></i><i style="color: gold;" class="fas fa-star"></i><i style="color: gold;" class="fas fa-star-half-alt"></i>';

    const fiveStar =
        '<i style="color: gold;" class="fas fa-star"></i><i style="color: gold;" class="fas fa-star"></i><i style="color: gold;" class="fas fa-star"></i><i style="color: gold;" class="fas fa-star"></i><i style="color: gold;" class="fas fa-star"></i>';
    if (rank >= 0 && rank <= 0.4) {
        return zeroStar;
    } else if (rank >= 0.5 && rank < 1) {
        return zeroHafStar;
    } else if (rank >= 1 && rank <= 1.4) {
        return oneStar;
    } else if (rank >= 1.5 && rank < 2) {
        return oneHafStar;
    } else if (rank >= 2 && rank <= 2.4) {
        return twoStar;
    } else if (rank >= 2.5 && rank < 3) {
        return twoHafStar;
    } else if (rank >= 3 && rank <= 3.4) {
        return threeStar;
    } else if (rank >= 3.5 && rank < 4) {
        return threeHafStar;
    } else if (rank >= 4 && rank <= 4.4) {
        return forStar;
    } else if (rank >= 4.5 && rank < 5) {
        return forHafStar;
    } else if (rank >= 5) {
        return fiveStar;
    }
}

function openFormForAddAvis() {
    const btnAddAvis = document.querySelectorAll('.btnAddAvis')
    btnAddAvis.forEach((formAvis) => {
        formAvis.addEventListener('click', function () {
            document.querySelector('.formAvis').classList.add('openForm');
            document.querySelector('#list').classList.add('closeList');
            const insertValue = document.querySelector('.insertValue');
            insertValue.innerHTML = `${formAvis.getAttribute('title')}`;
            document.querySelector('.box__filter').classList.add('opacity0');
        });
    });
}
function closeFormulaire() {
    const btnBAckList = document.querySelector('.arrowBAck');
    btnBAckList.addEventListener('click', function () {
        document.querySelector('.formAvis').classList.remove('openForm');
        document.querySelector('#list').classList.remove('closeList');
        const insertValue = document.querySelector('.insertValue');
        insertValue.innerHTML = ``;
        document.querySelector('.box__filter').classList.remove('opacity0');
    });
}
function submitAvis (){
    const insertValue = document.querySelector('.insertValue');
    const form = document.querySelector('form');
    const author = document.querySelector('#author');
    const rank = document.querySelector('#rank');
    const comment = document.querySelector('#comment');
    const send = document.querySelector('#bouton');
        
    

form.addEventListener('submit', function (e) {
    e.preventDefault()
    if (send.disabled == false) {
        let items = document.querySelectorAll('.item');
        items = Array.from(items);
        const matchItemWithForm = items.filter((item) => {
            if (item.getAttribute('title') == insertValue.innerHTML) {
                return item;
            }
        });

        const ulItem = matchItemWithForm[0].querySelector('.ulAvis');
        const nbrAvis = matchItemWithForm[0].querySelector('.nbrAvis');
        const globalRank = matchItemWithForm[0].querySelector('.globalRank');

        if (ulItem.childElementCount == 0) {
            nbrAvis.parentElement.classList.add('underline');
        }

        let avis = document.createElement('li');
        avis.classList.add('avis');
        avis.innerHTML = `
        <span class='auhtor'>${author.value}</span><br>
        <span>${rank.value} ${makeStar(rank.value)}</span><br>
        <span class='auhtor__text'>- ${comment.value}</span>`;
        ulItem.insertBefore(avis, ulItem.firstChild);
        nbrAvis.innerHTML = `Avis (${ulItem.childElementCount})`;

        ulItem.style.maxHeight = 0;
        itemData.map(dataa => {
            if (matchItemWithForm[0].getAttribute('title') == dataa.name) {
                if (dataa.reviews != undefined) {

                    return dataa.reviews.push({
                        author_name: author.value,
                        rating: parseInt(rank.value, 10),
                        text: comment.value,
                    })
                } else {
                    return dataa.reviews = Array({
                        author_name: author.value,
                        rating: parseInt(rank.value, 10),
                        text: comment.value,
                    })
                }
            }
        })

        const saveData = itemData.filter(dataa => {
            if (matchItemWithForm[0].getAttribute('title') == dataa.name) {
                return dataa
            }
        })
        const saveReview = saveData.map(review => {
            if (review.reviews != undefined) {
                return review.reviews
            }
        })
        

        const chanGeGloabalAverage = (nbrDeReview) => {
            let saveNbr = 0
            nbrDeReview[0].forEach(nbr => {
                saveNbr = saveNbr + nbr.rating
            });
            saveNbr = saveNbr / nbrDeReview[0].length
            return saveNbr.toFixed(1)
        }
        const newGlobalRank = chanGeGloabalAverage(saveReview)
        globalRank.innerHTML = `${newGlobalRank}  ${makeStar(newGlobalRank)}`
        matchItemWithForm[0].setAttribute('rankglobal', newGlobalRank)





        author.value = '';
        rank.value = '';
        comment.value = '';
        document.querySelector('.reviewAdd').classList.add('moveY');
        setTimeout(function () {
            document.querySelector('.reviewAdd').classList.remove('moveY');
        }, 2000);
        document.querySelector('.formAvis').classList.remove('openForm');
        document.querySelector('#list').classList.remove('closeList');
        document.querySelector('.box__filter').classList.remove('opacity0');

        insertValue.innerHTML = ``;
    }
})
}
function showAvis(){
    let items = document.querySelectorAll('.item')

    items.forEach(item => {
        item.addEventListener('click',function(e){

            const itemUl = item.querySelector('ul');
            itemUl.style.maxHeight = itemUl.scrollHeight + 'px'
        })
    });

}