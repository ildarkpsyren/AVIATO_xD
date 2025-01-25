<template>
  <div>
    <h1>Tickets</h1>
    <ul>
      <li v-for="ticket in tickets" :key="ticket.id">
        {{ ticket.first_name }} {{ ticket.last_name }} - Booking ID: {{ ticket.booking_id }} - IIN: {{ ticket.iin }} - Departure: {{ ticket.departure_time }} - Arrival: {{ ticket.arrival_time }} - Departure Airport: {{ ticket.departure_airport }} - Arrival Airport: {{ ticket.arrival_airport }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  data() {
    return {
      tickets: []
    };
  },
  created() {
    this.fetchTickets();
  },
  methods: {
    async fetchTickets() {
      try {
        const response = await axios.get('/api/tickets/viewall');
        this.tickets = response.data;
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    }
  }
};
</script>