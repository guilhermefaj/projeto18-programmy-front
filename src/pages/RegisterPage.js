import { useState, useEffect } from "react";
import apiStudents from "../services/apiStudents";
import apiClasses from "../services/apiClasses";
import styled from "styled-components";

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
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                alert(err.response.data);
            });
    }

    useEffect(() => {
        apiClasses
            .showClasses()
            .then((res) => {
                const apiClasses = res.data;
                setClassOptions(apiClasses);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    return (
        <Container>
            <Title>Cadastro de Aluno</Title>
            <FormWrapper>
                <Form onSubmit={handleRegister}>
                    <FormGroup>
                        <Label>Nome</Label>
                        <Input
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleForm}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Foto</Label>
                        <Input
                            name="photo"
                            type="text"
                            value={form.photo}
                            onChange={handleForm}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>CPF</Label>
                        <Input
                            name="cpf"
                            type="text"
                            value={form.cpf}
                            onChange={handleForm}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input
                            name="email"
                            type="text"
                            value={form.email}
                            onChange={handleForm}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Turma</Label>
                        <Select
                            name="classId"
                            value={form.classId}
                            onChange={handleForm}
                            required
                        >
                            <option value="">Selecione uma turma</option>
                            {classOptions.map((classItem) => (
                                <option key={classItem.id} value={classItem.id}>
                                    {classItem.code}
                                </option>
                            ))}
                        </Select>
                    </FormGroup>
                    <Button type="submit">Cadastrar Aluno</Button>
                </Form>
            </FormWrapper>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
  background-color: #f3f3f3;
`;

const FormWrapper = styled.div`
  max-width: 500px;
  width: 100%;
  padding: 40px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 30px;
  font-family: "Silkscreen";
  font-size: 34px;
  font-weight: bold;
  text-align: center;
  color: #07b77f;
`;

const Form = styled.form``;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-family: "Silkscreen";
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: bold;
  color: #25363e;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: "Roboto";
  font-size: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: "Roboto";
  font-size: 16px;
`;

const Button = styled.button`
  position: relative;
  width: 100%;
  padding: 12px;
  background-color: #56d0ae;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-family: "Silkscreen";
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  overflow: hidden;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #07b77f;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;