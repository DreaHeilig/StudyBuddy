import { supa } from "/js/supabase.js";
function handleButtonClick(buttonText) {
    alert("Clicked " + buttonText);
}
import { supa } from "/js/supabase.js";

async function createNewActivity() {
    const adresse = document.getElementById('adresse').value;
    const placedescription = document.getElementById('placedescription').value;
    const kindofactivity = document.getElementById('kindofactivity').value;
    const needhelp = document.getElementById('needhelp').value;
    const kindofknowledge = document.getElementById('kindofknowledge').value;

    const user = supa.auth.user(); // Hier holen wir den angemeldeten Benutzer

    const { data, error } = await supa
        .from('post')
        .insert([
            {
                user_id: user.id, // Hier fügen wir die Benutzer-ID zum Post hinzu
                adresse: adresse,
                placedescription: placedescription,
                kindofactivity: kindofactivity, 
                needhelp: needhelp,
                kindofknowledge: kindofknowledge,
            }
        ]);