import { supa } from "/js/supabase.js";

function formatTimestampForDatabase(timestamp) {
    const year = timestamp.getFullYear();
    const month = String(timestamp.getMonth() + 1).padStart(2, '0');
    const day = String(timestamp.getDate()).padStart(2, '0');
    const hours = String(timestamp.getHours()).padStart(2, '0');
    const minutes = String(timestamp.getMinutes()).padStart(2, '0');
    const seconds = String(timestamp.getSeconds()).padStart(2, '0');

    const formattedTimestamp = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
    return formattedTimestamp;
}
const formattedTimestamp = await getUserInfo();
console.log(formattedTimestamp);

async function getUserInfo() {
    const user = supa.auth.user();

    if (user) {
        const email = user.email;

        // Abrufen aller erstellten Posts des angemeldeten Users in den letzten 24 Stunden
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

        const { data: createdPosts, error: createdPostsError } = await supa
            .from('post')
            .select('*')
            .eq('email_id', email)
            .gte('created_at', twentyFourHoursAgo);

        if (createdPostsError) {
            console.error('Fehler beim Abrufen der erstellten Posts: ', createdPostsError.message);
        } else {
            const infoContainerCurrent = document.getElementById('infoContainerCurrent');

            if (infoContainerCurrent) {
                for (const post of createdPosts) {
                    const postElement = document.createElement('div');
                    postElement.textContent = `Aktivität: ${post.kindofactivity}, Adresse: ${post.adresse}`;
                    infoContainerCurrent.appendChild(postElement);
                }
            } else {
                console.log("Element mit der ID 'infoContainerCurrent' nicht gefunden.");
            }
        }

        // Abrufen aller Events, an denen der angemeldete User teilgenommen hat
        const { data: participatedEvents, error: participatedEventsError } = await supa
            .from('post')
            .select('*')
            .eq('email_id', email);

        if (participatedEventsError) {
            console.error('Fehler beim Abrufen der teilgenommenen Events: ', participatedEventsError.message);
        } else {
            const infoContainerParticipated = document.getElementById('infoContainerParticipated');

            if (infoContainerParticipated) {
                for (const event of participatedEvents) {
                    const eventElement = document.createElement('div');
                    eventElement.textContent = `Event: ${event.eventname}, Ort: ${event.ort}`;
                    infoContainerParticipated.appendChild(eventElement);
                }
            } else {
                console.log("Element mit der ID 'infoContainerParticipated' nicht gefunden.");
            }
        }
    } else {
        console.log("Nicht authentifiziert.");
    }
}

getUserInfo();

const twentyFourHoursAgo = new Date();
twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
const formattedCreatedAt = formatTimestampForDatabase(twentyFourHoursAgo);