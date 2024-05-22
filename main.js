// Times Library
const times = {};
if (true) {
  times.timeNum = function (hour, min, sec, ms) {
    if (arguments.length == 0) hour = times.getHr();
    if (arguments.length <= 1) {
      ms = hour[3];
      sec = hour[2];
      min = hour[1];
      hour = hour[0];
    }
    if (!ms) ms = 0;
    if (!sec) sec = 0;
    return ms / 1000 + sec + min * 60 + hour * 3600;
  }
  times.getHr = function (t) {
    let hr, min, sec, ms;
    if (arguments.length == 0) {
      t = new Date();
      hr = t.getHours();
      min = t.getMinutes();
      sec = t.getSeconds();
      ms = t.getMilliseconds();
    } else {
      ms = (t % 1) * 1000;
      t -= ms / 1000;
      sec = (t % 60);
      t -= sec;
      min = (t % 3600) / 60;
      t -= min * 60;
      hr = (t) / 3600;
      t -= hr * 3600;
    }
    return [hr, min, sec, ms];
  }
  times.getDay = function () {
    return new Date().toLocaleDateString();
  }
  times.timeSheet = {
    normal: [
      { name: "Homeroom", startTime: times.timeNum(8, 20), endTime: times.timeNum(8, 27) },
      { name: "1", startTime: times.timeNum(8, 30), endTime: times.timeNum(9, 27) },
      { name: "2", startTime: times.timeNum(9, 30), endTime: times.timeNum(10, 19) },
      { name: "3", startTime: times.timeNum(10, 22), endTime: times.timeNum(11, 11) },
      { name: "4", startTime: times.timeNum(11, 14), endTime: times.timeNum(11, 44) },
      { name: "5", startTime: times.timeNum(11, 47), endTime: times.timeNum(12, 4) },
      { name: "6", startTime: times.timeNum(12, 7), endTime: times.timeNum(12, 37) },
      { name: "7", startTime: times.timeNum(12, 40), endTime: times.timeNum(12, 57) },
      { name: "8", startTime: times.timeNum(13, 0), endTime: times.timeNum(13, 30) },
      { name: "9", startTime: times.timeNum(13, 33), endTime: times.timeNum(14, 23) },
      { name: "10", startTime: times.timeNum(14, 26), endTime: times.timeNum(15, 15) }
    ], set: [
      { name: "Homeroom", startTime: times.timeNum(8, 20), endTime: times.timeNum(8, 27) },
      { name: "SET", startTime: times.timeNum(8, 30), endTime: times.timeNum(9, 7) },
      { name: "1", startTime: times.timeNum(9, 7), endTime: times.timeNum(9, 47) },
      { name: "2", startTime: times.timeNum(9, 49), endTime: times.timeNum(10, 29) },
      { name: "3", startTime: times.timeNum(10, 31), endTime: times.timeNum(11, 11) },
      { name: "4", startTime: times.timeNum(11, 13), endTime: times.timeNum(11, 43) },
      { name: "5", startTime: times.timeNum(11, 45), endTime: times.timeNum(11, 53) },
      { name: "6", startTime: times.timeNum(11, 55), endTime: times.timeNum(12, 25) },
      { name: "7", startTime: times.timeNum(12, 27), endTime: times.timeNum(12, 35) },
      { name: "8", startTime: times.timeNum(12, 37), endTime: times.timeNum(13, 7) },
      { name: "9", startTime: times.timeNum(13, 9), endTime: times.timeNum(13, 49) },
      { name: "10", startTime: times.timeNum(13, 51), endTime: times.timeNum(14, 31) },
      { name: "Club", startTime: times.timeNum(14, 35), endTime: times.timeNum(15, 15) }
    ], half: [
      { name: "Homeroom", startTime: times.timeNum(8, 20), endTime: times.timeNum(8, 27) },
      { name: "1", startTime: times.timeNum(8, 30), endTime: times.timeNum(9, 1) },
      { name: "2", startTime: times.timeNum(9, 4), endTime: times.timeNum(9, 29) },
      { name: "3", startTime: times.timeNum(9, 32), endTime: times.timeNum(9, 57) },
      { name: "9", startTime: times.timeNum(10, 0), endTime: times.timeNum(10, 25) },
      { name: "10", startTime: times.timeNum(10, 28), endTime: times.timeNum(10, 54) },
      { name: "8", startTime: times.timeNum(10, 7), endTime: times.timeNum(11, 17) },
      { name: "7", startTime: times.timeNum(11, 20), endTime: times.timeNum(11, 23) },
      { name: "6", startTime: times.timeNum(11, 26), endTime: times.timeNum(11, 46) },
      { name: "5", startTime: times.timeNum(11, 49), endTime: times.timeNum(11, 52) },
      { name: "4", startTime: times.timeNum(11, 55), endTime: times.timeNum(12, 15) }
    ], delay: [
      { name: "Homeroom", startTime: times.timeNum(0, 0), endTime: times.timeNum(0, 0) },
      { name: "1", startTime: times.timeNum(10, 30), endTime: times.timeNum(11, 9) },
      { name: "2", startTime: times.timeNum(11, 12), endTime: times.timeNum(11, 44) },
      { name: "3", startTime: times.timeNum(11, 47), endTime: times.timeNum(12, 19) },
      { name: "4", startTime: times.timeNum(12, 22), endTime: times.timeNum(12, 52) },
      { name: "5", startTime: times.timeNum(12, 55), endTime: times.timeNum(12, 55) },
      { name: "6", startTime: times.timeNum(12, 58), endTime: times.timeNum(13, 28) },
      { name: "7", startTime: times.timeNum(13, 31), endTime: times.timeNum(13, 31) },
      { name: "8", startTime: times.timeNum(13, 34), endTime: times.timeNum(14, 4) },
      { name: "9", startTime: times.timeNum(14, 7), endTime: times.timeNum(14, 40) },
      { name: "10", startTime: times.timeNum(14, 43), endTime: times.timeNum(15, 15) },
    ]
  };
  times.grades = [
    { name: "6", periods: ["4", "5-6", "7-8"] },
    { name: "7", periods: ["4-5", "6", "7-8"] },
    { name: "8", periods: ["4-5", "6-7", "8"] }
  ];
  times.allBeginning = ["Homeroom", "SET", "1", "2", "3"];
  times.allEnd = ["9", "10", "Club"];

  times.days = {};
  times.grade = 2;
  times.notified = false;
  //day: {normal,set,half,delay}
  //getData: {name, startTime, endTime}

  times.getData = function (time, day, schedule, grade) {
    try {
      if (arguments.length == 0 || time == "") time = times.timeNum();
      if (arguments.length < 2 || day == "") day = times.days[times.getDay()] || "normal";
      if (arguments.length < 3 || schedule == "") schedule = times.timeSheet[day];
      if (arguments.length < 4 || grade == "") grade = times.grade;
      let pd = null;
      let t = times.timeNum();
      if (t >= schedule[0].startTime && t <= schedule[schedule.length - 1].endTime) {
        let gradeFull = JSON.parse(JSON.stringify(times.grades[grade]));
        times.allBeginning.forEach((e, i) => gradeFull.periods.unshift(times.allBeginning[times.allBeginning.length - i - 1]));
        times.allEnd.forEach((e) => gradeFull.periods.push(e));
        gradeFull.periods.forEach((e, i) => {
          let pds = [];
          e.split("-").forEach((pd) => {
            if (schedule.map(s => s.name).includes(pd)) pds.push(schedule[schedule.map(s => s.name).indexOf(pd)]);
          });
          if (pds.length > 0) {
            pds.sort((a, b) => a.startTime - b.startTime);
            let start = pds[0].startTime;
            let end = pds[pds.length - 1].endTime;
            if (t >= start && t <= end) {
              pd = { name: pds.map(p => p.name).join("-"), startTime: start, endTime: end };
            }
          }
        });
        if (pd == null) return { name: "Transition" };
      } else {
        return { name: "Out of School" };
      }
      return { name: pd.name, timeLeft: pd.endTime - t, timeIn: t - pd.startTime };
    } catch (err) { console.error(err) }
  }
  /*  Example Usage:
  setInterval(updateTimes,1000);
  function updateTimes() {
    let t = times.getHr(times.getData().timeLeft);
    let res = [t[0].toString(),t[1].toString(),t[2].toString()];
    if(res[2].length==1) res[2] = `0${res[2]}`;
    if(res[1].length==1) res[1] = `0${res[1]}`;
    document.getElementById("time").innerHTML = res.join(":");
  }
  */
}


