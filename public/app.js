"use strict";

// Cache DOM.
var dom = {
  header: el("header")[0],
  main: el("main")[0],
  sonzai: el("#sonzai"),
  shoku: el("#shoku"),
  yubi: el("#yubi"),
  oversonzai: el(".over-sonzai")[0],
  overshoku: el(".over-shoku")[0],
  overyubi: el(".over-yubi")[0]
};

// Initialize state.
var state = {
  route: "/",
  overlayOpen: true
};

function frame(e, isSonzai) {
  if (isSonzai) songzai();
  e.classList.add("show");
}

function songzai(turnOn) {
  if (!turnOn) dom.sonzai.firstChild.contentWindow.postMessage("stopMusic", "http://sean.mu:4260");else dom.sonzai.firstChild.contentWindow.postMessage("playMusic", "http://sean.mu:4260");
}

function route(name) {
  if (state.route === name) return;
  if (state.route === "sonzai") songzai();
  if (name === "sonzai") songzai(1);
  if (state.route !== "/") el(".activePage")[0].classList.remove("activePage");
  state.route = name;
  document.body.classList[name === "/" ? "remove" : "add"]("mainOpen");
  if (name !== "/") dom[name].classList.add("activePage");
}

function toggleMain() {
  document.body.classList.toggle("mainOpen");
}

["sonzai", "shoku", "yubi"].forEach(function (name) {
  dom[name].addEventListener("mouseenter", hovered(name));
  dom[name].addEventListener("mouseleave", hovered(name));
});

function hovered(name) {
  return function () {
    return dom["over" + name].classList.toggle("hovered");
  };
}

function el(name, parent) {
  parent = parent || document;
  if (name[0] === "#") return parent.getElementById(name.substr(1));
  if (name[0] === ".") return parent.getElementsByClassName(name.substr(1));
  return parent.getElementsByTagName(name);
}