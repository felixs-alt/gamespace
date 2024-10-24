const socket = io('https://gmspace-chat.fly.dev');
socket.on('user-count-change', function (userCount) {
    console.log(String(userCount+" Users Online"))
});