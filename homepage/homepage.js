document.addEventListener("DOMContentLoaded", function () {
  const crewForm = document.getElementById("crewForm");
  const crewTable = document.getElementById("crewTable");

  localStorage.setItem(
    "crewData",
    JSON.stringify([
      { name: "Lauren", age: 23, email: "lauren@example.com" },
      { name: "Hayley", age: 29, email: "Hayley@example.com" },
      { name: "Jared", age: 25, email: "Jared@example.com" },
    ])
  );

  function showCrewData() {
    const crewData = JSON.parse(localStorage.getItem("crewData")) || [];

    let tableHTML = "";
    crewData.forEach((crew, index) => {
      const { name, age, email } = crew;
      tableHTML += `
        <tr>
          <td>${name}</td>
          <td>${age}</td>
          <td>${email}</td>
          <td>
            <button class="btn btn-outline-secondary btn-sm btnUpdate" data-index="${index}">Edit</button>
            <button class="btn btn-outline-danger btn-sm btnDelete" data-index="${index}">Delete</button>
          </td>
        </tr>
      `;
    });

    crewTable.innerHTML = tableHTML;
  }

  function addCrewData(name, age, email) {
    const crewData = JSON.parse(localStorage.getItem("crewData")) || [];
    crewData.push({ name, age, email });
    localStorage.setItem("crewData", JSON.stringify(crewData));
    showCrewData();
  }

  function updateCrewData(index) {
    const crewData = JSON.parse(localStorage.getItem("crewData"));
    const crew = crewData[index];

    const newName = prompt("Enter new name:", crew.name);
    const newAge = parseInt(prompt("Enter new age:", crew.age), 10);
    const newEmail = prompt("Enter new email:", crew.email);

    if (newName && !isNaN(newAge) && newEmail) {
      crewData[index] = {
        name: newName,
        age: newAge,
        email: newEmail,
      };
      localStorage.setItem("crewData", JSON.stringify(crewData));
      showCrewData();
    } else {
      alert("Invalid input. Please enter valid data.");
    }
  }

  function deleteCrewData(index) {
    const crewData = JSON.parse(localStorage.getItem("crewData"));
    const newCrewData = crewData.filter((_, i) => i !== index);
    localStorage.setItem("crewData", JSON.stringify(newCrewData));
    showCrewData();
  }

  crewForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const email = document.getElementById("email").value;

    addCrewData(name, age, email);
    crewForm.reset();
  });

  crewTable.addEventListener("click", function (event) {
    const target = event.target;
    if (target.matches(".btnUpdate")) {
      const index = parseInt(target.getAttribute("data-index"), 10);
      updateCrewData(index);
    } else if (target.matches(".btnDelete")) {
      const index = parseInt(target.getAttribute("data-index"), 10);
      deleteCrewData(index);
    }
  });

  showCrewData();
});
