import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClasses from "../services/apiClasses";
import apiProjects from "../services/apiProjects";
import styled from "styled-components";

export default function ProjectsPage() {
    const { classId, id: projectId } = useParams();
    const [students, setStudents] = useState([]);
    const [className, setClassName] = useState("");
    const [projectName, setProjectName] = useState("");
    const [studentGrades, setStudentGrades] = useState([]);

    useEffect(() => {
        // Carregar estudantes da turma
        apiClasses
            .showStudentsByClass(classId)
            .then((res) => {
                setStudents(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });

        // Obter nome da turma
        apiClasses
            .showClasses()
            .then((res) => {
                const classData = res.data.find((item) => item.id === Number(classId));
                if (classData) {
                    setClassName(classData.code);
                }
            })
            .catch((err) => {
                console.log(err.response);
            });

        // Obter nome do projeto
        apiProjects
            .showProject(projectId)
            .then((res) => {
                setProjectName(res.data.projectName);
            })
            .catch((err) => {
                console.log(err.response);
            });

        // Obter notas dos alunos no projeto
        if (projectId) {
            apiProjects
                .getGradesByProject(projectId)
                .then((res) => {
                    const grades = res.data.reduce((acc, curr) => {
                        acc[curr.name] = curr.grades;
                        return acc;
                    }, {});
                    setStudentGrades(grades);
                })
                .catch((err) => {
                    console.log(err.response);
                });
        }
    }, [classId, projectId]);

    // Função para obter a nota de um aluno específico
    const getGradeByStudentId = (studentId) => {
        const grade = studentGrades[studentId];
        return grade || "Sem Nota";
    };

    return (
        <Container>
            <Title>Estudantes da turma {className}</Title>
            <ProjectTitle>Projeto: {projectName}</ProjectTitle>
            <Table>
                <thead>
                    <tr>
                        <th>Aluno</th>
                        <th>Nota</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{getGradeByStudentId(student.name)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f3f3f3;
`;

const Title = styled.h2`
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
`;

const ProjectTitle = styled.h3`
    margin-bottom: 10px;
    font-size: 20px;
    color: #666;
`;

const Table = styled.table`
    width: 100%;
    max-width: 600px;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    th,
    td {
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid #ccc;
    }

    th {
        font-weight: bold;
        color: #333;
    }
`;
