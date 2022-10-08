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
  console.log(data);
  let ip = await fetch("https://api.ipify.org?format=json"); // gets ip address from browser
  let ipData = await ip.json();
  let ipExists = false;
  for (let i = 0; i < data.length; i++) {
    console.log(data[i].ipAddress);
    if (data[i].ipAddress === ipData.ip) {
      ipExists = true;
    }
  }
  if (ipExists) {
    alert("You have already voted");
    submit.disabled = true;
  }
}

//  if checkIp cant run then alert user to try again
checkIp().catch((error) => {
  console.log(error);
  alert("It appears you have adblocker enabled, please disable and try again");
  submit.disabled = true;
});

// if adblocker is on disable submit button
if (typeof ip === "undefined") {
  submit.disabled = true;
}

// on submit button click get values from form and ip address and post to api
submit.addEventListener("click", function () {
  // if nothing is selected alert user to select a time of day
  if (
    !document.getElementById("morning").checked &&
    !document.getElementById("afternoon").checked &&
    !document.getElementById("evening").checked
  ) {
    alert("Please select a time of day");
  } else {
    fetch(ip)
      .then((response) => response.json())
      .then((data) => {
        let ipAddress = data.ip;
        let morning = document.getElementById("morning").value;
        let afternoon = document.getElementById("afternoon").value;
        let evening = document.getElementById("evening").value;

        let user = {
          morning: morning,
          afternoon: afternoon,
          evening: evening,
          ipAddress: ipAddress,
        };

        fetch(apiEndPoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            checkIp();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
  }
});
// API Section - End
