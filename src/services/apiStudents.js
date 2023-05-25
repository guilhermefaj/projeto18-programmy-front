import axios from "axios";

function postStudent(body) {
    const promise = axios.post(
        `${process.env.REACT_APP_API_URL}/students/register`, body
    );
    return promise;
}

function showStudentsByClass(classId) {
    const promise = axios.get(
        `${process.env.REACT_APP_API_URL}/students/${classId}`
    )
    return promise;
}

const apiStudents = { postStudent, showStudentsByClass }
export default apiStudents;