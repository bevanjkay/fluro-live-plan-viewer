<template>
    <div class="container" style="margin-top: 20px">
        <div v-for="service in services" class="box content">
            <h2>{{ service.title }}</h2>
            <p>{{ service.startDate | formatDate('h:mma dddd Do MMM YYYY ') }}</p>
            <div v-for="plan in service.plans">
                <b-button primary type="primary" tag="router-link" :to="{name: 'plan', params: { id: plan._id }}">View live plan</b-button>
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

                    self.$fluro.api.get('/content/event?status=active', {
                        params: {
                            sort: 'startDate',
                            status: 'active',
                            allDefinitions: true
                        }
                    })
                        .then((res) => {
                            resolve(res.data.filter(e => e.plans.length));
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

<style lang="scss">
</style>