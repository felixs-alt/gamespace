// ====================================
// SCRIPT INJECTION
// ====================================
//const addScript = async src => new Promise((resolve, reject) => {
//  const el = document.createElement('script');
//  el.src = src;
//  el.addEventListener('load', resolve);
//  el.addEventListener('error', reject);
//  console.log(document.body)
//  document.body.appendChild(el)
//});

//document.addEventListener("DOMContentLoaded", async function() {
//  await addScript('https://cdn.socket.io/4.8.0/socket.io.min.js');
//  await addScript('/js/socket.js');
//});
