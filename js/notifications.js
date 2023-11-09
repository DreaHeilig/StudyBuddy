import { supa } from '/js/supabase.js';

// Function to get the user's email
async function getUserInfo() {
    const user = supa.auth.user();

    if (user) {
        // Use the authenticated user's ID to query the database for their information
        const { data, error } = await supa
            .from('user') // Assuming 'user' is the table name
            .select('email') // You can select the columns you need
            .eq('user_id', user.id) // Match the user_id to the authenticated user's ID
            .single(); // This assumes there's only one matching user; adjust as needed

        if (error) {
            console.error("Error fetching user information: ", error.message);
        } else {
            if (data) {
                const userEmail = data.email;
                console.log("User Email: ", userEmail);
                return userEmail;
            } else {
                console.log("User not found.");
            }
        }
    } else {
        console.log("Not authenticated.");
    }
}

getUserInfo();

async function fetchRequests() {
    const userEmail = await getUserInfo();

    if (userEmail) {
        const formattedUserEmail = userEmail.trim().toLowerCase();

        const { data, error } = await supa
            .from('request')
            .select('id, user_email')
            .eq('post_email', formattedUserEmail)
            .is('accept', null);
        if (error) {
            console.error("Error fetching requests: ", error.message);
        } else {
            if (data && data.length > 0) {
                data.forEach((request) => {
                    const id = request.id;
                    const user_email = request.user_email;
                    appendNotification(id, user_email);
                    return id;
                });
            } else {
                console.log("No matching requests found.");
            }
        }
    }
}

fetchRequests();

function appendNotification(id, user_email) {
    const notifContainerAll = document.getElementById("notifContainerAll");
    const notifContainer = document.createElement("div");
    notifContainer.className = "notifContainer";
    notifContainer.id = "notif" + id;

    const notifText = document.createElement("p");
    notifText.className = "notifText";
    notifText.textContent = user_email + " möchte dein StudyBuddy sein!";
    
    const acceptButton = document.createElement("button");
    acceptButton.className = "acceptButton";
    const acceptButtonImg = document.createElement("img");
    acceptButtonImg.className = "notifButton";
    acceptButtonImg.src = "img/checkmark.svg";
    acceptButtonImg.alt = "Anfrage Annehmen";
    acceptButton.appendChild(acceptButtonImg);

    const declineButton = document.createElement("button");
    declineButton.className = "declineButton";
    const declineButtonImg = document.createElement("img");
    declineButtonImg.className = "notifButton";
    declineButtonImg.src = "img/Cross.svg";
    declineButtonImg.alt = "Anfrage Ablehnen";
    declineButton.appendChild(declineButtonImg);

    notifContainer.appendChild(notifText);
    notifContainer.appendChild(acceptButton);
    notifContainer.appendChild(declineButton);

    notifContainerAll.appendChild(notifContainer);

    // Add event listener to the declineButton
    declineButton.addEventListener('click', async function() {
        const idString = id.toString(); // Convert id to a string
        const lastCharacter = idString.slice(-1); // Get the last character of the id
        const lastInteger = parseInt(lastCharacter); // Convert it to an integer

        // Update the request table and then remove the notification
        await updateRequest(lastInteger);
        notifContainerAll.removeChild(notifContainer); // Remove the parent notifContainer div
    });
}

async function updateRequest(id) {
    try {
        const { data, error } = await supa
            .from('request')
            .select('id')
            .eq('id', id);

        if (error) {
            console.error("Error selecting data from the request table: ", error.message);
        } else {
            if (data && data.length > 0) {
                await supa
                    .from('request')
                    .update({ accept: false })
                    .eq('id', id);
            }
        }
    } catch (error) {
        console.error("Error updating the request table: ", error.message);
    }
}

