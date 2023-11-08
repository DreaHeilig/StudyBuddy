import { supa } from "/js/supabase.js";

async function getUserInfo() {
  const user = supa.auth.user();

  if (user) {
    // Use the authenticated user's ID to query the database for their information
    const { data, error } = await supa
      .from('user') // Assuming 'user' is the table name
      .select('username, email') // You can select the columns you need
      .eq('user_id', user.id) // Match the user_id to the authenticated user's ID
      .single(); // This assumes there's only one matching user; adjust as needed

    if (error) {
      console.error("Error fetching user information: ", error.message);
    } else {
      if (data) {
        const username = data.username;
        const email = data.email;
        console.log("Username: ", username);
        console.log("Email: ", email);

        // Update the HTML elements with the retrieved data
        const userInfoNameElement = document.getElementById('userInfoNameStaticText');
        const userInfoEmailElement = document.getElementById('userInfoEmail');
        if (userInfoNameElement) {
          userInfoNameElement.textContent = username;
        } else {
          console.log("Element with ID 'userInfoName' not found.");
        }
        if (userInfoEmailElement) {
          userInfoEmailElement.textContent = email;
        } else {
          console.log("Element with ID 'userInfoEmail' not found.");
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

const userInfoNameElement = document.getElementById('userInfoName');
const userInfoNameStaticText = document.getElementById('userInfoNameStaticText');
const editNameButton = document.getElementById('editName');
const editUserNameInput = document.getElementById('editUserNameInput');

// Function to toggle between edit and done modes
function toggleEditDoneMode() {
  if (editNameButton.textContent === "Edit") {
    editNameButton.textContent = "Done";
    userInfoNameStaticText.style.display = "none";
    editUserNameInput.style.display = "inline";
    editUserNameInput.value = userInfoNameStaticText.textContent;
  } else {
    editNameButton.textContent = "Edit";
    userInfoNameStaticText.style.display = "inline";
    editUserNameInput.style.display = "none";
    userInfoNameStaticText.textContent = editUserNameInput.value;

    // Update the username in the database
    const user = supa.auth.user();
    if (user) {
      const newUsername = editUserNameInput.value;

      supa
        .from('user')
        .update({ username: newUsername })
        .eq('user_id', user.id)
        .then(({ data, error }) => {
          if (error) {
            console.error("Error updating username: ", error.message);
          } else {
            console.log("Username updated successfully.");
          }
        });
    }
  }
}

// Add a click event listener to the "Edit" button
if (editNameButton) {
  editNameButton.addEventListener('click', toggleEditDoneMode);
}

