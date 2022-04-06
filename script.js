"use strict";

addEventListener("load", onLoad);

// -----------------------------------------------
// helper functions for the executed code above

function onLoad() {
  // This event handler on the html object will make sure the events are cleared from the last execution
  document
    .querySelector("html")
    .addEventListener("click", clearEvents, { capture: true });

  // This code will put two event handlers on each of the elements in the event path, the main the div and the p.
  // One is for the capturing phase and the other is for the bubbling phase.
  document.querySelectorAll("[id]").forEach(function (element) {
    element.addEventListener("click", createEventListener("capturing"), {
      capture: true,
    });
    element.addEventListener("click", createEventListener("bubbling"));
  });

  // Thes event handler will clear either the Capturing drop-down or the Bubbling drop-down depending om which was selected last.
  // It makes no sense to stop propagation in the bubbling phase if it was already stopped in the capturing phase or vice versa.
  document
    .querySelector(".stopBubblingPropogationElement")
    .addEventListener("change", clearCapturingIfAppropriate);

  document
    .querySelector(".stopCapturingPropogationElement")
    .addEventListener("change", clearBubblingIfAppropriate);

  // -----------------------------------------------
  // helper functions for the executed code above
  function clearEvents(event) {
    if (event.target.id == "p" && event.eventPhase == 1)
      document.querySelector(".events").innerHTML = "";
  }

  function createEventListener(targeting_phase) {
    return eventListener;

    // -----------------------------------------------
    // helper functions for the executed code above

    function eventListener(event) {
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

  function clearCapturingIfAppropriate() {
    if (this.value) {
      document.querySelector(".stopCapturingPropogationElement").value = "";
    }
  }

  function clearBubblingIfAppropriate() {
    if (this.value) {
      document.querySelector(".stopBubblingPropogationElement").value = "";
    }
  }
}
