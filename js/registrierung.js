console.log("Initialisierung Supabase");

// Supabase Initialisierung

    const supabaseUrl = 'https://jrbxaomtmhqafpwdfgiy.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyYnhhb210bWhxYWZwd2RmZ2l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzMTkwODksImV4cCI6MjAxMTg5NTA4OX0.Ncv7YeDZTGwbMgnUI1psActU6rf44IKjFzf706VONlM';
    const supa = supabase.createClient(supabaseUrl, supabaseKey, {
        auth: {
            redirectTo: window.location.origin,  // This will redirect back to the page where the request originated from
        },
    });

    export { supa }

// Function to fetch and display locations
async function fetchAndDisplayLocations() {
    try {
      // Fetch data from the "location" table
      const { data, error } = await supabase
        .from('location')
        .select('locations');
  
      // Check for errors
      if (error) {
        throw error;
      }
  
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
  
