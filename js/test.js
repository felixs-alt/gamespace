const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = document.body.scrollHeight;

const raindrops = [];
const splashes = [];
const snow = [];

function createRaindrop() {
    return {
        x: Math.random() * canvas.width,
        y: canvas.height*-1,
        speedY: Math.random() * 5 + 2,
        length: Math.random() * 20 + 10,
    };
}

// Create individual droplets for the splash
function createSplashDroplet(x, y) {
    // Spread droplets outwards symmetrically (-30 to 30 degrees)
    const randomChoice = Math.random(); // Get a random value between 0 and 1
    var angle =  (Math.random() * (30 - 10) + 10)+30
    if (randomChoice < 0.5) {
      angle = (angle*-1)+30;
    } else {
      angle = angle+30
    }
    const speed = 0.5; // Smaller speed for more subtle effect
    return {
        x: x,
        y: y,
        radius: 1.5,  // Smaller droplet size
        speedX: speed * Math.cos(angle),
        speedY: speed * Math.sin(angle) - 0.01,  // Slight upward velocity
        opacity: 0.5,
    };
}

function createSplash(x, y) {
    const droplets = [];
    const dropletCount = 3 // 3 to 6 smaller droplets

    for (let i = 0; i < dropletCount; i++) {
        droplets.push(createSplashDroplet(x, y));
    }
    return droplets;
}

function drawRaindrop(drop) {
    ctx.beginPath();
    ctx.moveTo(drop.x, drop.y);
    ctx.lineTo(drop.x, drop.y + drop.length);
    ctx.strokeStyle = 'rgba(174, 194, 224, 0.5)';
    ctx.lineWidth = 1;
    ctx.stroke();
}

// Draw individual splash droplet
function drawSplashDroplet(droplet) {
    ctx.beginPath();
    ctx.arc(droplet.x, droplet.y, droplet.radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(174, 194, 224, ${droplet.opacity})`;
    ctx.fill();
}

let visibleDivs = [];

function updateVisibleDivs() {
    visibleDivs = Array.from(document.querySelectorAll('.game')).filter(div => {
        const rect = div.getBoundingClientRect();
        return (
            rect.bottom > 0 && rect.top < window.innerHeight &&
            rect.right > 0 && rect.left < window.innerWidth
        );
    });
}

function updateRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update raindrops
    raindrops.forEach((drop, i) => {
        drop.y += drop.speedY;

        // Check only visible divs for collision
        visibleDivs.forEach(divElement => {
            const divRect = divElement.getBoundingClientRect();
            if (drop.y + drop.length >= divRect.top && drop.y <= divRect.top &&
                drop.x >= divRect.left && drop.x <= divRect.right) {
                splashes.push(...createSplash(drop.x, divRect.top));
                raindrops[i] = createRaindrop();  // Reset raindrop
            }
        });

        if (drop.y > canvas.height) {
            raindrops[i] = createRaindrop();
        }

        drawRaindrop(drop);
    });

    // Update splashes
    splashes.forEach((droplet, i) => {
        if (droplet.opacity > 0) {
            droplet.x += droplet.speedX;
            droplet.y += droplet.speedY;
            droplet.speedY += 0.01;
            droplet.opacity -= 0.01;

            drawSplashDroplet(droplet);
        } else {
            splashes.splice(i, 1);  // Remove droplet
        }
    });

    requestAnimationFrame(updateRain);
}

// Call this once every few frames instead of every frame
setInterval(updateVisibleDivs, 1000); // Update visible divs every second


function createSnow() {
    return {
        x: Math.random() * canvas.width,
        y: canvas.height*-1,
        speedY: Math.random() + 1,
        length: Math.random() * (6 - 2) + 2,
    };
}


function drawSnow(drop) {
    ctx.beginPath();
    ctx.moveTo(drop.x, drop.y);
    ctx.lineTo(drop.x, drop.y + drop.length);
    ctx.strokeStyle = `rgba(186, 186, 186,${Math.random() * (1 - 0.2) + 0.2})`;
    ctx.lineWidth =  Math.random() * (6 - 2) + 2;
    ctx.stroke();
}

function updateSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnowOnDivs(); // Draw the snow on divs
    // Update snow
    snow.forEach((drop, i) => {
        drop.speedY *= Math.random() * (1 - 0.9995) + 0.9995
        drop.y += drop.speedY

        if (drop.y > canvas.height) {
            snow[i] = createSnow();
        }

        drawSnow(drop);
    });
    requestAnimationFrame(updateSnow);
}

function drawSnowOnDivs() {
    const divElements = document.querySelectorAll('.game,.searchbar,channel');
    divElements.forEach((div) => {
        const rect = div.getBoundingClientRect();
        const snowHeight = 10; // Height of the snow line
        // Draw a snow line on top of the div
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'; // Snow color
        ctx.beginPath();
        
        // Starting point
        ctx.moveTo(rect.left + 10, rect.top - snowHeight); // Start position, slightly inward for border radius
        // Draw the snow line across the top of the div
        ctx.lineTo(rect.left + rect.width - 10, rect.top - snowHeight); // Top edge of div
        ctx.lineTo(rect.left + rect.width, rect.top); // Top right corner
        ctx.arcTo(rect.left + rect.width, rect.top, rect.left + rect.width, rect.top + snowHeight, 10); // Top right curve
        ctx.lineTo(rect.left + rect.width, rect.top + snowHeight); // Move down to the snow height
        ctx.lineTo(rect.left + 10, rect.top + snowHeight); // Move to the left edge snow height
        ctx.arcTo(rect.left, rect.top, rect.left, rect.top + snowHeight, 10); // Top left curve
        ctx.lineTo(rect.left, rect.top); // Move back up to the top left corner
        ctx.closePath(); // Close the path for the fill
        ctx.fill(); // Fill the snow shape
    });
}
function Rain(){
    raindrops.push(createRaindrop());
    updateRain()
    for (let i = 0; i < 300; i++) {
        raindrops.push(createRaindrop());
    }
}
function Snow(){
    snow.push(createSnow());
    updateSnow();
    (function myLoop(i) {
        setTimeout(function() {
        snow.push(createSnow());
          if (--i) myLoop(i);   //  decrement i and call myLoop again if i > 0
        }, 10)
      })(600);                   //  pass the number of iterations as an argument
}
        // Function to draw snow on top of each div element

window.addEventListener('resize', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas on resize
    canvas.width = window.innerWidth
});
Rain()