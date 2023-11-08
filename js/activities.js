import { supa } from "/js/supabase.js";

async function getUserInfo() {
  const user = supa.auth.user();

  if (user) {
    // Verwende die authentifizierte Benutzer-ID, um die Datenbank nach Informationen zu durchsuchen
    const { data, error } = await supa
      .from('user')
      .select('email')
      .eq('email', user.email)
      .single();

    if (error) {
      console.error("Fehler beim Abrufen der Benutzerinformationen: ", error.message);
    } else {
      if (data) {
        const email = data.email;
        console.log("E-Mail: ", email);

        // Aktualisiere das HTML-Element mit dem abgerufenen Benutzernamen
        const userInfoNameElement = document.getElementById('infoContainerCurrent');
        if (userInfoNameElement) {
          userInfoNameElement.textContent = email;
        } else {
          console.log("Element mit der ID 'infoContainerCurrent' nicht gefunden.");
        }
      } else {
        console.log("Benutzer nicht gefunden.");
      }
    }
  } else {
    console.log("Nicht authentifiziert.");
  }
}

getUserInfo();
