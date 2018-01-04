import document from "document";

export { StateManager, State };

class StateManager {
  constructor() {
    this.states = [];
    this.currIndex = 0;
  }

  get currState() {
    return this.states[this.currIndex];
  }

  addState(state) {
    this.states.push(state);
  }

  getStateById(id) {
    for (let i = 0, length = this.states.length; i < length; i++) {
      if (this.states[i].id === id) return this.states[i];
    }
  }

  switchState(str) {
    this.currState.stop();

    switch (str) {
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
  constructor(obj) {
    this.id = obj.id;
    this.element = document.getElementById(obj.id);
    this.text = document.getElementById(obj.text);
    if (obj.subText) this.subText = document.getElementById(obj.subText);
    this.arc = obj.arc;
    this.customStart = obj.start;
    this.customStop = obj.stop;
    this.event = obj.event;
  }

  set display(str) {
    this.element.style.display = str;
  }

  update() {
    if (Array.isArray(this.arc)) {
      for (let i = 0, length = this.arc.length; i < length; i++) {
        this.arc[i].update();
      }
    } else {
      this.arc.update();
    }
  }

  reset() {
    if (Array.isArray(this.arc)) {
      for (let i = 0, length = this.arc.length; i < length; i++) {
        this.arc[i].reset();
      }
    } else {
      this.arc.reset();
    }
  }
  
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
  
  animate() {
    this.element.animate("enable");
  }
}
