require('./bootstrap');

window.Vue = require('vue');
import { Form, HasError, AlertError } from 'vform';
import swal from 'sweetalert2'
window.swal = swal;

const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', swal.stopTimer)
        toast.addEventListener('mouseleave', swal.resumeTimer)
    }
})
window.toast = toast;



window.Fire=new Vue();


window.Form= Form;

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

//Registered
Vue.component('pagination', require('laravel-vue-pagination'));
import VueRouter from 'vue-router'
Vue.use(VueRouter)
let routes = [
    { path: '/developer', component: require('./components/Developer.vue').default},

    { path: '/dashboard', component: require('./components/Dashboard.vue').default},
    { path: '/profile', component: require('./components/Profile.vue').default },
    { path: '/users', component: require('./components/Users.vue').default }


]




const router = new VueRouter({
    mode:'history',
    routes // short for `routes: routes`
})
Vue.component('example-component', require('./components/ExampleComponent.vue').default);
const app = new Vue({
    el: '#app',
    router,
    data:{
        search : ''
    },
    methods:
        {
            searchit: _.debounce(() => {
                Fire.$emit('searching');
            },1000),
            printme() {
                window.print();
            }
        }
});
