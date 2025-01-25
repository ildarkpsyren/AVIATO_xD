<template>
  <div class="form-container">
    <div class="form-card">
      <h2>Create/Update Ticket</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="firstName">First Name:</label>
          <input type="text" v-model="ticket.firstName" placeholder="Enter first name" required />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name:</label>
          <input type="text" v-model="ticket.lastName" placeholder="Enter last name" required />
        </div>
        <div class="form-group">
          <label for="iin">IIN:</label>
          <input type="text" v-model="ticket.iin" maxlength="12" placeholder="Enter IIN" required />
        </div>
        <div class="form-group">
          <label for="departureAirport">Departure Airport:</label>
          <input type="text" v-model="ticket.departureAirport" placeholder="Enter departure airport" required />
        </div>
        <div class="form-group">
          <label for="arrivalAirport">Arrival Airport:</label>
          <input type="text" v-model="ticket.arrivalAirport" placeholder="Enter arrival airport" required />
        </div>
        <div class="form-group">
          <label for="departureTime">Departure Time:</label>
          <input type="datetime-local" v-model="ticket.departureTime" required />
        </div>
        <div class="form-group">
          <label for="arrivalTime">Arrival Time:</label>
          <input type="datetime-local" v-model="ticket.arrivalTime" required />
        </div>
        <button type="submit" class="submit-button">Submit</button>
      </form>
      <div v-if="ticketId" class="ticket-created">
        <h3>Ticket Created:</h3>
        <p>ID: {{ ticketId }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  data() {
    return {
      ticket: {
        firstName: '',
        lastName: '',
        iin: '',
        departureAirport: '',
        arrivalAirport: '',
        departureTime: '',
        arrivalTime: ''
      },
      ticketId: null
    };
  },
  methods: {
  async submitForm() {
    try {
      const formattedTicket = {
        first_name: this.ticket.firstName,
        last_name: this.ticket.lastName,
        iin: this.ticket.iin, // Keep IIN as a string
        departure_airport: this.ticket.departureAirport,
        arrival_airport: this.ticket.arrivalAirport,
        departure_time: this.ticket.departureTime.replace('T', ' ').slice(0, 16),
        arrival_time: this.ticket.arrivalTime.replace('T', ' ').slice(0, 16)
      };
      const response = await axios.post('/tickets/createticket', formattedTicket);
      this.ticketId = response.data.id_ticket || response.data.id; // Adjust based on actual response
      console.log('Ticket created:', response.data);
      // Ensure the state is updated correctly
      this.$nextTick(() => {
        // Any DOM manipulations or state updates that need to happen after the response
        this.$emit('ticket-created', this.ticketId); // Emit an event to notify parent component
      });
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
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
  max-width: 400px;
  box-sizing: border-box;
  text-align: center;
}

h2 {
  color: #333;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
}

h3 {
  color: #555;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
  position: relative;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

input[type="text"],
input[type="datetime-local"] {
  width: 100%;
  padding: 10px 10px 10px 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  font-size: 16px;
}

input[type="text"]::placeholder,
input[type="datetime-local"]::placeholder {
  color: #aaa;
}

input:focus {
  border-color: #007BFF;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.form-group i {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
}

.submit-button {
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
}

.submit-button:hover {
  background: linear-gradient(to right, #0056D2, #003A8C);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.submit-button:active {
  animation: loading 1s infinite;
}

@keyframes loading {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}
</style>