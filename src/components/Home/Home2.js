import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/my_photo.jpg";
import Tilt from "react-parallax-tilt";

function Home2() {
  return (
      <Container fluid className="home-about-section" id="about">
        <Container>
          <Row>
            <Col md={8} className="home-about-description">
              <h1 style={{ fontSize: "2.6em" }}>
                LET ME <span className="purple">INTRODUCE</span> MYSELF
              </h1>
              <p className="home-about-body">
                I’m <b className="purple">Jaloliddin Kulmatov</b>, a passionate Software Engineer focused on building reliable, scalable, and high-performance applications. I enjoy transforming ideas into products that solve real-world problems.
                <br /><br />
                I’m proficient in
                <i>
                  <b className="purple"> Python, C++, Flask, HTML, and Matplotlib </b>
                </i>
                — and I work seamlessly across both backend and frontend development.
                <br /><br />
                My core interests are
                <i>
                  <b className="purple"> Web Applications, AI & Machine Learning, and Blockchain Solutions</b>
                </i>
                , and I am always exploring innovative ways to integrate modern technologies into meaningful projects.
                <br /><br />
                Whenever possible, I love building projects using
                <b className="purple"> Python </b> and modern frameworks like
                <i>
                  <b className="purple"> Flask, </b>
                </i>
                bringing creative ideas to life on the web.
              </p>
            </Col>
            <Col md={4} className="myAvtar">
              <Tilt>
                <img src={myImg} className="img-fluid avatar-img" alt="avatar" />
              </Tilt>
            </Col>
          </Row>
        </Container>
      </Container>
  );
}

export default Home2;