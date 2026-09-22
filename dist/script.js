const activities = [
  { name: "Walk a pet", icon: "🐕", description: "Let your furry friend pick the pace and explore the block together.", tags: ["easy", "outside"], effort: "Easy" },
  { name: "Walk to class", icon: "🎒", description: "Take the long hallway or an extra lap before the bell rings.", tags: ["easy", "inside", "friends"], effort: "Everyday" },
  { name: "Light jog", icon: "👟", description: "Jog until you want to walk. Switching back and forth totally counts.", tags: ["outside"], effort: "A little sweaty" },
  { name: "One-song dance", icon: "🎧", description: "Put on one favorite track and move however the beat tells you.", tags: ["easy", "inside"], effort: "3–5 min" },
  { name: "Bike cruise", icon: "🚲", description: "Roll around your neighborhood with no finish line in sight.", tags: ["outside", "friends"], effort: "Your pace" },
  { name: "Frisbee toss", icon: "🥏", description: "Grab a friend and see how many weird catches you can invent.", tags: ["outside", "friends"], effort: "Playful" },
  { name: "Cloud-spotting walk", icon: "☁️", description: "Wander outside and look for shapes in the sky as you go.", tags: ["easy", "outside"], effort: "Chill" },
  { name: "Living-room stretch", icon: "🙆", description: "Reach, twist, and loosen up while watching something you like.", tags: ["easy", "inside"], effort: "Gentle" },
  { name: "Shoot some hoops", icon: "🏀", description: "No game needed—just try a few shots from wherever feels good.", tags: ["outside", "friends"], effort: "Your rules" },
  { name: "Playground loop", icon: "🛝", description: "Climb, swing, balance, or make up a route around the playground.", tags: ["outside", "friends"], effort: "Adventure" },
  { name: "Stair challenge", icon: "🪜", description: "Take one extra flight at a comfortable pace, then celebrate it.", tags: ["inside"], effort: "Quick" },
  { name: "Kitchen disco", icon: "🪩", description: "Clear a tiny dance floor while you wait for a snack or meal.", tags: ["easy", "inside", "friends"], effort: "Silly" },
  { name: "Nature photo walk", icon: "📷", description: "Walk until you find five cool colors or textures to photograph.", tags: ["easy", "outside", "friends"], effort: "Explore" },
  { name: "Balloon volleyball", icon: "🎈", description: "Keep a balloon off the floor using any part of your body.", tags: ["easy", "inside", "friends"], effort: "Low impact" },
  { name: "Sidewalk chalk course", icon: "🖍️", description: "Draw zigzags, hop spots, and spin zones, then follow the path.", tags: ["outside", "friends"], effort: "Creative" },
  { name: "Room reset", icon: "🧹", description: "Put on music and speed-tidy. Bending and reaching are movement too.", tags: ["easy", "inside"], effort: "Useful" },
  { name: "Mini yoga flow", icon: "🧘", description: "Try a few comfortable poses and breathe—no bendiness required.", tags: ["easy", "inside"], effort: "Calm" },
  { name: "Scooter roll", icon: "🛴", description: "Cruise a safe path and stop whenever your legs say so.", tags: ["outside", "friends"], effort: "Breezy" },
  { name: "Walk-and-talk", icon: "💬", description: "Catch up with a friend while you loop the block or school grounds.", tags: ["easy", "outside", "friends"], effort: "Social" },
  { name: "Garden helper", icon: "🌱", description: "Water, weed, dig, or carry a few pots—nature is your gym.", tags: ["easy", "outside"], effort: "Hands-on" },
  { name: "Follow-the-leader", icon: "🦆", description: "Take turns inventing funny walks and easy moves for friends to copy.", tags: ["inside", "outside", "friends"], effort: "Goofy" },
  { name: "Pillow obstacle course", icon: "🛋️", description: "Use soft, safe objects to create a course you can step around.", tags: ["inside", "friends"], effort: "Inventive" },
  { name: "Hopscotch", icon: "🔢", description: "Chalk it outside or use paper squares inside. Hop your own pattern.", tags: ["outside", "inside", "friends"], effort: "Classic" },
  { name: "Dog-toy fetch", icon: "🎾", description: "Toss, collect, repeat—and see who gets tired first, you or the dog.", tags: ["outside", "inside"], effort: "Playful" },
  { name: "Skate and glide", icon: "🛼", description: "Find a smooth safe spot and roll slowly with a friend or playlist.", tags: ["outside", "friends"], effort: "Balance" },
  { name: "Wall-ball bounce", icon: "🔴", description: "Bounce a soft ball against a wall and invent your own catch rules.", tags: ["outside", "friends"], effort: "Make it up" },
  { name: "Treasure hunt", icon: "🗺️", description: "Hide clues around home or outside, then move from one to the next.", tags: ["inside", "outside", "friends"], effort: "Mission" },
  { name: "Music-video copycat", icon: "📺", description: "Try the easiest parts of a dance video. Pausing is always allowed.", tags: ["inside", "friends"], effort: "No pressure" },
  { name: "Balance challenge", icon: "⚖️", description: "Stand on one foot, walk a line, or balance a book on your head.", tags: ["easy", "inside"], effort: "1–5 min" },
  { name: "Sunset stroll", icon: "🌅", description: "Take a slow walk and notice how the sky changes color.", tags: ["easy", "outside", "friends"], effort: "Unwind" },
  { name: "Laundry basket toss", icon: "🧺", description: "Roll up clean socks and aim for the basket from different spots.", tags: ["easy", "inside", "friends"], effort: "Tiny game" },
  { name: "Weekend wander", icon: "🧭", description: "Pick a safe direction and explore somewhere nearby you haven’t noticed.", tags: ["outside", "friends"], effort: "Curious" }
];

