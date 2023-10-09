console.log("Initialisierung Supabase");

// Supabase Initialisierung

    const supabaseUrl = 'https://jrbxaomtmhqafpwdfgiy.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyYnhhb210bWhxYWZwd2RmZ2l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzMTkwODksImV4cCI6MjAxMTg5NTA4OX0.Ncv7YeDZTGwbMgnUI1psActU6rf44IKjFzf706VONlM';
    const supa = supabase.createClient(supabaseUrl, supabaseKey, {
        auth: {
            redirectTo: window.location.origin,  // This will redirect back to the page where the request originated from
        },
    });

    export { supa }