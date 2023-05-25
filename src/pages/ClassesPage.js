import { useEffect, useState } from "react"
import apiClasses from "../services/apiClasses"

export default function ClassesPage() {
    const [classes, setClasses] = useState([])

    useEffect(() => {
        apiClasses.showClasses()
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
        </>
    )
}