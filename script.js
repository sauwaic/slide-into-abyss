document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('captcha-slider');
    const puzzlePiece = document.getElementById('puzzle-piece');
    const emptySlot = document.getElementById('empty-slot');

    const puzzleHeight = 175; // Height of the puzzle piece
    const puzzleLeft = 75;
    const puzzleBgHeight = 300; // Height of the captcha background
    const targetPosition = emptySlot.offsetTop; // Get the offset top position of the empty slot
    const targetSize = 0; // Scale of the target (red box)

    slider.addEventListener('input', () => {
        const sliderValue = slider.value;
        const newPosition = (puzzleBgHeight - 50) * (sliderValue / 100);
        puzzlePiece.style.bottom = `${newPosition}px`;

        // Calculate the proportional size
        const sizeFactor = 1 - (sliderValue / 100);
        //puzzlePiece.style.transform = `scale(${sizeFactor})`;
        puzzlePiece.style.height = `${sizeFactor * puzzleHeight}px`;
        puzzlePiece.style.width = `${sizeFactor * puzzleHeight}px`;
        puzzlePiece.style.left = `${puzzleLeft + (75 * (1 - sizeFactor))}px`;
    });

    slider.addEventListener('change', () => {
        // Verify if the puzzle piece is in the correct position when the user releases the slider
        const currentPos = puzzlePiece.offsetTop;
        if (Math.abs(currentPos - targetPosition) < 5) {
            alert('Verification successful!');
            slider.disabled = true; // Disable the slider after successful verification
        } else {
            alert('Verification failed. Please try again.');
            // Reset the slider and puzzle piece position
            slider.value = 0;
            puzzlePiece.style.bottom = '0px';
            puzzlePiece.style.transform = 'scale(1)';
        }
    });
});
