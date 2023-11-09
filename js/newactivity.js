import { supa } from "/js/supabase.js";

async function getUserInfo() {
    const user = supa.auth.user();
  
    if (user) {

      const { data, error } = await supa
        .from('user') 
        .select('email') 
        .eq('user_id', user.id) 
        .single(); 
  
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


async function updateActivePostStatus() {
  const twentyFourHoursAgo = new Date();
  twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

  const { data, error } = await supa
      .from('post')
      .select('*')
      .eq('activepost', true);

  if (error) {
      console.error('Fehler beim Abrufen der Posts: ', error.message);
      return;
  }

  for (const post of data) {
      const createdAt = new Date(post.created_at);

      if (createdAt < twentyFourHoursAgo) {
          // Mehr als 24 Stunden vergangen, setze activepost auf false
          await supa
              .from('post')
              .update({ activepost: false })
              .eq('id', post.id);
      }
  }
}

// Rufe die Funktion alle 24 Stunden auf
setInterval(updateActivePostStatus, 24 * 60 * 60 * 1000);
