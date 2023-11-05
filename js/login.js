import { supa } from "/js/supabase.js";


async function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { data, error } = await supa
        .from('user')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

    if (error) {
        console.error("Error during login: ", error.message);
        return;
    }

    if (data) {
        console.log("Login successful");
        window.location.href = "suchen.html";
    } else {
        console.log("Login failed. Check your credentials.");
    }
}

document.getElementById('loginForm').addEventListener('submit', loginUser);
