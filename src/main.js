import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.use(VCalendar, {
  firstDayOfWeek: 2,  // Monday
})

new Vue({
  render: h => h(App)
}).$mount('#app')
