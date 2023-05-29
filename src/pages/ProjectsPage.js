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
        apiClasses
            .showStudentsByClass(classId)
            .then((res) => {
                const sortedStudents = res.data.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
                setStudents(sortedStudents);
            })
            .catch((err) => {
                console.log(err.response);
            });

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

        apiProjects
            .showProject(projectId)
            .then((res) => {
                setProjectName(res.data.projectName);
            })
            .catch((err) => {
                console.log(err.response);
            });

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
    height: calc(100vh - 60px);
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f8f8f8;
`;

const Title = styled.h2`
    font-family: "Silkscreen";
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
