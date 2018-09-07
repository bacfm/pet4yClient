export default function user(state={user: [ ], type: null}, action){
    if(action.type === 'EDIT_PROFILE') {return state = action.profile}
     else if(action.type === 'GET_SUCCESS_USER_PROFILE'){return state = action.profile;}
    else {return state;}
}