import { supa } from "/js/supabase.js";

async function fetchPosts() {
    try {
        const { data, error } = await supa.from('post').select('placedescription,username');

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error.message);
        return [];
    }
}

async function insertPostsIntoElement(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    const posts = await fetchPosts();

    if (posts.length === 0) {
        container.innerHTML = '<p>Keine Daten gefunden.</p>';
        return;
    }

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post'); // Du kannst diese Klasse in deinem CSS definieren

        postElement.innerHTML = `
            <p>Placedescription: ${post.placedescription}</p>
            <p>Username: ${user.username}</p>
        `;

        container.appendChild(postElement);
    });
}

// Jetzt kannst du die Funktion aufrufen, um die Posts in den entsprechenden Abschnitt einzufügen.

// Aktuelle Aktivität
insertPostsIntoElement('infoContainer');
