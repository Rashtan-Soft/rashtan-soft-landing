(function () {
  "use strict";

  var root = document.documentElement;
  var toggle = document.querySelector("[data-menu-toggle]");
  var navigation = document.querySelector("[data-site-nav]");

  root.classList.add("has-js");

  if (!toggle || !navigation) {
    return;
  }

  function closeMenu() {
    navigation.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  function isMenuOpen() {
    return navigation.classList.contains("is-open");
  }

  toggle.addEventListener("click", function () {
    var nextState = !isMenuOpen();
    navigation.classList.toggle("is-open", nextState);
    toggle.setAttribute("aria-expanded", String(nextState));
  });

  navigation.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isMenuOpen()) {
      closeMenu();
      toggle.focus();
    }
  });

  document.addEventListener("click", function (event) {
    if (isMenuOpen() && !navigation.contains(event.target) && !toggle.contains(event.target)) {
      closeMenu();
    }
  });
})();
