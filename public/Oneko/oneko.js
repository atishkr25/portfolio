// oneko.js: Enhanced with character switching & sleep/wake
(function oneko() {
  const isReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)") === true ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches === true;

  const force = window.ONEKO_FORCE === true;
  if (isReducedMotion && !force) return;

  // --- CHARACTER DEFINITIONS ---
  const characters = {
    cat: { name: "Cat", file: "/oneko/oneko.gif", emoji: "🐱" },
    dog: { name: "Dog", file: "/oneko/dog.gif", emoji: "🐶" },
    snake: { name: "Snake", file: "/oneko/snake.gif", emoji: "🐍" },
    avatar: { name: "My Avatar", file: "/oneko/avatar.gif", emoji: "🧑‍💻" },
    bird: { name: "Bird", file: "/oneko/bird.gif", emoji: "🐦" },
    bunny: { name: "Bunny", file: "/oneko/bunny.gif", emoji: "🐰" },
  };

  let currentCharacter = localStorage.getItem("oneko-character") || "cat";
  let isSleeping = false;

  // --- NEKO ELEMENT ---
  const nekoEl = document.createElement("div");
  let nekoPosX = 32;
  let nekoPosY = 32;
  let mousePosX = 0;
  let mousePosY = 0;
  let frameCount = 0;
  let idleTime = 0;
  let idleAnimation = null;
  let idleAnimationFrame = 0;
  const nekoSpeed = 10;

  // --- SLEEP Z's ELEMENT ---
  const sleepIndicator = document.createElement("div");
  sleepIndicator.id = "oneko-sleep";
  sleepIndicator.style.cssText =
    "position:fixed;z-index:2147483647;pointer-events:none;font-size:14px;font-weight:bold;color:#fff;text-shadow:0 0 4px rgba(0,0,0,0.5);opacity:0;transition:opacity 0.3s;font-family:monospace;";
  document.body.appendChild(sleepIndicator);

  let sleepZFrame = 0;

  function updateSleepIndicator() {
    if (isSleeping) {
      sleepIndicator.style.opacity = "1";
      sleepZFrame++;
      const zCount = ((sleepZFrame / 8) % 3) + 1;
      sleepIndicator.textContent = "z".repeat(zCount);
      sleepIndicator.style.left = `${nekoPosX - 8}px`;
      sleepIndicator.style.top = `${nekoPosY - 32}px`;
    } else {
      sleepIndicator.style.opacity = "0";
      sleepZFrame = 0;
    }
  }

  const spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [
      [-5, 0],
      [-6, 0],
      [-7, 0],
    ],
    scratchWallN: [
      [0, 0],
      [0, -1],
    ],
    scratchWallS: [
      [-7, -1],
      [-6, -2],
    ],
    scratchWallE: [
      [-2, -2],
      [-2, -3],
    ],
    scratchWallW: [
      [-4, 0],
      [-4, -1],
    ],
    tired: [[-3, -2]],
    sleeping: [
      [-2, 0],
      [-2, -1],
    ],
    N: [
      [-1, -2],
      [-1, -3],
    ],
    NE: [
      [0, -2],
      [0, -3],
    ],
    E: [
      [-3, 0],
      [-3, -1],
    ],
    SE: [
      [-5, -1],
      [-5, -2],
    ],
    S: [
      [-6, -3],
      [-7, -2],
    ],
    SW: [
      [-5, -3],
      [-6, -1],
    ],
    W: [
      [-4, -2],
      [-4, -3],
    ],
    NW: [
      [-1, 0],
      [-1, -1],
    ],
  };

  // --- CONTEXT MENU ---
  const menuEl = document.createElement("div");
  menuEl.id = "oneko-menu";
  menuEl.style.cssText =
    "display:none;position:fixed;z-index:2147483647;background:#1a1a2e;border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:6px 0;min-width:180px;box-shadow:0 8px 32px rgba(0,0,0,0.4);font-family:-apple-system,BlinkMacSystemFont,sans-serif;backdrop-filter:blur(12px);";
  document.body.appendChild(menuEl);

  function buildMenu() {
    menuEl.innerHTML = "";

    // Header
    const header = document.createElement("div");
    header.style.cssText =
      "padding:8px 14px 6px;font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:rgba(255,255,255,0.4);font-weight:600;";
    header.textContent = "Switch Character";
    menuEl.appendChild(header);

    Object.keys(characters).forEach((key) => {
      const char = characters[key];
      const item = document.createElement("div");
      item.style.cssText =
        "padding:8px 14px;cursor:pointer;font-size:13px;display:flex;align-items:center;gap:10px;transition:background 0.15s;color:rgba(255,255,255,0.85);";

      const isActive = key === currentCharacter;
      if (isActive) {
        item.style.background = "rgba(255,255,255,0.1)";
        item.style.color = "#fff";
      }

      item.addEventListener("mouseenter", () => {
        item.style.background = "rgba(255,255,255,0.12)";
      });
      item.addEventListener("mouseleave", () => {
        item.style.background = isActive ? "rgba(255,255,255,0.1)" : "transparent";
      });

      const emoji = document.createElement("span");
      emoji.textContent = char.emoji;
      emoji.style.fontSize = "16px";

      const name = document.createElement("span");
      name.textContent = char.name;

      const check = document.createElement("span");
      check.style.cssText = "margin-left:auto;font-size:12px;color:rgba(255,255,255,0.5);";
      check.textContent = isActive ? "●" : "";

      item.appendChild(emoji);
      item.appendChild(name);
      item.appendChild(check);

      item.addEventListener("click", (e) => {
        e.stopPropagation();
        switchCharacter(key);
        hideMenu();
      });

      menuEl.appendChild(item);
    });

    // Divider
    const divider = document.createElement("div");
    divider.style.cssText =
      "height:1px;background:rgba(255,255,255,0.1);margin:6px 0;";
    menuEl.appendChild(divider);

    // Sleep / Wake toggle
    const sleepItem = document.createElement("div");
    sleepItem.style.cssText =
      "padding:8px 14px;cursor:pointer;font-size:13px;display:flex;align-items:center;gap:10px;transition:background 0.15s;color:rgba(255,255,255,0.85);";

    sleepItem.addEventListener("mouseenter", () => {
      sleepItem.style.background = "rgba(255,255,255,0.12)";
    });
    sleepItem.addEventListener("mouseleave", () => {
      sleepItem.style.background = "transparent";
    });

    const sleepEmoji = document.createElement("span");
    sleepEmoji.textContent = isSleeping ? "☀️" : "💤";
    sleepEmoji.style.fontSize = "16px";
    const sleepName = document.createElement("span");
    sleepName.textContent = isSleeping ? "Wake Up" : "Sleep";

    sleepItem.appendChild(sleepEmoji);
    sleepItem.appendChild(sleepName);
    sleepItem.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleSleep();
      hideMenu();
    });
    menuEl.appendChild(sleepItem);
  }

  function showMenu(x, y) {
    buildMenu();
    menuEl.style.display = "block";

    // Position - ensure it stays within viewport
    const menuRect = menuEl.getBoundingClientRect();
    const maxX = window.innerWidth - menuRect.width - 8;
    const maxY = window.innerHeight - menuRect.height - 8;
    menuEl.style.left = `${Math.min(x, maxX)}px`;
    menuEl.style.top = `${Math.min(y, maxY)}px`;

    // Entrance animation
    menuEl.style.opacity = "0";
    menuEl.style.transform = "scale(0.95) translateY(-4px)";
    menuEl.style.transition = "opacity 0.15s, transform 0.15s";
    requestAnimationFrame(() => {
      menuEl.style.opacity = "1";
      menuEl.style.transform = "scale(1) translateY(0)";
    });
  }

  function hideMenu() {
    menuEl.style.opacity = "0";
    menuEl.style.transform = "scale(0.95) translateY(-4px)";
    setTimeout(() => {
      menuEl.style.display = "none";
    }, 150);
  }

  function switchCharacter(key) {
    currentCharacter = key;
    localStorage.setItem("oneko-character", key);
    nekoEl.style.backgroundImage = `url(${characters[key].file})`;
  }

  function toggleSleep() {
    isSleeping = !isSleeping;
    if (isSleeping) {
      idleAnimation = "sleeping";
      idleAnimationFrame = 0;
    } else {
      idleAnimation = null;
      idleTime = 0;
      idleAnimationFrame = 0;
    }
  }

  // --- INIT ---
  function init() {
    const charFile = characters[currentCharacter]
      ? characters[currentCharacter].file
      : characters.cat.file;

    nekoEl.id = "oneko";
    nekoEl.ariaHidden = true;
    nekoEl.style.width = "32px";
    nekoEl.style.height = "32px";
    nekoEl.style.position = "fixed";
    nekoEl.style.imageRendering = "pixelated";
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
    nekoEl.style.zIndex = 2147483647;
    nekoEl.style.backgroundImage = `url(${charFile})`;
    nekoEl.style.pointerEvents = "auto";
    nekoEl.style.cursor = "pointer";

    document.body.appendChild(nekoEl);

    // Click to sleep / wake
    nekoEl.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleSleep();
    });

    // Right-click to open context menu
    nekoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      e.stopPropagation();
      showMenu(e.clientX, e.clientY);
    });

    // Close menu on click elsewhere
    document.addEventListener("click", (e) => {
      if (!menuEl.contains(e.target) && e.target !== nekoEl) {
        hideMenu();
      }
    });

    document.addEventListener("contextmenu", (e) => {
      if (!nekoEl.contains(e.target)) {
        hideMenu();
      }
    });

    // Mouse move - wake up only if not force-sleeping
    document.addEventListener("mousemove", (event) => {
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    });

    window.requestAnimationFrame(onAnimationFrame);
  }

  let lastFrameTimestamp;

  function onAnimationFrame(timestamp) {
    if (!nekoEl.isConnected) return;

    if (!lastFrameTimestamp) lastFrameTimestamp = timestamp;

    if (timestamp - lastFrameTimestamp > 100) {
      lastFrameTimestamp = timestamp;
      frame();
      updateSleepIndicator();
    }
    window.requestAnimationFrame(onAnimationFrame);
  }

  function setSprite(name, frame) {
    const sprite = spriteSets[name][frame % spriteSets[name].length];
    nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  }

  function resetIdleAnimation() {
    idleAnimation = null;
    idleAnimationFrame = 0;
  }

  function idle() {
    idleTime += 1;

    if (
      idleTime > 10 &&
      Math.floor(Math.random() * 200) === 0 &&
      idleAnimation == null
    ) {
      let availableIdleAnimations = ["sleeping", "scratchSelf"];
      if (nekoPosX < 32) availableIdleAnimations.push("scratchWallW");
      if (nekoPosY < 32) availableIdleAnimations.push("scratchWallN");
      if (nekoPosX > window.innerWidth - 32)
        availableIdleAnimations.push("scratchWallE");
      if (nekoPosY > window.innerHeight - 32)
        availableIdleAnimations.push("scratchWallS");
      idleAnimation =
        availableIdleAnimations[
          Math.floor(Math.random() * availableIdleAnimations.length)
        ];
    }

    switch (idleAnimation) {
      case "sleeping":
        if (idleAnimationFrame < 8) {
          setSprite("tired", 0);
          break;
        }
        setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
        if (idleAnimationFrame > 192 && !isSleeping) {
          resetIdleAnimation();
        }
        break;
      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
      case "scratchSelf":
        setSprite(idleAnimation, idleAnimationFrame);
        if (idleAnimationFrame > 9) {
          resetIdleAnimation();
        }
        break;
      default:
        setSprite("idle", 0);
        return;
    }
    idleAnimationFrame += 1;
  }

  function frame() {
    // If sleeping, stay in sleep animation indefinitely
    if (isSleeping) {
      if (idleAnimation !== "sleeping") {
        idleAnimation = "sleeping";
        idleAnimationFrame = 0;
      }
      idle();
      return;
    }

    frameCount += 1;
    const diffX = nekoPosX - mousePosX;
    const diffY = nekoPosY - mousePosY;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    if (distance < nekoSpeed || distance < 48) {
      idle();
      return;
    }

    idleAnimation = null;
    idleAnimationFrame = 0;

    if (idleTime > 1) {
      setSprite("alert", 0);
      idleTime = Math.min(idleTime, 7);
      idleTime -= 1;
      return;
    }

    let direction;
    direction = diffY / distance > 0.5 ? "N" : "";
    direction += diffY / distance < -0.5 ? "S" : "";
    direction += diffX / distance > 0.5 ? "W" : "";
    direction += diffX / distance < -0.5 ? "E" : "";
    setSprite(direction, frameCount);

    nekoPosX -= (diffX / distance) * nekoSpeed;
    nekoPosY -= (diffY / distance) * nekoSpeed;

    nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
    nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
  }

  init();
})();
