<template>
    <div class="container  is-fluid" style="margin-top:10px;">
        <div v-if="!loading" class="columns">
            <div class="column is-one-third">
            <div class="box content is-large">
                <span class="tag is-dark">Current Item</span>
                <div v-if="currentItem">
                    <h2>{{ currentItem.title }}</h2>
                    <h2 :class="currentTimeLeft < 0 ? 'overtime' : ''">{{ currentTimeLeft > 0 ? $fluro.video.hhmmss(currentTimeLeft) : '-' + $fluro.video.hhmmss(-currentTimeLeft)  }}</h2>
                    <div v-html="currentItem.detail" />
                    <div class="notes" v-if="currentItem.notes">
                        <div v-for="(note, title) in currentItem.notes">
                            <h5 class="text-bold">{{ title }}</h5>
                            <div v-html="note" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="box content is-medium"> 
                <span class="tag is-dark">Next Item</span>
                <div v-if="nextItem">
                    <h4>{{ nextItem.title }}</h4>
                    <p>{{ nextItem.duration }}</p>
                </div>
            </div>
            </div>
            <div class="column">
                <div class="level">
            <h2>{{ item.title }}</h2>
            <div><button class="button" :disabled="!previous" @click="updateCurrent(previous)" >Previous</button> | <button class="button" @click="updateCurrent(next)" :disabled="!next">Next</button></div>
            </div>
            <div>Click plan row to move to section</div>
            <table class="table is-striped is-hoverable">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Duration</th>
                        <th>Title</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
            <tr @click="updateCurrent(schedule)" :class="dynamicRowClass(schedule)" v-for="(schedule, index) in item.schedules" :key="schedule._id + index">
                <!-- <td><p>{{ schedule._id }}</p></td> -->
                <td class="time-col">{{ schedule.time }}</td>
                <td>{{ schedule.duration | mins }}</td>
                <td>{{ schedule.title }}</td>
                <td><div v-html="schedule.detail"/></td>
            </tr>
            </tbody>
            </table>
            </div>
            <!-- <pre><code>{{ item }}</code></pre> -->
        </div>
    </div>
</template>
<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: "plan",
    computed: {
        current() {
            return this.item.data ? this.item.data.current : null;
        },
        currentItem() {
            if (!this.item.schedules || !this.current) return null;
            return this.item.schedules.filter(schedule => schedule._id + '-' + schedule.title.split(' ')[0].toLowerCase() == this.current)[0]
        },
        nextItem() {
            if (!this.item.schedules) return null;
            return this.item.schedules.filter(schedule => schedule._id + '-' + schedule.title.split(' ')[0].toLowerCase() == this.next)[0]
        },
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
    data() {
        return {
            updateCount: 0,
            next: null,
            previous: null,
            loading: true,
            currentTimeLeft: 0,
            inControl: true,
        }
    },
    methods: {
        setTimeLeft() {
            if (!this.currentItem) return
            // return `Now: ${now} – Set: ${this.item.data.time} – Duration: ${this.currentItem.duration}`;
            this.currentTimeLeft = parseInt(((this.currentItem.duration * 1000) + this.item.data.time - Date.now()) / 1000);
        },
        dynamicRowClass(schedule) {

            if (schedule._id + '-' + schedule.title.split(' ')[0].toLowerCase() == this.current ) return 'is-selected';
            if (schedule.type === 'start') return 'start header';
            if (schedule.type === 'end') return 'end header';
            if (schedule.type === 'breaker') return 'breaker header';
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
        calculateNextAndPrevious() {
            let map = this.item.schedules.filter(e => !/breaker|start|end/.test(e.type)).map(e => e._id + '-' + e.title.split(' ')[0].toLowerCase())
            let currentIndex = map.indexOf(this.current);
            this.next = map[currentIndex + 1];
            this.previous = map[currentIndex - 1];
        },
        updateCurrent(schedule) {

            if (!this.inControl) return

            let self = this;

            let data = {
                data: {
                    time: Date.now()
                }
            };

            if (typeof schedule == 'string') {
                data.data.current = schedule;

            } else if (typeof schedule == 'object') {

            if (/breaker|start|end/.test(schedule.type)) return
            data.data.current = schedule._id + '-' + schedule.title.split(' ')[0].toLowerCase();
        
            }
            // console.log(data);

            self.$fluro.api.put(`/content/plan/${self.$route.params.id}`, data)
                .then(res => {
                    self.updateCount++;
                })
                .catch(err => {
                    console.log(err);
                })

        }
    },
    created() {
        
        let self = this;

        setInterval(function() { self.setTimeLeft() }, 1000);

    },
    asyncComputed: {
        item: {
            get() {

                var self = this;

                return new Promise((resolve, reject) => {

                    self.$fluro.api.get(`/content/event/${self.$route.params.id}`)
                        .then((res) => {
                            // console.log(res);
                            self.loading = false;
                           
                            resolve(res.data);
                        })
                        .catch(function(err) {
                            self.loading = false;
                            reject(err);
                        })
                        .finally(() => {
                            self.calculateDurations();
                            self.calculateNextAndPrevious();
                        });
                })
            },
            default: [],
            watch: ['updateCount']
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

.header {
    color: white;

    :not(.time-col) {
    font-weight: bold;
    text-transform: uppercase;
    font-size: 95%;
    letter-spacing: 2px;
    }
}
.start {
    background: rgba(green, 0.9);
}

.end {
    background: rgba(red, 0.9);
}

.breaker {
    background: rgba(black, 0.85) !important;
}

.overtime {
    color: red;
}
</style>