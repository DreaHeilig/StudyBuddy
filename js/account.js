console.log("Hello World!");

document.addEventListener("DOMContentLoaded", function () {
    const usernameElement = document.getElementById("userInfoName");
    const editButton = document.getElementById("editName");

    let isEditing = false;

    editButton.addEventListener("click", function () {
        if (isEditing) {
            // User has finished editing, update the information
            const newUsername = usernameElement.querySelector("input").value;

            // Here, you can send the updated information to your server if needed.
            
            // Update the text content
            usernameElement.innerHTML = newUsername;

            // Toggle back to non-editing mode
            isEditing = false;
            editButton.textContent = "Edit Information";
        } else {
            // User wants to edit, switch to editing mode
            const currentUsername = usernameElement.textContent;

            // Create input fields
            usernameElement.innerHTML = `<input type="text" value="${currentUsername}">`;

            // Toggle to editing mode
            isEditing = true;
            editButton.textContent = "Confirm Changes";
        }
    });
});
