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
    }
    
    this.currState.start();
  }
}

class State {
  constructor(init) {
    for (let prop in init) this[prop] = init[prop];
  }

  update() {
    this.arcs.forEach(arc => arc.update());
  }

  reset() {
    this.arcs.forEach(arc => arc.reset());
  }
  
  start() {
    this.customStart();
    this.element.style.display = "inline";
    this.element.animate("enable");
  }
  
  stop() {
    this.customStop();
    this.element.style.display = "none";
    this.reset();
  }
}
