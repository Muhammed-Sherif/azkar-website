
let azkar_sabah_data = [];
let azkar_masaa_data = [];
let tasabeh_data = [];
let azkar_sleeping_data = [];
let azkar_after_alsalah_data = [];
let data_count = [];
let azkar_alsabah_num;
let azkar_almasaa_num;
let azkar_title_names = [
  "أذكار الصباح",
  "أذكار المساء",
  "أذكار بعد الصلاه",
  "أذكار النوم",
  "تسابيح",
];
let azkar_names = [
  "azkar_alsabah",
  "azkar_almasaa",
  "azkar_after_alsalah",
  "azkar_sleeping",
  "tasabeh",
];
// Initialize variables to store the count of azkar
let azkarCount = 0;
let azkarSabahCount = 0;
let azkarMasaaCount = 0;
let counter_data = [];
let body = document.querySelector("body");
async function fetchData1() {
   try {
    console.log("fetchData function called!"); // ✅ Check if function runs

    let response = await fetch("http://localhost/myAzkary/includes/config/api/read.php");
    console.log("Response received:", response); // ✅ Check response

    let data = await response.json();
    console.log("JSON Data:", data); // ✅ Check parsed data
  } catch (error) {
    console.error("Fetch error:", error); // ✅ Catch errors
  }
}


fetchData1();

