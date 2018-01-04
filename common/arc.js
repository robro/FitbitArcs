import document from "document";
import { ease } from "./utils";

export { Arc as default };

class Arc {
  constructor(id) {
    this.element = document.getElementById(id);
    this.frame = 0;
    this.from = 0;
    this.to = 0;
    this.dur = 0;
    this.ease = "default";
  }

  get angle() {
    return this.element.sweepAngle;
  }

  get change() {
    return this.to - this.from;
  }

  set angle(num) {
    this.element.sweepAngle = num;
  }

  update() {
    if (this.frame <= this.dur) {
      this.angle = ease(this.frame,
                        this.from,
                        this.change,
                        this.dur,
                        this.ease);
      this.frame++;
    }
  }

  reset() {
    this.frame = 0;
    this.angle = 0;
    this.from = 0;
    this.to = 0;
  }

  tween(from, to, dur, ease="default") {
    this.frame = 0;
    this.from = from;
    this.to = to;
    this.dur = dur;
    this.ease = ease;
  }
}
