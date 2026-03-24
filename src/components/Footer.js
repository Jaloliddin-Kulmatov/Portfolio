import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn, FaTelegramPlane, FaGlobe } from "react-icons/fa";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();

  return (
      <Container fluid className="footer">
        <Row>
          <Col md="4" className="footer-copywright">
            <h3>Designed and Developed by Jaloliddin Kulmatov</h3>
          </Col>

          <Col md="4" className="footer-copywright">
            <h3>Copyright © {year} </h3>
          </Col>

          <Col md="4" className="footer-body">
            <ul className="footer-icons">

              {/* GITHUB */}
              <li className="social-icons">
                <a
                    href="https://github.com/Jaloliddin-Kulmatov"
                    style={{ color: "white" }}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  <AiFillGithub />
                </a>
              </li>

              {/* TELEGRAM (replaced Twitter) */}
              <li className="social-icons">
                <a
                    href="https://t.me/lifeofstudentinkorea"
                    style={{ color: "white" }}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  <FaTelegramPlane />
                </a>
              </li>

              {/* LINKEDIN */}
              <li className="social-icons">
                <a
                    href="https://www.linkedin.com/in/JaloliddinKulmatov/"
                    style={{ color: "white" }}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  <FaLinkedinIn />
                </a>
              </li>

              {/* BLOG (replaced Instagram) */}
              <li className="social-icons">
                <a
                    href="https://kulmatovs-blog.onrender.com/"
                    style={{ color: "white" }}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  <FaGlobe />
                </a>
              </li>

            </ul>
          </Col>
        </Row>
      </Container>
  );
}

export default Footer;