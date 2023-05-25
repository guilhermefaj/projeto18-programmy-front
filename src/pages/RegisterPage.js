import { useState, useEffect } from "react";
import apiStudents from "../services/apiStudents";
import apiClasses from "../services/apiClasses";

export default function RegisterPage() {
    const [form, setForm] = useState({
        name: "",
        photo: "",
        cpf: "",
        email: "",
        classId: "",
    });
    const [classOptions, setClassOptions] = useState([]);

    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleRegister(e) {
        e.preventDefault();

        apiStudents
            .postStudent(form)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                alert(err.response.data);
            });
    }

    useEffect(() => {
        apiClasses.showClasses()
            .then(res => {
                const apiClasses = res.data;
                setClassOptions(apiClasses);
            })
            .catch(err => {
                console.log(err.response);
            });
    }, []);

    return (
        <>
            <form>
                <input
                    name="name"
                    placeholder="Name"
                    type="text"
                    value={form.name}
                    onChange={handleForm}
                    required
                />
                <input
                    name="photo"
                    placeholder="Photo"
                    type="text"
                    value={form.photo}
                    onChange={handleForm}
                    required
                />
                <input
                    name="cpf"
                    placeholder="CPF"
                    type="text"
                    value={form.cpf}
                    onChange={handleForm}
                    required
                />
                <input
                    name="email"
                    placeholder="Email"
                    type="text"
                    value={form.email}
                    onChange={handleForm}
                    required
                />
                <select
                    name="classId"
                    value={form.classId}
                    onChange={handleForm}
                    required
                    size="1"
                >
                    <option value="">Selecione uma turma</option>
                    {classOptions.map(classItem => (
                        <option key={classItem.id} value={classItem.id}>
                            {classItem.code}
                        </option>
                    ))}
                </select>
                <button onClick={handleRegister}>Cadastrar Aluno</button>
            </form>
        </>
    );
}
