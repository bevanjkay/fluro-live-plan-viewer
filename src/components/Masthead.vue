<template>
    <nav style="padding: 10px;">
        <b-button tag="router-link" to="/">See all Services</b-button>
        <!-- <a @click="showHelp()"><b-icon pack="fas" icon="question" /></a> -->
    </nav>
</template>
<script>
// import { mapActions, mapGetters, mapMutations } from 'vuex';


export default {
    // props:['callback'],
    data() {
        return {}
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