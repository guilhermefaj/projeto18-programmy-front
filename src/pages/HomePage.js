import { Link } from "react-router-dom"
import { styled } from "styled-components"

export default function HomePage() {
  return (
    <Container>
      <RowContainer>
        <StyledLink to="/students/register">Realizar Registro de aluno</StyledLink>
        <StyledLink to="/classes">Acessar Turmas</StyledLink>
      </RowContainer>
      <RowContainer>
        <StyledLink to="/submit">Envio de Projetos</StyledLink>
        <StyledLink>Em Breve... (Portal do Aluno)</StyledLink>
      </RowContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: calc(100vh - 60px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  background-color: #f8f8f8;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;

const StyledLink = styled(Link)`
  display: flex;
  width: 300px;
  height: 300px;
  color: #333;
  padding: 10px;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-family: "Silkscreen";
  font-size: 24px;
  font-weight: bold;
  background-color: white;
  text-decoration: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #56d0ae;
    color: white;
    font-size: 26px;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;


