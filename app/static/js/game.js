document.addEventListener('DOMContentLoaded', function () {
    const startGameBtn = document.getElementById('start-game-btn');
    const breedOfRoundElement = document.getElementById('breed-of-round');
    const playAgainBtn = document.getElementById('play-again');
    const homeButton = document.getElementById('home-button');
    const questionElement = document.getElementById('question');
    const timerElement = document.getElementById('timer');
    const currentRoundElement = document.getElementById('current-round');
    const currentScoreElement = document.getElementById('current-score');
    const feedbackElement = document.getElementById('feedback');
    const imageContainer = document.getElementById('image-container');
    const initialInstructions = document.getElementById('initial-instructions');
    const loadingElement = document.getElementById('loading'); // Added loading element

    let currentRound = 0;
    let score = 0;
    let timerInterval;
    let startTime;
    const MAX_ROUNDS = 10;
    const ROUND_DURATION = 10; // seconds

    startGameBtn.addEventListener('click', startGameHandler);
    playAgainBtn.addEventListener('click', () => window.location.reload());

    function startGameHandler() {
        startGameBtn.style.display = 'none';
        initialInstructions.classList.add('hidden');
        playAgainBtn.style.display = 'none';
        homeButton.style.display = 'inline-block';
        startGame();
    }

    function startGame() {
        currentRound = 0;
        score = 0;
        updateScoreAndRound();
        loadGameData();
    }

    async function loadGameData() {
        loadingElement.classList.remove('hidden'); // Show loading text
        try {
            const response = await fetch('/game/game_data');
            const data = await response.json();
            displayGameData(data);
            questionElement.textContent = `Which one is a ${formatBreedName(data.breedOfRound)}?`;
            questionElement.classList.remove('hidden');
            startTimer();
        } catch (error) {
            console.error('Error loading game data:', error);
            feedbackElement.textContent = "Failed to load game data. Please try again.";
        } finally {
            loadingElement.classList.add('hidden'); // Hide loading text
        }
    }

    function displayGameData(data) {
        imageContainer.innerHTML = '';
        const breeds = Object.keys(data.images);
        const selectedBreeds = getRandomBreeds(breeds, 5); // Ensure five images are shown

        selectedBreeds.forEach(breed => {
            const breedImages = data.images[breed];
            const randomImage = breedImages[Math.floor(Math.random() * breedImages.length)];
            const imgElement = document.createElement('img');
            imgElement.src = randomImage;
            imgElement.alt = `Image of ${formatBreedName(breed)}`;
            imgElement.classList.add('game-image');
            imgElement.addEventListener('click', () => submitGuess(data.breedOfRound, breed, imgElement));
            imageContainer.appendChild(imgElement);
        });
    }

    function getRandomBreeds(breeds, numBreeds) {
        const shuffled = [...breeds].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, numBreeds);
    }

    function formatBreedName(breedName) {
        return breedName.replace(/_/g, ' ').split(/\s+/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    function startTimer() {
        let secondsLeft = ROUND_DURATION;
        startTime = Date.now();
        timerElement.textContent = `Time left: ${secondsLeft} seconds`;
        timerInterval = setInterval(() => {
            if (secondsLeft > 0) {
                secondsLeft--;
                timerElement.textContent = `Time left: ${secondsLeft} seconds`;
            } else {
                clearInterval(timerInterval);
                endRoundWithTimeout();
            }
        }, 1000);
        timerElement.classList.remove('hidden'); // Ensure the timer is visible
    }

    function submitGuess(correctBreed, userGuess) {
        clearInterval(timerInterval);
        const endTime = Date.now();
        const timeTaken = Math.min((endTime - startTime) / 1000, ROUND_DURATION);

        if (userGuess === correctBreed) {
            score += Math.max(10 - timeTaken, 0);
            feedbackElement.textContent = 'Correct!';
            feedbackElement.style.color = 'green';
        } else {
            feedbackElement.textContent = 'Wrong!';
            feedbackElement.style.color = 'red';
            highlightCorrectImage(correctBreed);
        }
        setTimeout(() => {
            feedbackElement.textContent = '';
            if (currentRound < MAX_ROUNDS - 1) {
                currentRound++;
                updateScoreAndRound();
                loadGameData();
            } else {
                showFinalScore();
            }
        }, 2000);
    }

    function highlightCorrectImage(correctBreed) {
        const images = document.querySelectorAll('.game-image');
        images.forEach(img => {
            if (img.alt.includes(formatBreedName(correctBreed))) {
                img.classList.add('correct');
            }
        });
    }

    function endRoundWithTimeout() {
        feedbackElement.textContent = 'Time\'s up!';
        highlightCorrectImage(document.querySelector('.game-image').alt.split(' ').slice(2).join(' ')); // assuming breed name is in the alt text after 'Image of '
        setTimeout(() => {
            feedbackElement.textContent = '';
            if (currentRound < MAX_ROUNDS - 1) {
                currentRound++;
                updateScoreAndRound();
                loadGameData();
            } else {
                showFinalScore();
            }
        }, 2000);
    }

    function showFinalScore() {
        feedbackElement.textContent = `Game over! Your final score is: ${Math.round(score)} out of 100`;
        playAgainBtn.style.display = 'block';
    }

    function updateScoreAndRound() {
        currentRoundElement.textContent = `Round: ${currentRound + 1} of ${MAX_ROUNDS}`;
        currentScoreElement.textContent = `Score: ${Math.round(score)}`;
        currentRoundElement.classList.remove('hidden');
        currentScoreElement.classList.remove('hidden');
    }
});
