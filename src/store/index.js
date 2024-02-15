import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
/**
 *  # the target friend
    dst: {uid: xxx, name: xxx, message: [{text: xxx, left: false}]}
    # data of current user's friends
    friends: [{uid: xxx, name: xxx, message: [{text: xxx, left: false}]}]
    # messages between current user and his friends
    message: {uid: [{text: xxx, left: false}]} 
 */
const store = new Vuex.Store({
    state: {
        uid: 0,
        username: '',
        password: '',
        mail: '',
        address: '',
        phone: '',
        dst: {},
        friends: [],
        message: {},
        channelID: ''
    },
    mutations: {
        set_uid(state, newVal){
            state.uid = newVal
        },
        set_username(state, newVal) {
            state.username = newVal
        },
        set_password(state, newVal) {
            state.password = newVal
        },
        set_mail(state, newVal) {
            state.mail = newVal
        },
        set_address(state, newVal) {
            state.address = newVal;
        },
        set_phone(state, newVal) {
            state.phone = newVal;
        },
        set_dst(state, newVal) {
            state.dst = newVal;
        },
        set_friends(state, newVal) {
            state.friends = newVal;
        },
        set_channelID(state, newVal) {
            state.channelID = newVal;
        },
        set_message(state, newVal) {
            state.message = newVal;
        }
    }
})

export default store