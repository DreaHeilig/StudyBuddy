import { supa } from "/js/supabase.js";



async function getUserInfo() {
    const user = supa.auth.user();
  
    if (user) {
      // Use the authenticated user's ID to query the database for their information
      const { data, error } = await supa
        .from('user') // Assuming 'user' is the table name
        .select('email') // You can select the columns you need
        .eq('user_id', user.id) // Match the user_id to the authenticated user's ID
        .single(); // This assumes there's only one matching user; adjust as needed
  
      if (error) {
        console.error("Error fetching user information: ", error.message);
      } else {
        if (data) {
          const email = data.email;
          console.log("Email: ", email);
          return email;
        } else {
          console.log("User not found.");
        }
      }
    } else {
      console.log("Not authenticated.");
    }
  }    

getUserInfo();

document.getElementById('newactivity').addEventListener('click', async () => {
    const adresse = document.getElementById('adresse').value;
    const placedescription = document.getElementById('placedescription').value;
    const kindofactivity = document.getElementById('kindofactivity').value;
    const needhelp = document.getElementById('needhelp').value;
    const kindofknowledge = document.getElementById('kindofknowledge').value;
    const photo = document.getElementById('photo').files[0];

    if (!adresse || !placedescription || !kindofactivity || !needhelp || !kindofknowledge || !photo) {
        alert('Bitte fülle alle Felder aus und lade ein Foto hoch.');
        return;
    }

    try {
        // Hochladen des Fotos
        const { data, error } = await supa.storage.from('avatars').upload(`bilder/${photo.name}`, photo);
        const email = await getUserInfo();

        if (error) {
            throw error;
        }

        const imageUrl = data.Key;

        // Speichern der Daten in der Tabelle "post"
        const { data: postData, error: postError } = await supa
            .from('post')
            .insert([
                {   adresse,
                    placedescription,
                    kindofactivity,
                    needhelp,
                    kindofknowledge,
                    photo_url: imageUrl, // Speichern der URL des hochgeladenen Fotos
                    activepost: true,
                    email_id: email,
                },
            ]);

        if (postError) {
            throw postError;
        }

        // Erfolgreich erstellt, zur bestaetigungs.html Seite wechseln
        document.getElementById('confirmationIcon').style.display = 'block'; // Zeige das Bestätigungssymbol

        setTimeout(() => {
            window.location.href = `menu.html?username=${adresse}&placedescription=${placedescription}&kindofactivity=${kindofactivity}&needhelp=${needhelp}&kindofknowledge=${kindofknowledge}`;
        }, 3000); // Warte 3 Sekunden, bevor zur menu.html Seite wechseln

    } catch (error) {
        console.error('Error:', error.message);
        alert('Es ist ein Fehler aufgetreten. Bitte versuche es erneut.')
    }
});