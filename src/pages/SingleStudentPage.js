import { useEffect, useState } from "react";
import apiStudents from "../services/apiStudents";
import { useParams } from "react-router-dom";

export default function SingleStudentPage() {
    const [student, setStudent] = useState(null);
    const [classes, setClasses] = useState([]);
    const { studentId } = useParams()

    useEffect(() => {
        apiStudents.getStudent(studentId)
            .then((res) => {
                setStudent(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });

        apiStudents.showClassesByStudent(studentId)
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
        <div>
            <h2>{name}</h2>
            <p>Email: {email}</p>
            <p>CPF: {cpf}</p>
            <img src={photo} alt="Student Photo" />

            <h3>Turmas</h3>
            <ul>
                {enrolledClasses.map((classItem) => (
                    <li key={classItem.id}>
                        Código: {classItem.code}<br />
                        Data de início: {classItem.startDate}<br />
                        Data de término: {classItem.endDate}
                    </li>
                ))}
            </ul>

        </div>
    );
}
