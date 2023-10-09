document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const profilepic = document.getElementById('picture').value;

    // Speichern der Daten in Superbase
    saveDataToSuperbase(username, email, password, profilepic);
});

function saveDataToSuperbase(username, email, password, profilepic) {
    const supabaseUrl = 'https://jrbxaomtmhqafpwdfgiy.supabase.co';
    const supabaseKey = 'your-api-keyeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyYnhhb210bWhxYWZwd2RmZ2l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzMTkwODksImV4cCI6MjAxMTg5NTA4OX0.Ncv7YeDZTGwbMgnUI1psActU6rf44IKjFzf706VONlM';
    const supabase = supabase.createClient(supabaseUrl, supabaseKey);

    supabase
        .from('users')
        .insert([{ username, email, password, profilepic }])
        .then(response => {
            console.log('Daten erfolgreich gespeichert:', response);
        })
        .catch(error => {
            console.error('Fehler beim Speichern der Daten:', error);
        });
}