import React, { useState, useEffect } from 'react';
import apiClasses from '../services/apiClasses';
import apiStudents from '../services/apiStudents';
import apiProjects from '../services/apiProjects';
import styled from 'styled-components';

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
        apiClasses
            .showClasses()
            .then((res) => {
                setClasses(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });

        if (selectedClass) {
            apiStudents
                .studentsByClass(selectedClass)
                .then((res) => {
                    setStudents(res.data);
                    console.log("lista de alunos:", students)
                })
                .catch((err) => {
                    console.log(err.response);
                });

            apiProjects
                .showProjectsByClassId(selectedClass)
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
        apiProjects
            .createProject(projectData)
            .then((res) => {
                console.log('Projeto enviado com sucesso!');
                // Lógica adicional após o envio do projeto, se necessário
            })
            .catch((err) => {
                console.log('Erro ao enviar o projeto:', err.response);
            });
    };

    return (
        <Container>
            <Title>Enviar Projeto</Title>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="class">Turma:</Label>
                    <Select id="class" value={selectedClass} onChange={handleClassChange}>
                        <option value="">Selecione a turma</option>
                        {classes.map((classItem) => (
                            <option key={classItem.id} value={classItem.id}>
                                {classItem.code}
                            </option>
                        ))}
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="student">Aluno:</Label>
                    <Select
                        id="student"
                        value={selectedStudent}
                        onChange={handleStudentChange}
                        disabled={!selectedClass}
                    >
                        <option value="">Selecione o aluno</option>
                        {students.map((student, index) => (
                            <option key={index} value={index}>
                                {student}
                            </option>
                        ))}
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="project">Projeto:</Label>
                    <Select
                        id="project"
                        value={selectedProject}
                        onChange={handleProjectChange}
                        disabled={!selectedClass}
                    >
                        <option value="">Selecione o projeto</option>
                        {projects.length > 0 &&
                            projects.map((project, index) => (
                                <option key={index} value={index}>
                                    {project}
                                </option>
                            ))}
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="link">Link do Projeto:</Label>
                    <Input
                        type="text"
                        id="link"
                        value={projectLink}
                        onChange={handleLinkChange}
                        disabled={!selectedClass}
                    />
                </FormGroup>
                <Button type="submit" disabled={!selectedClass}>
                    Enviar
                </Button>
            </Form>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: red;
`;

const Title = styled.h2`
    margin-bottom: 20px;
    font-family: "Silkscreen";
    font-size: 24px;
    color: #333;
`;

const Form = styled.form`
    width: 100%;
    max-width: 400px;
`;

const FormGroup = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    font-family: "Silkscreen";
    font-size: 16px;
    color: #333;
`;

const Select = styled.select`
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
`;

const Button = styled.button`
    width: 100%;
    padding: 12px;
    background-color: #56d0ae;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #275145;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;
