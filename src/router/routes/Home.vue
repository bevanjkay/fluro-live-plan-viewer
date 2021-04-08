<template>
    <div>
        <div v-for="service in services">
            <h2>{{ service.title }}</h2>
            <p>{{ service.startDate }}</p>
            <div v-for="plan in service.plans">
                <router-link :to="{name: 'plan', params: { id: plan._id }}">View live plan</router-link>
            </div>
        </div>
    </div>
</template>
<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: "home",
    components: {
    },
    methods: {
    },
    asyncComputed: {
        services: {
            get() {

                var self = this;

                return new Promise((resolve, reject) => {

                    self.$fluro.api.get('/content/service?status=active')
                        .then((res) => {
                            console.log(res.data);
                            resolve(res.data);
                        })
                        .catch(function(err) {
                            console.log(err);
                            reject(err);
                        });
                })
            },
            default: [],
        }
    }
};
</script>