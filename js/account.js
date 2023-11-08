import { supa } from "/js/supabase.js";

async function getUserInfo() {
  const user = supa.auth.user();

  if (user) {
    // Use the authenticated user's ID to query the database for their information
    const { data, error } = await supa
      .from('user') // Assuming 'user' is the table name
      .select('username') // You can select the columns you need
      .eq('user_id', user.id) // Match the user_id to the authenticated user's ID
      .single(); // This assumes there's only one matching user; adjust as needed

    if (error) {
      console.error("Error fetching user information: ", error.message);
    } else {
      if (data) {
        const username = data.username;
        console.log("Username: ", username);

        // Update the HTML element with the retrieved username
        const userInfoNameElement = document.getElementById('userInfoName');
        if (userInfoNameElement) {
          userInfoNameElement.textContent = username;
        } else {
          console.log("Element with ID 'userInfoName' not found.");
        }
      } else {
        console.log("User not found.");
      }
    }
  } else {
    console.log("Not authenticated.");
  }
}

getUserInfo();