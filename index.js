const sampleTableData = [
  { firstCol: "Row 1", pR: "20%", pS: "30%", pC: "50%" },
  { firstCol: "Row 2", pR: "25%", pS: "35%", pC: "40%" },
  { firstCol: "Row 3", pR: "15%", pS: "25%", pC: "60%" },
  { firstCol: "Row 4", pR: "10%", pS: "40%", pC: "50%" }
];

const sampleMatrix3by3 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const sampleMatrix3by1 = [
  [1],
  [2],
  [3]
];

function simulate(){
  if(!fieldValidation()){
    clearTable();
    return;
  }
  clearTable();
  populateTable(computeNthDay());
}

function clearTable(){
  document.getElementById("results-table").innerHTML = `
    <thead>
      <tr>
        <th>Day</th>
        <th>P%Sunny</th>
        <th>P%Cloudy</th>
        <th>P%Rainy</th>
      </tr>
    </thead>
  `;
}

function populateTable(data) {
  const tableBody = document.querySelector("#results-table tbody") || document.createElement("tbody");

  data.forEach((row, index) => {
    setTimeout(() => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.firstCol}</td>
        <td>${row.pR}</td>
        <td>${row.pS}</td>
        <td>${row.pC}</td>
      `;
      tableBody.appendChild(tr);
    }, index * 250);
  });

  document.getElementById("results-table").appendChild(tableBody);
}

function multiplyMatrix(probabilityMatrix, initialState) {
  const result = [];
  
  for (let i = 0; i < 3; i++) {
    let sum = 0;
    for (let j = 0; j < 3; j++) {
      sum += probabilityMatrix[i][j] * initialState[j][0];
    }
    result.push([sum]);
  }
  
  return result;
}

function probabilityMatrix(){
  const matrix = [];
  const ss = document.getElementById("js-sunny-sunny").value;
  const sc = document.getElementById("js-sunny-cloudy").value;
  const sr = document.getElementById("js-sunny-rainy").value;
  const cs = document.getElementById("js-cloudy-sunny").value;
  const cc = document.getElementById("js-cloudy-cloudy").value;
  const cr = document.getElementById("js-cloudy-rainy").value;
  const rs = document.getElementById("js-rainy-sunny").value;
  const rc = document.getElementById("js-rainy-cloudy").value;
  const rr = document.getElementById("js-rainy-rainy").value;

  matrix.push([ss, cs, rs]);
  matrix.push([sc, cc, rc]);
  matrix.push([sr, cr, rr]);

  return matrix;
}

function initialState(){
  const initialState = [];
  const s = document.getElementById("js-sunny-start").value;
  const c = document.getElementById("js-cloudy-start").value;
  const r = document.getElementById("js-rainy-start").value;

  initialState.push([s]);
  initialState.push([c]);
  initialState.push([r]);

  return initialState;
}

function insertSampleFormData(){
  document.getElementById("js-sunny-sunny").value = 0.6;
  document.getElementById("js-sunny-cloudy").value = 0.3;
  document.getElementById("js-sunny-rainy").value = 0.1;

  document.getElementById("js-cloudy-sunny").value = 0.3;
  document.getElementById("js-cloudy-cloudy").value = 0.4;
  document.getElementById("js-cloudy-rainy").value = 0.3;

  document.getElementById("js-rainy-sunny").value = 0.7;
  document.getElementById("js-rainy-cloudy").value = 0.2;
  document.getElementById("js-rainy-rainy").value = 0.1;

  document.getElementById("js-sunny-start").value = 0;
  document.getElementById("js-cloudy-start").value = 0;
  document.getElementById("js-rainy-start").value = 1;
  document.getElementById("js-days").value = 10;
}

insertSampleFormData();

function computeNthDay(){
  const tempArray = [];

  const n = document.getElementById("js-days").value || 0;
  let result = initialState();
  for(let i = 1; i <= n; i++){
    result = multiplyMatrix(probabilityMatrix(), result);
    tempArray.push({ 
      firstCol: "Day " + i, 
      pR: result[0][0].toFixed(15),
      pS: result[1][0].toFixed(15),
      pC: result[2][0].toFixed(15)
    });
  }
  console.log(tempArray);
  return tempArray;
}

function fieldValidation(){
  const ss = parseFloat(document.getElementById("js-sunny-sunny").value) * 100;
  const sc = parseFloat(document.getElementById("js-sunny-cloudy").value) * 100;
  const sr = parseFloat(document.getElementById("js-sunny-rainy").value) * 100;
  const cs = parseFloat(document.getElementById("js-cloudy-sunny").value) * 100;
  const cc = parseFloat(document.getElementById("js-cloudy-cloudy").value) * 100;
  const cr = parseFloat(document.getElementById("js-cloudy-rainy").value) * 100;
  const rs = parseFloat(document.getElementById("js-rainy-sunny").value) * 100;
  const rc = parseFloat(document.getElementById("js-rainy-cloudy").value) * 100;
  const rr = parseFloat(document.getElementById("js-rainy-rainy").value) * 100;

  const sunny = (ss + sc + sr) / 100;
  const cloudy = (cs + cc + cr) / 100;
  const rainy = (rs + rc + rr) / 100;

  if(sunny != 1){
    alert("Sum of probabilities for Sunny should be equal to 1, Sunny = " + sunny);
    return false;
  } else if(cloudy != 1){
    alert("Sum of probabilities for Cloudy should be equal to 1, Cloudy = " + cloudy); ;
    return false;
  } else if(rainy != 1){
    alert("Sum of probabilities for Rainy should be equal to 1, Rainy = " + rainy);
    return false;
  }

  const s = parseFloat(document.getElementById("js-sunny-start").value) * 100;
  const c = parseFloat(document.getElementById("js-cloudy-start").value) * 100;
  const r = parseFloat(document.getElementById("js-rainy-start").value) * 100;
  const initialState = (s + c + r) / 100;
  if(initialState != 1){
    alert("Sum of probabilities for Initial State should be equal to 1, Initial State = " + initialState);
    return false;
  }
  return true;
}