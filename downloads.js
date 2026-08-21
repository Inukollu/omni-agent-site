(() => {
  const ua = navigator.userAgent.toLowerCase();
  const platform = (navigator.userAgentData?.platform || navigator.platform || "").toLowerCase();
  let selected = "windows";
  if (platform.includes("mac") || ua.includes("macintosh")) selected = "mac";
  else if (platform.includes("linux") || ua.includes("linux")) selected = "linux";

  const labels = { windows: "Windows", mac: "macOS", linux: "Linux" };
  const selectPlatform = (key) => {
    document.querySelectorAll("[data-platform]").forEach((card) => {
      card.hidden = card.dataset.platform !== key;
      card.classList.toggle("recommended", card.dataset.platform === key);
    });
    document.querySelectorAll("[data-os]").forEach((button) => {
      const active = button.dataset.os === key;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    document.querySelector("#detected-platform").textContent = `${labels[key]} downloads`;
  };

  document.querySelectorAll("[data-os]").forEach((button) => {
    button.addEventListener("click", () => selectPlatform(button.dataset.os));
  });
  selectPlatform(selected);
})();
