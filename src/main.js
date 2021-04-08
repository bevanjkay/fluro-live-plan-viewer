import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./filters"

///////////////////////////////////////

Vue.config.productionTip = false

///////////////////////////////////////

//Add Helper packages
import _ from 'lodash';
import async from 'async';

Vue.prototype._ = _;
Vue.prototype.async = async;
// Vue.use(require('vue-moment'));

import VueMoment from 'vue-moment';
import moment from 'moment-timezone'
Vue.use(VueMoment, {
    moment,
})


///////////////////////////////////////

import FluroVue from 'fluro-vue';
Vue.use(FluroVue, { Vue, store});
var fluro = Vue.prototype.$fluro;


///////////////////////////////////////

//Include the AsyncComputed Plugin
//because it makes life easy!
import AsyncComputed from 'vue-async-computed'
Vue.use(AsyncComputed)


///////////////////////////////////////

// //Use Font Awesome

import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/pro-regular-svg-icons'
import { fas } from '@fortawesome/pro-solid-svg-icons'
import { fal } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(far, fas, fal);
Vue.component('font-awesome-icon', FontAwesomeIcon)


///////////////////////////////////////

//QR Code Scanner
import VueQrcodeReader from 'vue-qrcode-reader'
Vue.use(VueQrcodeReader)


///////////////////////////////////////

//Use Buefy
import Buefy from 'buefy';
// import 'buefy/dist/buefy.css'; // Import with SCSS instead

Vue.use(Buefy, {
    defaultIconPack: 'far',
    defaultIconComponent: FontAwesomeIcon,

});

///////////////////////////////////////

//Use Fluro
// import Fluro  from './services/fluro';
// Vue.prototype.$fluro = Fluro;

fluro.auth.addEventListener('change', userUpdated);
var previousLoggedInUser;


//Everytime the user changes
function userUpdated(user) {

    // console.log('Auth change!', !!user);

    // console.log('DO WE HAVE A USER?', user)
    //Check if the user was logged in before this change
    var wasLoggedInAs = previousLoggedInUser;
    if (previousLoggedInUser) {
        //Reset the cache as we have changed users
        fluro.resetCache();
    }

    if (user) {
        //We are authenticated as a user
        previousLoggedInUser = user;
        // reloadTerminology();
    } else {

        //We are not logged in
        previousLoggedInUser = null;

        if (fluro.applicationToken) {
            //We are authenticated as a static application
            console.log('Reload terminology from application')
            // reloadTerminology();
        } else {
            //We are not authenticated at all
            // initialize();
            //Kill all terms

        }

        //If we were logged in before
        //and now we aren't
        if (wasLoggedInAs) {

            console.log('Seeya!')
            // vm.$toasted.show(`See you next time ${wasLoggedInAs.firstName}!`, {
            //     // icon:'check'
            //     duration: 3500,
            //     type: 'success',
            // })

            //Let's go to the home page
            //var homeRoute = _.find(router.options.routes, { path: '/' })
            //if (homeRoute.meta && homeRoute.meta.requireUser) {
            //    router.push({ name: 'user.login' });
            //} else {
            //   router.push({ name: 'home' });
            //}
        }


        // router.recreateRoutes(null);
    }
}

///////////////////////////////////////
import VueTimeago from 'vue-timeago'

Vue.use(VueTimeago, {
    name: 'Timeago', // Component name, `Timeago` by default
    //locale: 'en', // Default locale
    // We use `date-fns` under the hood
    // So you can use all locales from it
    //locales: {
    //'zh-CN': require('date-fns/locale/zh_cn'),
    //'ja': require('date-fns/locale/ja'),
    //}
})



var storage = Vue.observable({
    collectOnly: String(window.localStorage.getItem('collectOnly')) == 'true',
    printer: window.localStorage.getItem('printer') || '',
})




// import { mapFields } from 'vuex-map-fields';
import { mapGetters } from 'vuex';
Vue.mixin({
	data() {
		return {
			storage,
		}
	},
    computed: {
        ...mapGetters('fluro', ['user', 'application']),
        printer: {
            get() {
                return storage.printer;
            },
            set(val) {
                storage['printer'] = val;
                window.localStorage.setItem('printer', val);
            }
        },
        collectOnly: {
            get() {

                return storage.collectOnly;
            },
            set(val) {
                storage['collectOnly'] =val;
                window.localStorage.setItem('collectOnly', val);

            }
        },
        currentPrinter() {
        	if(storage['printer']) {
        		return _.find(this.printers, function(printer) {
        			return printer._id == storage['printer'];
        		})
        	}
        }
    },
    asyncComputed: {
        printers: {
            default: [],
            get() {
                var self = this;

                return new Promise(function(resolve, reject) {

                    self.$fluro.api.get('/printer').then(function(res) {
                            resolve(res.data);
                        })
                        .then(reject);
                })
            }
        }
    },
});




///////////////////////////////////////

//Initialize and mount the Vue APP
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')