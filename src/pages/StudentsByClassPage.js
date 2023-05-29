import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiClasses from "../services/apiClasses";
import styled from "styled-components";

export default function StudentsByClassPage() {
    const { classId } = useParams();
    const [students, setStudents] = useState([]);
    const [className, setClassName] = useState("");

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
    }, [classId]);

    return (
        <Container>
            <Title>Estudantes da turma {className}</Title>
            <StudentList>
                {students.map((student) => (
                    <StudentItem to={`/students/${student.id}`} key={student.id}>{student.name}</StudentItem>
                ))}
            </StudentList>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 60px);
  padding: 20px;
  background-color: #f3f3f3;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-family: "Silkscreen";
  font-size: 24px;
  color: #333;
`;

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
