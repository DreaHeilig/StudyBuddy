document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.getElementById('logoScreen').style.display = 'none';
        document.getElementById('startScreen').classList.remove('hidden');
    }, 3000); // Zeige den Startbildschirm nach 3000 Millisekunden (3 Sekunden)
});