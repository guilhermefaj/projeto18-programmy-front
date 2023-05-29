import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiClasses from "../services/apiClasses";
import apiProjects from "../services/apiProjects";
import styled from "styled-components";

export default function StudentsByClassPage() {
    const { classId } = useParams();
    const [students, setStudents] = useState([]);
    const [className, setClassName] = useState("");
    const [projects, setProjects] = useState([]);

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
            .showProjectsByClassId(classId)
            .then((res) => {
                setProjects(res.data)
                console.log("p", projects)
            })
            .catch((err) => {
                console.log(err.message)
            });
    }, [classId]);

    return (
        <Container>
            <Column>
                <Title>Projetos da turma {className}</Title>
                <ProjectsList>
                    {projects.map((project) => (
                        <ProjectItem
                            to={`/projects/${project.id}/${project.classId}`}
                            key={project.id}
                        >{project.projectName}
                        </ProjectItem>
                    ))}
                </ProjectsList>
            </Column>
            <Column>
                <Title>Estudantes da turma {className}</Title>
                <StudentList>
                    {students.map((student) => (
                        <StudentItem
                            to={`/students/${student.id}`}
                            key={student.id}
                        >{student.name}
                        </StudentItem>
                    ))}
                </StudentList>
            </Column>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  height: calc(100vh - 60px);
  padding: 20px;
  background-color: #f3f3f3;
  gap: 30px;
  text-align: center;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.h2`
  margin-bottom: 20px;
  font-family: "Silkscreen";
  font-size: 24px;
  color: #333;
`;

const ProjectsList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  gap: 10px;
`

const ProjectItem = styled(Link)`
  position: relative;
  width: 100%;
  min-width: 200px;
  text-align: center;
  height: 40px;
  padding: 12px;
  background-color: #56d0ae;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-family: "Roboto";
  font-size: 16px;
  cursor: pointer;
  overflow: hidden;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #07b77f;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-weight: bold;
  }
`

const StudentList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  gap: 10px;
`;

const StudentItem = styled(Link)`
  position: relative;
  width: 100%;
  min-width: 200px;
  text-align: center;
  height: 40px;
  padding: 12px;
  background-color: #56d0ae;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-family: "Roboto";
  font-size: 16px;
  cursor: pointer;
  overflow: hidden;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #07b77f;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-weight: bold;
  }
`;
