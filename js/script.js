//import { supa } from "/js/supabase.js";

// js ------------------------home-page-js----------------------------//


document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.getElementById('logoScreen').style.display = 'none';
        document.getElementById('startScreen').classList.remove('hidden');
    }, 5000); // Zeige den Startbildschirm nach 5000 Millisekunden (5 Sekunden)
});


// js ------------------------registration-js----------------------------//


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

  // js ------------------------login-page-js----------------------------//

const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "user" && password === "web_dev") {
        alert("You have successfully logged in.");
        location.reload();
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})

// js ------------------------account-js----------------------------//

console.log("Hello World!");

document.addEventListener("DOMContentLoaded", function () {
    const usernameElement = document.getElementById("userInfoName");
    const editButton = document.getElementById("editName");

    let isEditing = false;

    editButton.addEventListener("click", function () {
        if (isEditing) {
            // User has finished editing, update the information
            const newUsername = usernameElement.querySelector("input").value;

            // Here, you can send the updated information to your server if needed.
            
            // Update the text content
            usernameElement.innerHTML = newUsername;

            // Toggle back to non-editing mode
            isEditing = false;
            editButton.textContent = "Edit Information";
        } else {
            // User wants to edit, switch to editing mode
            const currentUsername = usernameElement.textContent;

            // Create input fields
            usernameElement.innerHTML = `<input type="text" value="${currentUsername}">`;

            // Toggle to editing mode
            isEditing = true;
            editButton.textContent = "Confirm Changes";
        }
    });
});
