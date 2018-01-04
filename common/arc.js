import document from "document";
import { ease } from "./utils";

export { Arc as default };

class Arc {
  constructor(id) {
    this.element = document.getElementById(id);
    this.angle = this.element.sweepAngle;
    this.frame = 0;
    this.from = 0;
    this.to = 0;
    this.dur = 0;
    this.ease = "default";
  }

  get change() { return this.to - this.from; }

  update() {
    if (this.frame <= this.dur) {
      this.angle = ease(this.frame,
                        this.from,
                        this.change,
                        this.dur,
                        this.ease);
      this.element.sweepAngle = this.angle;
      this.frame++;
    }
  }

  reset() {
    this.frame = 0;
    this.angle = 0;
    this.from = 0;
    this.to = 0;
    this.element.sweepAngle = this.angle;
  }

  tween(from, to, dur, ease="default") {
    this.frame = 0;
    this.dur = dur;
    this.ease = ease;
    this.from = from;
    this.to = to;
  }
}
