
// import Vue from 'vue';
// import Axios from 'axios';
// import store from '@/store';



// ///////////////////////////////////////

// const Fluro = Axios.create();
// const apiURL = 'https://api.fluro.io';
// // const apiURL = '/api/';

// console.log('API URL', apiURL);

// ///////////////////////////////////////

// //Setup Fluro for requests
// Fluro.defaults.baseURL = apiURL;
// Fluro.defaults.headers.common.Accept = 'application/json';


// /////////////////////////////////////////////////////


// var inflightRefreshRequest;

// function refreshAccessToken(refreshToken) {

// 	//If there is already a request in progress
// 	if(inflightRefreshRequest) {
// 		console.log('Already refreshing!', inflightRefreshRequest)
// 		//Return the refresh request
// 		return inflightRefreshRequest;
// 	}

// 	/////////////////////////////////////////////////////

// 	console.log('Refresh Access Token Now please', refreshToken);

// 	//Create an refresh request
// 	inflightRefreshRequest = new Promise(function(resolve, reject) {
		
// 		/////////////////////////////////////////////////////

// 		Fluro.post('token/refresh', {refreshToken:refreshToken}, {bypassInterceptor:true}).then(function tokenRefreshComplete(res) {

// 			//Commit the new user object to the Vuex store

// 			var currentUser = store.state.session.user;
// 			store.commit('user', Object.assign(currentUser, res.data));

// 			//Resolve with the new token
// 			resolve(res.data.token);

// 			//Remove the inflight request
// 			inflightRefreshRequest = null;
// 		}, reject);

// 		/////////////////////////////////////////////////////


// 	});

// 	//Return the refresh request
// 	return inflightRefreshRequest;
// }

// /////////////////////////////////////////////////////

// Fluro.interceptors.request.use((config) => {

// 	//If we want to bypass the interceptor
// 	//then just return the request
// 	if(config.bypassInterceptor) {
// 		console.log('Bypass!');
// 		return config;
// 	}

// 	//////////////////////////////

// 	//Get the original request
// 	var originalRequest = config;

// 	//If we aren't logged in or don't have a token
// 	var token = _.get(store.state.session.user, 'token');
// 	var refreshToken = _.get(store.state.session.user, 'refreshToken');

// 	//No token or refresh token
// 	if(token) {
// 		//Set the token of the request
// 		originalRequest.headers['Authorization'] = 'Bearer ' + token;
// 	} else {
// 		//Return the original request
// 		return originalRequest;
// 	}

// 	/////////////////////////////////////////////////////

// 	//Using a static token
// 	if(!refreshToken) {
// 		//Continue with the original request
// 		return originalRequest;
// 	}

// 	/////////////////////////////////////////////////////
	
// 	//We have a refresh token so we need to check
// 	//whether our access token is stale and needs to be refreshed
// 	var now = new Date();
// 	var expires = new Date(_.get(store.state.session.user, 'expires'));

// 	//If the token is still fresh
// 	if(now < expires) {
// 		//Return the original request
// 		return originalRequest;
// 	}

// 	/////////////////////////////////////////////////////

// 	//The token is stale by this point
// 	console.log('Need to refresh the token!');

// 	return new Promise(function(resolve, reject) {

// 		//Refresh the token
// 		refreshAccessToken(refreshToken)
// 	    .then(function(newToken) {

// 	    	console.log('token was refreshed', newToken);
// 	    	//Update the original request with our new token
// 	    	originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
// 	    	//And continue onward
// 	    	return resolve(originalRequest);

// 	    }, reject);
// 	});


// }, (error) => {
// 	console.log('REQUEST ERROR', error);
// 	return Promise.reject(error);
// })

// /////////////////////////////////////////////////////

// Fluro.interceptors.response.use((response) => {
// 	// console.log('RESPONSE', response);
// 	return response;
// }, (err) => {

// 	console.log('Error', err);

// 	var status = err.response.status;

// 	switch(status) {

// 		case 401:
// 			//Logout
// 			store.dispatch('logout');
// 		break;
// 		case 502:
// 			//Retry
// 			console.log('Axios Retry')
// 			return axios.request(err.config);
// 		break;
// 		default:
// 			//Some other error
// 		break;
// 	}

// 	return Promise.reject(err);
// })


// export default Fluro;



