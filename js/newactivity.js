import { supa } from "/js/supabase.js";


document.getElementById('newactivity').addEventListener('click', async () => {
    const adresse = document.getElementById('adresse').value;
    const placedescription = document.getElementById('placedescription').value;
    const kindofactivity = document.getElementById('kindofactivity').value;
    const needhelp = document.getElementById('needhelp').value;
    const kindofknowledge = document.getElementById('kindofknowledge').value;
    const photoInput = document.getElementById('photo');
    

        try {
            // Daten in die Supabase-Datenbank einfügen
            const { data, error } = await supa
                .from('post')
                .insert([
                    { adresse, placedescription, kindofactivity, needhelp, kindofknowledge },
                ]);

            if (error) {
                throw error;
            }

        // Foto hochladen
        const { data: fileData, error: fileError } = await supa
            .storage
            .from('profilpic') // Ersetze 'dein_bucket_name' durch den Namen deines Buckets
            .upload(`public/${photoFile.name}`, photoFile);

        if (fileError) {
            throw fileError;
        }
    

        console.log('Daten erfolgreich in Supabase eingefügt:', data);
        console.log('Foto erfolgreich hochgeladen:', fileData);
    } catch (error) {
        console.error('Fehler beim Einfügen der Daten:', error);

    } else {
        console.error('Es wurde kein Foto ausgewählt.');
    }
    }
});
