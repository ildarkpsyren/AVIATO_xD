<template>
  <div class="form-container">
    <div class="form-card">
      <h2>Search Tickets</h2>
      <form @submit.prevent="searchTickets">
        <div class="form-group">
          <label for="firstName">First Name:</label>
          <input type="text" v-model="searchQuery.firstName" placeholder="Enter first name" />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name:</label>
          <input type="text" v-model="searchQuery.lastName" placeholder="Enter last name" />
        </div>
        <div class="form-group">
          <label for="iin">IIN:</label>
          <input type="text" v-model="searchQuery.iin" maxlength="12" placeholder="Enter IIN" />
        </div>
        <button type="submit" class="submit-button">Search</button>
      </form>
      <div v-if="tickets.length">
        <h3>Search Results:</h3>
        <ul>
          <li v-for="ticket in tickets" :key="ticket.id">
            <p><strong>First Name:</strong> {{ ticket.first_name }}</p>
            <p><strong>Last Name:</strong> {{ ticket.last_name }}</p>
            <p><strong>Booking ID:</strong> {{ ticket.booking_id }}</p>
            <p><strong>IIN:</strong> {{ ticket.iin }}</p>
            <p><strong>Departure Time:</strong> {{ ticket.departure_time }}</p>
            <p><strong>Arrival Time:</strong> {{ ticket.arrival_time }}</p>
            <p><strong>Departure Airport:</strong> {{ ticket.departure_airport }}</p>
            <p><strong>Arrival Airport:</strong> {{ ticket.arrival_airport }}</p>
          </li>
        </ul>
        <button @click="exportToPDF" class="export-button">Export to PDF</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
  data() {
    return {
      searchQuery: {
        firstName: '',
        lastName: '',
        iin: ''
      },
      tickets: []
    };
  },
  methods: {
    async searchTickets() {
      try {
        const { firstName, lastName, iin } = this.searchQuery;
        const response = await axios.get('/tickets/search', {
          params: { first_name: firstName, last_name: lastName, iin }
        });
        console.log('Response data:', response.data);
        this.tickets = response.data;
        console.log('Tickets array:', this.tickets);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    },
    exportToPDF() {
      const doc = new jsPDF();
      const columns = ["First Name", "Last Name", "Booking ID", "IIN", "Departure Time", "Arrival Time", "Departure Airport", "Arrival Airport"];
      const rows = this.tickets.map(ticket => [
        ticket.first_name,
        ticket.last_name,
        ticket.booking_id,
        ticket.iin,
        ticket.departure_time,
        ticket.arrival_time,
        ticket.departure_airport,
        ticket.arrival_airport
      ]);
      doc.autoTable(columns, rows);
      doc.save('tickets.pdf');
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(to bottom, #e0f7fa, #ffffff);
  min-height: 100vh;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: transparent;
}

.form-card {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 500px;
  box-sizing: border-box;
  text-align: center;
}

h2 {
  color: #333;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
}

h3 {
  color: #555;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
}

input:focus {
  border-color: #007BFF;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.submit-button, .export-button {
  width: 100%;
  padding: 15px;
  background: linear-gradient(to right, #007BFF, #00BFFF);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
  transition: background 0.3s, box-shadow 0.3s;
  margin-top: 10px;
}

.submit-button:hover, .export-button:hover {
  background: linear-gradient(to right, #0056D2, #003A8C);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>