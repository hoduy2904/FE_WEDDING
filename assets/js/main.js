document.addEventListener("DOMContentLoaded", function (e) {
  if ($("#clock").length) {
    function timeElapse(date) {
      var current = Date();

      var seconds = (Date.parse(current) - Date.parse(date)) / 1000;

      var days = Math.floor(seconds / (3600 * 24));

      if (days < 10) {
        days = "0" + days;
      }

      seconds = seconds % (3600 * 24);

      var hours = Math.floor(seconds / 3600);

      if (hours < 10) {
        hours = "0" + hours;
      }

      seconds = seconds % 3600;

      var minutes = Math.floor(seconds / 60);

      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      seconds = seconds % 60;

      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      var html =
        '<div class="box"><div><div class="time">' +
        days +
        "</div> <span>" +
        $("#clock").data("text-day") +
        '</span> </div></div><div class="box"><div><div class="time">' +
        hours +
        "</div> <span>" +
        $("#clock").data("text-hour") +
        '</span> </div></div><div class="box"><div><div class="time">' +
        minutes +
        "</div> <span>" +
        $("#clock").data("text-minute") +
        '</span> </div></div><div class="box"><div><div class="time">' +
        seconds +
        "</div> <span>" +
        $("#clock").data("text-second") +
        "</span> </div></div>";

      $("#clock").html(html);
    }

    var time = $("#clock").data("date");

    $("#clock").countdown(time.replace(/-/g, "/"), function (event) {
      if (event.type == "stoped") {
        var together = new Date($("#clock").data("date"));

        together.setHours(0);

        together.setMinutes(0);

        together.setSeconds(0);

        together.setMilliseconds(0);

        setInterval(function () {
          timeElapse(together);
        }, 1000);
      } else {
        var $this = $(this).html(
          event.strftime(
            "" +
              '<div class="box"><div><div class="time">%D</div> <span>' +
              $("#clock").data("text-day") +
              "</span> </div></div>" +
              '<div class="box"><div><div class="time">%H</div> <span>' +
              $("#clock").data("text-hour") +
              "</span> </div></div>" +
              '<div class="box"><div><div class="time">%M</div> <span>' +
              $("#clock").data("text-minute") +
              "</span> </div></div>" +
              '<div class="box"><div><div class="time">%S</div> <span>' +
              $("#clock").data("text-second") +
              "</span> </div></div>"
          )
        );
      }
    });
  }

  $(".important-people li").on("click", function (e) {
    $(".important-people li").removeClass("active");
    $(this).addClass("active");
    console.log(this);
  });

  $(window).scroll(function () {
    var windscroll = $(window).scrollTop();
    if (windscroll > 80) {
      $("nav.navbar").addClass("scroll navbar-light");
      $("nav.navbar").removeClass("navbar-dark");
    } else {
      $("nav.navbar").removeClass("scroll navbar-light");
      $("nav.navbar").addClass("navbar-dark");
    }
    $(".navbar-nav .nav-item .nav-link").each(function (i) {
      let idElement = $(this).attr("href");
      if ($(idElement).length) {
        var posTop = $(idElement).position().top,
          h = $($(this).attr("href")).height();
        if (posTop <= windscroll && posTop + h > windscroll) {
          $(".navbar-nav .nav-item").removeClass("active");
          $(this).addClass("active");
        } else {
          $(this).removeClass("active");
        }
      }
    });
  });

  let joined = localStorage.getItem("isShowJoin");
  if (!joined) {
    setTimeout(function (e) {
      $("#modelId").modal("show");
    }, 2000);

    $(".btn-modal-join").on("click", function (e) {
      let numberJoin = $("#numberJoin").val();
      let customerName = $("#customerName").val();
      if (!customerName || customerName.trim() === "") {
        $("#customerName").addClass("required");
      } else {
        $("#customerName").removeClass("required");
        let url = `https://docs.google.com/forms/d/e/1FAIpQLScFAXKG8Oc7wQp-SlwRm8zyZMxtBH89ggOoNAvktZ_I1Dq3dw/formResponse?&submit=Submit?usp=pp_url&entry.320452822=${customerName}&entry.1716490126=${numberJoin}`;
        numberJoin;
        $.ajax({
          url: url,
          dataType: "jsonp",
          success: function (data) {},
          complete: function (data) {
            localStorage.setItem("isShowJoin", true);
            $("#modelId").modal("hide");
          },
        });
      }
    });
  }

  setTimeout(() => {
    $(".audio-play").click();
  }, 3000);

  let songs = ["yesIDo.mp3", "bnkddd.mp3"];
  function playSong(index) {
    var audio = document.getElementById("audioPay");
    audio.src = "/assets/audio/" + songs[index];
    audio.play().then(() => {});
  }
  let currentSong = 0;

  $(".audio-play").on("click", function () {
    var audio = document.getElementById("audioPay");
    audio.onended = function (e) {
      currentSong++;
      if (currentSong == songs.length) {
        currentSong = 0;
        playSong(currentSong);
      } else {
        playSong(currentSong);
      }
    };
    if (audio.paused) {
      let playAudio = audio.play();
      if (playAudio !== undefined) {
        playAudio.then(() => {
          $(this)
            .html(`<span><svg xmlns="http://www.w3.org/2000/svg" width="25" height="27" fill="#fff" class="bi bi-volume-up-fill" viewBox="0 0 16 16">
      <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"></path>
      <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"></path>
      <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"></path>
    </svg></span>`);
        });
      }
    } else {
      $(this).html(`<span
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="27"
        fill="#fff"
        class="bi bi-volume-mute-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"
        ></path></svg
    ></span>`);
      audio.pause();
    }
  });
});
