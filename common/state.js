export { StateManager, State };

class StateManager {
    states = [];
    index = 0;

  get currState() {
    return this.states[this.index];
  }

  addState(state) {
    this.states.push(state);
  }

  switchState(str) {
    this.currState.stop();

    switch (str) {
      case "next":
        this.index++;
        if (this.index === this.states.length) this.index = 0;
        break;

      case "default":
        this.index = 0;
        break;
    }
    
    this.currState.start();
  }
}

class State {
  constructor(init) {
    for (let prop in init) this[prop] = init[prop];
  }

  update() {
    for (let i = 0, length = this.arcs.length; i < length; i++) {
      this.arcs[i].update();
    }
  }

  reset() {
    for (let i = 0, length = this.arcs.length; i < length; i++) {
      this.arcs[i].reset();
    }
  }
  
  start() {
    this.customStart();
    this.element.style.display = "inline";
    this.animate();
  }
  
  stop() {
    this.customStop();
    this.element.style.display = "none";
    this.reset();
  }
  
  animate() {
    this.element.animate("enable");
  }
}
