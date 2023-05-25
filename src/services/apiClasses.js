import axios from "axios";

function showClasses() {
    const promise = axios.get(`${process.env.REACT_APP_API_URL}/classes`);
    return promise;
}

function showStudentsByClass(classId) {
    const promise = axios.get(
        `${process.env.REACT_APP_API_URL}/classes/${classId}`
    )
    return promise;
}

const apiClasses = { showStudentsByClass, showClasses }
export default apiClasses;