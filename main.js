//Page Body
let body = document.getElementById("body");
let submit = document.getElementById("submit");

//Morning
let morning = document.getElementById("morning");
let morningValue = document.getElementById("morning").value;
morning.addEventListener("click", function () {
  body.classList.add("yellow");
  //   fade in background to yellow over 3 seconds
  if (body.classList.contains("orange") || body.classList.contains("blue")) {
    body.classList.remove("orange", "blue");
  }
  //   fade in background to yellow over 3 seconds
  body.style.transition = "background-color 3s ease-in-out";
  body.style.backgroundColor = "yellow";
  body.style.color = "black";
});

//Afternoon
let afternoon = document.getElementById("afternoon");
let afternoonValue = document.getElementById("afternoon").value;
afternoon.addEventListener("click", function () {
  body.classList.add("orange");
  //   fade in background to orange over 3 seconds
  if (body.classList.contains("yellow") || body.classList.contains("blue")) {
    body.classList.remove("yellow", "blue");
  }
  //   fade in background to orange over 3 seconds
  body.style.transition = "background-color 3s ease-in-out";
  body.style.backgroundColor = "orange";
  body.style.color = "black";
});

//Evening
let evening = document.getElementById("evening");
let eveningValue = document.getElementById("evening").value;
evening.addEventListener("click", function () {
  body.classList.add("blue");
  //   fade in background to blue over 3 seconds
  if (body.classList.contains("yellow") || body.classList.contains("orange")) {
    body.classList.remove("yellow", "orange");
  }
  //   fade in background to blue over 3 seconds
  body.style.transition = "background-color 3s ease-in-out";
  body.style.backgroundColor = "blue";
  body.style.color = "white";
});

// on click of submit button get values from form, and ip address and post to api

// API Section - Begin
let apiEndPoint =
  "https://62c85d578c90491c2cb47da3.mockapi.io/Promineo_Tech_API/users"; // api endpoint

// let ip = "https://api.ipify.org?format=json"; // gets ip address from browser

// async await function to check if ip address exists in api then prevent from posting to api and clicking on submit button
async function checkIp() {
  console.log("checkIp function called");
  let response = await fetch(apiEndPoint);
  let data = await response.json();
  //   console.log(data);
  let ip = await fetch("https://api.ipify.org?format=json"); // gets ip address from browser
  let ipData = await ip.json();
  let ipExists = false;
  for (let i = 0; i < data.length; i++) {
    // console.log(data[i].ipAddress);
    if (data[i].ipAddress === ipData.ip) {
      ipExists = true;
    }
  }
  if (ipExists) {
    // alert("You have already voted");
    submit.disabled = true;
  } else {
    submit.disabled = false;
    return;
  }
}

//  if checkIp cant run then alert user to try again
checkIp().catch((error) => {
  console.log(error);
  alert("It appears you have adblocker enabled, please disable and try again");
  submit.disabled = true;
});

//if adblocker is on disable submit button
if (typeof ip === "undefined") {
  submit.disabled = true;
}

// on submit button click get values from form and ip address and post to api
submit.addEventListener("click", function () {
  // if nothing is selected alert user to select a time of day
  getIp();
  // async await getIp function
  async function getIp() {
    let ip = await fetch("https://api.ipify.org?format=json"); // gets ip address from browser
    let ipData = await ip.json();
    ip = ipData.ip;

    if (
      !document.getElementById("morning").checked &&
      !document.getElementById("afternoon").checked &&
      !document.getElementById("evening").checked
    ) {
      alert("Please select a time of day");
    } else if (document.getElementById("morning").checked) {
      // if morning is selected post to api
      console.log("morning ip", ip);
      fetch(apiEndPoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timeOfDay: morningValue,
          ipAddress: ip,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Thank you for voting");
          checkIp();
          // console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else if (document.getElementById("afternoon").checked) {
      // if afternoon is selected post to api
      console.log("afternoon ip:", ip);
      fetch(apiEndPoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timeOfDay: afternoonValue,
          ipAddress: ip,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Thank you for voting");
          checkIp();
          // console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else if (document.getElementById("evening").checked) {
      // if evening is selected post to api
      console.log("evening ip:", ip);
      fetch(apiEndPoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timeOfDay: eveningValue,
          ipAddress: ip,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Thank you for voting");
          checkIp();
          // console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
});
// API Section - End
