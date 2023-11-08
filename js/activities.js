import { supa } from "/js/supabase.js";

document.addEventListener('DOMContentLoaded', async function() {
    const user = supa.auth.user();

    if (user) {
        const { data: myPostsData, error: myPostsError } = await supa
            .from('post')
            .select('adresse, kindofactivity')
            .eq('user_id', user.id);

        if (myPostsError) {
            console.error('Fehler beim Abrufen der eigenen Posts:', myPostsError.message);
            return;
        }

        const myPostsContainer = document.getElementById('infoContainerCurrent');

        myPostsData.forEach(post => {
            const postBox = document.createElement('div');
            postBox.classList.add('postBox');

            const adresseElement = document.createElement('p');
            adresseElement.textContent = `Adresse: ${post.adresse}`;

            const kindofactivityElement = document.createElement('p');
            kindofactivityElement.textContent = `Art der Aktivität: ${post.kindofactivity}`;

            postBox.appendChild(adresseElement);
            postBox.appendChild(kindofactivityElement);

            myPostsContainer.appendChild(postBox);
        });
    }
});
