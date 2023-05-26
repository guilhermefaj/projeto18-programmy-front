import axios from 'axios';

function sendProject(projectData) {
    const promise = axios.post(`${process.env.REACT_APP_API_URL}/projects`, projectData);
    return promise;
}

function showProjects() {
    const promise = axios.get(`${process.env.REACT_APP_API_URL}/projects`);
    return promise;
}

function showProjectsByClassId(classId) {
    const promise = axios.get(`${process.env.REACT_APP_API_URL}/projects/${classId}`);
    return promise;
}

const apiProjects = { sendProject, showProjects, showProjectsByClassId };

export default apiProjects;
