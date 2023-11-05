import { supa } from "/js/supabase.js";

async function createPost(event) {
    event.preventDefault();

    const placedescription = document.getElementById('placedescription').value;
    const kindofactivity = document.getElementById('kindofactivity').value;
    const needhelp = document.getElementById('needhelp').value;
    const kindofknowledge = document.getElementById('kindofknowledge').value;

    const {user, error } = await supa.auth.user();

    if (user) {
        const { data, error } = await supa
            .from('post')
            .insert([
                {
                    user_id: user.id,
                    placedescription: placedescription,
                    kindofactivity: kindofactivity, 
                    needhelp: needhelp,
                    kindofknowledge: kindofknowledge,
                }
            ]);
            if (error) {
                console.log("Error during create new post: ", error.message);
            } else {
                console.log("Post wurde erfolgreich gespeichert:");
                window.location.href = "bestaetigung.html";
            }
        }
    }
    
    document.getElementById('postForm').addEventListener('submit', function(event) {
        event.preventDefault();
        createPost();
        console.log("help");
    });
