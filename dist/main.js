// main.js
var times = {};
if (true) {
  times.getTime = (hour = 0, minute = 0, second = 0, millisecond = 0) => {
    return millisecond * 1e-3 + second + minute * 60 + hour * 3600;
  };
  times.getHour = (time = 0) => {
    return Math.floor(time / 3600);
  };
  times.getMinute = (time = 0) => {
    return Math.floor(time / 60) % 60;
  };
  times.getSecond = (time = 0) => {
    return Math.floor(time) % 60;
  };
  times.getMillisecond = (time = 0) => {
    return Math.floor(time * 1e3) % 1e3;
  };
  times.makeDigits = (num = 0, length) => {
    num = num.toString();
    if (num.length < length) {
      num = "0".repeat(length - num.length) + num;
    }
    return num;
  };
  times.parseTime = (time = "12:00") => {
    let hour = time.split(":");
    let min = parseInt(hour[1]);
    hour = parseInt(hour[0]);
    if (hour < 5) hour += 12;
    return times.getTime(hour, min);
  };
  times.formatTime = (time = 0, digits = 3) => {
    let ret = [];
    let hour = times.getHour(time);
    let min = times.getMinute(time);
    let sec = times.getSecond(time);
    let ms = times.getMillisecond(time);
    if (digits >= 1) ret.push(hour);
    if (digits >= 2) ret.push(times.makeDigits(min, 2));
    if (digits >= 3) ret.push(times.makeDigits(sec, 2));
    if (digits >= 4) ret.push(times.makeDigits(ms, 4));
    return ret.join(":");
  };
  times.getCurrentTime = () => {
    if ("debugTime" in times) return times.debugTime;
    let date = /* @__PURE__ */ new Date();
    return times.getTime(date.getHours(), date.getMinutes(), date.getSeconds());
  };
  times.TimeSheet = class {
    constructor(timeSheet = { "normal": { "1": ["12:00", "12:00"] } }) {
      for (let scheduleName in timeSheet) {
        let schedule = timeSheet[scheduleName];
        this[scheduleName] = {};
        for (let periodName in schedule) {
          let period = schedule[periodName];
          period = period.map((time) => times.parseTime(time));
          this[scheduleName][periodName] = period;
        }
      }
    }
    forEach(func = (periodName, period) => {
    }) {
      let schedule = this.getCurrent();
      for (let periodName in schedule) {
        let period = schedule[periodName];
        func(periodName, period);
      }
    }
    map(func = (periodName, period) => {
    }) {
      let schedule = this.getCurrent();
      let ret = [];
      for (let periodName in schedule) {
        let period = schedule[periodName];
        ret.push(func(periodName, period));
      }
      return ret;
    }
    getCurrent() {
      return this[times.user.schedule];
    }
    getFirst() {
      let schedule = this.getCurrent();
      let ret = { period: [99999, 99999], periodName: "" };
      for (let periodName in schedule) {
        let period = schedule[periodName];
        if (period[0] < ret.period[0]) ret = { period, periodName };
      }
      return ret;
    }
    getLast() {
      let schedule = this.getCurrent();
      let ret = { period: [0, 0], periodName: "" };
      for (let periodName in schedule) {
        let period = schedule[periodName];
        if (period[1] > ret.period[1]) ret = { period, periodName };
      }
      return ret;
    }
  };
  times.schools = [
    { name: "middle", grades: [6, 8], type: 0, schedules: ["normal", "half", "set", "delay"] },
    { name: "high", grades: [9, 12], type: 1, schedules: ["normal", "half", "liontime", "delay"] }
  ];
  times.schools[0].timeSheet = new times.TimeSheet();
  times.schools[1].timeSheet = new times.TimeSheet({
    "normal": {
      "1": ["7:50", "8:45"],
      "2": ["8:50", "9:40"],
      "3": ["9:45", "10:40"],
      "4": ["10:45", "12:45"],
      "5": ["12:50", "1:40"],
      "6": ["1:45", "2:35"]
    },
    "liontime": {
      "1": ["7:50", "8:35"],
      "2": ["8:40", "9:25"],
      "Liontime": ["9:30", "9:55"],
      "3": ["10:00", "10:50"],
      "4": ["10:55", "12:55"],
      "5": ["1:00", "1:45"],
      "6": ["1:50", "2:35"]
    },
    "half": {
      "1": ["7:50", "8:20"],
      "2": ["8:25", "8:55"],
      "3": ["9:00", "9:35"],
      "4": ["9:40", "10:10"],
      "5": ["10:15", "10:45"],
      "6": ["10:50", "11:20"]
    },
    "delay": {
      "1": ["9:50", "10:20"],
      "2": ["10:25", "10:55"],
      "3": ["11:00", "11:30"],
      "4": ["11:35", "1:35"],
      "5": ["1:40", "2:05"],
      "6": ["2:10", "2:35"]
    }
  });
  times.schools[1].lunches = new times.TimeSheet({
    "normal": {
      "A": ["10:45", "11:15"],
      "B": ["11:15", "11:45"],
      "C": ["11:45", "12:15"],
      "D": ["12:15", "12:45"]
    },
    "liontime": {
      "A": ["10:55", "11:25"],
      "B": ["11:25", "11:55"],
      "C": ["11:55", "12:25"],
      "D": ["12:25", "12:55"]
    },
    "half": {
      "Lunch": ["11:20", "11:35"]
    },
    "delay": {
      "A": ["11:35", "12:05"],
      "B": ["12:05", "12:35"],
      "C": ["12:35", "1:05"],
      "D": ["1:05", "1:35"]
    }
  });
  times.user = JSON.parse(localStorage.getItem("timesUser")) || {};
  checkIfHas(times.user, {
    grade: 9,
    abDay: 0,
    schedule: "normal",
    aLunch: "A",
    bLunch: "A",
    notify: true,
    lastChecked: (/* @__PURE__ */ new Date()).getDate()
  });
  times.grades = [];
  times.schools.forEach((school, i) => {
    for (let grade = school.grades[0]; grade <= school.grades[1]; grade++) times.grades.push(grade);
  });
  times.updateUser = () => {
    times.schools.forEach((school, i) => {
      if (times.user.grade >= school.grades[0] && times.user.grade <= school.grades[1]) {
        times.user.school = i;
      }
    });
  };
  times.saveUser = () => {
    localStorage.setItem("timesUser", JSON.stringify(times.user));
  };
  times.updateUser();
  times.saveUser();
  times.getCurrentPeriod = () => {
    let school = times.schools[times.user.school];
    let currentPeriod;
    let currentTime = times.getCurrentTime();
    let started = currentTime >= school.timeSheet.getFirst().period[0];
    let ended = currentTime >= school.timeSheet.getLast().period[1];
    if (started && !ended) {
      school.timeSheet.forEach((periodName, period) => {
        if (currentTime >= period[0] && currentTime <= period[1]) currentPeriod = { type: 0, name: periodName, period };
      });
      let lunch = school.lunches.getCurrent()[times.user.schedule == "half" ? "Lunch" : times.user.abDay == 0 ? times.user.aLunch : times.user.bLunch];
      if (currentTime >= lunch[0] && currentTime <= lunch[1]) currentPeriod = { type: 1, name: times.user.abDay == 0 ? times.user.aLunch : times.user.bLunch, period: lunch };
      if (!currentPeriod) return { type: "transition" };
      return { type: "period", times: currentPeriod.period, name: (currentPeriod.type == 0 ? "Period " : "Lunch ") + currentPeriod.name };
    }
    if (ended) {
      return { type: "after" };
    }
    if (!started) {
      return { type: "before" };
    }
    return null;
  };
  times.getNextPeriod = () => {
    let school = times.schools[times.user.school];
    let currentTime = times.getCurrentTime();
    let started = currentTime >= school.timeSheet.getFirst().period[0];
    let ended = currentTime >= school.timeSheet.getLast().period[1];
    let last = currentTime >= school.timeSheet.getLast().period[0];
    let leastTimeLeft = 9999999;
    let nextPeriod;
    if (last) return { type: "period", times: new Array(2).fill(school.timeSheet.getLast().period[1]), name: "Dismissal" };
    if (started && !ended) {
      school.timeSheet.forEach((periodName, period) => {
        if (period[0] - currentTime < leastTimeLeft && period[0] - currentTime > 0) {
          nextPeriod = { type: 0, name: periodName, period };
          leastTimeLeft = period[0] - currentTime;
        }
      });
      let lunch = school.lunches.getCurrent()[times.user.schedule == "half" ? "Lunch" : times.user.abDay == 0 ? times.user.aLunch : times.user.bLunch];
      if (lunch[0] - currentTime < leastTimeLeft && lunch[0] - currentTime > 0) {
        nextPeriod = { type: 1, name: times.user.abDay == 0 ? times.user.aLunch : times.user.bLunch, period: lunch };
        leastTimeLeft = lunch[0] - currentTime;
      }
      if (!nextPeriod) return { type: "transition" };
      return { type: "period", times: nextPeriod.period, name: (nextPeriod.type == 0 ? "Period " : "Lunch ") + nextPeriod.name };
    }
    if (ended) {
      return { type: "after" };
    }
    if (!started) {
      return { type: "before" };
    }
    return null;
  };
  times.getTimeLeft = () => {
    let current = times.getCurrentPeriod();
    let next = times.getNextPeriod();
    if (current.type == "after") return { type: "none", name: "After school" };
    if (current.type == "before") return { type: "none", name: "Before school" };
    if (current.type == "transition") return { type: "none", name: "Transition" };
    let time = times.getCurrentTime();
    return {
      type: "period",
      name: current.name,
      times: current.times,
      timeLeft: Math.min(current.times[1] - time, next.times[0] - time)
    };
  };
}
var API_URL = "hcpss.instructure.com/api/v1";
if (!localStorage.getItem("key")) {
  localStorage.setItem("key", 0);
}
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", "[]");
}
if (!localStorage.getItem("apiUrl")) {
  localStorage.setItem("apiUrl", "https://corsanywhere.vercel.app");
}
window.profileLoaded = false;
var mathSymbols = [
  { symbol: "\u25B3", search: "triangle", name: "triangle" },
  { symbol: "\u2220", search: "angle", name: "angle" },
  { symbol: "\xB1", search: "plus/minus +-", name: "plus/minus" },
  { symbol: "\u2260", search: "not equal != inequality", name: "not equal" },
  { symbol: "\u2245", search: "congruent =", name: "congruent" },
  { symbol: "\u2248", search: "approximately equal about equal = similar", name: "similar" },
  { symbol: "\xBA", search: "^0 to the 0 superscript 0", name: "superscript 0" },
  { symbol: "\xB9", search: "^1 to the 1 superscript 1", name: "superscript 1" },
  { symbol: "\xB2", search: "^2 to the 2 superscript 2 squared", name: "superscript 2" },
  { symbol: "\xB3", search: "^3 to the 3 superscript 3 cubed", name: "superscript 3" },
  { symbol: "\u2074", search: "^4 to the 4 superscript 4", name: "superscript 4" },
  { symbol: "\u2075", search: "^5 to the 5 superscript 5", name: "superscript 5" },
  { symbol: "\u2076", search: "^6 to the 6 superscript 6", name: "superscript 6" },
  { symbol: "\u2077", search: "^7 to the 7 superscript 7", name: "superscript 7" },
  { symbol: "\u2078", search: "^8 to the 8 superscript 8", name: "superscript 8" },
  { symbol: "\u2079", search: "^9 to the 9 superscript 9", name: "superscript 9" },
  { symbol: "\u207A", search: "superscript plus exponent^+", name: "superscript +" },
  { symbol: "\u207B", search: "superscript minus exponent superscript negative exponent ^-", name: "superscript -" },
  { symbol: "\u207D", search: "superscript parentheses exponent parentheses ^(", name: "superscript (" },
  { symbol: "\u207E", search: "superscript parentheses exponent parentheses ^)", name: "superscript )" },
  { symbol: "\u2265", search: "greater than or equal to >=", name: "greater than or equal to" },
  { symbol: "\u2264", search: "less than or equal to <=", name: "less than or equal to" },
  { symbol: "\xD7", search: "times x * multiply", name: "times x" },
  { symbol: "\u22C5", search: "times x * multiply", name: "times dot" },
  { symbol: "\xF7", search: "divided by /", name: "divided" },
  { symbol: "\xB0", search: "degrees *", name: "degrees" },
  { symbol: "\u221E", search: "infinity", name: "infinity" },
  { symbol: "\u2225", search: "parallel to ||", name: "parallel" },
  { symbol: "\u22A5", search: "perpendicular to -|-", name: "perpendicular" },
  { symbol: "\u221A", search: "sqrt square root", name: "square root" },
  { symbol: "\u03B1", search: "greek letter", name: "lowercase alpha" },
  { symbol: "\u03B2", search: "greek letter", name: "lowercase beta" },
  { symbol: "\u03B3", search: "greek letter", name: "lowercase gamma" },
  { symbol: "\u03B4", search: "greek letter", name: "lowercase delta" },
  { symbol: "\u03B5", search: "greek letter", name: "lowercase epsilon" },
  { symbol: "\u03B6", search: "greek letter", name: "lowercase zeta" },
  { symbol: "\u03B7", search: "greek letter", name: "lowercase eta" },
  { symbol: "\u03B8", search: "greek letter", name: "lowercase theta" },
  { symbol: "\u03B9", search: "greek letter", name: "lowercase iota" },
  { symbol: "\u03BA", search: "greek letter", name: "lowercase kappa" },
  { symbol: "\u03BB", search: "greek letter", name: "lowercase lambda" },
  { symbol: "\u03BC", search: "greek letter", name: "lowercase mu" },
  { symbol: "\u03BD", search: "greek letter", name: "lowercase nu" },
  { symbol: "\u03BE", search: "greek letter", name: "lowercase xi" },
  { symbol: "\u03BF", search: "greek letter", name: "lowercase omicron" },
  { symbol: "\u03C0", search: "greek letter", name: "lowercase pi" },
  { symbol: "\u03C1", search: "greek letter", name: "lowercase rho" },
  { symbol: "\u03C3", search: "greek letter", name: "lowercase sigma" },
  { symbol: "\u03C4", search: "greek letter", name: "lowercase tau" },
  { symbol: "\u03C5", search: "greek letter", name: "lowercase upsilon" },
  { symbol: "\u03C6", search: "greek letter", name: "lowercase phi" },
  { symbol: "\u03C7", search: "greek letter", name: "lowercase chi" },
  { symbol: "\u03C8", search: "greek letter", name: "lowercase psi" },
  { symbol: "\u03C9", search: "greek letter", name: "lowercase omega" },
  { symbol: "\u0391", search: "greek letter", name: "uppercase alpha" },
  { symbol: "\u0392", search: "greek letter", name: "uppercase beta" },
  { symbol: "\u0393", search: "greek letter", name: "uppercase gamma" },
  { symbol: "\u0394", search: "greek letter", name: "uppercase delta" },
  { symbol: "\u0395", search: "greek letter", name: "uppercase epsilon" },
  { symbol: "\u0396", search: "greek letter", name: "uppercase zeta" },
  { symbol: "\u0397", search: "greek letter", name: "uppercase eta" },
  { symbol: "\u0398", search: "greek letter", name: "uppercase theta" },
  { symbol: "\u0399", search: "greek letter", name: "uppercase iota" },
  { symbol: "\u039A", search: "greek letter", name: "uppercase kappa" },
  { symbol: "\u039B", search: "greek letter", name: "uppercase lambda" },
  { symbol: "\u039C", search: "greek letter", name: "uppercase mu" },
  { symbol: "\u039D", search: "greek letter", name: "uppercase nu" },
  { symbol: "\u039E", search: "greek letter", name: "uppercase xi" },
  { symbol: "\u039F", search: "greek letter", name: "uppercase omicron" },
  { symbol: "\u03A0", search: "greek letter", name: "uppercase pi" },
  { symbol: "\u03A1", search: "greek letter", name: "uppercase rho" },
  { symbol: "\u03A3", search: "greek letter", name: "uppercase sigma" },
  { symbol: "\u03A4", search: "greek letter", name: "uppercase tau" },
  { symbol: "\u03A5", search: "greek letter", name: "uppercase upsilon" },
  { symbol: "\u03A6", search: "greek letter", name: "uppercase phi" },
  { symbol: "\u03A7", search: "greek letter", name: "uppercase chi" },
  { symbol: "\u03A8", search: "greek letter", name: "uppercase psi" },
  { symbol: "\u03A9", search: "greek letter", name: "uppercase omega" }
  //  {symbol:"",search:"greek letter",name:""},
];
var API_TOKEN = localStorage.getItem("key");
var CORS_PROXY = localStorage.getItem("apiUrl");
if ("Notification" in window && Notification.permission != "granted" && times.user.notify) Notification.requestPermission();
getData("users/self", "", (e) => {
  if (e.errors) {
    console.log(e.errors);
  } else {
    console.log(e);
    let img = document.createElement("img");
    img.src = e.avatar_url;
    img.id = "profilePic";
    img.addEventListener("load", () => {
      document.querySelector("#profile>span").remove();
      document.querySelector("#profile").append(img);
    });
    window.profileLoaded = true;
    window.profile = e;
    if (removePopup()) {
      openProfile();
    }
  }
});
getData("users/self/todo", "per_page=100", (assignments) => {
  if (!assignments.errors) {
    assignments.sort((a, b) => {
      let dateA = new Date(a.assignment.due_at);
      let dateB = new Date(b.assignment.due_at);
      return dateA.getTime() - dateB.getTime();
    });
    assignments.forEach((e, i) => {
      let date = new Date(e.assignment.due_at);
      assignments[i] = {
        course: e.context_name,
        name: e.assignment.name,
        due: date.toLocaleString("en", { timeStyle: "short", dateStyle: "full" })
      };
      let e2 = assignments[i];
      let elem2 = document.createElement("div");
      elem2.setAttribute("class", "item");
      elem2.addEventListener("click", () => window.open(e.html_url.split("#")[0], "_blank").focus());
      let eClass = date.getTime() - Date.now() < 0 ? "missing" : date.getDate() == (/* @__PURE__ */ new Date()).getDate() ? "today" : "later";
      elem2.innerHTML = `<h2>${e2.name}</h2><p>${e2.course}</p><p class="${eClass}">${e2.due}</p>`;
      document.getElementById("todo").append(elem2);
    });
  } else {
    let elem2 = document.createElement("p");
    elem2.innerHTML = assignments.errors.map((e) => e.message).join("</p><p>");
    document.getElementById("todo").append(elem2);
  }
}, (err) => {
  document.getElementById("todo").innerHTML += `<p>${err.stack}</p>`;
  console.error(err);
});
getData("users/self/favorites/courses", "per_page=100", (courses) => {
  if (!courses.errors) {
    getData("announcements", `context_codes[]=course_${courses.map((e) => e.id).join("&context_codes[]=course_")}`, (announcements) => {
      if (!announcements.errors) {
        announcements.forEach((e) => {
          let elem2 = document.createElement("div");
          elem2.setAttribute("class", "item");
          elem2.addEventListener("click", () => {
            popup(`<iframe src="data:text/html;charset=utf8,${encodeURIComponent(e.message)}" frameborder=0>`, `${e.title} - ${e.author.display_name}`);
          });
          let m = e.message.replaceAll(/<[^>]*>/ig, " ").replaceAll("&nbsp;", " ").replaceAll("\u21B5", " ").trim();
          elem2.innerHTML = `<h2>${e.title}</h2><p>${e.author.display_name}</p><p>${new Date(e.created_at).toLocaleString("en", { timeStyle: "short", dateStyle: "full" })}</p><p>${m.substring(0, 150)}${m.length > 150 ? "..." : ""}</p>`;
          document.getElementById("announcements").append(elem2);
        });
      }
    }, (err) => {
      document.getElementById("announcements").innerHTML += `<p>${err.stack}</p>`;
    });
    let courses2 = {};
    courses.forEach((e) => {
      courses2[e.id] = e;
    });
  } else {
    let elem2 = "<p>" + courses.errors.map((e) => e.message).join("</p><p>") + "</p>";
    document.getElementById("announcements").innerHTML += elem2;
  }
}, (err) => {
  document.getElementById("announcements").innerHTML += `<p>${err.stack}</p>`;
});
getData("users/self/courses", "enrollment_state=active&per_page=100&include%5B%5D=total_scores&include%5B%5D=current_grading_period_scores&include%5B%5D=grading_periods", (courses) => {
  courses.sort((a, b) => {
    return b.enrollments[0].current_period_computed_current_score - a.enrollments[0].current_period_computed_current_score;
  });
  courses.forEach((course) => {
    let score = course.enrollments[0].current_period_computed_current_score;
    let name = course.friendly_name;
    if (name == null) name = course.name;
    let elem2 = document.createElement("div");
    elem2.setAttribute("class", "item");
    elem2.addEventListener("click", () => window.open(`https://hcpss.instructure.com/courses/${course.id}/grades`, "_blank").focus());
    let width = "min(calc(25vw - 77px), 250px)";
    elem2.innerHTML = `<h2>${name}</h2><p>${score == null ? "N/A" : score + "%"}</p>${score == null ? "" : `<div class="gradeDisplayBg" style="width:${width}"><div class="gradeDisplay ${score <= 67.5 ? "gradeTerrible" : score <= 77.5 ? "gradeReallyBad" : score <= 87.5 ? "gradeBad" : score <= 95 ? "gradeMid" : "gradeGood"}" style="width:calc(${width} * ${Math.min(score, 100) / 100})"></div></div>`}`;
    document.getElementById("grades").append(elem2);
  });
}, (err) => {
  document.getElementById("grades").innerHTML += `<p>${err.stack}</p>`;
});
getData("conversations", "per_page=10", (convos) => {
  if (!convos.errors) {
    convos.forEach((e) => {
      let elem2 = document.createElement("div");
      elem2.setAttribute("class", "item " + e.workflow_state);
      elem2.addEventListener("click", () => {
        popup("", "loading...");
        getData(`conversations/${e.id}`, "", (convo) => {
          removePopup();
          console.log(convo);
          let ms = convo.messages.sort((a, b) => {
            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          });
          let html = `<p>${ms.map((e2) => `<b>${convo.participants.find((f) => {
            return f.id == e2.author_id;
          }).name}</b> - ${new Date(e2.created_at).toLocaleString("en", { timeStyle: "short", dateStyle: "full" })}<br><br>${e2.body}`).join("</p><p>").replaceAll("\n", "<br>")}</p>`;
          popup(html, convo.subject);
          let pre = JSON.parse(localStorage.getItem("prefers"));
          pre.storedMessages[e.id] = { html, subject: convo.subject };
          localStorage.setItem("prefers", JSON.stringify(pre));
        });
      });
      elem2.innerHTML = `<h2>${e.subject}</h2><p>${e.context_name}</p><p>${new Date(e.last_message_at).toLocaleString("en", { timeStyle: "short", dateStyle: "full" })}</p><p>${e.last_message}</p>`;
      document.getElementById("inbox").append(elem2);
    });
  } else {
    let elem2 = document.createElement("p");
    elem2.innerHTML = convos.errors.map((e) => e.message).join("</p><p>");
    document.getElementById("inbox").append(elem2);
  }
}, (err) => {
  document.getElementById("inbox").innerHTML += `<p>${err.stack}</p>`;
});
getData("conversations/unread_count", "", (e) => {
  let content;
  if (e.unread_count == 0) content = "Inbox: none";
  else if (e.unread_count) content = "Inbox: " + e.unread_count;
  else content = "Inbox";
  document.getElementById("inbox").querySelector("h1").innerHTML = content;
});
function getData(loc, inputs, callback, error) {
  fetch(`${CORS_PROXY}/https://${API_URL}/${loc}?access_token=${API_TOKEN}${inputs.length > 0 ? "&" + inputs : ""}`, {
    "referrerPolicy": "same-origin",
    "method": "GET",
    "body": null,
    "mode": "cors",
    "credentials": "omit",
    "origin": "cam0studios.github.io"
  }).then((r) => r.json()).then(callback).catch((err) => {
    console.error(err);
    if (arguments.length > 3) error(err);
  });
}
function removePopup() {
  if (document.querySelector(".popup") && document.querySelector(".popupBg")) {
    document.querySelector(".popup").remove();
    document.querySelector(".popupBg").remove();
    return true;
  }
  return false;
}
function popup(content, name, remove) {
  console.log("popup");
  let popupBg = document.createElement("div");
  popupBg.setAttribute("class", "popupBg");
  popupBg.addEventListener("click", () => {
    if (remove) remove();
    removePopup();
  });
  let popup2 = document.createElement("div");
  popup2.setAttribute("class", "popup");
  popup2.innerHTML = `<h2 class="popupHeader">${name}</h2><hr/><div class="popupContent">${content}</div>`;
  let popupClose = document.createElement("span");
  popupClose.setAttribute("class", "material-symbols-outlined popupClose");
  popupClose.addEventListener("click", () => {
    if (remove) remove();
    removePopup();
  });
  popupClose.innerHTML = "close";
  popup2.append(popupClose);
  document.body.prepend(popupBg);
  document.body.append(popup2);
}
setInterval(() => {
  let left = times.getTimeLeft();
  [...document.getElementsByClassName("timeLeft")].forEach((e) => {
    if (left.type == "period") {
      e.innerHTML = times.formatTime(left.timeLeft, 3);
    } else {
      e.innerHTML = "N/A";
    }
  });
  [...document.getElementsByClassName("period")].forEach((e) => {
    e.innerHTML = left.name;
  });
  if (left.timeLeft > 60) times.user.notified = false;
  if (left.timeLeft < 60 && !times.user.notified) {
    console.log("notify");
    times.user.notified = true;
    if ("Notification" in window && Notification.permission == "granted" && times.user.notify) new Notification("1 minute left!", { body: `You have 1 minute left in ${left.name}` });
  }
}, 1e3);
function openSchedule() {
  popup(`
	<p>Time left in <span class="period">0</span>: <span class="timeLeft">0:00:00</span></p>
	<p>Schedule:
		<select id="setSchedule">
			${times.schools[times.user.school].schedules.map((e) => `<option value="${e}" ${e == times.user.schedule ? `selected=""` : ""}">${e}</option>`)}
		</select>
	</p>
	<p>Grade:
		<select id="setGrade">
  		${times.grades.map((e) => `<option value="${e}" ${e == times.user.grade ? `selected=""` : ""}">${e}</option>`)}
  	</select>
  </p>
	${times.schools[times.user.school].type == 1 ? `
	<p>
		Day:
		<select id="setDay">
			${[0, 1].map((e) => `<option value="${e}" ${times.user.abDay == e ? `selected=""` : ""}>${["A", "B"][e]}</option>`).join(", ")}
		</select>
	</p>
	<p>
		Lunch:
		${["A", "B"].map((day) => `
		<br>${day}: 
		<select id="setLunch${day}">
			${Object.keys(times.schools[times.user.school].lunches.getCurrent()).map((lunch) => `<option value=${lunch} ${lunch == (day == "B" ? times.user.bLunch : times.user.aLunch) ? `selected=""` : ""}>${lunch}</option>`).join("")}
		</select>
		`).join(", ")}
	</p>
	<p>
		<input type="checkbox" id="setNotify" ${times.user.notify ? `checked=""` : ""}"></input>
		1 Minute Notifications
	</p>
	` : ""}
  `, "Schedule");
  document.getElementById("setSchedule").addEventListener("change", () => setSchedule(document.getElementById("setSchedule").value));
  document.getElementById("setGrade").addEventListener("change", () => setGrade(document.getElementById("setGrade").value));
  document.getElementById("setDay").addEventListener("change", () => setDay(document.getElementById("setDay").value));
  ["A", "B"].forEach((day) => {
    document.getElementById(`setLunch${day}`).addEventListener("change", () => setLunch(day, document.getElementById(`setLunch${day}`).value));
  });
  document.getElementById("setNotify").addEventListener("change", () => setNotify(document.getElementById("setNotify").checked));
}
function openProfile() {
  let content = "";
  if (window.profileLoaded) {
    content += `
    <p>User: ${window.profile.name} (${window.profile.pronouns})</p>
    <br>
    <button id="signOutBtn">Sign Out</button>
    <br>
    <button id="viewTokenBtn">View API Token</button>
    <br>
    <button id="copyTokenBtn">Copy Token</button>
    <br>
    <br>`;
  } else {
    content += `
    <button id="viewTokenBtn">View API Token</button>
    <br/><br/>
    `;
    JSON.parse(localStorage.getItem("users")).forEach((e, i) => {
      content += `<div id="user${i}"><button class="makeCurrentUser">${e.name}</button> <button class="removeUser">x</button> </div>`;
    });
    content += `
    <button id="addUserBtn">Add user</button>
    <br/>
    <button id="signInBtn">Sign in</button>
    <br/>
    <h2>How to generate a token:</h2>
    <p>Go to Canvas and click your profile picture, hit Settings. Once the page loads, scroll down and hit New Access Token. Set the purpose to anything you like, and hit Generate. Copy the long string of text (ex: 1234~qwertyuiop...) and paste it into the sign in prompt here.</p>
    `;
  }
  content += `
		<input type="text" id="apiUrl" value="${localStorage.getItem("apiUrl")}"></input>
		<button id="updateUrl">Update API URL</button>
	`;
  popup(content, "Profile");
  document.getElementById("viewTokenBtn").addEventListener("click", () => {
    elem = document.createElement("p");
    elem.appendChild(document.createTextNode(`Token: ${localStorage.getItem("key")}`));
    document.querySelector(".popup").append(elem);
    document.getElementById("viewTokenBtn").remove();
  });
  if (window.profileLoaded) {
    document.getElementById("signOutBtn").addEventListener("click", () => {
      localStorage.setItem("key", null);
      location.reload();
    });
    document.getElementById("copyTokenBtn").addEventListener("click", () => copy(localStorage.getItem("key")));
  } else {
    JSON.parse(localStorage.getItem("users")).forEach((e, i) => {
      document.querySelector(`#user${i}>.makeCurrentUser`).addEventListener("click", () => {
        localStorage.setItem("key", e.key);
        location.reload();
      });
      document.querySelector(`#user${i}>.removeUser`).addEventListener("click", () => {
        users = JSON.parse(localStorage.getItem("users"));
        users.splice(i, 1);
        localStorage.setItem("users", JSON.stringify(users));
        document.getElementById(`user${i}`).remove();
      });
    });
    document.getElementById("addUserBtn").addEventListener("click", () => {
      users = JSON.parse(localStorage.getItem("users"));
      let name = prompt("name");
      let key = prompt("token");
      users.push({ name, key });
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("key", key);
      location.reload();
    });
    document.getElementById("signInBtn").addEventListener("click", () => {
      localStorage.setItem("key", prompt("API Token?"));
      location.reload();
    });
  }
  document.getElementById("updateUrl").addEventListener("click", () => {
    console.log("click");
    localStorage.setItem("apiUrl", document.getElementById("apiUrl").value);
    location.reload();
  });
}
function openMath() {
  let p = "";
  mathSymbols.forEach((e) => {
    p += `<button id="math${e.symbol}" class="mathSymbol" title="${e.name}">${e.symbol}</button>`;
  });
  popup(`
    <details>
      <summary>Math Symbols</summary>
      <input id="mathSearch" type="text" placeholder="Search...">
      <br>${p}
    </details>
    <details>
      <summary>Math Equations</summary>
      <details>
        <summary>Trigonometry</summary>
        Note: side a is opposite angle A, side b is opposite angle B, and side c is opposite angle C.
        <details>
          <summary>Law of Sines</summary>
          <p>sin A / a = sin B / b = sin C / c</p>
          <p>a = b sin A / sin B</p>
          <p>A = sin\u207B\xB9 ( a sin B / b )</p>
          <p>Solve for
            <select id="mathLOS" class="mathSolve">
              <option value="0">side (a)</option>
              <option value="1">angle (A)</option>
            </select>:
          </p>
          <span id="mathLOSLabel1" class="mathLabel">b = </span>
          <input id="mathLOSIn1" class="mathIn"><br>
          <span id="mathLOSLabel2" class="mathLabel">A = </span>
          <input id="mathLOSIn2" class="mathIn"><br>
          <span id="mathLOSLabel3" class="mathLabel">B = </span>
          <input id="mathLOSIn3" class="mathIn"><br>
          <span>Round to the nearest </span>
          <input id="mathLOSRound" class="mathIn">
          <p id="mathLOSOut">a = 0</p>
        </details>
        <details>
          <summary>Law of Cosines</summary>
          <p>a\xB2 = b\xB2 + c\xB2 - 2bc cos A</p>
          <p>a = \u221A<span style="text-decoration:overline">b\xB2 + c\xB2 - 2bc cos A</span></p>
          <p>A = cos\u207B\xB9 ((b\xB2 + c\xB2 - a\xB2) / 2bc)</p>
          <p>Solve for
            <select id="mathLOC" class="mathSolve">
              <option value="0">side (a)</option>
              <option value="1">angle (A)</option>
            </select>:
          </p>
          <span id="mathLOCLabel1" class="mathLabel">b = </span>
          <input id="mathLOCIn1" class="mathIn"><br>
          <span id="mathLOCLabel2" class="mathLabel">c = </span>
          <input id="mathLOCIn2" class="mathIn"><br>
          <span id="mathLOCLabel3" class="mathLabel">A = </span>
          <input id="mathLOCIn3" class="mathIn"><br>
          <span>Round to the nearest </span>
          <input id="mathLOCRound" class="mathIn">
          <p id="mathLOCOut">a = 0</p>
        </details>
      </details>
    </details>
  `, "Math Picker/Solver");
  document.getElementById("mathSearch").addEventListener("input", updateMath);
  mathSymbols.forEach((e) => {
    document.getElementById(`math${e.symbol}`).addEventListener("click", () => copy(e.symbol));
  });
  let equations = [
    [
      //Law of Sines
      { solve: (b, A, B) => b * Math.sin(A) / Math.sin(B), in: ["b", "A", "B"], out: "a" },
      // solve for side a
      { solve: (a, b, B) => Math.asin(a * Math.sin(B) / b), in: ["a", "b", "B"], out: "A" }
      // solve for angle A
    ],
    [
      //Law of Cosines
      { solve: (b, c, A) => Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(A)), in: ["b", "c", "A"], out: "a" },
      // solve for side a
      { solve: (a, b, c) => Math.acos((b * b + c * c - a * a) / (2 * b * c)), in: ["a", "b", "c"], out: "A" }
      // solve for angle A
    ]
  ];
  for (let i in document.getElementsByClassName("mathSolve")) {
    if (!isNaN(parseInt(i))) {
      let e = document.getElementsByClassName("mathSolve")[i];
      let in1 = document.getElementById(e.id + "In1");
      let in2 = document.getElementById(e.id + "In2");
      let in3 = document.getElementById(e.id + "In3");
      let l1 = document.getElementById(e.id + "Label1");
      let l2 = document.getElementById(e.id + "Label2");
      let l3 = document.getElementById(e.id + "Label3");
      let eq = equations[i][e.value];
      let out = document.getElementById(e.id + "Out");
      let round = document.getElementById(e.id + "Round");
      let getV = (v, n, t) => {
        let r = isNaN(parseFloat(v)) ? NaN : n.toLowerCase() === n ? parseFloat(v) : parseFloat(v) * (t ? 180 / Math.PI : Math.PI / 180);
        return r;
      };
      let solve = () => out.innerHTML = eq.out + " = " + Math.round(getV(eq.solve(getV(in1.value, eq.in[0]), getV(in2.value, eq.in[1]), getV(in3.value, eq.in[2])), eq.out, true) / parseFloat(round.value)) * parseFloat(round.value);
      in1.addEventListener("input", solve);
      in2.addEventListener("input", solve);
      in3.addEventListener("input", solve);
      round.addEventListener("input", solve);
      e.addEventListener("input", () => {
        eq = equations[i][e.value];
        l1.innerHTML = eq.in[0] + " = ";
        l2.innerHTML = eq.in[1] + " = ";
        l3.innerHTML = eq.in[2] + " = ";
        solve();
      });
    }
  }
}
function updateMath() {
  mathSymbols.forEach((e) => {
    let elem2 = document.getElementById("math" + e.symbol);
    if (elem2) {
      if (e.search.includes(document.getElementById("mathSearch").value) || e.name.includes(document.getElementById("mathSearch").value)) {
        elem2.style.display = "inline";
      } else {
        elem2.style.display = "none";
      }
    }
  });
}
function copy(val) {
  navigator.clipboard.writeText(val);
}
function checkABDay() {
  if ((/* @__PURE__ */ new Date()).getDate() != times.user.lastChecked) {
    if ((/* @__PURE__ */ new Date()).getDate() > times.user.lastChecked) times.user.abDay += (/* @__PURE__ */ new Date()).getDate() - times.user.lastChecked;
    else times.user.abDay++;
    times.user.abDay %= 2;
    times.user.lastChecked = (/* @__PURE__ */ new Date()).getDate();
    times.saveUser();
    console.log(`Set A/B day to ${["A", "B"][times.user.abDay]} (auto)`);
  }
}
checkABDay();
setInterval(checkABDay, 6e4);
function setSchedule(val) {
  times.user.schedule = val;
  times.saveUser();
  console.log(`Set schedule to ${val}`);
}
function setGrade(val) {
  times.user.grade = parseInt(val);
  times.updateUser();
  times.saveUser();
  console.log(`Set grade to ${val}`);
}
function setLunch(lunch, val) {
  times.user[`${lunch.toLowerCase()}Lunch`] = val;
  times.saveUser();
  console.log(`Set ${lunch} lunch to ${val}`);
}
function setDay(val) {
  times.user.abDay = val;
  times.saveUser();
  console.log(`Set A/B day to ${val}`);
}
function setNotify(val) {
  times.user.notify = val;
  times.saveUser();
  console.log(`Set notifications to ${val}`);
}
function checkIfHas(data, defaults) {
  for (let key in defaults) {
    let def = defaults[key];
    if (!(key in data)) data[key] = def;
  }
  for (let key in data) {
    if (!(key in defaults)) delete data[key];
  }
  return data;
}
document.getElementById("hcpss").addEventListener("click", () => {
  open("https://hcpss.instructure.com");
});
document.getElementById("profile").addEventListener("click", openProfile);
document.getElementById("schedule").addEventListener("click", openSchedule);
document.getElementById("math").addEventListener("click", openMath);
//# sourceMappingURL=main.js.map
