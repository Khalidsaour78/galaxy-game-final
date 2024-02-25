document.addEventListener("DOMContentLoaded", function() {
    const airplane = document.getElementById("airplane");
    const gameContainer = document.getElementById("gameContainer");
    let rockets = [];
    let birds = [];
    let birdsKilled = 0;
    let shootingInterval = 700;

    
    gameContainer.addEventListener("mousemove", function(event) {
        let newPositionX = event.clientX - gameContainer.getBoundingClientRect().left;
        newPositionX = Math.max(newPositionX, 0);
        newPositionX = Math.min(newPositionX, gameContainer.offsetWidth - airplane.offsetWidth);
        airplane.style.left = newPositionX + "px";
    });

    
    function createRocket() {
        const rocket = document.createElement("div");
        rocket.classList.add("rocket");
        const airplaneRect = airplane.getBoundingClientRect();
        const rocketLeft = airplaneRect.left + (airplaneRect.width / 3.7);
        rocket.style.left = rocketLeft + "px";
        rocket.style.bottom = airplaneRect.height + "px";
        gameContainer.appendChild(rocket);
        moveRocket(rocket);
    }

    
    function moveRocket(rocket) {
        let rocketPosition = parseInt(rocket.style.bottom);
        let rocketInterval = setInterval(function() {
            rocketPosition += 5;
            rocket.style.bottom = rocketPosition + "px";
           
            if (rocketPosition > gameContainer.offsetHeight) {
                clearInterval(rocketInterval);
                gameContainer.removeChild(rocket);
            }
           
            birds.forEach(function(bird, birdIndex) {
                const rocketRect = rocket.getBoundingClientRect();
                const birdRect = bird.getBoundingClientRect();
                if (isColliding(rocketRect, birdRect)) {
                   
                    clearInterval(rocketInterval);
                    gameContainer.removeChild(rocket);
                    
                    gameContainer.removeChild(bird);
                    birds.splice(birdIndex, 1);
                    birdsKilled++;
                    if (birdsKilled % 100 === 0) { 
                        shootingInterval -= 100; 
                        if (shootingInterval < 100) { 
                            shootingInterval = 100;
                        }
                    }
                }
            });
        }, 50);
    }

    
    function createBird() {
        const bird = document.createElement("div");
        bird.classList.add("bird");
        bird.style.left = Math.random() * (gameContainer.offsetWidth - 10) + "px"; 
        bird.style.bottom = gameContainer.offsetHeight + "px"; 
        bird.innerHTML = '<img width=40px src="alien.png" alt="Bird">'; 
        gameContainer.appendChild(bird);
        moveBird(bird);
        birds.push(bird);
    }

    
    function moveBird(bird) {
        let birdPosition = parseInt(bird.style.bottom);
        let birdInterval = setInterval(function() {
            birdPosition -= 3; 
            bird.style.bottom = birdPosition + "px";
            if (birdPosition < 0) {
              alert
                clearInterval(birdInterval);
                gameContainer.removeChild(bird);
                const birdIndex = birds.indexOf(bird);
                if (birdIndex !== -1) {
                    birds.splice(birdIndex, 1);
                }
alert("game over")
            // } else {
            //     setInterval(createRocket, shootingInterval); 
            //     setInterval(createBird,5000);
            }
        }, 50);
    }

    
    function isColliding(rect1, rect2) {
        return !(rect1.right < rect2.left || 
                 rect1.left > rect2.right || 
                 rect1.bottom < rect2.top || 
                 rect1.top > rect2.bottom);
    }

    setInterval(createRocket, shootingInterval); 
    setInterval(createBird,5000);

});

