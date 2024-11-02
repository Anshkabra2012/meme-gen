// Load memes from Imgflip API
function loadMemes() {
    const memeTemplate = document.getElementById('memeTemplate');
    memeTemplate.innerHTML = ''; // Clear previous options

    // Fetch meme templates from Imgflip
    fetch('https://api.imgflip.com/get_memes')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                data.data.memes.forEach(template => {
                    const option = document.createElement('option');
                    option.value = template.id;
                    option.textContent = template.name;
                    option.dataset.img = template.url; // Set image URL for preview
                    memeTemplate.appendChild(option);
                });
            } else {
                alert('Failed to load meme templates from Imgflip.');
            }
        })
        .catch(error => {
            console.error('Error fetching meme templates:', error);
            alert('Failed to load meme templates. Check the console for details.');
        });
}

// Show preview of the meme template
function showPreview() {
    const memeTemplate = document.getElementById('memeTemplate');
    const memePreview = document.getElementById('memePreview');
    const selectedOption = memeTemplate.options[memeTemplate.selectedIndex];

    if (selectedOption && selectedOption.dataset.img) {
        memePreview.src = selectedOption.dataset.img;
        memePreview.style.display = 'block';
    }
}

// Hide preview of the meme template
function hidePreview() {
    const memePreview = document.getElementById('memePreview');
    memePreview.style.display = 'none';
}

// Generate meme using Imgflip API
function generateMeme() {
    const templateId = document.getElementById('memeTemplate').value;
    const topText = document.getElementById('topText').value;
    const bottomText = document.getElementById('bottomText').value;
    const username = 'AnshKabra1';
    const password = 'Kabraann77';
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

// Launch confetti animation
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

// Load memes on page load
document.addEventListener('DOMContentLoaded', loadMemes);
