document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0; // 디바이스 대응

    let inputEvent = isTouchDevice ? 'touchmove' : 'mousemove'; 
    let startEvent = isTouchDevice ? 'touchstart' : 'mousedown';
    let endEvent = isTouchDevice ? 'touchend' : 'mouseup';

    let mousePos = { x: 0, y: 0 };
    let isMouseDown = false;
    let circleRadius = 0;

    const image = new Image();
    image.src = 'songoku.png';

    function scalingCircle(circleRadius) {
        if (circleRadius >= 7 && circleRadius <= 9) {
            let risingCircle = 128;
            return risingCircle;
        }
        let risingCircle = Math.pow(2, circleRadius); // 지수함수 = y = 2^x 
        return risingCircle;
    }

    function updateCanvas() {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(image, mousePos.x - image.width / 2, mousePos.y - image.height / 2);

        if (isMouseDown) {
            circleRadius += 0.1;
            let updatedCircle = scalingCircle(circleRadius);

            ctx.beginPath();
            ctx.arc(mousePos.x, mousePos.y - 330, updatedCircle, 0, Math.PI * 2);
            ctx.fillStyle = 'black';
            ctx.fill();
        }

        requestAnimationFrame(updateCanvas);
    }

    window.addEventListener('resize', function() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });

    canvas.addEventListener(inputEvent, function(e) {
        if (isTouchDevice) {
            mousePos.x = e.touches[0].clientX;
            mousePos.y = e.touches[0].clientY;
        } else {
            mousePos.x = e.clientX;
            mousePos.y = e.clientY;
        }
    });

    canvas.addEventListener(startEvent, function() {
        isMouseDown = true;
        circleRadius = 1;
    });

    canvas.addEventListener(endEvent, function() {
        isMouseDown = false;
    });

    updateCanvas();
});
