let azkar_sabah_data = [];
let azkar_masaa_data = [];
let tasabeh_data = [] ; 
let azkar_sleeping_data = [];
let azkar_after_alsalah_data = [];
let data_count =[];
let azkar_title_names = ["أذكار الصباح","أذكار المساء","أذكار بعد الصلاه","أذكار النوم","تسابيح"]
let azkar_names = ["azkar_alsabah","azkar_almasaa","azkar_after_alsalah","azkar_sleeping","tasabeh"] 
async function fetchData() {
  try {
    let azkar_sabah = await fetch("data/azkar_sabah.json");
    let azkar_masaa = await fetch("data/azkar_masaa.json");
    let azkar_after_alsalah = await fetch("data/azkar_after_alsalah.json");
    let azkar_sleeping = await fetch("data/azkar_sleeping.json");
    let tasabeh = await fetch("data/tasabeh.json");
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
  let statistics = document.querySelector(".home")
  let section = document.querySelector(".azkar-area");
  // get rondom zekr span
  let rondom_zekr = document.querySelector(".rondom-zekr span")
  let zekr_info = document.querySelector("span.zekr-info")
  // get rondom zekr

  if (Math.floor(Math.random()*2)===0) {
    rondom_zekr.innerHTML= azkar_sabah_data[Math.floor(Math.random()*(azkar_sabah_data.length))].mainText
    zekr_info.innerHTML = azkar_sabah_data[Math.floor(Math.random()*(azkar_sabah_data.length))].infoText
  }
  else {
    rondom_zekr.innerHTML= azkar_masaa_data[Math.floor(Math.random()*(azkar_masaa_data.length))].mainText
    zekr_info.innerHTML = azkar_masaa_data[Math.floor(Math.random()*(azkar_masaa_data.length))].infoText
  }
  // all_azkar.forEach((azkar,index)=>{
    function create_zekr_page(azkar_name,azkar_title_name,azkar_data) {
      let azkar = document.createElement("div")
      azkar.setAttribute("id",`${azkar_name}`)
      let landing_area = document.querySelector(".landing-area");
      landing_area.appendChild(azkar)
      let container = document.createElement("div");
      container.className = "container" ;
      let title_container = document.createElement("div");
      title_container.className = "title-container" ;
      // creating title
      let title = document.createElement("span");
      title.className = "title";
      let title_text = document.createTextNode(`${azkar_title_name}`)
      title.appendChild(title_text)
      let title_info = document.createElement("span");
      title_info.className = "title_info";
      let title_info_text = document.createTextNode("ذكر")
      title_info.appendChild(title_info_text)
      landing_area.appendChild(title_container);
      title_container.appendChild(title);
      title_container.appendChild(title_info);
      azkar.appendChild(container)
      container.appendChild(title_container)
      let light_mode_icon = document.createElement("div")
      light_mode_icon.className="light_mode_icon"
      light_mode_icon.innerHTML = `<i class="fa-regular fa-sun" style="color: #e6p200;"></i>`
      container.appendChild(light_mode_icon)
      let content_area = document.createElement("div");
      content_area.className = "content-area" ;
      azkar.appendChild(content_area)
      //   // add title
      for (let i = 0; i < azkar_data.length; i++) {
      //     // add div in section
      let content_box = document.createElement("div");
      content_box.setAttribute("class","content-box");
      content_area.appendChild(content_box);
      // add content in div
      let content = document.createElement("div");
      content.setAttribute("class","content");
      content_box.append(content)
      let countercontainer = document.createElement("div");
      let counter = document.createElement("div");
      let counterSpan = document.createElement("span");
      counterSpan.setAttribute("class", "counterSpan");
      countercontainer.setAttribute("class", "countercontainer");
      counter.setAttribute("class", `counter`);
      // check if there is data in localStorge 
      counterSpan.innerHTML = `${azkar_data[i].count}`;     
      counter.appendChild(counterSpan);
      countercontainer.appendChild(counter);
      content.appendChild(countercontainer);
      let counters = document.querySelectorAll(".counter")
      counters.forEach((counter)=>{
        counter.addEventListener("click",()=>{
          counter.style.animation = "color-animation-counter 1s linear  1 alternate both;"
        })
      })
      let content_text = document.createElement("div");
      content_text.setAttribute("class","content-text");
      content.append(content_text)
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
    }
  }
  let all_azkar = [azkar_sabah_data,azkar_masaa_data,azkar_after_alsalah_data,azkar_sleeping_data,tasabeh_data]
    azkar_names.forEach((azkar_name,index)=>{
      azkar_title_names.forEach((azkar_title_name,i)=>{
        if (index===i) {
          all_azkar.forEach((azkar_data,j)=>{
            if (j===i) {
              create_zekr_page(azkar_name,azkar_title_name,azkar_data) 
            }
          })
        }
      })
    })
    
  // })

}
async function plus_minus() {
  await createContent();
  let Count = document.querySelectorAll(".counter");
  let counterSpans = document.querySelectorAll(".counterSpan");
  Count.forEach((count, index) => {
    count.addEventListener("click", () => {
      counterSpans.forEach((counterSpan, i) => {
        if (i === index) {
          if (counterSpan.innerHTML>0) {
            counterSpan.innerHTML -=1;
            if (counterSpan.innerHTML==0) {
              count.style.backgroundColor = "var(--minor-color)"
              count.style.animationName = "color-animation-counter"
              setTimeout(()=>{
                count.style.animationName = "none"
              },500)
            }
            else {
              count.style.backgroundColor = "#00bfffda"
              count.style.animationName = "color-animation-counter"
             setTimeout(()=>{
               count.style.animationName = "none"
             },1000)
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
        let body = document.querySelector("body")
        let span = document.createElement("span");
        let footer_text = document.createTextNode(
          `Made By Mohamed © ${date.getFullYear()}`
          );
          span.appendChild(footer_text);
          footer.appendChild(span);
          let contact_links = document.createElement("div")
          contact_links.className = "contact-links";
          contact_links.innerHTML=`
          <i class="fa-brands fa-facebook"></i> 
          <i class="fa-brands fa-twitter"></i>
          <i class="fa-brands fa-instagram"></i>
          <i class="fa-brands fa-github "></i>
          `
          footer.appendChild(contact_links)
          let icons = document.querySelectorAll(".contact-links i")
          icons.forEach((icon)=>{
            icon.addEventListener("mouseenter",()=>{
              icon.classList.add("fa-bounce")
            })
            icon.addEventListener("mouseleave",()=>{
              icon.classList.remove("fa-bounce")
            })
          })
          // add arrow event
          let arrows = document.querySelectorAll(".arrow")
          arrows.forEach((arrow)=>{
            arrow.addEventListener("mouseenter",()=>{
              arrow.classList.add("fa-bounce")
            })
            arrow.addEventListener("mouseleave",()=>{
              arrow.classList.remove("fa-bounce")
            })
          })
            body.appendChild(footer)