import banners from "../data/banner.json" assert { "type": "json" };
import couples from "../data/couple-data.json" assert { "type": "json" };
import stories from "../data/our-stories.json" assert { "type": "json" };
import events from "../data/events.json" assert { "type": "json" };
import subPeoples from "../data/subpeople.json" assert { "type": "json" };
import albums from "../data/albums.json" assert { "type": "json" };

var photoGalleries = [];
if (albums) photoGalleries = albums;
document.addEventListener("DOMContentLoaded", function (e) {
  loadBanner();
  loadCouple();
  loadStories();
  loadEvents();
  loadSubPeople();
  loadAlbums();
  loadInitScript();
});

function loadBanner() {
  let dataString = "";
  for (let banner in banners) {
    dataString += `<div class="img-item">
      <img src="${banners[banner]}" alt="" />
    </div>`;
  }
  $(".banner-carousel-image").html(dataString);
}

function loadCouple() {
  let dataString = "";
  for (let i in couples) {
    dataString += `<div class="col-lg-6 col-sm-12">
        <div
          class="the-couple align-items-center align-items-md-start ${
            i == 0 ? "reverse flex-column-reverse" : "flex-column"
          } flex-md-row"
        >
          <div class="couple-img">
            <img src="${couples[i].image}" alt="" />
            <h4>${couples[i].position}</h4>
          </div>
          <div class="couple-about">
            <div class="about-top text-center text-md-${i == 0 ? "right" : "left"}">
              <h3>${couples[i].name}</h3>
              <div class="cp-social">
                <ul></ul>
              </div>
            </div>
            <div class="cp-detail">
              <div class="parent-infos text-center text-md-${i == 0 ? "right" : "left"}">
                <div class="parent-info">
                  <span class="parent-title">Con ông:</span>
                  <b class="parent-name">${couples[i].father}</b>
                </div>

                <div class="parent-info">
                  <span class="parent-title">Con bà:</span>
                  <b class="parent-name">${couples[i].mother}</b>
                </div>
              </div>
              <p class="text-center text-md-${i == 0 ? "right" : "left"}">
                ${couples[i].description}
              </p>
            </div>
          </div>
        </div>
      </div>`;
  }

  $(".row[data-postion=couple]").html(dataString);
}

function loadStories() {
  let dataString = "";
  for (let i in stories) {
    dataString += `<div class="row ${i % 2 == 0 ? "reverse" : ""} story-item mt-5">
        <div class="col-12 col-sm-6">
          <div class="image-story">
            <img src="${stories[i].image}" alt="" />
          </div>
        </div>
        <div class="col-12 col-sm-6">
          <div class="about-story">
            <div class="expand-story ${i % 2 == 0 ? "" : "story-rt"}">
              <div class="story-head">
                <h3>${stories[i].title}</h3>
                <h6>${stories[i].time}</h6>
              </div>
              <p>
               ${stories[i].description}
              </p>
            </div>
          </div>
        </div>
      </div>`;
  }

  $(".story-timeline").html(dataString);
}

function loadEvents() {
  let dataString = "";
  for (let i in events) {
    dataString += `
        <div class="event-stack">
        <h3 class="text-center">${events[i].time}</h3>
        <div class="row">
          <div class="col-12 col-sm-12 col-md-5">
            <div class="image-wrap">
              <img
                class="event-image"
                src="${events[i].image}"
                alt="${events[i].title}"
              />
            </div>
          </div>
          <div class="col-12 col-sm-12 col-md-7">
            <div class="event-title text-center-sm">
              <ul>
                <li class="text-center">
                <i class="fa-regular fa-calendar"></i> ${events[i].date}
                </li>
                <li class="text-center"><i class="fa-regular fa-clock"></i> ${events[i].time}</li>
              </ul>
            </div>
            <p class="text-center-sm">
            <i class="fa-solid fa-location-dot"></i>
              ${events[i].address}
            </p>
            <a href="${events[i].mapLink}" class="text-center-sm" target="_blank">
              Xem bản đồ
              <i class="fa fa-caret-right"></i>
            </a>
          </div>
        </div>
      </div>`;
  }

  $("[data-position=events]").html(dataString);
}

function loadSubPeople() {
  let dataString = "";
  for (let i in subPeoples) {
    dataString += `
        <div id="${subPeoples[i].id}" class="tab-pane fade ${
      i == 0 ? "active show" : ""
    }">
                <div class="row justify-content-center">
                  <div class="col-12">
                    <div class="our-team">
                      <div class="team-img">
                        <img
                          src="${subPeoples[i].image}"
                          alt=""
                        />
                        <div class="link">
                          <ul></ul>
                        </div>
                      </div>
                      <div class="team-content text-center">
                        <h4 class="title">${subPeoples[i].name}</h4>
                        <span class="post">${subPeoples[i].description}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;
  }

  $(".tab-content[data-position=impPeople]").html(dataString);
}

function loadAlbums() {
  let dataString = "";
  for (let i in albums) {
    dataString += `
        <div class="col-md-4 col-sm-6 col-xs-6 mix grid-item btn-see-more-gallery">
              <div class="item">
                <img
                  src="${albums[i].src}"
                  alt=""
                />
                <i class="fa fa-search"></i>
              </div>
            </div>`;
  }

  $(".masonry-gallery[data-position=albums]").html(dataString);
}
function loadInitScript() {
  $(".banner-carousel-image").owlCarousel({
    items: 1,
  });
  function masonryGridSetting() {
    if ($(".masonry-gallery").length) {
      var $grid = $(".masonry-gallery").masonry({
        itemSelector: ".grid-item",
        columnWidth: ".grid-item",
        percentPosition: true,
      });
    }
  }

  masonryGridSetting();

  // ALBUM GALLERIES
  $(document).on("click", ".btn-see-more-gallery", function (e) {
    e.preventDefault();
    console.log(photoGalleries);
    let indexNumber = $(this).data("index") || 0;
    $(this).lightGallery({
      thumbnail: true,
      dynamic: true,
      dynamicEl: photoGalleries,
      download: true,
      autoplay: true,
      preload: 2,
      appendSubHtmlTo: ".lg-item",
      index: parseInt(indexNumber),
    });
  });
}
