export const fetchEditProfile = res => ({
    type: 'EDIT_PROFILE',
    profile: res
});
export const addBreed = res => ({
    type: 'ADD_BREED',
    breeds: res
});
export const removeBreed = res => ({
    type: 'REMOVE_BREED',
    breeds: res
});
export const addLitter = (birthday, price, currency, male, female, dad_titles, mum_titles, mum_fam, dad_fam, id) => ({
    type: 'ADD_LITTER',
    birthday,
    price,
    currency,
    male,
    female,
    dad_titles,
    mum_titles,
    mum_fam,
    dad_fam,
    id
});
export const fetchBreeds = res => ({
    type: 'GET_SUCCESS_BREEDS',
    breeds: res
})
export const fetchCities = res => ({
    type: 'GET_SUCCESS_CITIES',
    cities: res
})
export const fetchUserProfile = res => ({
    type: 'GET_SUCCESS_USER_PROFILE',
    profile: res
})
// export const fetchActivity = res => ({
//     type: 'CHOOSE_KIND_OF_ACTIVITY',
//     kind: res.type
// })
export const fetchUserBroods = res => ({
    tyep: 'GET_SUCCESS_BROODS',
    broods: res
})

export const fetchUserBreeds = res => ({
    type: 'GET_USERS_BREEDS',
    breeds: res
})

export const fetchBroodView = res => ({
    type: 'GET_BROOD_VIEW',
    brood: res
})
export const fetchPlanedLitters =  res => ({
    type: 'GET_PLANED_LITTERS',
    planed: res
})
export const fetchPlaneLitter = res => ({
    type: 'PLANE_LITTER',
    planed: res
})