async function fetchData() {
  try {
    
    let azkar_sabah = await fetch("data/azkar_sabah.json");
    let azkar_masaa = await fetch("data/azkar_masaa.json");
    let azkar_after_alsalah = await fetch("data/azkar_after_alsalah.json");
    let azkar_sleeping = await fetch("data/azkar_sleeping.json");
    let tasabeh = await fetch("data/tasabeh.json");
    // let sab = await fetch("http://localhost/myAzkary/includes/config/api/read.php?categoryId=1");
    // d = await sab.json();
    // console.log(d)
    azkar_sabah_data = await azkar_sabah.json();
    azkar_masaa_data = await azkar_masaa.json();
    azkar_after_alsalah_data = await azkar_after_alsalah.json();
    tasabeh_data = await tasabeh.json();
    azkar_sleeping_data = await azkar_sleeping.json();
  } catch (error) {
    console.log(`reason is ${error}`);
  }
}
async function createContent() {
  await fetchData();
  // calc the total of azkar alsabah and all almasaa
  // adding date
  let public_date = document.querySelector(".public-date");
  let higry_date = document.querySelector(".higry-date");
  let date = new Date();
  let options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  public_date.innerHTML = `${new Intl.DateTimeFormat("ar-EG", options).format(
    date
  )}`;
  let option = {
    month: "long",
    day: "numeric",
    year: "numeric",
    numerals: "arabic",
  };
  let hijriDate = new Date(date.setDate(date.getDate()));
  higry_date.innerHTML = `${new Intl.DateTimeFormat(
    "ar-FR-u-ca-islamic",
    option
  ).format(hijriDate)}`;
  //
  // get rondom zekr span
  let rondom_zekr = document.querySelector(".rondom-zekr span");
  let zekr_info = document.querySelector("span.zekr-info");
  // get rondom zekr
  if (Math.floor(Math.random() * 2) === 0) {
    let rondomNumber = Math.floor(Math.random() * azkar_sabah_data.length);
    rondom_zekr.innerHTML = azkar_sabah_data[rondomNumber].mainText;
    if (azkar_sabah_data[rondomNumber].infoText !== "") {
      zekr_info.innerHTML = azkar_sabah_data[rondomNumber].infoText;
    } else {
      let hr = document.querySelector("hr");
      hr.style.display = "none";
    }
  } else {
    let rondomNumber = Math.floor(Math.random() * azkar_masaa_data.length);
    rondom_zekr.innerHTML = azkar_masaa_data[rondomNumber].mainText;
    if (azkar_masaa_data[rondomNumber].infoText !== "") {
      zekr_info.innerHTML = azkar_masaa_data[rondomNumber].infoText;
    } else {
      let hr = document.querySelector("hr");
      hr.style.display = "none";
    }
  }
  calcNumberOfAzkarSabahAndMasaa();
  // Function to go back to the home view
  window.goBack = function () {
    let siteSections = document.querySelectorAll(".landing-area .section");
    let homeElement = document.querySelector(".home");

    // Hide all sections
    siteSections.forEach((section) => {
      section.setAttribute("data-active", "none");
      section.style.opacity = 0; // Added for fade-out effect
      section.style.display = "none"; // Added for fade-out effect
    });

    // Show the home element
    homeElement.setAttribute("data-active", "active");
    homeElement.style.opacity = 1; // Added for fade-in effect
    homeElement.style.display = "block";

    // Smooth scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function create_zekr_page(azkar_name, azkar_title_name, azkar_data) {
    let azkar = document.createElement("div");
    azkar.setAttribute("id", `${azkar_name}`);
    azkar.className = "section";
    let landing_area = document.querySelector(".landing-area");
    landing_area.appendChild(azkar);
    let container = document.createElement("div");
    container.className = "container";
    let title_container = document.createElement("div");
    title_container.className = "title-container";
    ///////////////////////////////////////////////////////////////////////
    let iconBack = document.createElement("div");
    iconBack.className = "icon-back";
    iconBack.addEventListener("click", () => {
      goBack();
    });
    let span = document.createElement("span");
    span.className = "material-symbols-outlined";
    let spanText = document.createTextNode("redo");
    span.appendChild(spanText);
    container.appendChild(iconBack);
    iconBack.appendChild(span);

    ///////////////////////////////////////////////////////////////////////////////////
    // creating title
    let title = document.createElement("span");
    title.className = "title";
    let title_text = document.createTextNode(`${azkar_title_name}`);
    title.appendChild(title_text);
    let title_info = document.createElement("span");
    title_info.className = "title_info";
    let title_info_text = document.createTextNode("ذكر");
    title_info.appendChild(title_info_text);
    // landing_area.appendChild(title_container);
    title_container.appendChild(title);
    title_container.appendChild(title_info);
    azkar.appendChild(container);
    container.appendChild(title_container);
    //////////////////////////////////////////////////////////////
    // container.appendChild(title_container);
    //////////////////////////////////////////////////////////
    let content_area = document.createElement("div");
    content_area.className = "content-area";
    azkar.appendChild(content_area);
    //   // add title
    for (let i = 0; i < azkar_data.length; i++) {
      //     // add div in section
      let content_box = document.createElement("div");
      content_box.setAttribute("class", "content-box");
      content_area.appendChild(content_box);
      // add content in div
      let content = document.createElement("div");
      content.setAttribute("class", "content");
      content_box.append(content);
      let countercontainer = document.createElement("div");
      countercontainer.setAttribute("class", "countercontainer");
      let counter = document.createElement("div");
      counter.setAttribute("class", `counter`);
      // adding count-clock
      let count_clock = document.createElement("span");
      count_clock.setAttribute("class", "count-clock");
      count_clock.innerHTML = `${azkar_data[i].count}`;
      counter.appendChild(count_clock);
      //
      let count_down = document.createElement("span");
      count_down.setAttribute("class", "count-down");
      count_down.setAttribute("id", `${azkar_name}_count`);
      count_down.innerHTML = `${azkar_data[i].count}`;
      counter.appendChild(count_down);
      //
      let zekr_reset = document.createElement("span");
      zekr_reset.setAttribute("class", "zekr-reset");
      zekr_reset.innerHTML = `<i class="material-symbols-outlined">
      cached
      </i>`;
      counter.appendChild(zekr_reset);
      //
      countercontainer.appendChild(counter);
      content.appendChild(countercontainer);
      let counters = document.querySelectorAll(".counter");
      counters.forEach((counter) => {
        counter.addEventListener("click", () => {
          counter.style.animation =
            "color-animation-counter 1s linear  1 alternate both;";
        });
      });
      let content_text = document.createElement("div");
      content_text.setAttribute("class", "content-text");
      content.append(content_text);
      // get text
      //first text

      if (azkar_data[i].firstText !== "") {
        let fristContainer = document.createElement("div");
        fristContainer.setAttribute("class", "firstContainer");
        let firsttext = document.createTextNode(`${azkar_data[i].firstText}`);
        content_text.appendChild(fristContainer);
        fristContainer.appendChild(firsttext);
      }

      // main text
      let mainTextContainer = document.createElement("div");
      mainTextContainer.setAttribute("class", "mainTextContainer");
      let maintext = document.createTextNode(`${azkar_data[i].mainText}`);
      mainTextContainer.appendChild(maintext);
      content_text.appendChild(mainTextContainer);
      // source of text
      if (azkar_data[i].sourceText !== "") {
        let sourceTextcontainer = document.createElement("span");
        sourceTextcontainer.setAttribute("class", "sourceTextcontainer");
        let sourceText = document.createTextNode(`${azkar_data[i].sourceText}`);
        sourceTextcontainer.appendChild(sourceText);
        content_text.appendChild(sourceTextcontainer);
      }

      //info text
      if (azkar_data[i].infoText !== "") {
        let infoTextcontainer = document.createElement("span");
        infoTextcontainer.setAttribute("class", "infoTextcontainer");
        let infoText = document.createTextNode(`${azkar_data[i].infoText}`);
        infoTextcontainer.appendChild(infoText);
        content_text.appendChild(infoTextcontainer);
      }
      let contentTexts = document.querySelectorAll(".content-text");
      counters.forEach((counter, index) => {
        contentTexts.forEach((content, i) => {
          if (i === index && document.documentElement.clientWidth > 670) {
            counter.style.minHeight = `${content.clientHeight}px`;
          }
        });
      });
    }
  }
  let all_azkar = [
    azkar_sabah_data,
    azkar_masaa_data,
    azkar_after_alsalah_data,
    azkar_sleeping_data,
    tasabeh_data,
  ];
  azkar_names.forEach((azkar_name, index) => {
    azkar_title_names.forEach((azkar_title_name, i) => {
      if (index === i) {
        all_azkar.forEach((azkar_data, j) => {
          if (j === i) {
            create_zekr_page(azkar_name, azkar_title_name, azkar_data);
          }
        });
      }
    });
  });
}
/////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  // Function to activate the section or home element
  function activatingSection(activeSection) {
    // Hide all sections and the home element
    let siteSections = document.querySelectorAll(".landing-area .section");
    let homeElement = document.querySelector(".home");
    siteSections.forEach((section) => {
      section.setAttribute("data-active", "none");
      section.style.display = "none";
    });
    homeElement.setAttribute("data-active", "none");
    homeElement.style.display = "none";

    // Show the active section
    let activeElement = document.getElementById(activeSection);
    if (activeElement) {
      activeElement.setAttribute("data-active", "active");
      activeElement.style.display = "block";
      activeElement.style.opacity = 1;
    }
  }

  // Initial hiding of sections (home is visible by default)
  let noneActiveSections = document.querySelectorAll(".landing-area .section");
  noneActiveSections.forEach((el) => {
    el.setAttribute("data-active", "none");
    el.style.display = "none";
  });

  // Event listeners for links
  let imageLinks = document.querySelectorAll(".home-azkar-links ul a");
  imageLinks.forEach((a) => {
    a.addEventListener("click", (clickedlink) => {
      clickedlink.preventDefault(); // Prevent default anchor click behavior
      let sectionId = clickedlink.currentTarget.getAttribute("href").slice(1);
      activatingSection(sectionId);
      document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" }); // Smooth scroll
    });
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function get_data_count() {
  let count_downs = document.querySelectorAll(".count-down");
  counter_data = [];
  window.localStorage.removeItem("azkarCount");
  window.localStorage.removeItem("azkarSabahCount");
  window.localStorage.removeItem("azkarMasaaCount");
  window.localStorage.removeItem("count");
  window.localStorage.setItem("azkarCount", `${azkarCount}`);
  window.localStorage.setItem("azkarSabahCount", `${azkarSabahCount}`);
  window.localStorage.setItem("azkarMasaaCount", `${azkarMasaaCount}`);

  count_downs.forEach((span) => {
    counter_data.push({ count: `${span.innerHTML}` });
    window.localStorage.setItem("count", `${JSON.stringify(counter_data)}`);
  });
}
//
function resetDataLastDay() {
  let options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    numerals: "arabic",
  }
  // let date = `${new Intl.DateTimeFormat("ar-EG", options).format(date)}`
  if (window.localStorage.getItem("day")) {
      if (JSON.parse(window.localStorage.getItem("day")) !=`${new Intl.DateTimeFormat("ar-EG", options).format(date)}`) {
        window.localStorage.clear();
        // window.localStorage.setItem("day" , JSON.stringify(new Intl.DateTimeFormat("ar-EG", options).format(date)))
      }
  }
  else {
    window.localStorage.setItem("day" , JSON.stringify(new Intl.DateTimeFormat("ar-EG", options).format(date)))
  }
}
//
// check if there is data in localStorge
if (window.localStorage.getItem("azkarCount")) {
  azkarCount = parseInt(window.localStorage.getItem("azkarCount"));
}
if (window.localStorage.getItem("azkarSabahCount")) {
  azkarSabahCount = parseInt(window.localStorage.getItem("azkarSabahCount"));
}
if (window.localStorage.getItem("azkarMasaaCount")) {
  azkarMasaaCount = parseInt(window.localStorage.getItem("azkarMasaaCount"));
}
function setDataCount() {
  // check if there is data in localStorge
  if (window.localStorage.getItem("count")) {
    let counter_data = JSON.parse(window.localStorage.getItem("count"));
    let count_downs = document.querySelectorAll(".count-down");
    count_downs.forEach((span, i) => {
      span.innerHTML = `${counter_data[i].count}`;
      if (counter_data[i].count == 0) {
        span.parentElement.style.backgroundColor = "#87ceeb";
      }
    });
  }
}
async function reset_finished_azkar_counter() {
  await createContent();
  // Get all of the countdown elements
  const counters = document.querySelectorAll(".counter");
  const resets = document.querySelectorAll(".zekr-reset");
  const azkar_alsabah_count_down = document.querySelectorAll(
    "#azkar_alsabah_count"
  );
  const azkar_almasaa_count_down = document.querySelectorAll(
    "#azkar_almasaa_count"
  );
  const azkar_after_alsalah_count_down = document.querySelectorAll(
    "#azkar_after_alsalah_count"
  );
  const azkar_sleeping_count_down = document.querySelectorAll(
    "#azkar_sleeping_count"
  );
  const tasabeh_count_down = document.querySelectorAll("#tasabeh_count");

  // Create an array of all of the countdown elements
  const countDowns = [
    azkar_alsabah_count_down,
    azkar_almasaa_count_down,
    azkar_after_alsalah_count_down,
    azkar_sleeping_count_down,
    tasabeh_count_down,
  ];

  // Wait for the countDowns.forEach loop to finish before executing the if statement
  countDowns.forEach((count_downs) => {
    // Filter the countDowns array to only include the elements that have an innerHTML property that is not equal to "0"
    const filteredCount = Array.from(count_downs).filter((count_down) => {
      if (count_down.innerHTML != "0") {
        return count_down.innerHTML;
      }
    });
    // If the filteredCount array is empty, then all of the countdowns have finished
    if (filteredCount.length === 0) {
      // Reset all of the countdown elements
      count_downs.forEach((count_down) => {
        count_down.textContent = count_down.previousElementSibling.textContent;
      });

      // Get the new data count
      get_data_count();
    }
  });
}
// Function to increase azkar count
function increaseAzkar(type) {
  azkarCount++;
  if (type === "sabah") {
    azkarSabahCount++;
  } else if (type === "masaa") {
    azkarMasaaCount++;
  }
  updateStatistics();
}
// // Example usage (assuming buttons or links to trigger these functions exist in your HTML)
function gettingClickedAzkar(clickedElement) {
  if (clickedElement.id === "azkar_alsabah_count") {
    increaseAzkar("sabah");
  } else if (clickedElement.id === "azkar_almasaa_count") {
    increaseAzkar("masaa");
  } else {
    increaseAzkar("");
  }
}
async function plus_minus() {
  await reset_finished_azkar_counter();
  updateStatistics();
  setDataCount();
  let counters = document.querySelectorAll(".counter");
  let resets = document.querySelectorAll(".zekr-reset");
  let count_downs = document.querySelectorAll(".count-down");
  resets.forEach((reset) => {
    reset.addEventListener("click", () => {
      reset.previousElementSibling.textContent =
        reset.previousElementSibling.previousElementSibling.textContent;
      get_data_count();
      reset.parentElement.style.backgroundColor = "#34affc";
    });
  });
  counters.forEach((counter, index) => {
    count_downs.forEach((count_down, i) => {
      count_down.addEventListener("click", () => {
        if (i === index) {
          if (count_down.innerHTML > 0) {
            count_down.innerHTML -= 1;
            gettingClickedAzkar(count_down);
            get_data_count();
            if (count_down.innerHTML == 0) {
              counter.style.backgroundColor = "var(--minor-color)";
              counter.style.animationName = "color-animation-counter";
              setTimeout(() => {
                counter.style.animationName = "none";
              }, 500);
            } else {
              counter.style.backgroundColor = "#00bfffda";
              counter.style.animationName = "color-animation-counter";
              setTimeout(() => {
                counter.style.animationName = "none";
              }, 1000);
            }
          }
        }
      });
    });
  });
}
plus_minus();
let date = new Date();
let footer = document.createElement("footer");
let span = document.createElement("span");
let footer_text = document.createTextNode(
  `Made By Mohamed © ${date.getFullYear()}`
);
span.appendChild(footer_text);
footer.appendChild(span);
let contact_links = document.createElement("div");
contact_links.className = "contact-links";
contact_links.innerHTML = `
<i class="fa-brands fa-facebook"></i> 
<i class="fa-brands fa-twitter"></i>
<i class="fa-brands fa-instagram"></i>
<i class="fa-brands fa-github "></i>
          `;
footer.appendChild(contact_links);
let icons = document.querySelectorAll(".contact-links i");
icons.forEach((icon) => {
  icon.addEventListener("mouseenter", () => {
    icon.classList.add("fa-bounce");
  });
  icon.addEventListener("mouseleave", () => {
    icon.classList.remove("fa-bounce");
  });
});
// add arrow event
let arrows = document.querySelectorAll(".arrow");
arrows.forEach((arrow) => {
  arrow.addEventListener("mouseenter", () => {
    arrow.classList.add("fa-bounce");
  });
  arrow.addEventListener("mouseleave", () => {
    arrow.classList.remove("fa-bounce");
  });
});
// body.appendChild(footer);
function addNightModeAttribute(element) {
  element.classList.add("light-mode");
}
let switchButton = document.querySelector(".switch-button");
switchButton.innerHTML = `<i class="fa-solid fa-moon"></i>`;
switchButton.innerHTML = `<i class="fa-regular fa-sun"></i>`;
////////////////////////////////////////////////////////////////////////////////
function light_or_night_mode() {
  try {
    const body = document.querySelector("body");
    const contentBoxes = document.querySelectorAll(".content-box");
    const homeContent = document.querySelector(".home-content");
    const contentAreas = document.querySelectorAll(".content-area");
    const rondomZekr = document.querySelector(".rondom-zekr");
    const date = document.querySelector(".date");
    const home = document.querySelector(".home");
    const titles = document.querySelectorAll("span");
    const iconBack = document.querySelector(".icon-back");
    const azkar_sabah_statistic = document.querySelector(
      ".azkar-sabah-statistic"
    );
    const azkar_masaa_statistic = document.querySelector(
      ".azkar-masaa-statistic"
    );
    const azkarSabahLink = document.querySelector(".azkar-sabah-link");
    const azkarMasaaLink = document.querySelector(".azkar-masaa-link");
    const azkarAfterAlsalahLink = document.querySelector(
      ".azkar-after-alsalah-link"
    );
    const azkarSleepingLink = document.querySelector(".azkar-sleeping-link");
    const azkarTasabehLink = document.querySelector(".azkar-tasabeh-link");
    let nightModeElement = [
      body,
      home,
      rondomZekr,
      date,
      homeContent,
      azkar_masaa_statistic,
      azkar_sabah_statistic,
      azkarSabahLink,
      azkarMasaaLink,
      azkarAfterAlsalahLink,
      azkarSleepingLink,
      azkarTasabehLink,
      iconBack,
    ];
    if (switchButton.classList[1] === "light-mode-icon") {
      switchButton.innerHTML = `<i class="fa-solid fa-moon"></i>`;
      contentBoxes.forEach((contentBox) => {
        addNightModeAttribute(contentBox);
      });
      titles.forEach((title) => {
        addNightModeAttribute(title);
      });
      nightModeElement.forEach((element) => {
        addNightModeAttribute(element);
      });
      contentAreas.forEach((contentArea) => {
        addNightModeAttribute(contentArea);
      });
      switchButton.classList.replace("light-mode-icon", "night-mode-icon");
    } else if (switchButton.classList[1] === "night-mode-icon") {
      contentBoxes.forEach((contentBox) => {
        contentBox.classList.remove("light-mode");
        titles.forEach((title) => {
          title.classList.remove("light-mode");
        });
      });
      nightModeElement.forEach((element) => {
        element.classList.remove("light-mode");
      });
      contentAreas.forEach((contentArea) => {
        contentArea.classList.remove("light-mode");
      });
      switchButton.innerHTML = `<i class="fa-regular fa-sun"></i>`;
      switchButton.classList.replace("night-mode-icon", "light-mode-icon");
    }
  } catch (error) {
    console.log(error);
  }
}
switchButton.addEventListener("click", () => {
  light_or_night_mode();
});
/////////////////////////////////////////////////////////
window.addEventListener("resize", () => {
  const contentTexts = document.querySelectorAll(".content-text");
  const counters = document.querySelectorAll(".counter");

  if (window.innerWidth > 670) {
    counters.forEach((counter, index) => {
      contentTexts.forEach((content, i) => {
        if (i === index) {
          counter.style.minHeight = `${content.clientHeight}px`;
        }
      });
    });
  } else {
    counters.forEach((counter) => {
      counter.style.minHeight = "0";
    });
  }
});
reset_finished_azkar_counter();

// Function to update statistics
function updateStatistics() {
  const totalAzkarElement = document.querySelector(".num-of-azkar");
  const sabahCountElement = document.querySelector(
    ".azkar-sabah-statistic .count"
  );
  const masaaCountElement = document.querySelector(
    ".azkar-masaa-statistic .count"
  );
  totalAzkarElement.textContent = azkarCount;
  sabahCountElement.textContent = `%${(
    (azkarSabahCount / azkar_alsabah_num) *
    100
  ).toFixed(1)}`;
  masaaCountElement.textContent = `%${(
    (azkarMasaaCount / azkar_almasaa_num) *
    100
  ).toFixed(1)}`;
}
function calcNumberOfAzkarSabahAndMasaa() {
  azkar_alsabah_num = 0;
  azkar_almasaa_num = 0;
  azkar_sabah_data.forEach((el) => {
    azkar_alsabah_num += parseInt(el.count);
  });
  azkar_masaa_data.forEach((el) => {
    azkar_almasaa_num += parseInt(el.count);
  });
}
resetDataLastDay();
