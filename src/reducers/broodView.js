const initialState = null;

export default function broodView(state=initialState, action){
    if(action.type === 'GET_BROOD_VIEW') { return state = action.brood }
    else { return state }
}