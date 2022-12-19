let resultDiv = document.getElementById("resultDiv");
let buttons = document.getElementById("buttons");
let selectAllBtn = document.getElementById("selectAll");

function getData() {
  fetch(
    'http://www.filltext.com/?rows=15&fname={firstName}&lname={lastName}&department=["Development","Finance","Administration","Sales","Marketing"]&pretty=true'
  )
    .then((response) => response.json())
    .then((data) => sendData(data));
}

getData();

// This function is responsible for sending the Data to render function 
function sendData(data) {
    
  let categories = data.map((elem) => {
    return elem.department;
  });
  let categorieSet = Array.from(new Set(categories)); // make Set of categories to prevent the duplicate

  for (let i = 0; i < categorieSet.length; i++) {
    let btn = document.createElement("button");
    buttons.appendChild(btn);
    btn.textContent = categorieSet[i];

    btn.addEventListener("click", () => {
      resultDiv.textContent = "";
      let newData = data.filter((elem) => elem.department == categorieSet[i]);
      render(newData);
    });
  }

  render(data);

  selectAllBtn.addEventListener("click", () => {
    resultDiv.textContent = "";
    render(data);
  });
}


// This function is responsible for render the card div element inside the result div
function render(data) {
  data.map((elem) => {
    let divElement = document.createElement("div");
    divElement.className="childDiv"
    resultDiv.appendChild(divElement);

    let h3Element =document.createElement("h3");
    divElement.appendChild(h3Element)
    h3Element.textContent = elem.department;

    let h1Element =document.createElement("h1");
    divElement.appendChild(h1Element)
    h1Element.textContent = elem.fname[0]+elem.lname[0] ;

    let h4Element =document.createElement("h4");
    divElement.appendChild(h4Element)
    h4Element.textContent = elem.fname+" "+elem.lname;
  });
}
