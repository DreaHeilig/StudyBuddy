
/*import { supa } from "/js/supabase.js";


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
  }*/
  
  // Function to sign up using email and password
  /*async function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const { error } = await supa.auth.signUp({ email, password });
  
    if (error) {
        console.error("Error during sign up: ", error.message);
    } else {
        console.log("Signed up as ", email);
    }
  } */
// script.js

import { supa } from "/js/supabase.js";

async function signUp() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('passwordConfirm').value;

    const {user, error } = await supa.auth.signUp({email, password });

    if (password !== passwordConfirm) {
        alert("Passwords do not match. Please try again.");
        return;
    }
    if (error) {
        console.error("Error during sign up: ", error.message);
    } else {
        const { data, error } = await supa
            .from('profiles')
            .insert({
                    profiles_id: user.id,
                    username: username,
                    email: email,
                    password: password, // Remember to hash the password before saving to the database for security
                    avatar_url: 'default_avatar_url'
                });

        if (error) {
            console.log("Error during sign up: ", error.message);
        } else {
            console.log("Daten wurden erfolgreich gespeichert:", data);
            window.location.href = "login.html";
        }
    }
}



document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    signUp();
});

  


// Check and display the initial user status
const initialUser = supa.auth.user();
updateUserStatus(initialUser);

// Event listeners for the buttons
document.getElementById('loginConfirm').addEventListener('click', login);
document.getElementById('registrationConfirm').addEventListener('click', () => {
  console.log('gggg');
});

  

  // Function to update user status
  function updateUserStatus(user) {
    const userStatusElement = document.getElementById('userStatus');
  
    if (user) {
        userStatusElement.textContent = `Authenticated as: ${user.email}`;
    } else {
        userStatusElement.textContent = "Not authenticated.";
    }
  }

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
