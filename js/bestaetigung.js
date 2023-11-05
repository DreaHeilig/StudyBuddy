const infoBox = document.querySelector('.infoContainer');

async function fetchUserInfo() {
    const { data, error } = await supa
        .from('post')
        .select('username, placedescription, kindofactivity, needhelp, kindofknowledge')
        .single();

    if (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
        return;
    }

    const userInfo = data;

    document.getElementById('username').textContent = userInfo.username;
    document.getElementById('placedescription').textContent = userInfo.placedescription;
    document.getElementById('kindofactivity').textContent = userInfo.kindofactivity;
    document.getElementById('needhelp').textContent = userInfo.needhelp;
    document.getElementById('kindofknowledge').textContent = userInfo.kindofknowledge;
}

fetchUserInfo();