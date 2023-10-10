import { supa } from "/js/supabase.js";



// Function to login using email and password
async function login() {
  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('password').value;
  const username = document.getElementById('username').value;

  const { error } = await supa.auth.signIn({ email, password, username });

  if (error) {
      console.error("Error during login: ", error.message);
  } else {
      console.log("Logged in as ", email);
  }
}

// Function to sign up using email and password
async function signUp() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { error } = await supa.auth.signUp({ email, password });

  if (error) {
      console.error("Error during sign up: ", error.message);
  } else {
      console.log("Signed up as ", email);
  }
}

// Function to update user status
function updateUserStatus(user) {
  const userStatusElement = document.getElementById('userStatus');

  if (user) {
      userStatusElement.textContent = `Authenticated as: ${user.email}`;
  } else {
      userStatusElement.textContent = "Not authenticated.";
  }
}

// Check and display the initial user status
const initialUser = supa.auth.user();
updateUserStatus(initialUser);

// Event listeners for the buttons
document.getElementById('loginConfirm').addEventListener('click', login);
document.getElementById('registrationConfirm').addEventListener('click', signUp);

// Listener for authentication state changes
supa.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_IN") {
      console.log("User signed in: ", session.user);
      updateUserStatus(session.user);
  } else if (event === "SIGNED_OUT") {
      console.log("User signed out");
      updateUserStatus(null);
  }
});

// Logout logic
async function logout() {
  const { error } = await supa.auth.signOut();
  if (error) {
      console.error("Error during logout:", error);
  } else {
      updateUserStatus(null);
      console.log("User logged out successfully.");
  }
}

document.getElementById('logoutButton').addEventListener('click', logout);




/*

document.getElementById('registrationForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const timestamp = new Date().toISOString(); // Aktueller Zeitstempel

  // Speichern der Daten in Superbase
  try {
      const { data, error } = await supa
          .from('user')
          .insert([{ username, email, password }]);
      
      if (error) {
          console.error('Fehler beim Speichern der Daten:', error);
      } else {
          console.log('Daten erfolgreich gespeichert:', data);
      }
  } catch (error) {
      console.error('Fehler beim Speichern der Daten:', error);
  }
});





/* Function to fetch and display locations
async function fetchAndDisplayLocations() {
    try {
      // Fetch data from the "location" table
      const { data, error } = await supa
        .from('locations')
        .select('locations');
  
      // Check for errors
      if (error) {
        throw error;
      }

      console.log(data);
  
      // Get the "locations" data from the response
      const locationsData = data.map((row) => row.locations);
  
      // Update your HTML to display the locations
      const locationsContainer = document.getElementById('locations-container');
  
      locationsData.forEach((location) => {
        const locationElement = document.createElement('p');
        locationElement.textContent = location;
        locationsContainer.appendChild(locationElement);
      });
    } catch (error) {
      console.error('Error fetching and displaying locations:', error.message);
    }
  } 
  
  // Call the function to fetch and display locations when the page loads
  window.onload = fetchAndDisplayLocations; 
  */
  