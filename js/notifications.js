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
            .eq('post_email', formattedUserEmail);

        if (error) {
            console.error("Error fetching requests: ", error.message);
        } else {
            if (data && data.length > 0) {
                data.forEach((request) => {
                    const id = request.id;
                    const user_email = request.user_email;
                    appendNotification(id, user_email);
                });
            } else {
                console.log("No matching requests found.");
            }
        }
    }
}

function appendNotification(id, user_email) {
    const notifContainerAll = document.getElementById("notifContainerAll");
    const notifContainer = document.createElement("div");
    notifContainer.className = "notifContainer";
    notifContainer.id = "notif" + id;

    const notifText = document.createElement("p");
    notifText.className = "notifText";
    notifText.textContent = user_email + " möchte dein StudyBuddy sein!";
    
    const acceptButton = document.createElement("button");
    acceptButton.id = "acceptButton" + id;
    const acceptButtonImg = document.createElement("img");
    acceptButtonImg.className = "notifButton";
    acceptButtonImg.src = "img/checkmark.svg";
    acceptButtonImg.alt = "Anfrage Annehmen";
    acceptButton.appendChild(acceptButtonImg);

    const declineButton = document.createElement("button");
    declineButton.id = "declineButton" + id;
    const declineButtonImg = document.createElement("img");
    declineButtonImg.className = "notifButton";
    declineButtonImg.src = "img/Cross.svg";
    declineButtonImg.alt = "Anfrage Ablehnen";
    declineButton.appendChild(declineButtonImg);

    notifContainer.appendChild(notifText);
    notifContainer.appendChild(acceptButton);
    notifContainer.appendChild(declineButton);

    notifContainerAll.appendChild(notifContainer);
}

fetchRequests();