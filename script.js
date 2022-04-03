"use strict";

addEventListener("load", onLoad);

// -----------------------------------------------
// helper functions for the executed code above

function onLoad() {
  //   This is just a test of capturing
  document.querySelector("main").addEventListener(
    "click",
    function (event) {
      alert("main captured this event");
    },
    { capture: true }
  );

  document.querySelector("div").addEventListener(
    "click",
    function (event) {
      alert("div captured this event");
    },
    { capture: true }
  );

  document.querySelector("#inner-paragraph").addEventListener(
    "click",
    function (event) {
      alert("p captured this event");
    },
    { capture: true }
  );

  document.querySelector("main").addEventListener("click", function (event) {
    alert("this event was bubbled to main");
  });

  document.querySelector("div").addEventListener("click", function (event) {
    alert("this event was bubbled to div");
  });

  document
    .querySelector("#inner-paragraph")
    .addEventListener("click", function (event) {
      alert("this event was bubbled to p");
    });
}
