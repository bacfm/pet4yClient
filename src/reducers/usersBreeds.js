const initialState = null;


export default function usersBreeds(state=initialState, action){
    switch(action.type){
        case "GET_USERS_BREEDS": return state = action.breeds;
        case 'ADD_BREED': return state = action.breeds;
        case 'REMOVE_BREED': return state = action.breeds;
        default:
            return state;
    }
}
