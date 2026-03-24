import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import Toolstack from "./Toolstack";
import laptopImg from "../../Assets/about.JPG";

function About() {
  return (
      <>
        <Particle />
        <Container fluid className="about-section">
          <Container>
            <Row className="justify-content-center py-3">

              {/* LEFT SIDE */}
              <Col md={7} className="d-flex flex-column justify-content-center py-5">
                <h1 className="mb-4" style={{ fontSize: "2.1em" }}>
                  A little about <strong className="purple">Me</strong>
                </h1>
                <Aboutcard />
              </Col>

              {/* RIGHT SIDE (IMAGE) */}
              <Col md={5} className="about-img py-5 d-flex justify-content-center">
                <img
                    src={laptopImg}
                    alt="about"
                    className="img-fluid about-image"
                />
              </Col>

            </Row>

            <section>

              <Techstack />
            </section>

            <section>
              <h1 className="project-heading">
                <strong className="purple">Tools</strong> I use
              </h1>
              <Toolstack />
            </section>

            <Github />
          </Container>
        </Container>
      </>
  );
}

export default About;