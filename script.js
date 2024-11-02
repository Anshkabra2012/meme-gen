function generateMeme() {
    const templateId = document.getElementById('memeTemplate').value;
    const topText = document.getElementById('topText').value;
    const bottomText = document.getElementById('bottomText').value;

    const username = 'YOUR_USERNAME';
    const password = 'YOUR_PASSWORD';
    const url = 'https://api.imgflip.com/caption_image';

    const formData = new URLSearchParams();
    formData.append('template_id', templateId);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('text0', topText);
    formData.append('text1', bottomText);

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('memeImage').src = data.data.url;
            launchConfetti();
        } else {
            alert('Error: ' + data.error_message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Something went wrong! Check the console for details.');
    });
}

function launchConfetti() {
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
}

function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
}

function showSection(sectionId) {
    document.getElementById('memeSection').style.display = 'none';
    document.getElementById('supportSection').style.display = 'none';
    document.getElementById('contactSection').style.display = 'none';

    document.getElementById(sectionId).style.display = 'block';
}
