
import { supa } from "/js/supabase.js";

document.addEventListener('DOMContentLoaded', async function() {
    const user = supa.auth.user();

    if (user) {
        // Benutzer ist angemeldet
        const { data, error } = await supa
            .from('user')
            .select('name, email, own_activity_count, done_activity_count')
            .eq('id', user.id)
            .single();

        if (error) {
            console.error('Fehler beim Abrufen der Benutzerdaten:', error.message);
        } else {
            // Fülle die entsprechenden Felder mit den Benutzerdaten
            document.getElementById('userInfoName').textContent = data.name;
            document.getElementById('email').value = data.email;
            document.getElementById('ownactivitys').value = data.own_activity_count;
            document.getElementById('doneactivitys').value = data.done_activity_count;
        }
    } else {
        // Benutzer ist nicht angemeldet, handle es entsprechend (z.B. Weiterleitung zur Anmeldeseite)
    }
});