const API_URL = 'hcpss.instructure.com/api/v1';
if (!localStorage.getItem("key")) {
  localStorage.setItem("key", 0);
}
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", "[]");
}
if (!localStorage.getItem("prefers")) {
  localStorage.setItem("prefers", JSON.stringify({
    complexGrades: false,
    complexTodo: false,
    storeMessages: false,
    storedMessages: {},
    schedule: "normal",
    grade: 2
  }));
}
window.profileLoaded = false;
const mathSymbols = [
  { symbol: "△", search: "triangle", name: "triangle" },
  { symbol: "∠", search: "angle", name: "angle" },
  { symbol: "±", search: "plus/minus +-", name: "plus/minus" },
  { symbol: "≠", search: "not equal != inequality", name: "not equal" },
  { symbol: "≅", search: "congruent =", name: "congruent" },
  { symbol: "≈", search: "approximately equal about equal = similar", name: "similar" },
  { symbol: "º", search: "^0 to the 0 superscript 0", name: "superscript 0" },
  { symbol: "¹", search: "^1 to the 1 superscript 1", name: "superscript 1" },
  { symbol: "²", search: "^2 to the 2 superscript 2 squared", name: "superscript 2" },
  { symbol: "³", search: "^3 to the 3 superscript 3 cubed", name: "superscript 3" },
  { symbol: "⁴", search: "^4 to the 4 superscript 4", name: "superscript 4" },
  { symbol: "⁵", search: "^5 to the 5 superscript 5", name: "superscript 5" },
  { symbol: "⁶", search: "^6 to the 6 superscript 6", name: "superscript 6" },
  { symbol: "⁷", search: "^7 to the 7 superscript 7", name: "superscript 7" },
  { symbol: "⁸", search: "^8 to the 8 superscript 8", name: "superscript 8" },
  { symbol: "⁹", search: "^9 to the 9 superscript 9", name: "superscript 9" },
  { symbol: "⁺", search: "superscript plus exponent^+", name: "superscript +" },
  { symbol: "⁻", search: "superscript minus exponent superscript negative exponent ^-", name: "superscript -" },
  { symbol: "⁽", search: "superscript parentheses exponent parentheses ^(", name: "superscript (" },
  { symbol: "⁾", search: "superscript parentheses exponent parentheses ^)", name: "superscript )" },
  { symbol: "≥", search: "greater than or equal to >=", name: "greater than or equal to" },
  { symbol: "≤", search: "less than or equal to <=", name: "less than or equal to" },
  { symbol: "×", search: "times x * multiply", name: "times x" },
  { symbol: "⋅", search: "times x * multiply", name: "times dot" },
  { symbol: "÷", search: "divided by /", name: "divided" },
  { symbol: "°", search: "degrees *", name: "degrees" },
  { symbol: "∞", search: "infinity", name: "infinity" },
  { symbol: "∥", search: "parallel to ||", name: "parallel" },
  { symbol: "⊥", search: "perpendicular to -|-", name: "perpendicular" },
  { symbol: "√", search: "sqrt square root", name: "square root" },

  { symbol: "α", search: "greek letter", name: "lowercase alpha" },
  { symbol: "β", search: "greek letter", name: "lowercase beta" },
  { symbol: "γ", search: "greek letter", name: "lowercase gamma" },
  { symbol: "δ", search: "greek letter", name: "lowercase delta" },
  { symbol: "ε", search: "greek letter", name: "lowercase epsilon" },
  { symbol: "ζ", search: "greek letter", name: "lowercase zeta" },
  { symbol: "η", search: "greek letter", name: "lowercase eta" },
  { symbol: "θ", search: "greek letter", name: "lowercase theta" },
  { symbol: "ι", search: "greek letter", name: "lowercase iota" },
  { symbol: "κ", search: "greek letter", name: "lowercase kappa" },
  { symbol: "λ", search: "greek letter", name: "lowercase lambda" },
  { symbol: "μ", search: "greek letter", name: "lowercase mu" },
  { symbol: "ν", search: "greek letter", name: "lowercase nu" },
  { symbol: "ξ", search: "greek letter", name: "lowercase xi" },
  { symbol: "ο", search: "greek letter", name: "lowercase omicron" },
  { symbol: "π", search: "greek letter", name: "lowercase pi" },
  { symbol: "ρ", search: "greek letter", name: "lowercase rho" },
  { symbol: "σ", search: "greek letter", name: "lowercase sigma" },
  { symbol: "τ", search: "greek letter", name: "lowercase tau" },
  { symbol: "υ", search: "greek letter", name: "lowercase upsilon" },
  { symbol: "φ", search: "greek letter", name: "lowercase phi" },
  { symbol: "χ", search: "greek letter", name: "lowercase chi" },
  { symbol: "ψ", search: "greek letter", name: "lowercase psi" },
  { symbol: "ω", search: "greek letter", name: "lowercase omega" },

  { symbol: "Α", search: "greek letter", name: "uppercase alpha" },
  { symbol: "Β", search: "greek letter", name: "uppercase beta" },
  { symbol: "Γ", search: "greek letter", name: "uppercase gamma" },
  { symbol: "Δ", search: "greek letter", name: "uppercase delta" },
  { symbol: "Ε", search: "greek letter", name: "uppercase epsilon" },
  { symbol: "Ζ", search: "greek letter", name: "uppercase zeta" },
  { symbol: "Η", search: "greek letter", name: "uppercase eta" },
  { symbol: "Θ", search: "greek letter", name: "uppercase theta" },
  { symbol: "Ι", search: "greek letter", name: "uppercase iota" },
  { symbol: "Κ", search: "greek letter", name: "uppercase kappa" },
  { symbol: "Λ", search: "greek letter", name: "uppercase lambda" },
  { symbol: "Μ", search: "greek letter", name: "uppercase mu" },
  { symbol: "Ν", search: "greek letter", name: "uppercase nu" },
  { symbol: "Ξ", search: "greek letter", name: "uppercase xi" },
  { symbol: "Ο", search: "greek letter", name: "uppercase omicron" },
  { symbol: "Π", search: "greek letter", name: "uppercase pi" },
  { symbol: "Ρ", search: "greek letter", name: "uppercase rho" },
  { symbol: "Σ", search: "greek letter", name: "uppercase sigma" },
  { symbol: "Τ", search: "greek letter", name: "uppercase tau" },
  { symbol: "Υ", search: "greek letter", name: "uppercase upsilon" },
  { symbol: "Φ", search: "greek letter", name: "uppercase phi" },
  { symbol: "Χ", search: "greek letter", name: "uppercase chi" },
  { symbol: "Ψ", search: "greek letter", name: "uppercase psi" },
  { symbol: "Ω", search: "greek letter", name: "uppercase omega" },
  //  {symbol:"",search:"greek letter",name:""},
];

