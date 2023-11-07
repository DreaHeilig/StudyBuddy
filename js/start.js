
import { supa } from "/js/supabase.js";

async function signUp() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('passwordConfirm').value;

    const {user, error } = await supa.auth.signUp({email, password });

    /*if (password !== passwordConfirm) {
        alert("Passwords do not match. Please try again.");
        return;
    }*/
    if (error) {
        console.error("Error during sign up: ", error.message);
    } else {
       const { data, error } = await supa
            .from('user')
            .insert({
                    user_id: user.id,
                    username: username,
                    email: email,
                    password: password, // Remember to hash the password before saving to the database for security
                    avatar_url: 'default_avatar_url'
                });

        if (error) {
            console.log("Error during sign up: ", error.message);
        } else {
            console.log("Daten wurden erfolgreich gespeichert:");
            window.location.href = "login.html";
        }
    }
}


if(document.getElementById('registrationForm')) {
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    signUp();
});
}

  

/*
// Event listeners for the buttons
if(document.getElementById('loginConfirm')) {
document.getElementById('loginConfirm').addEventListener('click', login);
document.getElementById('registrationConfirm').addEventListener('click', () => {
  console.log('gggg');
});
}
*/
  

  // Function to update user status
  function updateUserStatus(user) {
  
    if (user) {
        console.log(`Authenticated as: ${user.email}`)
    } else {
        console.log("Not authenticated.");
    }
  }


// Check and display the initial user status
const initialUser = supa.auth.user();
updateUserStatus(initialUser);

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
  

