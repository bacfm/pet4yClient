const initialState = [];

export default function breedsList(state=initialState, action){
    if(action.type === 'GET_SUCCESS_BREEDS') { return state = action.breeds}
    return state;
}