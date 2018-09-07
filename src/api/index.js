import {fetchBreeds, fetchCities, fetchUserProfile, fetchEditProfile, fetchUserBroods, fetchUserBreeds, addBreed, removeBreed, fetchBroodView, fetchPlanedLitters, fetchPlaneLitter} from '../actions/index';


export function getBreeds(){
    return (disptach) => {
        return fetch(`http://api.pet4u.com.ua/api/v1/other/breeds/`,{
            method: 'GET',
                headers: {
                'Authorization': "Token " + window.localStorage.token,
            }
        })
            .then((res) => res.json())
            .then((res) => disptach(fetchBreeds(res)))
            .catch(err => console.log(err))
    }
}
// Получения списка городов в зависимоти от страны
export function getCities(){
    return (dispatch) => {
        return fetch(`http://api.pet4u.com.ua/api/v1/other/cities/?format=json`, {
            method: 'GET',
            headers: {
                'Authorization': "Token " + window.localStorage.token
            }
        })
        .then((res) => res.json())
        .then((res) => dispatch(fetchCities(res)))
        .catch((err) => console.log(err))
    }
}

// Данные пользователя, которые в БД
export function getUserProfile(){
    return (dispatch) => {
        return fetch('http://api.pet4u.com.ua/api/v1/account/profile/', {
            method: 'GET',
            headers: {
                'Authorization': "Token " + window.localStorage.token
            }
        })
        .then(function(res){
            if(res.status === 401 && window.localStorage.token){
                window.localStorage.removeItem('token');
            }
            return res.json();
        })
        .then((res) => dispatch(fetchUserProfile(res)))
        .catch(function(err){ console.log(err)})
    }
}
// Редактирование профиля пользователя
export function editProfile(company, first_name, last_name, mobile, facebook, email, city, description, country, viber, whats, tg, fb, socialInp, social, onPopupShow){
    let body = {company: company, first_name: first_name, last_name: last_name, mobile: mobile, facebook: facebook, email: email, description: description, city: city, country: country, feedback: { viber: viber, whatsapp: whats, telegram: tg, facebook: fb, social: socialInp}, social: social};
    return (dispatch) => {
        return fetch('http://api.pet4u.com.ua/api/v1/account/profile/', {
            headers: {
                "Content-type": "application/json",
                'Authorization': "Token " + window.localStorage.token
            },
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(body)
        })
            .then((res) => {
                if(res.status === 200){
                    onPopupShow();
                }
                return res.json();
            })
            .then((res) => (dispatch(fetchEditProfile(res))))
            .catch((err) => console.log(err))
    }
}
export function changeCountry(country){
    const body = { country_id: country};
    return (dispatch) => {
        return fetch('http://api.pet4u.com.ua/api/v1/account/profile/', {
            headers: {
                "Content-type": "application/json",
                'Authorization': "Token " + window.localStorage.token
            },
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
            .then((res) => (dispatch(fetchEditProfile(res))))
            .catch((err) => console.log(err))
    }
}
export function getUsersBroods() {
    return (dispatch) => {
        return fetch('http://api.pet4u.com.ua/api/v1/broods/list/',{
            method: 'GET',
            headers: {
                'Authorization': "Token " + window.localStorage.token,
                'Content-type': 'application/json'
            }
        })
            .then((res) => res.json()
                .then((res) => dispatch(fetchUserBroods(res))))
            .catch((err) => console.log(err))
    }
}
// Породы, которые использует пользователь
export function getUsersBreeds(){
    return (dispatch) => {
        return fetch('http://api.pet4u.com.ua/api/v1/account/profile/breeds/',{
            method: 'GET',
            headers: {
                'Authorization': "Token " + window.localStorage.token,
                'Content-type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((res) => dispatch(fetchUserBreeds(res)))
            .catch((err) => console.log(err))
    }
}

export function addUserBreed(id){
    return (dispatch) => {
        return fetch(`http://api.pet4u.com.ua/api/v1/account/profile/breeds/?id=${id}`, {
            method: 'POST',
            headers: {
                'Authorization': "Token " + window.localStorage.token,
                'Content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => dispatch(addBreed(res)))
            .catch(err => console.log(err));
    }
}
export function delUserBreed(id){
    return (dispatch) => {
        return fetch(`http://api.pet4u.com.ua/api/v1/account/profile/breeds/?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': "Token " + window.localStorage.token,
                'Content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => dispatch(removeBreed(res)))
            .catch(err => console.log(err));
    }
}

export function getBroodView(id){
    return (dispatch) => {
        return fetch(`http://api.pet4u.com.ua/api/v1/brood/view?id=${id}`,{
            method: 'GET',
            headers: {
                'Authorization': "Token " + window.localStorage.token,
                'Content-type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((res) => dispatch(fetchBroodView(res)))
    }
}

export function getPlanedLitters(){
    return (dispatch) => {
        return fetch('http://api.pet4u.com.ua/api/v1/brood/planned', {
            method: 'GET',
            headers: {
                'Authorization': "Token " + window.localStorage.token,
                'Content-type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((res) => dispatch(fetchPlanedLitters(res)))
            .catch((err) => console.log(err))
    }
}
export function planeLitter(id, date){
    let body = {breed_id: id, birthday: date}
    return (dispatch) => {
        return fetch('http://api.pet4u.com.ua/api/v1/brood/planned', {
            method: 'POST',
            headers: {
                'Authorization': "Token " + window.localStorage.token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
            .then((res) => dispatch(fetchPlaneLitter(res)))
            .catch((err) => console.log(err))
    }
}
export function deleteAccount(){
    return fetch('http://api.pet4u.com.ua/api/v1/account/profile/', {
        method: 'DELETE',
        headers: {
            'Authorization': "Token " + window.localStorage.token
        }
    })
    .then(function(res){
        if(res.status === 200){
            window.localStorage.removeItem('token');
            window.location.reload();
        }
    })
}

export function changeBroodView(id, momDes, momLink, dadDes, dadLink, pair_comment, cost_comment, fci_dad, ph_dad, fci_mom, ph_mom) {
    momDes = momDes ? momDes : '';
    momLink = momLink ? momLink : '';
    dadDes = dadDes ? dadDes : '';
    dadLink = dadLink ? dadLink : '';
    const body = {parents: {father: {feat: dadDes, pedigree: dadLink, fci_check: fci_dad, ped_check: fci_dad}, mother: { feat: momDes, pedigree: momLink, fci_check: fci_mom, ped_check: ph_mom}}, pair_comment, cost_comment};
    return (dispatch) => {
        return fetch(`http://api.pet4u.com.ua/api/v1/brood/view?id=${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': "Token " + window.localStorage.token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(function (res) {
                if (res.status === 200) {
                    dispatch(getBroodView(id));
                    window.location.reload();
                }
            })
            .catch(err => console.log(err))
    }
}