function Navclick() {
    var btn = document.getElementById('nav-btn');

    if (btn.style.display === 'none') {
        btn.style.display = 'block';
    } else {
        btn.style.display = 'none';
    }
}