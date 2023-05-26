import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClasses from "../services/apiClasses";
import apiProjects from "../services/apiProjects";

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
        <div>
            <h2>Estudantes da turma {className}</h2>
            <h3>Projeto: {projectName}</h3>
            <table>
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
            </table>
        </div>
    );
}

