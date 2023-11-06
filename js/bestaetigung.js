document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const username = params.get('username');
    const placedescription = params.get('placedescription');
    const kindofactivity = params.get('kindofactivity');
    const needhelp = params.get('needhelp');
    const kindofknowledge = params.get('kindofknowledge');

    document.getElementById('username').textContent = username;
    document.getElementById('placedescription').textContent = placedescription;
    document.getElementById('kindofactivity').textContent = kindofactivity;
    document.getElementById('needhelp').textContent = needhelp;
    document.getElementById('kindofknowledge').textContent = kindofknowledge;
});