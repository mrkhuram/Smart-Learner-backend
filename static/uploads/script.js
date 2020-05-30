let elmButton = document.querySelector("#submit");

if (elmButton) {
  elmButton.addEventListener(
    "click",
    e => {
      elmButton.setAttribute("disabled", "disabled");

      fetch("/get-oauth-link", {
        method: "GET", 
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.url) {
            window.location = data.url;
            console.log(data.url);
            
          } else {
            elmButton.removeAttribute("disabled");
            elmButton.textContent = "<Something went wrong>";
            console.log("data", data);
          }
        });
    },
    false
  );
}
