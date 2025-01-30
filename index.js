const sampleData = [
  { firstCol: "Row 1", pR: "20%", pS: "30%", pC: "50%" },
  { firstCol: "Row 2", pR: "25%", pS: "35%", pC: "40%" },
  { firstCol: "Row 3", pR: "15%", pS: "25%", pC: "60%" },
  { firstCol: "Row 4", pR: "10%", pS: "40%", pC: "50%" }
];

const sunnyToCloudy = document.getElementById

function populateTable(data) {
  const tableBody = document.querySelector("#results-table tbody") || document.createElement("tbody");

  data.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.firstCol}</td>
      <td>${row.pR}</td>
      <td>${row.pS}</td>
      <td>${row.pC}</td>
    `;
    tableBody.appendChild(tr);
  });

  document.getElementById("results-table").appendChild(tableBody);
}

function simulate(){
  populateTable(sampleData);
}



const matrix3by3 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const matrix3by1 = [
  [1],
  [2],
  [3]
];

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

const resultMatrix = multiplyMatrix(matrix3by3, matrix3by1);
console.log("Result of 3x3 * 3x1 matrix multiplication:", resultMatrix);
