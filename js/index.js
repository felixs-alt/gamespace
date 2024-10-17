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
(async () => {
  await loadStarsPreset(tsParticles);

  tsParticles.load({
    id: "tsparticles",
    options: {
      particles: {
        number: {
          value: 855,
          density: {
            enable: true,
            value_area: 789.1476416322727
          }
        },
        color: {
          value: "#ffffff"
        },
        size: {
          value: 1.3,
        },
        move: {
          speed: 0.4,
        }
      },
      preset: "stars"
    }
  });
})();
(function(){
  $.getJSON("https://proxy.wyzie.ru/https://thetvapp.to/json/219.json",function(json){
    json.forEach(function(a){
      if (a.endTime * 1000 > Date.now()) {
        if (a.startTime * 1000 < Date.now()) {
          document.getElementById("curr").innerHTML = " Currently Playing On Fox Until "+ new Date(a.endTime * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })+" : "+a.title
        }
        var elem = document.createElement("span")
        elem.classList = "content"
        elem.innerHTML = "&nbsp;"+new Date(a.startTime * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +"-"+ new Date(a.endTime * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })+" : "+a.title
        Array.from(document.getElementsByClassName("track")).forEach(function(tv) {
          tv.appendChild(elem)
        })
      }
    })
  })
  setTimeout(arguments.callee, 60000);
})();
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
                      let billedMsg = 'Fox Sports 1';
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
            const billedMsgElement = document.getElementById("billedMsg");
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
                      billedMsgElement.textContent = item[0].tvgName
                      billedMsgElement.classList.remove("d-none");
                  });
                  if(item[0].tvgName == "Fox Sports 1"){
                    playlistItem.dispatchEvent(new Event("click"))
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


createSecretThemeType("ipaddr", ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"])
