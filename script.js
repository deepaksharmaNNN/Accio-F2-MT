document.addEventListener("DOMContentLoaded", function () {
    let studentData = []; 

    fetch('./student.json')
        .then(response => response.json())
        .then(data => {
            studentData = data;
            displayStudents(studentData); 
        })
        .catch(error => console.error('Error fetching data:', error));

    function displayStudents(students) {
        const tableBody = document.getElementById("student-data");
        tableBody.innerHTML = ''; 
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td><img src="${student.img_src}"> ${student.first_name} ${student.last_name}</td>
                <td>${student.gender}</td>
                <td>${student.class}</td>
                <td>${student.marks}</td>
                <td>${student.passing ? 'Passing' : 'Failed'}</td>
                <td>${student.email}</td>
            `;
            tableBody.appendChild(row);
        });
    }


    function sortStudentsByFullName(order) {
        studentData.sort((a, b) => {
            const fullNameA = `${a.first_name} ${a.last_name}`;
            const fullNameB = `${b.first_name} ${b.last_name}`;
            return order === 'asc' ? fullNameA.localeCompare(fullNameB) : fullNameB.localeCompare(fullNameA);
        });
        displayStudents(studentData);
    }

    function sortStudentsByMarks() {
        studentData.sort((a, b) => a.marks - b.marks);
        displayStudents(studentData);
    }

    function sortStudentsByPassing() {
        const passingStudents = studentData.filter(student => student.passing);
        displayStudents(passingStudents);
    }

    function sortStudentsByClass() {
        studentData.sort((a, b) => a.class - b.class);
        displayStudents(studentData);
    }

    function sortStudentsByGender() {

        const maleStudents = studentData.filter(student => student.gender.toLowerCase() === 'male');
        const femaleStudents = studentData.filter(student => student.gender.toLowerCase() === 'female');
        

        const combinedStudents = [...maleStudents, ...femaleStudents];
        displayStudents(combinedStudents);
    }


    document.getElementById('sort-az').addEventListener('click', () => sortStudentsByFullName('asc'));
    document.getElementById('sort-za').addEventListener('click', () => sortStudentsByFullName('desc'));
    document.getElementById('sort-marks').addEventListener('click', sortStudentsByMarks);
    document.getElementById('sort-passing').addEventListener('click', sortStudentsByPassing);
    document.getElementById('sort-class').addEventListener('click', sortStudentsByClass);
    document.getElementById('sort-gender').addEventListener('click', sortStudentsByGender);


    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredStudents = studentData.filter(student =>
            student.first_name.toLowerCase().includes(searchTerm) ||
            student.last_name.toLowerCase().includes(searchTerm) ||
            student.email.toLowerCase().includes(searchTerm)
        );
        displayStudents(filteredStudents);
    });
});