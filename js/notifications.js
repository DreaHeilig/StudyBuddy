import { supa } from '/js/supabase.js';

// Function to get the user's email
async function getUserInfo() {
    const user = supa.auth.user();

    if (user) {
        // Use the authenticated user's ID to query the database for their information
        const { data, error } = await supa
            .from('user') // Assuming 'user' is the table name
            .select('email') // You can select the columns you need
            .eq('user_id', user.id) // Match the user_id to the authenticated user's ID
            .single(); // This assumes there's only one matching user; adjust as needed

        if (error) {
            console.error("Error fetching user information: ", error.message);
        } else {
            if (data) {
                const userEmail = data.email;
                console.log("User Email: ", userEmail);
                return userEmail;
            } else {
                console.log("User not found.");
            }
        }
    } else {
        console.log("Not authenticated.");
    }
}

getUserInfo();

async function fetchRequests() {
    const userEmail = await getUserInfo(); // Wait for userEmail
  
    if (userEmail) {
      const formattedUserEmail = userEmail.trim().toLowerCase(); // Convert to lowercase and remove white spaces
  
      const { data, error } = await supa
        .from('request') // Assuming 'public' is the schema name
        .select('id, user_email, post_email')
        .eq('post_email', formattedUserEmail); // Use the formatted email for comparison
  
      if (error) {
        console.error("Error fetching requests: ", error.message);
      } else {
        if (data && data.length > 0) { // Check if there's any data
          const requestIds = data.map((request) => request.id);
          console.log("Request IDs: ", requestIds);
        } else {
          console.log("No matching requests found.");
        }
      }
    }
  }

fetchRequests();