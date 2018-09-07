import { combineReducers } from 'redux';
import user from './user';
import userBreeds from './usersBreeds';
import breedsList from './breedsList';
import cities from './cities';
import broodView from './broodView';
import planedLitters from './planedLitters';

export default combineReducers({
    user,
    userBreeds,
    breedsList,
    cities,
    broodView,
    planedLitters
});