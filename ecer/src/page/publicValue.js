import Vue from 'vue'
// var api ="http://172.16.211.152"
var roles ="1"
var api = "http://172.16.211.75:8080/"

export default {
    install () {
        Vue.prototype.roles = roles
        Vue.prototype.api = api
    }
}