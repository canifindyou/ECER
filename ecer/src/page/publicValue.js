import Vue from 'vue'
// var api ="http://172.16.211.152"
var roles ="1"

export default {
    install () {
        Vue.prototype.roles = roles
        // Vue.prototype.api1 = api1
    }
}