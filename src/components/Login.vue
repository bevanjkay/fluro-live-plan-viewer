<template>
    <div class="curtain">
        <!-- <h1>{{title}}</h1> -->
        <div class="form">
            <b-field label="Username">
                <b-input type="email" v-model="credentials.username" placeholder="you@youremail.com"></b-input>
            </b-field>
            <b-field label="Password">
                <b-input type="password" v-model="credentials.password" placeholder="Password" password-reveal> </b-input>
            </b-field>
            <button class="button is-primary is-fullwidth" @click="submit()">Sign in</button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';


export default {
    props: ['callback'],
    data() {
        return {
            credentials: {
                username: '',
                password: '',
            },
        }
    },
    computed: {},
    methods: {

        submit() {
            var self = this;

            
            self.$fluro.auth.login(self.credentials, {
                    bypassInterceptor: true,
                    //application: applicationContext, //Sign in to the application rather than Fluro
                })
                .then(loginSuccess, loginFail);


                function loginSuccess(res) {
			        console.log('Login success', res.data);
			        // instance.$store.commit('user', res.data);
			      }

			      //////////////////////////////////

			      function loginFail(err) {
			        console.log('ERROR!', err);
			        // instance.$store.dispatch('logout');
			      }
        },
        /**
    submit() {


      var instance = this;



      var promise = instance.$fluro.api.post('token/login', this.credentials);

      //////////////////////////////////

      promise.then(loginSuccess, loginFail);

      //////////////////////////////////

      function loginSuccess(res) {
        console.log('Login success', res.data);
        instance.$store.commit('user', res.data);
      }

      //////////////////////////////////

      function loginFail(err) {
        console.log('ERROR!', err);
        instance.$store.dispatch('logout');
      }


    }

    /**/
    }
}
</script>
<style scoped lang="scss">
.curtain {
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.form {
    display: block;
    padding: 25px;
    max-width: 400px;
    border-radius: 5px;
    background: #fff;
    box-shadow: 0 5px 5px rgba(#000, 0.1);
}
</style>