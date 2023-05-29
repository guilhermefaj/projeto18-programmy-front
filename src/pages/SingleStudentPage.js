import { useEffect, useState } from "react";
import apiStudents from "../services/apiStudents";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function SingleStudentPage() {
  const [student, setStudent] = useState(null);
  const [classes, setClasses] = useState([]);
  const { studentId } = useParams();

  useEffect(() => {
    apiStudents
      .getStudent(studentId)
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });

    apiStudents
      .showClassesByStudent(studentId)
      .then((res) => {
        setClasses(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [studentId]);

  if (!student) {
    return <div>Loading...</div>;
  }

  const { name, email, cpf, photo, classIds } = student;

  const enrolledClasses = classes.filter((classItem) => classIds.includes(Number(classItem.id)));

  return (
    <Container>
      <StudentInfo>
        <StudentPhoto src={photo} alt="Student Photo" />
        <StudentName>{name}</StudentName>
        <StudentData>Email: {email}</StudentData>
        <StudentData>CPF: {cpf}</StudentData>
      </StudentInfo>

      <ClassList>
        <h3>Turmas</h3>
        <ul>
          {enrolledClasses.map((classItem) => (
            <ClassItem key={classItem.id}>
              <ClassData>Código: {classItem.code}</ClassData>
              <ClassData>Data de início: {classItem.startDate}</ClassData>
              <ClassData>Data de término: {classItem.endDate}</ClassData>
            </ClassItem>
          ))}
        </ul>
      </ClassList>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: calc(100vh - 60px);
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f3f3f3;
`;

const StudentInfo = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const StudentName = styled.h2`
  margin-bottom: 10px;
  font-family: "Silkscreen";
  font-weight: bold;
  font-size: 24px;
  color: #333;
`;

const StudentData = styled.p`
  margin-bottom: 5px;
  font-size: 16px;
  color: #333;
`;

const StudentPhoto = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
`;

const ClassList = styled.div`
  width: 100%;
`;

const ClassItem = styled.li`
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ClassData = styled.p`
  margin-bottom: 5px;
  font-size: 16px;
  color: #333;
`;
