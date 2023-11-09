import { supa } from "/js/supabase.js";

function formatTimestampForDatabase(created_at) {
    const year = created_at.getFullYear();
    const month = String(created_at.getMonth() + 1).padStart(2, '0');
    const day = String(created_at.getDate()).padStart(2, '0');
    const hours = String(created_at.getHours()).padStart(2, '0');
    const minutes = String(created_at.getMinutes()).padStart(2, '0');
    const seconds = String(created_at.getSeconds()).padStart(2, '0');

    const formattedTimestamp = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
    return formattedTimestamp;
}
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

        if (createdPostsError) {
            console.error('Fehler beim Abrufen der erstellten Posts: ', createdPostsError.message);
        } else {
            const infoContainerCurrent = document.getElementById('infoContainerCurrent');

            if (infoContainerCurrent) {
                // Zuerst entfernen wir alle vorhandenen Posts
                while (infoContainerCurrent.firstChild) {
                    infoContainerCurrent.removeChild(infoContainerCurrent.firstChild);
                }
            
                // Dann fügen wir den neuesten Post hinzu
                if (createdPosts.length > 0) {
                    const post = createdPosts[createdPosts.length - 1];
                    const postElement = document.createElement('ul');
            
                    const activityItem = document.createElement('li');
                    activityItem.textContent = `Aktivität: ${post.kindofactivity}`;
                    postElement.appendChild(activityItem);
            
                    const addressItem = document.createElement('li');
                    addressItem.textContent = `Adresse: ${post.adresse}`;
                    postElement.appendChild(addressItem);
            
                    infoContainerCurrent.appendChild(postElement);
                }
       
            } else {
                console.log("Element mit der ID 'infoContainerCurrent' nicht gefunden.");
            }
        }
    }
}
getUserInfo(); 

        // Abrufen aller Events, an denen der angemeldete User teilgenommen hat

async function getParticipatedActivities() {
    const user = supa.auth.user();
    
    if (user) {
        const email = user.email;
        
        const { data: userParticipations, error: userParticipationsError } = await supa
            .from('request')
            .select('post_id')
            .eq('user_email', email);
        
        if (userParticipationsError) {
            console.error('Fehler beim Abrufen der teilgenommenen Aktivitäten: ', userParticipationsError.message);
        } else {
            const postIds = userParticipations.map(participation => participation.post_id);
        
            const { data: participatedPosts, error: participatedPostsError } = await supa
                .from('post')
                .select('*')
                .in('id', postIds);

            if (participatedPostsError) {
                console.error('Fehler beim Abrufen der teilgenommenen Aktivitäten: ', participatedPostsError.message);
            } else {
                const infoContainerParticipated = document.getElementById('infoContainerParticipated');
            
                if (infoContainerParticipated) {
                    for (const post of participatedPosts) {
                        const postElement = document.createElement('ul');
            
                        const activityItem = document.createElement('li');
                        activityItem.textContent = `Aktivität: ${post.kindofactivity}`;
                        postElement.appendChild(activityItem);
            
                        const addressItem = document.createElement('li');
                        addressItem.textContent = `Adresse: ${post.adresse}`;
                        postElement.appendChild(addressItem);
            
                        infoContainerParticipated.appendChild(postElement);
                }
                } else {
                    console.log("Element mit der ID 'infoContainerParticipated' nicht gefunden.");
                }
            }
        }
    }   
}
getParticipatedActivities(); 
