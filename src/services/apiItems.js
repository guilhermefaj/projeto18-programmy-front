import axios from "axios";

function showClasses() {
    const promise = axios.get(`${process.env.REACT_APP_API_URL}/classes`);
    return promise;
}

const apiItems = { showClasses }
export default apiItems;