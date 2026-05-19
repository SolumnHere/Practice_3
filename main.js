const video = document.querySelector('video');
const btn = document.getElementById('video-btn');
const buttons = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');
const leftBar = document.querySelector('.left-bar');
const rightBar = document.querySelector('.right-bar');

btn.addEventListener('click', () => {
    btn.classList.toggle('play');

    if (video.paused) {
        video.play();

        leftBar.setAttribute(
            'points',
            '2,0 7,0 7,20 2,20'
        );

        rightBar.setAttribute(
            'points',
            '13,0 18,0 18,20 13,20'
        );

    } else {
        video.pause();

        leftBar.setAttribute(
            'points',
            '2,0 20,10 20,10 2,10'
        );

        rightBar.setAttribute(
            'points',
            '2,10 20,10 20,10 2,20'
        );
    }
}); 

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        contents.forEach(content => content.classList.remove('active'));
        contents[index].classList.add('active');
    });
});

document.querySelectorAll('.location-link').forEach(link =>
    link.addEventListener('click', function(event){
        event.preventDefault();

        document.querySelectorAll('.location-link').forEach(item =>
            item.classList.remove('active')
        )

        this.classList.add('active')

        const newImgSrc = this.getAttribute('data-image')
        const featuredImage = document.getElementById('featured-image')

        if (featuredImage && newImgSrc) {
            featuredImage.src = newImgSrc
        }
    })
)

const defaultActiveLink = document.querySelector('.location-link.active')
if (defaultActiveLink) {
    defaultActiveLink.click()
}

