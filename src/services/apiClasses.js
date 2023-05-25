import axios from "axios";

function showClasses() {
    const promise = axios.get(`${process.env.REACT_APP_API_URL}/classes`);
    return promise;
}

const apiClasses = { showClasses }
export default apiClasses;