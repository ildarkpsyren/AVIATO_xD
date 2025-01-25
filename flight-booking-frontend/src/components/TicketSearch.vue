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
    </div>
  </div>
</template>

<script>
import axios from '../axios';

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
        this.tickets = response.data;
      } catch (error) {
        console.error('Error fetching tickets:', error);
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

input[type="text"] {
  width: 100%;
  padding: 10px 10px 10px 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  font-size: 16px;
}

input[type="text"]::placeholder {
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