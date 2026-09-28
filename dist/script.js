const activities = [
  { name: "Walk a pet", description: "Let your furry friend pick the pace and explore the block together.", interests: ["animals", "nature", "friends"], interestLabel: "Animals", effort: "Easy" },
  { name: "Walk to class", description: "Take the long hallway or an extra lap before the bell rings.", interests: ["friends", "calm"], interestLabel: "With friends", effort: "Everyday" },
  { name: "Light jog", description: "Jog until you want to walk. Switching back and forth totally counts.", interests: ["nature", "calm"], interestLabel: "Nature", effort: "A little sweaty" },
  { name: "One-song dance", description: "Put on one favorite track and move however the beat tells you.", interests: ["music", "creative"], interestLabel: "Music & dance", effort: "3–5 min" },
  { name: "Bike cruise", description: "Roll around your neighborhood with no finish line in sight.", interests: ["wheels", "nature", "friends"], interestLabel: "Wheels", effort: "Your pace" },
  { name: "Frisbee toss", description: "Grab a friend and see how many weird catches you can invent.", interests: ["games", "friends"], interestLabel: "Games", effort: "Playful" },
  { name: "Cloud-spotting walk", description: "Wander outside and look for shapes in the sky as you go.", interests: ["nature", "calm"], interestLabel: "Nature", effort: "Chill" },
  { name: "Living-room stretch", description: "Reach, twist, and loosen up while watching something you like.", interests: ["calm"], interestLabel: "Chill", effort: "Gentle" },
  { name: "Shoot some hoops", description: "No game needed—just try a few shots from wherever feels good.", interests: ["games", "friends"], interestLabel: "Games", effort: "Your rules" },
  { name: "Playground loop", description: "Climb, swing, balance, or make up a route around the playground.", interests: ["games", "friends"], interestLabel: "Games", effort: "Adventure" },
  { name: "Stair challenge", description: "Take one extra flight at a comfortable pace, then celebrate it.", interests: ["games", "calm"], interestLabel: "Personal challenge", effort: "Quick" },
  { name: "Kitchen disco", description: "Clear a tiny dance floor while you wait for a snack or meal.", interests: ["music", "friends"], interestLabel: "Music & dance", effort: "Silly" },
  { name: "Nature photo walk", description: "Walk until you find five cool colors or textures to photograph.", interests: ["nature", "creative"], interestLabel: "Creative", effort: "Explore" },
  { name: "Balloon volleyball", description: "Keep a balloon off the floor using any part of your body.", interests: ["games", "friends"], interestLabel: "Games", effort: "Low impact" },
  { name: "Sidewalk chalk course", description: "Draw zigzags, hop spots, and spin zones, then follow the path.", interests: ["creative", "games", "friends"], interestLabel: "Creative", effort: "Make it yours" },
  { name: "Room reset", description: "Put on music and speed-tidy. Bending and reaching are movement too.", interests: ["music", "calm"], interestLabel: "Music & dance", effort: "Useful" },
  { name: "Mini yoga flow", description: "Try a few comfortable poses and breathe—no bendiness required.", interests: ["calm"], interestLabel: "Chill", effort: "Calm" },
  { name: "Scooter roll", description: "Cruise a safe path and stop whenever your legs say so.", interests: ["wheels", "nature", "friends"], interestLabel: "Wheels", effort: "Breezy" },
  { name: "Walk-and-talk", description: "Catch up with a friend while you loop the block or school grounds.", interests: ["friends", "nature", "calm"], interestLabel: "With friends", effort: "Social" },
  { name: "Garden helper", description: "Water, weed, dig, or carry a few pots—nature is your gym.", interests: ["nature", "creative"], interestLabel: "Nature", effort: "Hands-on" },
  { name: "Follow-the-leader", description: "Take turns inventing funny walks and easy moves for friends to copy.", interests: ["games", "friends", "creative"], interestLabel: "With friends", effort: "Goofy" },
  { name: "Pillow obstacle course", description: "Use soft, safe objects to create a course you can step around.", interests: ["creative", "games"], interestLabel: "Creative", effort: "Inventive" },
  { name: "Hopscotch", description: "Chalk it outside or use paper squares inside. Hop your own pattern.", interests: ["games", "friends"], interestLabel: "Games", effort: "Classic" },
  { name: "Dog-toy fetch", description: "Toss, collect, repeat—and see who gets tired first, you or the dog.", interests: ["animals", "games"], interestLabel: "Animals", effort: "Playful" },
  { name: "Skate and glide", description: "Find a smooth safe spot and roll slowly with a friend or playlist.", interests: ["wheels", "music", "friends"], interestLabel: "Wheels", effort: "Balance" },
  { name: "Wall-ball bounce", description: "Bounce a soft ball against a wall and invent your own catch rules.", interests: ["games", "friends"], interestLabel: "Games", effort: "Make it up" },
  { name: "Treasure hunt", description: "Hide clues around home or outside, then move from one to the next.", interests: ["creative", "games", "friends"], interestLabel: "Creative", effort: "Mission" },
  { name: "Music-video copycat", description: "Try the easiest parts of a dance video. Pausing is always allowed.", interests: ["music", "creative", "friends"], interestLabel: "Music & dance", effort: "No pressure" },
  { name: "Balance challenge", description: "Stand on one foot, walk a line, or balance a book on your head.", interests: ["calm", "games"], interestLabel: "Chill", effort: "1–5 min" },
  { name: "Sunset stroll", description: "Take a slow walk and notice how the sky changes color.", interests: ["nature", "calm", "friends"], interestLabel: "Nature", effort: "Unwind" },
  { name: "Laundry basket toss", description: "Roll up clean socks and aim for the basket from different spots.", interests: ["games", "friends"], interestLabel: "Games", effort: "Tiny game" },
  { name: "Weekend wander", description: "Pick a safe direction and explore somewhere nearby you haven’t noticed.", interests: ["nature", "friends", "calm"], interestLabel: "Nature", effort: "Curious" }
];

