import React, { useState, useEffect } from 'react';
import apiClasses from '../services/apiClasses';
import apiStudents from '../services/apiStudents';
import apiProjects from '../services/apiProjects';

export default function SendProjectPage() {
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedProject, setSelectedProject] = useState('');
    const [projectLink, setProjectLink] = useState('');
    const [projects, setProjects] = useState([]);

    // Carregar turmas, alunos e projetos
    useEffect(() => {
        console.log("turma selecionada:", selectedClass)
        // Carregar turmas
        apiClasses.showClasses()
            .then((res) => {
                setClasses(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });

        if (selectedClass) {
            apiStudents.studentsByClass(selectedClass)
                .then((res) => {
                    setStudents(res.data);
                    console.log("lista de alunos:", students)
                })
                .catch((err) => {
                    console.log(err.response);
                });

            // Carregar projetos
            apiProjects.showProjectsByClassId(selectedClass)
                .then((res) => {
                    setProjects(res.data);
                    console.log(projects);
                })
                .catch((err) => {
                    console.log(err.response);
                });
        }

    }, [selectedClass]);

    // Manipuladores de eventos
    const handleClassChange = (event) => {
        const selectedClassId = event.target.value;
        setSelectedClass(selectedClassId);
        setSelectedStudent('');
    };

    const handleStudentChange = (event) => {
        setSelectedStudent(event.target.value);
    };

    const handleProjectChange = (event) => {
        setSelectedProject(event.target.value);
    };

    const handleLinkChange = (event) => {
        setProjectLink(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Verificar se todas as informações foram preenchidas
        if (!selectedClass || !selectedStudent || !selectedProject || !projectLink) {
            console.log('Preencha todos os campos');
            return;
        }

        // Criar o objeto de projeto
        const projectData = {
            classId: selectedClass,
            studentId: selectedStudent,
            projectId: selectedProject,
            projectLink: projectLink
        };

        // Enviar o projeto para o backend
        apiProjects.createProject(projectData)
            .then((res) => {
                console.log('Projeto enviado com sucesso!');
                // Lógica adicional após o envio do projeto, se necessário
            })
            .catch((err) => {
                console.log('Erro ao enviar o projeto:', err.response);
            });
    };

    return (
        <div>
            <h2>Enviar Projeto</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="class">Turma:</label>
                    <select id="class" value={selectedClass} onChange={handleClassChange}>
                        <option value="">Selecione a turma</option>
                        {classes.map((classItem) => (
                            <option key={classItem.id} value={classItem.id}>
                                {classItem.code}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="student">Aluno:</label>
                    <select
                        id="student"
                        value={selectedStudent}
                        onChange={handleStudentChange}
                        disabled={!selectedClass}
                    >
                        <option value="">Selecione o aluno</option>
                        {students.map((studentName, index) => (
                            <option key={index} value={index}>
                                {studentName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="project">Projeto:</label>
                    <select
                        id="project"
                        value={selectedProject}
                        onChange={handleProjectChange}
                        disabled={!selectedClass}
                    >
                        <option value="">Selecione o projeto</option>
                        {projects.length > 0 &&
                            projects.map((projectName, index) => (
                                <option key={index} value={index}>
                                    {projectName}
                                </option>
                            ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="link">Link do Projeto:</label>
                    <input
                        type="text"
                        id="link"
                        value={projectLink}
                        onChange={handleLinkChange}
                        disabled={!selectedClass}
                    />
                </div>
                <button
                    type="submit"
                    disabled={!selectedClass}
                >Enviar</button>
            </form>
        </div>
    );
}
