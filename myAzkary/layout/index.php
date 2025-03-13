<?php
  include "init.php"
?>
  <body>
    <div class="home">
      <div class="container">
        <div class="date">
          <span class="public-date"></span>
          <span class="higry-date"></span>
        </div>
        <div class="switch-button light-mode-icon">
          <i class="fa-regular fa-sun"></i>
        </div>
      </div>

      <div class="home-content">
        <span>الاحصائيات</span>
        <div class="statistics-area">
          <div class="statistics">
            <div class="sum-of-azkar">
              <div class="text-container">
                <span>عدد أذكارك اليوم</span>
                <span class="info">مجموع الاذكار التي قلتها اليوم</span>
              </div>
              <div class="num-of-azkar">0</div>
            </div>
          </div>
          <div class="achieved-azkar">
            <span>ذكرك اليوم</span>
            <div class="azkar-sabah-statistic">
              <span class="azkar-sabah-text">أذكار الصباح</span
              ><span class="count">%0</span>
            </div>
            <div class="azkar-masaa-statistic">
              <span class="azkar-masaa-text">أذكار المساء</span
              ><span class="count">%0</span>
            </div>
          </div>
        </div>
        <div class="azkar-links-area">
          <div>
            <span>الأذكار</span>
            <div class="azkar-links">
              <div class="home-azkar-links">
                <ul>
                  <a href="#azkar_alsabah">
                    <div class="azkar-sabah-link">
                      <img src="images/sun.png" alt="photo" /><span>ذكر</span
                      ><span class="span">أذكار الصباح</span>
                    </div></a
                  >
                  <a href="#azkar_almasaa"
                    ><div class="azkar-masaa-link">
                      <img src="images/sleep.png" alt="photo" /><span>ذكر</span
                      ><span class="span">أذكار المساء</span>
                    </div></a
                  >
                  <a href="#azkar_after_alsalah"
                    ><div class="azkar-after-alsalah-link">
                      <img src="images/pray.png" alt="photo" /><span>ذكر</span
                      ><span class="span">أذكار بعد الصلاه</span>
                    </div></a
                  >
                  <a href="#azkar_sleeping"
                    ><div class="azkar-sleeping-link">
                      <img src="images/bed.png" alt="photo" /><span>ذكر</span
                      ><span class="span">أذكار النوم</span>
                    </div></a
                  >
                  <a href="#tasabeh"
                    ><div class="azkar-tasabeh-link">
                      <img src="images/hands_9971687.png" alt="photo" /><span>ذكر</span
                      ><span class="span">تسابيح</span>
                    </div></a
                  >
                </ul>
              </div>
            </div>
          </div>
          <div class="rondom-zekr-container">
            <span>ذكر عشوائي</span>
            <div class="rondom-zekr">
              <span></span>
              <hr />
              <span class="zekr-info"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="landing-area"></div>
    

