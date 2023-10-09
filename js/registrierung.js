document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Speichern der Daten in Superbase
    saveDataToSuperbase(username, email, password);
});

function saveDataToSuperbase(username, email, password) {
    const supabaseUrl = 'https://your-project.supabase.co';
    const supabaseKey = 'your-api-key';
    const supabase = supabase.createClient(supabaseUrl, supabaseKey);

    supabase
        .from('users')
        .insert([{ username, email, password }])
        .then(response => {
            console.log('Daten erfolgreich gespeichert:', response);
        })
        .catch(error => {
            console.error('Fehler beim Speichern der Daten:', error);
        });
}