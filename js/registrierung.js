import { supa } from "/js/supabase.js";

// Function to fetch and display locations
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
  
