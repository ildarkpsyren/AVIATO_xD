<template>
  <div class="ticket-list">
    <h2>Ticket List</h2>
    <ul>
      <li v-for="ticket in tickets" :key="ticket.id" class="ticket-item">
        <div class="ticket-info">
          <span class="ticket-name">{{ ticket.first_name }} {{ ticket.last_name }}</span>
          <span class="ticket-flight">{{ ticket.flightNumber }}</span>
        </div>
        <div class="ticket-details">
          <span>Booking ID: {{ ticket.booking_id || 'N/A' }}</span>
          <span>IIN: {{ ticket.iin }}</span>
          <span>Departure: {{ ticket.departure_time }}</span>
          <span>Arrival: {{ ticket.arrival_time }}</span>
          <span>Departure Airport: {{ ticket.departure_airport }}</span>
          <span>Arrival Airport: {{ ticket.arrival_airport }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tickets: []
    };
  },
  async created() {
    try {
      const response = await axios.get('/api/tickets/viewall', {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
        }
      });
      this.tickets = response.data;
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  }
};
</script>

<style scoped>
.ticket-list {
  font-family: Arial, sans-serif;
  margin: 20px;
}

h2 {
  color: #333;
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

.ticket-item {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 10px 0;
  padding: 15px;
  transition: background-color 0.3s;
}

.ticket-item:hover {
  background-color: #f1f1f1;
}

.ticket-info {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}

.ticket-details {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.ticket-details span {
  background-color: #e7f3ff;
  border-radius: 3px;
  padding: 5px 10px;
}
</style>