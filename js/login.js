import { supa } from "/js/supabase.js";


async function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { user, error } = await supa.auth.signIn({ email, password });

    if (error) {
        console.error("Error during login: ", error.message);
        return;
    }

    if (user) {
        console.log("Login successful");
        window.location.href = "suchen.html";
    } else {
        console.log("Login failed. Check your credentials.");
    }
}

document.getElementById('loginForm').addEventListener('submit', loginUser);
