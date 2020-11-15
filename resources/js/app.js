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



window.Form= Form;

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
import VueRouter from 'vue-router'
Vue.use(VueRouter)
let routes = [
    { path: '/dashboard', component: require('./components/Dashboard.vue').default},
    { path: '/profile', component: require('./components/Profile.vue').default },
    { path: '/users', component: require('./components/Users.vue').default }


]
const router = new VueRouter({

    routes // short for `routes: routes`
})
Vue.component('example-component', require('./components/ExampleComponent.vue').default);
const app = new Vue({
    el: '#app',
    router
});
