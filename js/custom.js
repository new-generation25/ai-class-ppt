// Reveal.js 초기화 및 커스텀 기능

// Reveal.js 초기화
Reveal.initialize({
    hash: true,
    slideNumber: 'c/t',
    transition: 'slide',
    transitionSpeed: 'default',
    backgroundTransition: 'fade',
    center: false,
    width: 1920,
    height: 1080,
    margin: 0.04,
    minScale: 0.2,
    maxScale: 2.0,
    controls: true,
    progress: true,
    history: true,
    keyboard: true,
    overview: true,
    touch: true,
    loop: false,
    rtl: false,
    shuffle: false,
    fragments: true,
    embedded: false,
    help: true,
    showNotes: false,
    autoSlide: 0,
    autoSlideStoppable: true,
    mouseWheel: false,
    hideAddressBar: true,
    previewLinks: false,
    focusBodyOnPageVisibilityChange: true,
    viewDistance: 3,
    mobileViewDistance: 2,
    display: 'block'
});

// 슬라이드 변경 시 네비게이션 업데이트
Reveal.on('slidechanged', event => {
    updateNavigation(event.indexh);
    updateProgressBar();
});

// 네비게이션 활성화 업데이트
function updateNavigation(slideIndex) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    // 섹션별 슬라이드 범위
    if (slideIndex >= 0 && slideIndex <= 2) {
        navItems[0].classList.add('active'); // 도입
    } else if (slideIndex >= 3 && slideIndex <= 10) {
        navItems[1].classList.add('active'); // 이론
    } else if (slideIndex >= 11 && slideIndex <= 15) {
        navItems[2].classList.add('active'); // 프롬프트
    } else if (slideIndex >= 16 && slideIndex <= 28) {
        navItems[3].classList.add('active'); // 실습
    } else {
        navItems[4].classList.add('active'); // 마무리
    }
}

// 진행률 바 업데이트
function updateProgressBar() {
    const totalSlides = Reveal.getTotalSlides();
    const currentSlide = Reveal.getIndices().h;
    const progress = ((currentSlide + 1) / totalSlides) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
}

// PDF 모달 관련
const modal = document.getElementById('pdf-modal');
const pdfBtn = document.getElementById('pdf-btn');
const closeBtn = document.querySelector('.close');
const copyUrlBtn = document.getElementById('copy-url-btn');

// PDF 버튼 클릭
pdfBtn.onclick = function () {
    modal.style.display = 'block';
}

// 닫기 버튼
closeBtn.onclick = function () {
    modal.style.display = 'none';
}

// 모달 외부 클릭
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// URL 복사 버튼
copyUrlBtn.onclick = function () {
    const url = window.location.href.split('?')[0] + '?print-pdf';
    navigator.clipboard.writeText(url).then(() => {
        copyUrlBtn.textContent = '복사 완료!';
        setTimeout(() => {
            copyUrlBtn.textContent = 'URL 복사하기';
        }, 2000);
    }).catch(err => {
        alert('URL: ' + url);
    });
}

// 키보드 단축키
document.addEventListener('keydown', function (event) {
    // P 키: PDF 모달 열기
    if (event.key === 'p' || event.key === 'P') {
        if (!event.ctrlKey && !event.metaKey) {
            event.preventDefault();
            modal.style.display = 'block';
        }
    }

    // ESC: 모달 닫기
    if (event.key === 'Escape') {
        modal.style.display = 'none';
    }
});

// 초기 진행률 설정
window.addEventListener('load', () => {
    updateProgressBar();
    updateNavigation(0);
});
