import document from "document";

export { StateManager, State };

class StateManager {
  constructor() {
    this.states = [];
    this.currIndex = 0;
  }

  get currState() { return this.states[this.currIndex]; }

  addState(state) { this.states.push(state); }

  getStateById(id) {
    for (let i = 0, length = this.states.length; i < length; i++) {
      if (this.states[i].id === id) return this.states[i];
    }
  }

  switchState(state) {
    this.currState.stop();

    switch (state) {
      case "next":
        this.currIndex++;
        if (this.currIndex === this.states.length) this.currIndex = 0;
        break;

      case "default":
        this.currIndex = 0;
        break;
    }
    this.currState.start();
  }
}

class State {
  constructor(state) {
    this.id = state.id;
    this.element = document.getElementById(state.id);
    this.mainText = document.getElementById(state.mainText);
    if (state.subText) this.subText = document.getElementById(state.subText);
    if (state.arc) this.arc = state.arc;
    if (state.arcs) this.arcs = state.arcs;
    if (state.start) this.customStart = state.start;
    if (state.stop) this.customStop = state.stop;
    if (state.event) this.event = state.event;
  }

  set display(str) { this.element.style.display = str; }

  update() {
    if (this.arcs) {
      for (let i = 0, length = this.arcs.length; i < length; i++) {
        this.arcs[i].update();
      }
    } else {
      this.arc.update();
    }
  }

  reset() {
    if (this.arcs) {
      for (let i = 0, length = this.arcs.length; i < length; i++) {
        this.arcs[i].reset();
      }
    } else {
      this.arc.reset();
    }
  }

  animate() { this.element.animate("enable"); }

  start() {
    if (this.customStart) this.customStart();
    this.display = "inline";
    this.animate();
  }

  stop() {
    if (this.customStop) this.customStop();
    this.display = "none";
    this.reset();
  }
}
