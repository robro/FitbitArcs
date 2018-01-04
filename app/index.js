import clock from "clock";
import document from "document";
import { display } from "display";
import { HeartRateSensor } from "heart-rate";
import { goals, today } from "user-activity";

import Arc from "../common/arc";
import { State, StateManager } from "../common/state";
import { addComma, getDay3, monoDigits, zeroPad } from "../common/utils";

clock.granularity = "seconds";

// Duration in frames
const TICK_DUR = 3;
const SECONDS_DUR = 10;
const MINUTES_DUR = 12;
const HOURS_DUR = 14;

const POLL_TIME = 2000; // ms

let smallArc = new Arc("smallArc");
let mediumArc = new Arc("mediumArc");
let largeArc = new Arc("largeArc");

let hrm = new HeartRateSensor();

let sm = new StateManager();

sm.addState(new State({
  id: "clockState",
  text: "clockText",
  subText: "dateText",
  arc: [smallArc, mediumArc, largeArc],
  start: function() {
    clock.granularity = "seconds";
    this.event();
  },
  stop: function() {
    clock.granularity = "off";
  },
  event: function() {
    let time = new Date();
    let seconds = time.getSeconds();
    let minutes = time.getMinutes();
    let hours = time.getHours() % 12;

    let hoursStr = monoDigits(hours ? hours : 12);
    let minutesStr = monoDigits(zeroPad(minutes));
    let dayStr = getDay3(time.getDay());
    let dateStr = time.getDate()

    this.text.text = `${hoursStr}:${minutesStr}`;
    this.subText.text = `${dayStr} ${dateStr}`;

    let secondsArc = this.arc[0];
    let minutesArc = this.arc[1];
    let hoursArc = this.arc[2];

    secondsArc.tween(secondsArc.angle,
                     seconds * 6,
                     ((seconds * 6 - secondsArc.angle) > 6) ? SECONDS_DUR : TICK_DUR);
    minutesArc.tween(minutesArc.angle,
                     (minutes + (seconds / 60)) * 6,
                     MINUTES_DUR);
    hoursArc.tween(hoursArc.angle,
                   (hours + ((minutes + (seconds / 60)) / 60)) * 30,
                   HOURS_DUR);

    if (seconds === 0) {
      secondsArc.tween(-360, 0, SECONDS_DUR + 4, "inOutQuart");
      if (minutes === 0) {
        minutesArc.tween(-360, 0, MINUTES_DUR + 4, "inOutQuart");
        if (hours === 0) {
          hoursArc.tween(-360, 0, HOURS_DUR + 4, "inOutQuart");
        }
      }
    }
  }
}));

sm.addState(new State({
  id: "stepsState",
  text: "stepCount",
  arc: smallArc,
  start: function() {
    this.event();
    this.poll = setInterval(() => {
      this.event();
    }, POLL_TIME);
  },
  stop: function() {
    clearInterval(this.poll);
  },
  event: function() {
    this.arc.tween(this.arc.angle,
                   (today.local.steps < goals.steps) ?
                   (today.local.steps / goals.steps * 360) : 360,
                   SECONDS_DUR);
    this.text.text = addComma(today.local.steps);

    if (this.text.text.length > 5) {
      this.text.style.fontSize = 64;
    } else {
      this.text.style.fontSize = 75;
    }
  }
}));

sm.addState(new State({
  id: "caloriesState",
  text: "calorieCount",
  arc: mediumArc,
  start: function() {
    this.event();
    this.poll = setInterval(() => {
      this.event();
    }, POLL_TIME);
  },
  stop: function() {
    clearInterval(this.poll);
  },
  event: function() {
    this.arc.tween(this.arc.angle,
                   (today.local.calories < goals.calories) ?
                   (today.local.calories / goals.calories * 360) : 360,
                   SECONDS_DUR);
    this.text.text = addComma(today.local.calories);
  }
}));

sm.addState(new State({
  id: "heartbeatState",
  text: "bpm",
  arc: largeArc,
  start: function() {
    this.lastBeat = null;
    this.poll = setInterval(() => {
      if (hrm.timestamp - this.lastBeat === 0) {
        // Not reading heartbeat
        this.arc.tween(this.arc.angle, 0, SECONDS_DUR + 20);
        this.text.text = "--";
      }
      this.lastBeat = hrm.timestamp;
    }, POLL_TIME);
    
    this.text.text = "--";
    hrm.start();
  },
  stop: function() {
    clearInterval(this.poll);
    hrm.stop();
  },
  event: function() {
    this.arc.tween(this.arc.angle, (hrm.heartRate / 200) * 360, SECONDS_DUR);
    this.text.text = hrm.heartRate;
  }
}));

let screenButton = document.getElementById("screenButton");

function updateClock() {
  sm.getStateById("clockState").event();
}

function updateHeartRate() {
  sm.getStateById("heartbeatState").event();
}

function nextState() {
  sm.switchState("next");
}

function resetState() {
  if (!display.on) sm.switchState("default");
}

function update() {
  sm.currState.update();

  requestAnimationFrame(update);
}

requestAnimationFrame(update);

// Update the clock when a tick occurs
clock.ontick = () => updateClock();

// Update heartrate when a reading occurs
hrm.onreading = () => updateHeartRate();

// Switch to the next state when the user taps the screen
screenButton.onactivate = () => nextState();

// Switch to the clock when the screen turns off
display.onchange = () => resetState();
