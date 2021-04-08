<template>
    <div class="ticket" :class="{ selected: selected, disabled:disabled, collected:collected }">
        <div class="columns is-mobile">
            <div class="column is-four-fifths">
                <div class="type">{{ticket.title}}</div>
                <div class="name">{{ticket.contact.title}}</div>
                <template v-if="collected">
                    <div class="description">
                        Collected {{ticket.collectionDate | moment('h:mmA, MMMM Do YYYY') }} from {{ticket.collectedBy}}</div>
                </template>
                <template v-else>
                    <template v-if="disabled">
                        <div class="description"><strong>{{ticket.event.title}}</strong> • {{ticket.event.startDate | moment('h:mma dddd D MMM YYYY') }}</div>
                        <div class="date-warning">{{collectionTime }}</div>
                    </template>
                    <template v-else>
                        <div class="description">{{ticket.event.startDate | moment('h:mmA ddd D MMM YYYY') }} • {{ticket.event.title}}</div>
                    </template>
                </template>
            </div>
            <div class="column text-center">
                <b-icon pack="far" v-if="collected" size="is-large" icon="check" />
                <b-icon pack="far" v-else-if="disabled" size="is-large" icon="engine-warning" />
                <b-icon pack="far" v-else-if="!selected && !collected" size="is-large" icon="circle" />
                <b-icon pack="far" v-else-if="selected && !collected" size="is-large" icon="check-circle" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            timer: null,
            now: new Date(),
            // selected,
            //collected,
            //ticket,
        }
    },
    mounted() {
        this.mount();
    },
    beforeDestroy() {
        this.unmount();
    },
    activated() {
        this.mount();
    },
    deactivated() {
        this.unmount();
    },
    methods: {
        mount() {
            var self = this;
            self.timer = setInterval(function() {
                self.now = new Date();
            }, 900);
        },
        unmount() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        }
    },
    computed: {
        event() {
            var ticket = this.ticket;
            return ticket.event;

        },
        startDate() {
            if (!this.event || !this.event.ticketCollectionStartDate) {
                return;
            }
            return new Date(this.event.ticketCollectionStartDate);
        },
        endDate() {
            if (!this.event || !this.event.ticketCollectionEndDate) {
                return;
            }

            return new Date(this.event.ticketCollectionEndDate);
        },
        collectionTime() {
            if (!this.event) {
                return;
            }

            var now = this.now;
            var openDate = this.startDate;
            var closeDate = this.endDate;

            if (now > closeDate) {
                return `Ticketing has closed for this event`;
            }

            if (now < openDate) {
                // return `This ticket can not be collected yet (${this.$fluro.date.timeago(openDate)} (${this.$fluro.date.formatDate(openDate, 'h:mma ddd D MMM')})`;
                return `Not collectable until ${this.$fluro.date.formatDate(openDate, 'h:mma dddd D MMM')}`;
            }
            return dateString;
        },
        disabled() {

            if (this.collected) {
                return;
            }

            var event = this.event;
            if (!event || !this.startDate || !this.endDate) {
                return;
            }


            if (this.now < this.startDate) {
                return true;
            }

            if (this.now > this.endDate) {
                return true;
            }
        }
    },
    props: {
        selected: Boolean,
        collected: Boolean,
        ticket: Object,
    },

}
</script>
<style lang="scss" scoped>
@import '@/_variables.scss';


.ticket {
    padding: 7px 15px;
    white-space: nowrap;
    border: 1px solid #ddd;
    line-height: 1.5;
    border-radius: 5px;
    margin-bottom: 5px;
    background: #fff;
    box-shadow: 0 2px 3px rgba(#000, 0.1);
    transition: background 0.3s, border 0.3s, color 0.3s;

    .icon {
        opacity: 0.5;
    }

    .type {
        font-size: 0.6em;
        text-transform: uppercase;
        font-weight: 600;
        opacity: 0.8;
    }

    .name {
        font-weight: 600;
    }

    .description {
        font-size: 0.8em;
        opacity: 0.5;
        font-style: italic;
        white-space: normal;
    }

    .date-warning {
        font-size: 0.7em;
        color: darken(red, 10%);
        background: rgba(red, 0.3);
        border-radius: 20px;
        padding: 3px 10px;
        font-style: italic;
        white-space: normal;
        display: inline-block;
    }

    &.selected {
        background: linear-gradient(120deg, $primary, desaturate(lighten($primary, 15%), 0)); //rgba($primary, 0.1) !important;
        color: #fff; //$primary;
        border-color: $primary;
        text-shadow: 0 1px 1px rgba(#000, 0.1);

        .icon {
            opacity: 1;
        }
    }


    // &.collected {
    // 	background: $success;//rgba(#000, 0.05) !important;
    // 	color:#fff;// rgba(#000, 0.5);
    // 	border-color: $success;
    // }

    &.collected {
        background: rgba(#000, 0.05) !important;
        color: rgba(#000, 0.5);

        // background: desaturate(lighten($success, 45%),25%);
        // color: darken($success, 20%);
        // border-color: $success;
        .icon {
            color: $success;
        }
    }


    &.disabled {
    	opacity: 0.8;
        pointer-events: none;

        .icon {
        color: darken(red, 10%);
        }

        // background: rgba(red, 0.05) !important;
        //color: red;

        // .description {
        //     color: darken($danger, 20%);
        // }

        // background: rgba(#ff0000, 0.05) !important;
        // color: rgba(#ff0000, 0.5);
        // // background: desaturate(lighten($success, 45%),25%);
        // // color: darken($success, 20%);
        // // border-color: $success;
        // .icon {
        // 	color: $danger;
        // }
    }


}
</style>