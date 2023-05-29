import { useEffect, useState } from "react";
import apiClasses from "../services/apiClasses";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function ClassesPage() {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        apiClasses
            .showClasses()
            .then((res) => {
                const apiClasses = res.data;
                setClasses(apiClasses);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    return (
        <Container>
            <Title>Selecione uma Turma</Title>
            {classes.map((classItem) => (
                <ClassItem to={`/classes/${classItem.id}`} key={classItem.id}>
                    <p>Turma: {classItem.code}</p>
                </ClassItem>
            ))}
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
  background-color: #f8f8f8;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 10px;
  font-family: "Silkscreen";
  font-size: 24px;
  color: #333;
`

const ClassItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 40px;
  padding: 12px;
  padding-bottom: 4px;
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

  p {
    text-align: center;
    min-width: 200px;
    font-size: 18px;
    color: white;
    margin-bottom: 10px;
  }
`;
