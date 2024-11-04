// This is a JavaScript code that implements various functionalities for a web page, such as registering a service worker, registering custom elements, changing the theme of the page, and implementing secret themes.
// Service Worker Registration:
// The code first registers a service worker with the path "/sw.js". A Service Worker is a script that acts as a client-side proxy for network requests and can be used for offline support and push notifications.

// Script Loading:
// The code then loads an external script from "https://cdn.jsdelivr.net/gh/3kh0/3kh0.github.io/js/main.js". The script is added to the head of the document.

// Tab Data Retrieval:
// The code retrieves tab data from the local storage using localStorage.getItem("tab"). If the tab data exists, it is parsed into a JSON object. If the tab data doesn't exist, an empty object is created.

// Tab Title and Icon Update:
// If the tab data has a title property, the document title is updated. If the tab data has an icon property, the href attribute of the link element with the rel attribute set to "icon" is updated.

// Color Contrast and Color Hex Functions:
// The code defines two functions, getContrastHex and getColorHex, which calculate the contrast color and the text color, respectively, based on a given hexadecimal color value.

// Theme Handling:
// The code retrieves the theme from local storage using localStorage.getItem("theme") or sets the theme to "default" if it does not exist. The themes are defined as an array of objects, each with a theme and a color property.

// Custom Theme:
// If the theme is set to "custom", the theme color is retrieved from local storage using localStorage.getItem("theme_color"), and the body element is updated with the custom theme color.

// Custom Elements:
// The code defines three custom elements, <changelog-added>, <changelog-removed>, and <changelog-changed>, which are used to display information about changes made to the web page.

// Secret Themes:
// The code implements secret themes using the createSecretThemeType function, which takes two arguments: the name of the theme and an array of key patterns. The function listens for key events on the document and updates the theme if the correct pattern of keys is pressed. The code also defines the secretThemeButton function, which displays the secret theme if it has been unlocked previously.

// Overall, this code is part of a larger web page that implements various functionalities, including theme handling, custom elements, and secret themes.

const jsdelivr = document.createElement("script");
jsdelivr.setAttribute("src", "./js/main.js");
document.head.append(jsdelivr);


function getContrastHex(hexcolor) {
  hexcolor = hexcolor.replace("#", "");
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);
  var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#1c1c1c' : 'white';
}

function getColorHex(hexcolor) {
  hexcolor = hexcolor.replace("#", "");
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);
  var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'white' : 'black';
}

var theme = localStorage.getItem("theme") || "default";

const themes = [
  {
    theme: 'default',
    color: '#17ff8e'
  },
  {
    theme: 'light',
    color: '#4caf50'
  },
  {
    theme: 'orchid',
    color: '#b625cc'
  },
  {
    theme: 'sky',
    color: '#0084ff'
  },
  {
    theme: 'winter',
    color: '#3da341'
  },
  {
    theme: 'nebelung',
    color: '#3d2d1e'
  },
  {
    theme: 'piplup',
    color: '#0026ff'
  },
  {
    theme: 'forternish',
    color: '#003443'
  },
  {
    theme: 'northernfish',
    color: '#0ec9f8'
  },
  {
    theme: 'forgor',
    color: '#d7d700'
  },
  {
    theme: 'monotonium',
    color: '#fff'
  },
  {
    theme: 'monotonium-dark',
    color: '#000'
  },
  {
    theme: 'concrete',
    color: '#808080'
  },
  {
    theme: 'sunset',
    color: '#e83141'
  },
  {
    theme: 'whoisev',
    color: '#8e8e8e'
  }
]

if (theme !== 'custom') {
  document.body.setAttribute("theme", theme);

  if (location.pathname.includes('/settings')) {
    themes.forEach(palette => {
      if (palette.theme == theme) {
        document.querySelector('#theme_color').value = palette.color;
      }
    });
  }
} else {
  const theme = localStorage.getItem('theme_color');

  document.body.setAttribute('theme', 'custom');
  document.body.style = `--theme: ${theme}; --background: ${getContrastHex(theme)}; --text: ${getColorHex(theme)}; --text-secondary: ${getColorHex(theme)};`;

  if (location.pathname.includes('/settings')) {
    document.querySelector('#theme_color').value = theme;
  }
}

class changelogAdded extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <div class="changelog-item">
        <div class="changelog-type" added></div>
        ${this.innerText}
        </div>
        `;
  }
}

customElements.define("changelog-added", changelogAdded);

class changelogRemoved extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <div class="changelog-item">
        <div class="changelog-type" removed></div>
        ${this.innerText}
        </div>
        `;
  }
}

