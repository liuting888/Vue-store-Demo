var togo = to.path.split("/");
for (var i = 2; i < togo.length; i++) {
    if (togo.length == i) {
        togo += togo[i];
    } else {
        togo += togo[i] + '/';
    }
}
console.log(togo);