import { RESET_LIST_ACTION, ADD_REVIEWS_ACTION,SWITCH_LIST_ACTION,ADD_ITEM_ACTION } from '../reducer/listReducer'

export const resetListAction = (items) => ({
    type: RESET_LIST_ACTION,
    payload: { items }
})
export const switchListAction = (items) => ({
    type: SWITCH_LIST_ACTION,
    payload: { items }
})
export const addReviewsAction = (reviews, item) => ({
    type: ADD_REVIEWS_ACTION,
    payload: { item, reviews },
})
export const addItemAction = ( item) => ({
    type: ADD_ITEM_ACTION,
    payload: {item},
})