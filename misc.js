/*Overwriting history.pushstate, history.replaceState and history.popstate in order
to create a custom 'locationchange' event*/
/*Link: https://stackoverflow.com/questions/6390341/how-to-detect-if-url-has-changed-after-hash-in-javascript*/
window.history.pushState = ((f) =>
  function pushState() {
    var ret = f.apply(this, arguments);
    window.dispatchEvent(new Event("pushstate"));
    window.dispatchEvent(new Event("locationchange"));
    return ret;
  })(window.history.pushState);

window.history.replaceState = ((f) =>
  function replaceState() {
    var ret = f.apply(this, arguments);
    window.dispatchEvent(new Event("replacestate"));
    window.dispatchEvent(new Event("locationchange"));
    return ret;
  })(window.history.replaceState);

window.addEventListener("popstate", () => {
  window.dispatchEvent(new Event("locationchange"));
});

/*Useful if you're doing redirects in React and need to know if a redirect took place*/
