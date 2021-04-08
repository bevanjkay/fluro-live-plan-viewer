<template>
    <nav>
        
        <!-- <a @click="showHelp()"><b-icon pack="fas" icon="question" /></a> -->
    </nav>
</template>
<script>
// import { mapActions, mapGetters, mapMutations } from 'vuex';


export default {
    // props:['callback'],
    data() {
        return {}
    },
    mounted() {
        var userAccount = _.get(this.user, 'account._id');

        if (userAccount == '5b6989031c98f448b36740ec') {
            console.log('CREATED CHECK IF DISCOVERY CHURCH', userAccount)
            // window.localStorage.setItem('collectOnly', true);
            this.collectOnly = true;
        }

        //   

        //             created() {
        //     
        //     console.log('CREATED CHECK IF DISCOVERY CHURCH', this)
        // },
    },
    methods: {
        showHelp() {
            this.$dialog.alert({
                title: 'Scanning Tickets',
                message: `
          <div class="content">
          <ol>


          <li>
          Scan the ticket QR Code
          </li>
          <li>
          Select all of the tickets that the person is collecting, by either tapping 'Select All' or individually selecting each ticket. When selected the ticket will change color.
          </li>
          <li>
          At the bottom of the screen tap 'Collect'
          </li>
          <li>
          A message will display if the ticket has been successfully collected
          </li>
          <li>
          Exchange the appropriate wrist band for each ticket type
          </li>
          </ol>
          </

          `,
                // cancelText: 'Disagree',
                confirmText: 'Ok',
                // type: 'is-success',
                // onConfirm: () => this.$toast.open('User agreed')
            })
        },
    }
}
</script>
<style scoped lang="scss">
nav {
    display: flex;
    background: #fff;
    // position:fixed;
    // left:0;
    // top:0;
    // right:0;
    border-bottom: 1px solid #ddd;

    a {
        line-height: 50px;
        flex: 1;
        text-align: center;
        color: inherit;
        border-right: 1px solid #ddd;

        &:last-child {
            border-right: none;
        }

        .icon {
            display: inline-block;
        }
    }
}
</style>