customElements.define("changelog-removed", changelogRemoved);

class changelogChanged extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <div class="changelog-item">
        <div class="changelog-type" changed></div>
        ${this.innerText}
        </div>
        `;
  }
}

customElements.define("changelog-changed", changelogChanged);

function foundSecretTheme(name) {
  if (localStorage.theme == name){
    if (name == "ipaddr"){
      let elementArray = [].slice.call(document.getElementsByClassName("game"), 0);
      for (var i = 0; i < elementArray.length; ++i)
        elementArray[i].hidden = false;
      document.getElementsByClassName("searchbar")[0].hidden = false
    }
    document.body.setAttribute("theme", "default");
    localStorage.setItem("theme", "default");
    localStorage.setItem("default", "true");
  
  } else {
    if (name == "ipaddr"){
      Array.prototype.forEach.call(document.getElementById("weekly").children, function(el) {
        el.hidden = true
      });
      let elementArray = [].slice.call(document.getElementsByClassName("game"), 0);
      for (var i = 0; i < elementArray.length; ++i)
        elementArray[i].hidden = true;
      document.getElementsByClassName("searchbar")[0].hidden = true
      let apiKey = 'be0f755b93290b4c100445d77533d291763a417c75524e95e07819ad';
      $.getJSON('https://api.ipdata.co?api-key=' + apiKey, function(data) {
        let i = 0
        for(var name in data ) {
          i++
          if (i>14){
            return;
          }
          let node = document.createElement("p")
          node.innerText =  name + " : " + data[ name ]
          node.style = "text-align: center; color: #FFFFFF;"
          document.getElementById("ipaddr").appendChild(node) // Days is not a number
        }
      });

    } else {
      document.body.setAttribute("theme", name);
      localStorage.setItem("theme", name);
      localStorage.setItem(name, "true");
    }
  }
}

function secretThemeButton(name) {
  if (localStorage.getItem(name) == "true") {
    if (document.querySelector("." + name)) {
      document.querySelector("." + name).removeAttribute("hidden");
    }
  }
}

function createSecretThemeType(name, pattern) {
window[name + "pattern"] = pattern;
window[name + "current"] = 0;
  
var themePattern = window[name + "pattern"]
var themeCurrent = window[name + "current"]

document.addEventListener("keydown", function (e) {
  if (e.key !== themePattern[themeCurrent]) {
    return (themeCurrent = 0);
  }

  themeCurrent++;

  if (themePattern.length == themeCurrent) {
    themeCurrent = 0;
    foundSecretTheme(name);
  }
});
}
// Define an array to store all playlist it
let playlistItems = [];
window.player = null;
document.addEventListener("DOMContentLoaded", function () {
      const videoPlayer = document.getElementById("player");
      const playlist = document.getElementById("playlist");
          fetch("index.m3u")
              .then(response => response.text())
              .then(data => {
                  videoPlayer.innerHTML = ''; // Clear the video player
                  clearPlaylist(); // clear channel list
                  data = trimLineBreak(data);
                  const blocks = data.split('\n\n');
                  let tvgName = '';
                  let tvgLogo = '';
                  for (let i = 0; i < blocks.length; i++) {
                      var items = [];
                      var lines = blocks[i].split('\n');
                      items[i] = { 'key': '', 'tvgName': '', 'tvgLogo': '', 'source': '' };
                      for (let j = 0; j < lines.length; j++) {
                          const line = lines[j].trim();
                        
                          // Check if it's an EXTINF line with tvg-name and tvg-logo
                          if (line.startsWith("#EXTINF:")) {
                              const tvgNameMatch = line.match(/tvg-name="([^"]+)"/);
                              if (tvgNameMatch) {
                                  tvgName = tvgNameMatch[1];
                              } else {
                                  // Extract the last string after the last comma as tvg-name
                                  var lastCommaIndex = line.lastIndexOf(",");
                                  if (lastCommaIndex !== -1) {
                                      tvgName = line.substring(lastCommaIndex + 1).trim();
                                  } else {
                                      tvgName = `Stream ${j + 1}`;
                                  }   
                              }
                              const tvgLogoMatch = line.match(/tvg-logo="([^"]+)"/);
                              if (tvgLogoMatch) {
                                  tvgLogo = tvgLogoMatch[1];
                              }
                              items[i]['tvgName'] = tvgName;
                              items[i]['tvgLogo'] = convertToHttps(tvgLogo);
                          }
                          // Check if the line is not empty and not a comment
                          if (line.length > 0 && !line.startsWith("#")) {
                              items[i]['source'] = convertToHttps(line);
                          }
                      }
                      if(items.length > 0) {
                          items = reorderIndexes(items);
                          if(items[0].source != null && items[0].source != '') {
                              playlistItems.push(items);
                          }
                      }
                  }
                  // Render the playlist
                  renderPlaylist(playlistItems);
                  if(document.getElementsByClassName('channel').length > 0) {
                      playlist.classList.remove("d-none");
                  } else {
                      playlist.classList.add("d-none");
                  }
              })
              .catch(error => {
                  console.error("Error loading the M3U file:", error);
              });
      });
      // Function to render the playlist
      function renderPlaylist(items) {
        console.log(items)
          items.forEach((item, index) => {
            console.log(index)
              const playlistItem = document.createElement("img");
              playlistItem.className = "channel";
              playlistItem.innerText = item[0].tvgName
              playlistItem.src = item[0].tvgLogo;
              playlistItem.addEventListener("click", async () => {
                  // If a player instance exists, destroy it before creating a new one
                  if(player != null){
                    player.dispose();
                  }
                  console.log(player)
                  // Init Shaka Player
                  var player = videojs('player', {liveui: true,poster: item[0].tvgLogo,preload: "none"});
                  player.src({type: "application/x-mpegurl", src: item[0].source});
                  player.ready(function(){
                    this.play()
                  })
              });
              if(item[0].tvgName == "Fox Sports 1"){
                if(player != null){
                  player.dispose();
                }
                console.log(player)
                // Init Shaka Player
                var player = videojs('player', {liveui: true,poster: item[0].tvgLogo,preload: "none"});
                player.src({type: "application/x-mpegurl", src: item[0].source});
              }
              playlist.appendChild(playlistItem);
          });
      }
  function clearPlaylist(clearItems = true) {
      // Clear the existing playlist items
      if(clearItems) {
          playlistItems = [];
      }
      
      const playlistItemsElem = playlist.querySelectorAll('.channel');
      playlistItemsElem.forEach(item => item.remove());
  }
  function trimLineBreak(text) {
      // Replace multiple line breaks with a single line break
      return text.replace(/[\r\n]{2,}/g, '\n\n');
  }
  function reorderIndexes(items) {
      let rearrangedItems = [];
      items.forEach(item => {
          if (item !== undefined) {
              rearrangedItems.push(item);
          }
      });
      return rearrangedItems;
  }
  function base64ToHex(base64) {
      if (base64.length > 0) {
          const binary = atob(base64);
          let hex = '';
          for (let i = 0; i < binary.length; i++) {
              let char = binary.charCodeAt(i).toString(16);
              hex += (char.length === 1 ? '0' : '') + char;
          }
          return hex;
      }
      return base64;
  }
  function convertToHttps(url) {
      return url.replace(/^http:/, 'https:');
}
function Schedule() {
  if(document.getElementById("schedule").style.width == "400px"){
      document.getElementById("schedule").style.width = "0";
  } else {
      document.getElementById("schedule").style.width = "400px"; 
  }
}
  function Sidebar() {
    if(document.getElementById("sidebar").style.width == "45%"){
        document.getElementById("sidebar").style.width = "0";
    } else {
        document.getElementById("sidebar").style.width = "45%"; 
    }
}

fetch("https://gmspace-chat.fly.dev/api/users")
.then(res => res.text())
.then(users => function() {
  document.getElementById("userCount").innerHTML = String(users+" User(s) Online")
})
const socket = io('https://gmspace-chat.fly.dev');
socket.on('user-count-change', function (userCount) {
  console.log(userCount);
  document.getElementById("userCount").innerHTML = String(userCount+" User(s) Online")
});
const options = {method: 'GET', headers: {accept: 'application/json'}};
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
async function getWeather() {
    const res = await fetch('https://gmspace-chat.fly.dev/api/tmrw', options)
    const json = await res.json();
    console.log(json)
    
    if (json.data.values.snowIntensity > 0 || json.data.values.sleetIntensity > 0){
        Snow();
    } else if (json.data.values.rainIntensity > 0) {
        Rain()
    }
}
getWeather()
createSecretThemeType("ipaddr", ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"])
