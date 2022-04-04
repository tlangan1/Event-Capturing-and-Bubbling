"use strict";

addEventListener("load", onLoad);

// -----------------------------------------------
// helper functions for the executed code above

function onLoad() {
  document
    .querySelector("html")
    .addEventListener("click", clearEvents, { capture: true });

  document.querySelectorAll("[id]").forEach(function (element) {
    element.addEventListener("click", createEventListener("capturing"), {
      capture: true,
    });
    element.addEventListener("click", createEventListener("bubbling"));
  });

  // -----------------------------------------------
  // helper functions for the executed code above

  // TODO for some reason the when I click the paragraph the event I see here has and empty id and a phase value of 3.
  // I was expecting "p" and 1
  function clearEvents(event) {
    if (event.target.id == "p" && event.eventPhase == 1)
      document.querySelector(".events").innerHTML = "";
  }

  function createEventListener(targeting_phase) {
    return eventListener;

    // -----------------------------------------------
    // helper functions for the executed code above

    function eventListener(event) {
      //   document.querySelector(".events").innerHTML +=
      //     "Element with id " +
      //     this.id +
      //     (event.eventPhase === 1
      //       ? " Capturing"
      //       : event.eventPhase === 2
      //       ? " Targeted by (in the " + targeting_phase + " phase)"
      //       : " Bubbling") +
      //     " this event.<br />";
      document.querySelector(".events").innerHTML +=
        "Element with id " +
        this.id +
        " received this event in the " +
        (event.eventPhase === 1
          ? " Capturing"
          : event.eventPhase === 2
          ? " Targeting (on the " + targeting_phase + " side)"
          : " Bubbling") +
        " phase.<br />";

      switch (event.eventPhase) {
        case 1:
          if (
            document.querySelector(".stopCapturingPropogationElement").value ==
            this.id
          ) {
            StopAndLogPropagation.bind(this)(event);
          }
          break;
        case 2:
          switch (targeting_phase) {
            case "capturing":
              if (
                document.querySelector(".stopCapturingPropogationElement")
                  .value == this.id
              ) {
                StopAndLogPropagation.bind(this)(event);
              }
              break;
            case "bubbling":
              if (
                document.querySelector(".stopBubblingPropogationElement")
                  .value == this.id
              ) {
                StopAndLogPropagation.bind(this)(event);
              }
              break;
          }
          break;
        case 3:
          if (
            document.querySelector(".stopBubblingPropogationElement").value ==
              this.id &&
            targeting_phase == "bubbling"
          ) {
            StopAndLogPropagation.bind(this)(event);
          }
          break;
      }

      function StopAndLogPropagation(e) {
        e.stopPropagation();
        document.querySelector(".events").innerHTML +=
          "<br /><span>Element with id " +
          this.id +
          " stopped propagation!</span>";
      }
    }
  }
}
