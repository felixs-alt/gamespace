// Hello there!
//
// If you want to add my games to your site, please reach out at my email: echo-the-coder@tuta.io, or discord: 3kh0_#6969



// ====================================
// SCRIPT INJECTION
// ====================================
const addScript = async src => new Promise((resolve, reject) => {
    const el = document.createElement('script');
    el.src = src;
    el.addEventListener('load', resolve);
    el.addEventListener('error', reject);
    document.body.append(el);
});
await addScript('https://cdn.socket.io/4.8.0/socket.io.min.js');

const socket = io('https://gmspace-chat.fly.dev');
socket.on('user-count-change', function (userCount) {
  console.log(userCount);
  document.getElementById("billedMsg").innerHTML = String(userCount+" Users Online")
});