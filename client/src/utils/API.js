import axios from "axios";

export default {
updateUsersInfo: function(userData){
    return axios.post('api/users/obj', userData)
},

getUsersInfo: function () {
    return axios.get('/api/users/obj')
},
saveUsersInfo: function (userData) {
    return axios.post('/api/users', userData)
},

authenticate: function(data) {
    return axios.post('/api/users/login', data)
},
logOut: function() {
    return axios.get('/api/users/logout')
}

};
