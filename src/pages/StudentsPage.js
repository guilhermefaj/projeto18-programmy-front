import { useEffect, useState } from "react"
import apiItems from "../services/apiItems"

export default function StudentsPage() {
    const [classes, setClasses] = useState([])

    useEffect(() => {
        apiItems.showClasses()
            .then(res => {
                console.log(res.data);
                const apiClasses = res.data;
                setClasses(apiClasses)
            })
            .catch(err => {
                console.log(err.response)
            })
    }, [])

    return (
        <>
            <div>
                {classes.map((classItem) => (
                    <div key={classItem.id}>
                        <p>Turma: {classItem.code}</p>
                    </div>
                ))}
            </div>
            <div>

            </div>
        </>
    )
}