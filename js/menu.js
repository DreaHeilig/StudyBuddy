//-----------------------logout funktion----------------------------
import { supa } from "/js/supabase.js";


document.addEventListener('DOMContentLoaded', function() {
    // Event-Listener für den Logout-Button
    document.getElementById('logoutButton').addEventListener('click', signOut);
});

async function signOut() {
    const { error } = await supa.auth.signOut();

    if (error) {
        console.error("Fehler beim Ausloggen:", error);
    } else {
        console.log("Benutzer erfolgreich ausgeloggt.");
        window.location.href = "login.html";// Hier kannst du weitere Aktionen nach dem Ausloggen durchführen
    }
}