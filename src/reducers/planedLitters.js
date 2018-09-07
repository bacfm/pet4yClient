export default function planedLitters(state = null, action){
    if(action.type === 'GET_PLANED_LITTERS'){ return action.planed }
    else if(action.type === 'PLANE_LITTER'){return action.planed}
    else { return state }
}