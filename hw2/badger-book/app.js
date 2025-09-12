let allStudents = [];

async function fecthData() {
  try {
    const response = await fetch("https://cs571.org/rest/s25/hw2/students", {
      headers: {
        "X-CS571-ID": CS571.getBadgerId(),
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! HTTP status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error:", error.message);
    throw error;
  }
}

function buildStudents(studs) {
  // TODO This function is just a suggestion! I would suggest calling it after
  //      fetching the data or performing a search. It should populate the
  //      index.html with student data by using createElement and appendChild.
  const studentsHTML = document.getElementById("students");
  studentsHTML.innerHTML = "";
  for (let index = 0; index < studs.length; index++) {
    const student = studs[index];

    const studentHTML = document.createElement("div");
    studentHTML.classList.add("col-12", "col-md-6", "col-lg-4", "col-xl-3");

    const fullName = document.createElement("h1");
    const major = document.createElement("h3");
    const introduction = document.createElement("p");

    const intrestsHTML = document.createElement("div");
    const intrestsSummary = document.createElement("p");
    const intrestsList = document.createElement("ul");

    fullName.innerText = `${student.name.first} ${student.name.last}`;
    major.innerText = student.major;
    introduction.innerText = `${student.name.first} is taking ${
      student.numCredits
    } credits and ${
      student.fromWisconsin ? "is from Wisconsin" : "is not from Wisconsin"
    }.`;

    intrestsSummary.innerText = `They have ${student.interests.length} including...`;
    student.interests?.forEach((interest) => {
      const intrestItem = document.createElement("li");
      const intrestSpan = document.createElement("span");

      //intrestItem.innerText = interest;
      intrestSpan.style.cursor = "pointer";
      intrestSpan.innerText = interest;
      intrestSpan.addEventListener("click", (e) => {
        e.preventDefault();
        performIntrestSearch(interest);
        //console.log("clicked intrest", interest);
      });
      intrestItem.appendChild(intrestSpan);
      intrestsList.appendChild(intrestItem);
    });

    studentHTML.appendChild(fullName);
    studentHTML.appendChild(major);
    studentHTML.appendChild(introduction);

    intrestsHTML.appendChild(intrestsSummary);
    intrestsHTML.appendChild(intrestsList);
    studentHTML.appendChild(intrestsHTML);

    studentsHTML.appendChild(studentHTML);
  }
}

function studentsNumber(num) {
  document.getElementById("num-results").innerText = num;
}

fecthData().then((data) => {
  allStudents = data;
  const studsNumber = data.length;
  studentsNumber(studsNumber);
  buildStudents(data);
});

function handleSearch(e) {
  e?.preventDefault(); // You can ignore this; prevents the default form submission!
  // TODO Implement the search
  function getSearchTerms() {
    return {
      name: document.getElementById("search-name").value.trim().toLowerCase(),
      major: document.getElementById("search-major").value.trim().toLowerCase(),
      interest: document
        .getElementById("search-interest")
        .value.trim()
        .toLowerCase(),
    };
  }

  function studentMatchesSearch(student, searchTerms) {
    if (searchTerms.name) {
      const fullName =
        `${student.name.first} ${student.name.last}`.toLowerCase();
      if (!fullName.includes(searchTerms.name)) {
        return false;
      }
    }

    if (searchTerms.major) {
      if (!student.major.toLowerCase().includes(searchTerms.major)) {
        return false;
      }
    }

    if (searchTerms.interest) {
      if (
        !student.interests.some((interest) =>
          interest.toLowerCase().includes(searchTerms.interest)
        )
      ) {
        return false;
      }
    }

    return true;
  }

  function performSearch() {
    const searchTerms = getSearchTerms();
    if (!searchTerms.name && !searchTerms.major && !searchTerms.interest) {
      studentsNumber(allStudents.length);
      buildStudents(allStudents);
      return;
    }

    const filteredStudents = allStudents.filter((student) =>
      studentMatchesSearch(student, searchTerms)
    );

    studentsNumber(filteredStudents.length);
    buildStudents(filteredStudents);
  }

  performSearch();
}

function performIntrestSearch(intrestText) {
  document.getElementById("search-name").value = "";
  document.getElementById("search-major").value = "";
  document.getElementById("search-interest").value = intrestText;

  const searchTerms = {
    name: "",
    major: "",
    interest: intrestText.trim().toLowerCase(),
  };

  const filteredStudents = allStudents.filter((student) => {
    return student.interests.some((interest) =>
      interest.toLowerCase().includes(searchTerms.interest)
    );
  });

  studentsNumber(filteredStudents.length);
  buildStudents(filteredStudents);
}
document.getElementById("search-btn").addEventListener("click", handleSearch);
