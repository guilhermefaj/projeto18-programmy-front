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

const apiStudents = { postStudent, getStudent, showClassesByStudent }
export default apiStudents;