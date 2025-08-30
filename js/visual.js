// visual.js - 시각화 페이지 인터랙션
document.addEventListener('DOMContentLoaded', function() {
    // 데모 시뮬레이션 변수
    let demoRunning = false;
    let demoInterval;
    
    // DOM 요소들
    const startBtn = document.getElementById('startDemo');
    const stopBtn = document.getElementById('stopDemo');
    const screamProbFill = document.getElementById('screamProb');
    const screamProbText = document.getElementById('screamProbText');
    const keywordResult = document.getElementById('keywordResult');
    const emergencyStatus = document.getElementById('emergencyStatus');
    const waveBars = document.querySelectorAll('.wave-bar');

    // 데모 시작 버튼
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            if (!demoRunning) {
                startDemo();
            }
        });
    }

    // 데모 중지 버튼
    if (stopBtn) {
        stopBtn.addEventListener('click', function() {
            if (demoRunning) {
                stopDemo();
            }
        });
    }

    // 데모 시작 함수
    function startDemo() {
        demoRunning = true;
        startBtn.disabled = true;
        stopBtn.disabled = false;
        
        // 웨이브 애니메이션 시작
        startWaveAnimation();
        
        // 시뮬레이션 시작
        demoInterval = setInterval(updateDemoData, 500);
        
        console.log('데모 시작');
    }

    // 데모 중지 함수
    function stopDemo() {
        demoRunning = false;
        startBtn.disabled = false;
        stopBtn.disabled = true;
        
        // 인터벌 중지
        if (demoInterval) {
            clearInterval(demoInterval);
        }
        
        // 상태 초기화
        resetDemoData();
        
        console.log('데모 중지');
    }

    // 웨이브 애니메이션 시작
    function startWaveAnimation() {
        waveBars.forEach((bar, index) => {
            bar.style.animationPlayState = 'running';
            bar.style.animationDelay = (index * 0.1) + 's';
        });
    }

    // 데모 데이터 업데이트
    function updateDemoData() {
        if (!demoRunning) return;

        // 랜덤 비명 감지 확률 (0-100%)
        const screamProb = Math.random() * 100;
        const isEmergency = screamProb > 70;
        
        // 확률 업데이트
        if (screamProbFill && screamProbText) {
            screamProbFill.style.width = screamProb + '%';
            screamProbText.textContent = Math.round(screamProb) + '%';
        }

        // 키워드 탐지 시뮬레이션
        const keywords = ['대기 중...', 'help 감지', '도와주세요 감지', '분석 중...', '키워드 없음'];
        const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
        
        if (keywordResult) {
            keywordResult.textContent = randomKeyword;
            keywordResult.className = 'result-value ' + (randomKeyword.includes('감지') ? 'detected' : '');
        }

        // 위급 상황 상태 업데이트
        if (emergencyStatus) {
            if (isEmergency || randomKeyword.includes('감지')) {
                emergencyStatus.textContent = '위급 상황 감지!';
                emergencyStatus.className = 'result-status emergency';
                
                // 경고 효과
                showEmergencyAlert();
            } else {
                emergencyStatus.textContent = '안전';
                emergencyStatus.className = 'result-status';
            }
        }
    }

    // 위급 상황 알림 효과
    function showEmergencyAlert() {
        // 화면 깜빡임 효과
        document.body.style.animation = 'emergency-flash 0.5s ease-in-out';
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);
        
        // 콘솔에 알림
        console.log('🚨 위급 상황 감지! Emergency detected!');
    }

    // 데모 데이터 초기화
    function resetDemoData() {
        if (screamProbFill && screamProbText) {
            screamProbFill.style.width = '0%';
            screamProbText.textContent = '0%';
        }
        
        if (keywordResult) {
            keywordResult.textContent = '대기 중...';
            keywordResult.className = 'result-value';
        }
        
        if (emergencyStatus) {
            emergencyStatus.textContent = '안전';
            emergencyStatus.className = 'result-status';
        }

        // 웨이브 애니메이션 중지
        waveBars.forEach(bar => {
            bar.style.animationPlayState = 'paused';
        });
    }

    // 시스템 컴포넌트 애니메이션
    const systemComponents = document.querySelectorAll('.system-component');
    
    systemComponents.forEach((component, index) => {
        component.addEventListener('mouseenter', function() {
            // 호버 시 단계별 하이라이트
            const step = this.dataset.step;
            highlightSystemFlow(step);
        });

        component.addEventListener('mouseleave', function() {
            // 하이라이트 제거
            removeSystemHighlight();
        });
    });

    // 시스템 플로우 하이라이트
    function highlightSystemFlow(currentStep) {
        systemComponents.forEach(component => {
            const step = component.dataset.step;
            if (step && step <= currentStep) {
                component.classList.add('highlighted');
            } else {
                component.classList.remove('highlighted');
            }
        });
    }

    // 시스템 하이라이트 제거
    function removeSystemHighlight() {
        systemComponents.forEach(component => {
            component.classList.remove('highlighted');
        });
    }

    // 성능 지표 카운터 애니메이션
    const metricCards = document.querySelectorAll('.metric-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateMetricNumber(entry.target);
            }
        });
    }, { threshold: 0.5 });

    metricCards.forEach(card => {
        observer.observe(card);
    });

    // 숫자 애니메이션
    function animateMetricNumber(card) {
        const numberElement = card.querySelector('.big-number');
        if (!numberElement) return;

        const finalNumber = numberElement.textContent.replace(/[^0-9.]/g, '');
        const isDecimal = finalNumber.includes('.');
        
        let current = 0;
        const increment = parseFloat(finalNumber) / 50; // 50 단계로 나누어 애니메이션
        const timer = setInterval(() => {
            current += increment;
            if (current >= parseFloat(finalNumber)) {
                current = parseFloat(finalNumber);
                clearInterval(timer);
            }
            
            if (isDecimal) {
                numberElement.textContent = current.toFixed(2);
            } else {
                numberElement.textContent = Math.floor(current);
            }
        }, 30);
    }

    // 비디오 플레이스홀더 클릭 이벤트
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // YouTube 링크 열기
            window.open('https://www.youtube.com/watch?v=9sI7QYvPGFU', '_blank');
        });
    }

    // 페이지 스크롤 시 컴포넌트 애니메이션
    const animatedElements = document.querySelectorAll('.system-component, .metric-card, .feature-category');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        scrollObserver.observe(element);
    });
});

// CSS 애니메이션을 동적으로 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes emergency-flash {
        0% { background-color: transparent; }
        50% { background-color: rgba(239, 68, 68, 0.1); }
        100% { background-color: transparent; }
    }
    
    .system-component.highlighted {
        background: linear-gradient(135deg, #2563eb, #06b6d4) !important;
        color: white !important;
        transform: translateY(-5px) scale(1.05);
    }
    
    .system-component.highlighted .tech-stack span {
        background: rgba(255, 255, 255, 0.3) !important;
    }
    
    .result-value.detected {
        background: #10b981 !important;
        color: white !important;
    }
    
    .demo-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

document.head.appendChild(style);