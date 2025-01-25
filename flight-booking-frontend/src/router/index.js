import { createRouter, createWebHistory } from 'vue-router';
import TicketForm from '../components/TicketForm.vue';
import TicketList from '../components/TicketList.vue';
import TicketSearch from '../components/TicketSearch.vue';

const routes = [
  { path: '/create', component: TicketForm },
  { path: '/list', component: TicketList },
  { path: '/search', component: TicketSearch }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;