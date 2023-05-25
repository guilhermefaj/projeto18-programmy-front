import { useEffect, useState } from "react";
import apiStudents from "../services/apiStudents";
import { useParams } from "react-router-dom";
import apiClasses from "../services/apiClasses";

export default function StudentsPage() {
    const { classId } = useParams();
    const [students, setStudents] = useState([]);
    const [className, setClassName] = useState("");

    useEffect(() => {
        apiStudents
            .showStudentsByClass(classId)
            .then((res) => {
                setStudents(res.data);
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
        <div>
            <h2>Estudantes da turma {className}</h2>
            <ul>
                {students.map((student) => (
                    <li key={student.id}>{student.name}</li>
                ))}
            </ul>
        </div>
    );
}