const grid = document.querySelector("#move-grid");
const search = document.querySelector("#search");
const count = document.querySelector("#result-count");
const empty = document.querySelector("#empty-state");
const dialog = document.querySelector("#move-dialog");
let currentFilter = "all";
let visibleActivities = activities;

function render() {
  const query = search.value.trim().toLowerCase();
  visibleActivities = activities.filter(activity => {
    const matchesFilter = currentFilter === "all" || activity.tags.includes(currentFilter);
    const matchesSearch = `${activity.name} ${activity.description} ${activity.effort}`.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  grid.innerHTML = visibleActivities.map((activity, index) => `
    <article class="move-card" style="animation-delay:${Math.min(index * 25, 250)}ms">
      <div class="move-icon" aria-hidden="true">${activity.icon}</div>
      <div class="move-body">
        <div class="move-meta"><span>${activity.tags.includes("inside") ? "Inside" : "Outside"}</span><b>${activity.effort}</b></div>
        <h3>${activity.name}</h3>
        <p>${activity.description}</p>
      </div>
    </article>
  `).join("");

  count.textContent = `${visibleActivities.length} ${visibleActivities.length === 1 ? "move" : "moves"} to try`;
  empty.hidden = visibleActivities.length > 0;
  grid.hidden = visibleActivities.length === 0;
}

function chooseRandom() {
  const pool = visibleActivities.length ? visibleActivities : activities;
  const activity = pool[Math.floor(Math.random() * pool.length)];
  document.querySelector("#dialog-icon").textContent = activity.icon;
  document.querySelector("#dialog-title").textContent = activity.name;
  document.querySelector("#dialog-description").textContent = activity.description;
  if (!dialog.open) dialog.showModal();
}

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter.active")?.classList.remove("active");
    button.classList.add("active");
    currentFilter = button.dataset.filter;
    render();
  });
});

search.addEventListener("input", render);
document.querySelector("#surprise").addEventListener("click", chooseRandom);
document.querySelector("#surprise-top").addEventListener("click", () => {
  document.querySelector("#moves").scrollIntoView({ behavior: "smooth" });
  setTimeout(chooseRandom, 450);
});
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
  document.querySelector('[data-filter="all"]').classList.add("active");
  render();
});
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

render();
