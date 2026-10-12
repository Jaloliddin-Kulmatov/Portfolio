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
                I’m <b className="purple">Jaloliddin Kulmatov</b>, an engineering student at Jeonbuk National University and the founder of <b className="purple">ICOM</b>, an AI platform for international students in Korea. I love turning ideas into products that solve real problems.
                <br /><br />
                I’m proficient in
                <i>
                  <b className="purple"> Python, TypeScript, Next.js, Flask and PostgreSQL</b>
                </i>
                , and I work on both the front end and the back end.
                <br /><br />
                My core interests are
                <i>
                  <b className="purple"> Web Development, Machine Learning, Data Science and AI for education</b>
                </i>
                . I am always looking for new ways to use AI in useful projects.
                <br /><br />
                My work so far includes a <b className="purple">patent</b>, a <b className="purple">conference paper</b>, and research support in a
                <b className="purple"> solar cell lab</b>.
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