const grid = document.querySelector("#move-grid");
const search = document.querySelector("#search");
const count = document.querySelector("#result-count");
const empty = document.querySelector("#empty-state");
const dialog = document.querySelector("#move-dialog");
let currentFilter = "all";
let visibleActivities = activities;

function getPhoto(index) {
  if (index < 15) {
    return { className: "photo-sheet-a", tile: index };
  }
  if (index < 31) {
    return { className: "photo-sheet-b", tile: index - 15 };
  }
  return { className: "photo-weekend", tile: 0 };
}

function getPhotoPosition(tile) {
  return {
    x: (tile % 4) * 33.333,
    y: Math.floor(tile / 4) * 33.333
  };
}

function render() {
  const query = search.value.trim().toLowerCase();
  visibleActivities = activities.filter(activity => {
    const matchesFilter = currentFilter === "all" || activity.interests.includes(currentFilter);
    const matchesSearch = `${activity.name} ${activity.description} ${activity.effort} ${activity.interestLabel} ${activity.interests.join(" ")}`.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  grid.innerHTML = visibleActivities.map((activity, index) => {
    const photo = getPhoto(activities.indexOf(activity));
    const { x, y } = getPhotoPosition(photo.tile);
    return `
    <article class="move-card" style="animation-delay:${Math.min(index * 25, 250)}ms">
      <div class="move-photo ${photo.className}" role="img" aria-label="${activity.name}" style="--x:${x}%;--y:${y}%"></div>
      <div class="move-body">
        <div class="move-meta"><span>${activity.interestLabel}</span><b>${activity.effort}</b></div>
        <h3>${activity.name}</h3>
        <p>${activity.description}</p>
      </div>
    </article>
  `}).join("");

  count.textContent = `${visibleActivities.length} ${visibleActivities.length === 1 ? "move" : "moves"} to try`;
  empty.hidden = visibleActivities.length > 0;
  grid.hidden = visibleActivities.length === 0;
}

function chooseRandom() {
  const pool = visibleActivities.length ? visibleActivities : activities;
  const activity = pool[Math.floor(Math.random() * pool.length)];
  const photoInfo = getPhoto(activities.indexOf(activity));
  const position = getPhotoPosition(photoInfo.tile);
  const photo = document.querySelector("#dialog-photo");
  photo.classList.remove("photo-sheet-a", "photo-sheet-b", "photo-weekend");
  photo.classList.add(photoInfo.className);
  photo.style.setProperty("--x", `${position.x}%`);
  photo.style.setProperty("--y", `${position.y}%`);
  photo.setAttribute("aria-label", activity.name);
  document.querySelector("#dialog-title").textContent = activity.name;
  document.querySelector("#dialog-description").textContent = activity.description;
  if (!dialog.open) dialog.showModal();
}

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter.active")?.classList.remove("active");
    document.querySelectorAll(".filter").forEach(filter => filter.setAttribute("aria-pressed", "false"));
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    currentFilter = button.dataset.filter;
    render();
  });
});

search.addEventListener("input", render);
document.querySelector("#surprise").addEventListener("click", chooseRandom);
document.querySelector("#reroll").addEventListener("click", chooseRandom);
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
document.querySelector("#done").addEventListener("click", () => {
  dialog.close();
  const toast = document.querySelector("#toast");
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
});
document.querySelector("#reset").addEventListener("click", () => {
  search.value = "";
  currentFilter = "all";
  document.querySelector(".filter.active")?.classList.remove("active");
  document.querySelectorAll(".filter").forEach(filter => filter.setAttribute("aria-pressed", "false"));
  document.querySelector('[data-filter="all"]').classList.add("active");
  document.querySelector('[data-filter="all"]').setAttribute("aria-pressed", "true");
  render();
});
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

render();
