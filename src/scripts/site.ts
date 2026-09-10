(() => {
  const root = document.documentElement;
  const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const navigation = document.querySelector<HTMLElement>("[data-site-nav]");

  root.classList.add("has-js");

  if (!toggle || !navigation) {
    return;
  }

  const closeMenu = () => {
    navigation.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  const isMenuOpen = () => navigation.classList.contains("is-open");

  toggle.addEventListener("click", () => {
    const nextState = !isMenuOpen();
    navigation.classList.toggle("is-open", nextState);
    toggle.setAttribute("aria-expanded", String(nextState));
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isMenuOpen()) {
      closeMenu();
      toggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (isMenuOpen() && !navigation.contains(event.target) && !toggle.contains(event.target)) {
      closeMenu();
    }
  });
})();
