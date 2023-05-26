import axios from "axios";

function postStudent(body) {
    const promise = axios.post(
        `${process.env.REACT_APP_API_URL}/students/register`, body
    );
    return promise;
}

function getStudent(studentId) {
    const promise = axios.get(
        `${process.env.REACT_APP_API_URL}/students/${studentId}`
    );
    return promise;
}

function showClassesByStudent(studentId) {
    const promise = axios.get(
        `${process.env.REACT_APP_API_URL}/students/${studentId}/classes`
    );
    return promise;
}

function showStudents() {
    const promise = axios.get(`${process.env.REACT_APP_API_URL}/students`);
    return promise;
}

function studentsByClass(classId) {
    const promise = axios.get(`${process.env.REACT_APP_API_URL}/students/classes/${classId}`);
    return promise;
}

const apiStudents = { postStudent, getStudent, showClassesByStudent, showStudents, studentsByClass }
export default apiStudents;