import document from "document";
import { ease } from "./utils";

export { Arc as default };

class Arc {
  frame = 0;
  from = 0;
  to = 0;
  dur = 0;
  ease = "default";

  constructor(id) {
    this.element = document.getElementById(id);
  }

  get angle() {
    return this.element.sweepAngle;
  }

  set angle(newAngle) {
    this.element.sweepAngle = newAngle;
  }

  get change() {
    return this.to - this.from;
  }

  update() {
    if (this.frame > this.dur) return;

    this.angle = ease(this.frame, this.from, this.change, this.dur, this.ease);
    this.frame++;
  }

  reset() {
    this.frame = 0;
    this.angle = 0;
    this.from = 0;
    this.to = 0;
  }

  tween(from, to, dur, ease="default") {
    if (from === to) return;

    this.frame = 0;
    this.from = from;
    this.to = to;
    this.dur = dur;
    this.ease = ease;
  }
}
