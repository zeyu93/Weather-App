console.log("yo");

let input = document.getElementById("input");
let form = document.querySelector("form");
let p = document.querySelector("p")

form.addEventListener("submit", e => {
  e.preventDefault();

  fetch(`http://localhost:3000/weather?address=${input.value}`)
    .then(response => {
      response.json().then(data => {
        if (data.error) {
          console.log("err,", data.error);
        } else {
          console.log("data", data);
          const {temperature, location, feelslike} = data
          p.textContent = `in ${location} it feels like ${feelslike} but it is ${temperature}`
        }
      });
    })
    .catch(e => console.log(e, "failed request"));
});
