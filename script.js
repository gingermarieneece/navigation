const navItemsContainer = document.getElementById("nav-items");
const slider = document.getElementById("slider");
let activeItem = null;

// Sample JSON data
const citiesData = [
  {
    section: "cupertino",
    label: "Cupertino",
  },
  {
    section: "new-york-city",
    label: "New York City",
  },
  {
    section: "london",
    label: "London",
  },
  {
    section: "amsterdam",
    label: "Amsterdam",
  },
  {
    section: "tokyo",
    label: "Tokyo",
  },
  {
    section: "hong-kong",
    label: "Hong Kong",
  },
  {
    section: "sydney",
    label: "Sydney",
  },
];

// Function to create nav items from JSON data
function populateNavItems() {
  citiesData.forEach((city) => {
    const navItem = document.createElement("li");
    navItem.className = "nav-item";
    navItem.dataset.city = city.label;
    navItem.innerText = city.label;

    // Add click event listener
    navItem.addEventListener("click", function () {
      // Remove active class from the previously active item
      if (activeItem) {
        activeItem.classList.remove("active");
      }

      // Set the clicked item as active
      this.classList.add("active");
      activeItem = this;

      // Update slider position and size
      updateSliderPosition(this);

      // Optionally display the current time for the selected city
      const cityName = this.dataset.city;
      displayCityTime(cityName);
    });

    // Append to the nav items container
    navItemsContainer.appendChild(navItem);
  });
}

function updateSliderPosition(target) {
  const rect = target.getBoundingClientRect();
  slider.style.width = `${rect.width}px`;
  slider.style.left = `${rect.left}px`;
}

// Function to display current time for the selected city
function displayCityTime(city) {
  const now = new Date().toLocaleTimeString("en-US", {
    timeZone: getTimeZone(city),
    hour: "2-digit",
    minute: "2-digit",
  });
  document.getElementById(
    "city-time"
  ).innerText = `Current time in ${city}: ${now}`;
}

// Time zone mapping function
function getTimeZone(city) {
  const timeZones = {
    Cupertino: "America/Los_Angeles",
    "New York City": "America/New_York",
    London: "Europe/London",
    Amsterdam: "Europe/Amsterdam",
    Tokyo: "Asia/Tokyo",
    "Hong Kong": "Asia/Hong_Kong",
    Sydney: "Australia/Sydney",
  };
  return timeZones[city];
}

// Initialize navigation and slider position on page load
populateNavItems();

// Update slider position on window resize
window.addEventListener("resize", function () {
  if (activeItem) {
    updateSliderPosition(activeItem);
  }
});
