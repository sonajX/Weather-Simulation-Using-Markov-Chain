const sampleData = [
  { firstCol: "Row 1", pR: "20%", pS: "30%", pC: "50%" },
  { firstCol: "Row 2", pR: "25%", pS: "35%", pC: "40%" },
  { firstCol: "Row 3", pR: "15%", pS: "25%", pC: "60%" },
  { firstCol: "Row 4", pR: "10%", pS: "40%", pC: "50%" }
];

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

populateTable(sampleData);
