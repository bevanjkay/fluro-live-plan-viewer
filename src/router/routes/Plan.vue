<template>
    <div>
        <div>
            <h2>{{ item.title }}</h2>
            <table class="table">
                <tbody>
            <tr :class="dynamicRowClass(schedule)" v-for="schedule in item.schedules" :key="schedule._id">
                <td><p>{{ schedule.time }}</p></td>
                <td><p>{{ schedule.duration | mins }}</p></td>
                <td><h4>{{ schedule.title }}</h4></td>
                <td><div v-html="schedule.detail"/></td>
            </tr>
            </tbody>
            </table>
            <pre><code>{{ item }}</code></pre>
        </div>
    </div>
</template>
<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: "plan",
    computed: {
        times() {
            return _.map(this.model.schedules, 'duration').join('-');
        },
        startRow() {
            return this.model.schedules[this.startRowIndex];
        },
        startRowIndex() {
            var self = this;
            var index = _.findIndex(self.item.schedules, { type: 'start' });
            return index
        },
    },
    methods: {
        dynamicRowClass(schedule) {
            if (schedule.data && schedule.data.current) return 'current';
            if (schedule.type === 'start') return 'start';
            if (schedule.type === 'end') return 'end';
            if (schedule.type === 'breaker') return 'breaker';
        },
        calculateDurations() {
            var self = this;
            var startIndex = self.startRowIndex;
            if (startIndex == -1) {
                startIndex = 0;
            }
            //////////////////////////////////////////////////
            var eventStartDate = _.get(self.item, 'event.startDate');
            var planStartDate = _.get(self.item, 'startDate');
            // var startDate = (planStartDate ? new Date(planStartDate) : false) || (eventStartDate ? new Date(eventStartDate) : false) || new Date(); 
            var startDate = (eventStartDate ? new Date(eventStartDate) : false) || (planStartDate ? new Date(planStartDate) : false) || new Date();
            //////////////////////////////////////////////////
            function newTime(elapsed) {
                var clonedDate = new Date(JSON.parse(JSON.stringify(startDate)));
                if (elapsed < 0) {
                    clonedDate.setTime(startDate.getTime() - (-1 * elapsed));
                } else {
                    clonedDate.setTime(startDate.getTime() + elapsed);
                }
                return self.$fluro.date.formatDate(clonedDate, 'h:mma');
            }
            
            var rows = self.item.schedules;
            var before = rows.slice(0, startIndex).reverse();
            var after = rows.slice(startIndex);
            ///////////////////////////////////////
            _.reduce(before, function(elapsed, row, index) {
                if (row.duration) {
                    elapsed += (parseInt(row.duration) * 1000);
                }
                self.$set(row, 'time', newTime(-elapsed));
                self.$set(row, 'elapsedTime', -elapsed);
                return elapsed;
            }, 0)
            _.reduce(after, function(elapsed, row, index) {
                self.$set(row, 'time', newTime(elapsed));
                if (row.duration) {
                    elapsed += (parseInt(row.duration) * 1000);
                }
                self.$set(row, 'elapsedTime', elapsed);
                return elapsed;
            }, 0)
        },
    },
    created() {
    },
    asyncComputed: {
        item: {
            get() {

                var self = this;

                return new Promise((resolve, reject) => {

                    self.$fluro.api.get(`/content/event/${self.$route.params.id}`)
                        .then((res) => {
                            // console.log(res);
                            resolve(res.data);
                        })
                        .catch(function(err) {
                            reject(err);
                        })
                        .finally(() => self.calculateDurations());
                })
            },
            default: [],
        }
    },
    filters: {
        mins(sec_num) {
            if (!sec_num) {
                return '';
            }
            /////////////////////////////////////
            var hours = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);
            /////////////////////////////////////
            //Clear string if 0
            hours = (hours ? hours : '');
            minutes = (minutes ? minutes : '');
            seconds = (seconds ? seconds : '');
            /////////////////////////////////////
            function pad(str) {
                return ("0" + str).slice(-2);
            }
            /////////////////////////////////////
            /////////////////////////////////////
            if (hours) {
                return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
            }
            // if (minutes && seconds) {
            //     return `${pad(minutes)}:${pad(seconds)}`;
            // }
            if (minutes && seconds) {
                return `${minutes}m ${seconds}s `;
            }
            if (minutes) {
                return `${minutes} mins`;
            }
            return `${seconds}s`;
        },
}
}
</script>

<style lang="scss">
.start {
    background: rgba(green, 0.2);
}

.end {
    background: rgba(red, 0.2);
}

.breaker {
    background: rgba(black, 0.2);
}

.current {
    background: rgba(orange, 0.2);
}
</style>