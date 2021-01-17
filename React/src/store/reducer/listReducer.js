

const initialState = [{
    "geometry": {
        "location": {
            "lat": 48.8865035,
            "lng": 2.3442197
        }
    },
    "name": "Babalou",
    "rating": 4,
    "user_ratings_total": 2,
    "reviews": [{
        "author_name": "raoul",
        "rating": 5,
        "text": "Une minuscule pizzeria délicieuse cachée juste à côté du Sacré choeur !"
    },
    {
        "author_name": "Duke",
        "rating": 3,
        "text": "J'ai trouvé ça correct, sans plus"
    }
    ],
    "adr_address": "4 Rue Lamarck, 75018 Paris",
    "formatted_phone_number": "undefined",
    "website": "undefined"
},
{
    "geometry": {
        "location": {
            "lat": 48.8737815,
            "lng": 2.3501649
        }
    },
    "name": "Bronco",
    "rating": 4.5,
    "user_ratings_total": 2,
    "reviews": [{
        "author_name": "Franck",
        "rating": 4,
        "text": "Un excellent restaurant, j'y reviendrai ! Par contre il vaut mieux aimer la viande."
    },
    {
        "author_name": "Charlie",
        "rating": 5,
        "text": "Tout simplement mon restaurant préféré !"
    }
    ],
    "adr_address": "39 Rue des Petites Écuries, 75010 Paris",
    "formatted_phone_number": "undefined",
    "website": "undefined"
}

]

export const RESET_LIST_ACTION = 'RESET_LIST_ACTION'
export const ADD_REVIEWS_ACTION = 'ADD_REVIEWS_ACTION'
export const SWITCH_LIST_ACTION = 'SWITCH_LIST_ACTION'
export const ADD_ITEM_ACTION = 'ADD_ITEM_ACTION'

export function listReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ITEM_ACTION:
            return [...state,action.payload.item]
        case RESET_LIST_ACTION:
            return []
        case SWITCH_LIST_ACTION:
            return [...state, action.payload.items]
        case ADD_REVIEWS_ACTION:
            return state.map(item=>{
                if(item.name === action.payload.item.name){
                    if(item.reviews != undefined){
                        return { ...item,
                        reviews: [...item.reviews, action.payload.reviews]
                        }
                    }else{
                        return { ...item,
                            reviews: [action.payload.reviews]
                            }
                    }
                }else{
                    return item
                }
            })
        default:
            return state
    }
}