const API_TOKEN = localStorage.getItem("key");
times.days[times.getDay()] = JSON.parse(localStorage.getItem("prefers")).schedule;
times.grade = JSON.parse(localStorage.getItem("prefers")).grade;
if (typeof times.grade == "undefined") setGrade(2);
if (Notification.permission != "granted") Notification.requestPermission();

//Assignments
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
      let elem = document.createElement("div");
      elem.setAttribute("class", "item");
      elem.setAttribute("onclick", `window.open("${e.html_url.split("#")[0]}","_blank").focus()`);
      let eClass = date.getTime() - Date.now() < 0 ? "missing" : (date.getDate() == new Date().getDate() ? "today" : "later");
      elem.innerHTML = `<h2>${e2.name}</h2><p>${e2.course}</p><p class="${eClass}">${e2.due}</p>`;
      document.getElementById("todo").append(elem);
    });
  } else {
    let elem = document.createElement("p");
    elem.innerHTML = assignments.errors.map(e => e.message).join("</p><p>");
    document.getElementById("todo").append(elem);
  }
}, (err) => {
  document.getElementById("todo").innerHTML += `<p>${err.stack}</p>`;
});

getData("users/self/favorites/courses", "per_page=100", (courses) => {
  if (!courses.errors) {
    getData("announcements", `context_codes[]=course_${courses.map(e => e.id).join("&context_codes[]=course_")}`, (announcements) => {
      if (!announcements.errors) {
        announcements.forEach((e) => {
          let elem = document.createElement("div");
          elem.setAttribute("class", "item");
          //elem.setAttribute("onclick", `window.open("${e.url}","_blank").focus()`);
          elem.addEventListener("click", () => {
            popup(`<iframe src="data:text/html,${encodeURIComponent(e.message)}" frameborder=0>`, `${e.title} - ${e.author.display_name}`);
          });
          let m = e.message.replaceAll(/<[^>]*>/ig, " ").replaceAll("&nbsp;", " ").replaceAll("↵", " ").trim();
          elem.innerHTML = `<h2>${e.title}</h2><p>${e.author.display_name}</p><p>${new Date(e.created_at).toLocaleString("en", { timeStyle: "short", dateStyle: "full" })}</p><p>${m.substring(0, 150)}${m.length > 150 ? "..." : ""}</p>`;
          document.getElementById("announcements").append(elem);
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
    let elem = "<p>" + courses.errors.map(e => e.message).join("</p><p>") + "</p>";
    document.getElementById("announcements").innerHTML += elem;
    document.getElementById("grades").innerHTML += elem;
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
    let elem = document.createElement("div");
    elem.setAttribute("class", "item");
    elem.setAttribute("onclick", `window.open("https://hcpss.instructure.com/courses/${course.id}/#grades","_blank").focus()`);
    let width = "min(calc(25vw - 77px), 250px)";
    elem.innerHTML = `<h2>${name}</h2><p>${score == null ? "N/A" : (score + "%")}</p>${score == null ? "" : `<div class="gradeDisplayBg" style="width:${width}"><div class="gradeDisplay ${score <= 67.5 ? "gradeTerrible" : score <= 77.5 ? "gradeReallyBad" : score <= 87.5 ? "gradeBad" : score <= 95 ? "gradeMid" : "gradeGood"}" style="width:calc(${width} * ${Math.min(score, 100) / 100})"></div></div>`}`;
    document.getElementById("grades").append(elem);
  });
}, (err) => { console.error(err) });

getData("conversations", "per_page=10", (convos) => {
  if (!convos.errors) {
    if (JSON.parse(localStorage.getItem("prefers")).storeMessages) {
      for (let id in JSON.parse(localStorage.getItem("prefers")).storedMessages) {
        let e = JSON.parse(localStorage.getItem("prefers")).storedMessages[id];
        console.log(e);
        if (!convos.find(e2 => e2.id == id)) {
          let f = JSON.parse(localStorage.getItem("prefers"));
          delete f.storedMessages[id];
          localStorage.setItem("prefers", JSON.stringify(f));
        }
      }
    }
    convos.forEach((e) => {
      let elem = document.createElement("div");
      elem.setAttribute("class", "item " + e.workflow_state);
      //elem.setAttribute("onclick", `window.open("https://hcpss.instructure.com/conversations","_blank").focus()`);
      elem.onclick = function () {
        if (Object.hasOwn(JSON.parse(localStorage.getItem("prefers")).storedMessages, e.id)) {
          let mess = JSON.parse(localStorage.getItem("prefers")).storedMessages[e.id]
          popup(mess.html, mess.subject);
        } else {
          popup("", "loading...");
          getData(`conversations/${e.id}`, "", (convo) => {
            removePopup();
            console.log(convo);
            let ms = convo.messages.sort((a, b) => { return new Date(a.created_at).getTime() - new Date(b.created_at).getTime() });
            let html = `<p>${ms.map(e2 => convo.participants.find(f => { return f.id == e2.author_id }).name + "<br>" + e2.body).join("</p><p>")}</p>`;
            popup(html, convo.subject);
            let pre = JSON.parse(localStorage.getItem("prefers"));
            pre.storedMessages[e.id] = { html: html, subject: convo.subject };
            localStorage.setItem("prefers", JSON.stringify(pre));
          });
        }
      };
      elem.innerHTML = `<h2>${e.subject}</h2><p>${e.context_name}</p><p>${new Date(e.last_message_at).toLocaleString("en", { timeStyle: "short", dateStyle: "full" })}</p><p>${e.last_message}</p>`;
      document.getElementById("inbox").append(elem);
    });
  } else {
    let elem = document.createElement("p");
    elem.innerHTML = convos.errors.map(e => e.message).join("</p><p>");
    document.getElementById("inbox").append(elem);
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

/*getData("accounts/self/grading_periods", "per_page=100", (e) => {
  console.log(e);
});
*/
function getData(loc, inputs, callback, error) {
  fetch(`https://corsanywhere.vercel.app/${API_URL}/${loc}?access_token=${API_TOKEN}${inputs.length > 0 ? "&" + inputs : ""}`, {
    "body":
      JSON.stringify({
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9,es;q=0.8",
          "cache-control": "no-cache",
          "pragma": "no-cache",
          "prefer": "safe",
          "sec-ch-ua": "\"Microsoft Edge\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site"
        }
      }),
    "referrerPolicy": "same-origin",
    "method": "GET",
    "body": null,
    "mode": "cors",
    "credentials": "omit",
    "origin": "cam0studios.github.io"
  })
    .then(r => r.json()).then(callback)
    .catch((err) => {
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
  let popup = document.createElement("div");
  popup.setAttribute("class", "popup");
  popup.innerHTML = `<h2 class="popupHeader">${name}</h2><hr/><div class="popupContent">${content}</div>`;
  let popupClose = document.createElement("span");
  popupClose.setAttribute("class", "material-symbols-outlined popupClose");
  popupClose.addEventListener("click", () => {
    if (remove) remove();
    removePopup();
  });
  popupClose.innerHTML = "close";
  popup.append(popupClose);
  document.body.prepend(popupBg);
  document.body.append(popup);
}

setInterval(() => {
  [...document.getElementsByClassName("timeLeft")].forEach((e) => {
    if (times.getData().timeLeft) {
      e.innerHTML = getTime();
    } else {
      e.innerHTML = "N/A";
    }
  });
  [...document.getElementsByClassName("period")].forEach((e) => {
    e.innerHTML = times.getData().name;
  });
  if (times.getData().timeLeft > 120) times.notified = false;
  if (times.getData().timeLeft < 60 && !times.notified) {
    console.log("notify");
    times.notified = true;
    if (Notification.permission == "granted") new Notification("1 minute left!", { body: `You have 1 minute left in period ${times.getData().name}` });
  }
}, 1000);
function getTime() {
  let t = times.getHr(times.getData().timeLeft);
  let res = [t[0].toString(), t[1].toString(), t[2].toString()];
  if (res[2].length == 1) res[2] = `0${res[2]}`;
  if (res[1].length == 1) res[1] = `0${res[1]}`;
  return res.join(":");
}
function openSchedule() {
  popup(`
  <p>Time left in <span class="period">0</span>: <span class="timeLeft">0:00:00</span></p>
  <p>Today's Schedule: ${times.days[times.getDay()] || "normal"}</p>
  <p>Set schedule to:
  <button onclick="setToday('normal')">Normal</button>
  <button onclick="setToday('set')">SET/Club (Monday)</button>
  <button onclick="setToday('half')">Half Day</button>
  <button onclick="setToday('delay')">2 Hour Delay</button>
  </p>
  <p>Grade: ${times.grades[times.grade].name}</p>
  <p>Set grade to:
  <select id="setGrade" onchange="setGrade(document.getElementById('setGrade').value)">
  <option value="${times.grades.map((e, i) => `${i}" ${i == times.grade ? "selected" : ""}>${e.name}`).join(`</option><option value="`)}</option>
  </select>
  </p>
  `, "Schedule");
}
function openProfile() {
  let content = "";
  if (window.profileLoaded) {
    content += `
    <p>User: ${window.profile.name} (${window.profile.pronouns})</p>
    <br>
    <button onclick="localStorage.setItem('key',null);location.reload()">Sign Out</button>
    <br>
    <button onclick="elem=document.createElement('p');elem.innerHTML='Token: ${localStorage.getItem("key")}';document.querySelector('.popup').append(elem);document.querySelector('#viewToken').remove()" id="viewToken">View API Token</button>
    <br>
    <button onclick="copy('${localStorage.getItem("key")}')">Copy Token</button>
    <br>
    <br>`;
  } else {
    content += `
    <button id="viewToken" onclick="elem=document.createElement('p');elem.innerHTML='Token: ${localStorage.getItem("key")}';document.querySelector('.popup').append(elem);document.querySelector('#viewToken').remove()" id="viewToken">View API Token</button>
    <br/><br/>
    `;
    JSON.parse(localStorage.getItem("users")).forEach((e, i) => {
      content += `<div id="user${i}"><button onclick="localStorage.setItem('key','${e.key}');location.reload()">${e.name}</button> <button onclick="p=JSON.parse(localStorage.getItem('users'));p.splice(${i},1);localStorage.setItem('users',JSON.stringify(p));document.getElementById('user${i}').remove()">x</button> </div>`;
    });
    content += `
    <button onclick="p=JSON.parse(localStorage.getItem('users'));p.push({name:prompt('name'),key:prompt('token')});localStorage.setItem('users',JSON.stringify(p));location.reload()">Add user</button>
    <br/>
    <button onclick='localStorage.setItem("key", prompt("API Token?"));location.reload()'>Sign in</button>
    <br/>
    <h2>How to generate a token:</h2>
    <p>Go to Canvas and click your profile picture, hit Settings. Once the page loads, scroll down and hit New Access Token. Set the purpose to anything you like, and hit Generate. Copy the long string of text (ex: 1234~qwertyuiop...) and paste it into the sign in prompt here.</p>
    `;
  }
  content += `
  <br/>
  <input type="checkbox" name="storeMsgCheck" id="storeMessagesCheck"></input>
  <label for="storeMsgCheck">Store Messages</label>
  <br>
  <button id="clearMessagesBtn">Clear Cached Messages</button/>
  `;
  popup(content, "Settings", () => {
    let f = JSON.parse(localStorage.getItem("prefers"));
    f.storeMessages = document.getElementById("storeMessagesCheck").checked;
    localStorage.setItem("prefers", JSON.stringify(f));
  });
  document.getElementById("storeMessagesCheck").checked = JSON.parse(localStorage.getItem("prefers")).storeMessages;
  if (!JSON.parse(localStorage.getItem("prefers")).storeMessages) {
    document.getElementById("clearMessagesBtn").remove();
    let f = JSON.parse(localStorage.getItem("prefers"));
    f.storedMessages = {};
    localStorage.setItem("prefers", JSON.stringify(f));
  } else {
    document.getElementById("clearMessagesBtn").addEventListener("click", () => {
      let f = JSON.parse(localStorage.getItem("prefers"));
      f.storedMessages = {};
      localStorage.setItem("prefers", JSON.stringify(f));
    });
  }
}
function openMath() {
  let p = "";
  mathSymbols.forEach((e) => {
    p += `<button id="math${e.symbol}" class="mathSymbol" title="${e.name}" onclick="copy('${e.symbol}')">${e.symbol}</button>`;
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
          <p>A = sin⁻¹ ( a sin B / b )</p>
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
          <p>a² = b² + c² - 2bc cos A</p>
          <p>a = √<span style="text-decoration:overline">b² + c² - 2bc cos A</span></p>
          <p>A = cos⁻¹ ((b² + c² - a²) / 2bc)</p>
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
  let equations = [
    [  //Law of Sines
      { solve: (b, A, B) => (b * Math.sin(A)) / Math.sin(B), in: ["b", "A", "B"], out: "a" }, // solve for side a
      { solve: (a, b, B) => Math.asin((a * Math.sin(B)) / b), in: ["a", "b", "B"], out: "A" } // solve for angle A
    ],
    [  //Law of Cosines
      { solve: (b, c, A) => Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(A)), in: ["b", "c", "A"], out: "a" }, // solve for side a
      { solve: (a, b, c) => Math.acos((b * b + c * c - a * a) / (2 * b * c)), in: ["a", "b", "c"], out: "A" } // solve for angle A
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
        let r =
          isNaN(parseFloat(v)) ? NaN : (n.toLowerCase() === n ? parseFloat(v) : parseFloat(v) * (t ? (180 / Math.PI) : (Math.PI / 180)));
        return r;
      }
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
    let elem = document.getElementById("math" + e.symbol);
    if (elem) {
      if (e.search.includes(document.getElementById("mathSearch").value) || e.name.includes(document.getElementById("mathSearch").value)) {
        elem.style.display = "inline";
      } else {
        elem.style.display = "none";
      }
    }
  });
}
function copy(val) {
  navigator.clipboard.writeText(val);
}
function setToday(val) {
  times.days[times.getDay()] = val;
  let prefers = JSON.parse(localStorage.getItem("prefers"));
  prefers.schedule = val;
  localStorage.setItem("prefers", JSON.stringify(prefers));
}
function setGrade(val) {
  times.grade = val;
  let prefers = JSON.parse(localStorage.getItem("prefers"));
  prefers.grade = val;
  localStorage.setItem("prefers", JSON.stringify(prefers));
}