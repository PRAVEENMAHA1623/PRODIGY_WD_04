// === THEME TOGGLE ===
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

const downloadResumeBtn = document.querySelector('.cta-button');
downloadResumeBtn ? addEventListener('click', (e) => {
    if (!downloadResumeBtn.getAttribute('href').endsWith('.pdf')) {
        e.preventDefault();
        alert('Resume file is being updated. Please check back later.');
    }
}) : null;

// === SOCIAL LINKS ===
document.querySelectorAll('.social-links .social-icon').forEach(link => {
    link.addEventListener('click', (e) => {
        if (!link.getAttribute('href') || link.getAttribute('href') === '#') {
            e.preventDefault();
            alert('Profile link coming soon!');
        }
    });
});

// === DEMO MODAL ===
const demoModal = document.getElementById('demo-modal');
const demoVideo = document.getElementById('demo-video');
document.querySelectorAll('.view-demo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const projectTitle = btn.closest('.project-content').querySelector('h3').textContent;

        // Set video source based on project
        let videoSource;
        if (projectTitle.includes('College Symposium Website')) {
            videoSource = 'college.mp4';
        } else {
            videoSource = 'default.mp4';
        }
        demoVideo.src = videoSource;
        demoModal.style.display = 'flex';
        demoVideo.play();
    });
});

// ===============================
// === CERTIFICATION SECTION FIX ===
// ===============================
const certModal = document.getElementById('cert-modal');
const certImage = document.getElementById('cert-image');

const certMap = {
    'NPTEL Online Certification': 'Cloudcomputing.png',
    'IDMTech Park': 'idmTechpark.png',
    'karpagam college': 'karpagam college.png',
    'MIT college': 'mit college.png',
    'Power Bi': 'powerbi.png',
    'NoviTech': 'NoviTech.png',
    'ESEC college': 'esec college.png',
    'SNS college': 'sns college.png',
};

document.querySelectorAll('.view-cert-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (!certModal || !certImage) return; // Ensure modal & image exist
        const certCard = btn.closest('.cert-card');
        if (!certCard) return;
        const certTitleElem = certCard.querySelector('h3');
        if (!certTitleElem) return;
        const certTitle = certTitleElem.textContent.trim();
        certImage.src = certMap[certTitle] || 'placeholder-cert.jpg';
        certModal.style.display = 'flex';
    });
});

// === MODAL CLOSE BUTTONS ===
document.querySelectorAll('.close-modal').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        demoModal.style.display = 'none';
        certModal.style.display = 'none';
        if (demoVideo) {
            demoVideo.pause();
            demoVideo.src = '';
        }
    });
});

// === CLICK OUTSIDE MODAL CLOSE ===
window.addEventListener('click', (e) => {
    if (e.target === demoModal) {
        demoModal.style.display = 'none';
        if (demoVideo) {
            demoVideo.pause();
            demoVideo.src = '';
        }
    }
    if (e.target === certModal) {
        certModal.style.display = 'none';
    }
});

// === BACK TO TOP BUTTON ===
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// === CONTACT FORM SUBMISSION ===

// Initialize EmailJS with your user ID
(function() {
    emailjs.init("RXe6FDIT8uqPyHbyX"); // Replace with your EmailJS user ID
})();

// Form submission event listener
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Collecting form data
    const templateParams = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        to_name: 'Praveen S', // Replace with your name or recipient's name
        reply_to: document.getElementById('email').value
    };

    // Sending email using EmailJS
    emailjs.send('service_fnuyfte', 'template_02zzi1d', templateParams)
        .then(() => {
            alert('Message sent successfully!');
            this.reset(); // Reset the form
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to send message. Please try again. Error: ' + error.text);
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        });
});

// === MOUSE FOLLOWER ANIMATION ===
const mouseFollower = document.querySelector('.mouse-follower');
let mouseX = 0,
    mouseY = 0,
    currentX = 0,
    currentY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateMouseFollower() {
    const dx = mouseX - currentX;
    const dy = mouseY - currentY;

    currentX += dx * 0.1;
    currentY += dy * 0.1;

    mouseFollower.style.transform = `translate(${currentX - 10}px, ${currentY - 10}px)`;
    requestAnimationFrame(updateMouseFollower);
}

updateMouseFollower();

// === HOVER EFFECTS ===
document.querySelectorAll('button, .social-icon, .cta-button').forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.transform = 'scale(1.05)';
        element.style.transition = 'transform 0.3s ease';
    });

    element.addEventListener('mouseleave', () => {
        element.style.transform = 'scale(1)';
    });
});