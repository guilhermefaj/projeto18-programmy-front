import { useEffect, useState } from "react";
import apiClasses from "../services/apiClasses";
import styled from "styled-components";

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
            {classes.map((classItem) => (
                <ClassItem key={classItem.id}>
                    <p>Turma: {classItem.code}</p>
                </ClassItem>
            ))}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 20px;
    background-color: #f3f3f3;
`;

const ClassItem = styled.div`
    padding: 10px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    width: 200px;
    text-align: center;

    p {
        font-size: 18px;
        color: #333;
        margin-bottom: 10px;
    }
`;
