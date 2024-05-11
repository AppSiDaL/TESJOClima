import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import TESJOLogo from "../assets/LogoTESJO.jpg";
import Image from "react-bootstrap/Image";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const NavigationBar = () => {
  const phrases = [
    "El cambio climático es una realidad que debemos abordar con urgencia.",
    "La acción climática es esencial para proteger nuestro planeta para las generaciones futuras.",
    "El aumento de las emisiones de gases de efecto invernadero está exacerbando el cambio climático.",
    "La deforestación contribuye significativamente al cambio climático y la pérdida de biodiversidad.",
    "Las energías renovables son clave para reducir nuestra dependencia de los combustibles fósiles y mitigar el cambio climático.",
    "El derretimiento de los casquetes polares es un síntoma alarmante del cambio climático.",
    "La acidificación de los océanos debido al aumento de dióxido de carbono representa una amenaza para los ecosistemas marinos.",
    "Las sequías, inundaciones y huracanes más intensos son consecuencias directas del cambio climático.",
    "La cooperación internacional es fundamental para abordar el cambio climático de manera efectiva.",
    "Cada acción individual cuenta en la lucha contra el cambio climático, desde reducir el consumo de energía hasta reciclar más.",
    "La transición hacia una economía baja en carbono es crucial para limitar el calentamiento global a niveles seguros.",
    "El cambio climático no es solo un problema ambiental, también tiene graves implicaciones sociales y económicas.",
    "Los científicos están de acuerdo: el cambio climático es causado principalmente por la actividad humana.",
    "Es imperativo adoptar medidas para adaptarnos a los impactos inevitables del cambio climático.",
    "El cambio climático ya está afectando a comunidades vulnerables en todo el mundo, exacerbando la pobreza y la inseguridad alimentaria.",
    "Las inversiones en infraestructuras resilientes son esenciales para proteger a las comunidades de los impactos del cambio climático.",
    "La educación y la sensibilización son fundamentales para impulsar la acción climática a todos los niveles de la sociedad.",
    "La naturaleza nos proporciona soluciones poderosas para combatir el cambio climático, desde la restauración de los ecosistemas hasta la agricultura sostenible.",
    "El tiempo para la acción climática es ahora. No podemos darnos el lujo de esperar.",
    "Juntos podemos marcar la diferencia en la lucha contra el cambio climático.",
    "Cada pequeña acción cuenta en la construcción de un futuro más sostenible.",
    "El cambio climático es nuestro desafío más grande, pero también nuestra mayor oportunidad para innovar y crear un mundo mejor.",
    "La Tierra nos está llamando a tomar medidas audaces para protegerla.",
    "El cambio climático no es un problema insuperable, es una oportunidad para transformar nuestra sociedad hacia la sostenibilidad.",
    "El poder del cambio está en nuestras manos. Es hora de actuar con valentía y determinación.",
    "La naturaleza nos brinda soluciones ingeniosas para enfrentar el cambio climático. Aprovechemos su sabiduría.",
    "El futuro de nuestro planeta depende de las decisiones que tomemos hoy.",
    "Cada decisión que tomamos puede ser una contribución positiva para el medio ambiente y el clima.",
    "El cambio climático nos desafía a ser más conscientes y responsables en nuestras acciones diarias.",
    "La esperanza está en la acción. Juntos podemos construir un futuro más brillante para las próximas generaciones.",
    "No podemos cambiar el pasado, pero podemos moldear el futuro. Actuemos ahora para proteger nuestro planeta.",
    "El cambio climático no es solo una amenaza, también es una oportunidad para crear empleos verdes y una economía más resiliente.",
    "Cada vez que elijas una alternativa sostenible, estás votando por un futuro más saludable para todos.",
    "La resiliencia climática comienza con cada uno de nosotros. Seamos parte de la solución.",
    "El cambio climático no discrimina. Todos estamos en el mismo barco y juntos podemos navegar hacia un futuro más sostenible.",
    "No hay Planeta B. Cuidemos el único hogar que tenemos.",
    "La acción climática es una cuestión de justicia intergeneracional. Hagamos nuestra parte para garantizar un futuro próspero para las próximas generaciones.",
    "Las adversidades nos unen. Enfrentemos el desafío del cambio climático con solidaridad y determinación.",
    "La naturaleza es nuestra aliada en la lucha contra el cambio climático. Protejamos sus recursos como si fuera nuestra propia vida.",
    "El cambio climático es la mayor amenaza que enfrenta la humanidad en el siglo XXI. - Sir David Attenborough",
    "El cambio climático es una crisis que nos exige actuar con urgencia y audacia. - Barack Obama",
    "El cambio climático no es solo un problema ambiental, es un desafío para la economía mundial y la estabilidad global. - Nicholas Stern",
    "La crisis climática no se detendrá a menos que tomemos medidas decisivas ahora. - Al Gore",
    "El cambio climático es un problema que no conoce fronteras y requiere cooperación internacional. - Ban Ki-moon",
    "El cambio climático es un desafío que debemos enfrentar con valentía y resolución. - António Guterres"
  ];

  const [input, setInput] = useState<string>();
  const [randomPhrase, setRandomPhrase] = useState<string>("");
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    setRandomPhrase(phrases[randomIndex]);
  }, []);
  const match = useMatch("/search/:ts");

  const navigate = useNavigate();
  const handleSearch = () => {
    if (input) {
      const timestamp = new Date(input).getTime();
      navigate(`/forecast/${timestamp}`);
    }
  };
  const date = match ? new Date(match.params.ts ?? "") : new Date();
  return (
    <div style={{ background: "#005986", color: "white" }}>
      <Navbar expand="lg">
        <Container style={{ background: "#005986" }} fluid>
          <Navbar.Brand href="#">
            <Image
              src={TESJOLogo}
              alt="TESJO Logo"
              className="img-fluid"
              style={{ maxWidth: "150px", maxHeight: "70px" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 text-light"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/" className="text-light">
                Dashboard
              </Nav.Link>
              {!match?.params.ts && (
                <>
                  <Nav.Link as={Link} to="/now" className="text-light">
                    Now
                  </Nav.Link>
                  <Nav.Link as={Link} to="/hours" className="text-light">
                    Hours
                  </Nav.Link>
                </>
              )}
            </Nav>
            <Container fluid>
              <div className="text-center">
                Tecnologico de Estudios Superiores, Jocotitlan, Edo. Mexico. a
                {" " + date.toDateString()}
              </div>
            </Container>
            <Form className="d-flex">
              <Form.Control
                type="datetime-local"
                placeholder="Search"
                onChange={(e) => setInput(e.target.value)}
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success" onClick={handleSearch}>
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid style={{ background: "#003550" }}>
        <div className="text-center" style={{ height: 30 }}>
          {randomPhrase}
        </div>
      </Container>
    </div>
  );
};

export default NavigationBar;
