const initialState = null;

export default function cities(state=initialState, action){
    if(action.type === 'GET_SUCCESS_CITIES') { return state = action.cities}
    return state;
}