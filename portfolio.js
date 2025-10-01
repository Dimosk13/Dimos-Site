// --------------------
// Sidebar toggle
// --------------------
function showSidebar() {
    document.querySelector('.sidebar').style.display = 'flex';
}

function hideSidebar() {
    document.querySelector('.sidebar').style.display = 'none';
}

// --------------------
// Like button toggle
// --------------------
function toggleLike(event) {
    event.stopPropagation();
    const container = event.currentTarget;
    container.classList.toggle('active');
    const img = container.querySelector('.like-image');
    img.src = container.classList.contains('active') ? './likebutton/heart1.png' : './likebutton/heart2.png';
}

// --------------------
// Gallery / Lightbox
// --------------------

// Current index of lightbox
let currentImageIndex = 0;

// Media array: set 'src', 'order', and 'type' ('image' or 'video')
const images = [
    { src: './portfolio/image1.jpg', order: 1, type: 'image' },
    { src: './portfolio/image2.jpg', order: 2, type: 'image' },
    { src: './portfolio/image3.jpg', order: 3, type: 'image' },
    { src: './portfolio/image4.jpg', order: 4, type: 'image' },
    { src: './portfolio/image5.jpg', order: 5, type: 'image' },
    { src: './portfolio/image6.jpg', order: 6, type: 'image' },
    { src: './portfolio/image7.jpg', order: 7, type: 'image' },
    { src: './portfolio/image8.jpg', order: 8, type: 'image' },
    { src: './portfolio/image9.jpg', order: 9, type: 'image' },
    { src: './portfolio/image10.jpg', order: 10, type: 'image' },
    { src: './portfolio/image11.jpg', order: 11, type: 'image' },
    { src: './portfolio/image12.jpg', order: 12, type: 'image' },
    { src: './portfolio/image13.jpg', order: 13, type: 'image' },
    { src: './portfolio/image14.jpg', order: 14, type: 'image' },
    { src: './portfolio/image15.jpg', order: 15, type: 'image' },
    { src: './portfolio/image16.jpg', order: 16, type: 'image' },
    { src: './portfolio/image17.jpg', order: 17, type: 'image' },
    { src: './portfolio/image18.jpg', order: 18, type: 'image' },
    { src: './portfolio/image19.mp4', order: 19, type: 'video' },
    { src: './portfolio/image20.jpg', order: 20, type: 'image' },
    { src: './portfolio/image21.jpg', order: 21, type: 'image' },
    { src: './portfolio/image22.jpg', order: 22, type: 'image' },
    { src: './portfolio/image23.jpg', order: 23, type: 'image' },
    { src: './portfolio/image24.jpg', order: 24, type: 'image' },
];

// Sort images by order
images.sort((a, b) => a.order - b.order);

// Open lightbox
function openLightbox(src) {
    currentImageIndex = images.findIndex(img => img.src === src);
    showMedia();
    document.getElementById('lightbox').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Show current media in lightbox
function showMedia() {
    const media = images[currentImageIndex];
    const mediaContainer = document.getElementById('mediaContainer');

    if (media.type === 'image') {
        mediaContainer.innerHTML = `<img id="lightboxMedia" src="${media.src}" alt="Artwork">`;
    } else if (media.type === 'video') {
        mediaContainer.innerHTML = `<video id="lightboxMedia" src="${media.src}" autoplay loop muted playsinline controls></video>`;
    }
}

// Navigate through images/videos
function navigateImage(direction) {
    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
    showMedia();
}

// --------------------
// Initialize gallery & arrows
// --------------------
document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');

    images.forEach((media, idx) => {
        gallery.innerHTML += `
        <div class="artwork" onclick="openLightbox('${media.src}')">
            ${media.type === 'image' 
                ? `<img src="${media.src}" alt="Artwork ${idx+1}">`
                : `<video src="${media.src}" autoplay loop muted playsinline></video>`}
            <div class="like-container" onclick="toggleLike(event)">
                <div class="like-button">
                    <img class="like-image" src="./likebutton/heart2.png" alt="Like Button">
                </div>
            </div>
        </div>`;
    });

    // Arrow navigation (attach once)
    document.getElementById('arrowLeft').addEventListener('click', e => { 
        e.stopPropagation(); 
        navigateImage(-1); 
    });
    document.getElementById('arrowRight').addEventListener('click', e => { 
        e.stopPropagation(); 
        navigateImage(1); 
    });

    // Footer fade-in on scroll
    const footer = document.getElementById('footer');
    document.addEventListener('scroll', () => {
        const threshold = window.innerHeight * 0.2;
        footer.style.opacity = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - threshold ? '1' : '0';
    });
});
