import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
      <Card className="quote-card-view">
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p style={{ textAlign: "justify" }}>
              Hi everyone! I'm <span className="purple">Jaloliddin Kulmatov</span>{" "}
              from <span className="purple">Uzbekistan</span>.
              <br />
              I'm currently an{" "}
              <span className="purple">Engineering Student</span> at{" "}
              <span className="purple">Jeonbuk National University</span>, South Korea, on a full scholarship.
              <br />
              GPA <span className="purple">4.47/4.5</span>, ranked 1st of 69 international students in Engineering.
              <br />
              My interests include{" "}
              <span className="purple">Web Development, ML, Data Science</span> and{" "}
              <span className="purple">problem-solving</span>.
              <br />
              I founded{" "}
              <span className="purple">ICOM</span>, an AI platform for international students in Korea, and I'm now on exchange at{" "}
              <span className="purple">Universiti Malaya</span>.
              <br />
              <br />
              Outside of coding, I enjoy:
            </p>

            <ul>
              <li className="about-activity">
                <ImPointRight /> Reading Biography Books
              </li>
              <li className="about-activity">
                <ImPointRight /> Cycling and Running
              </li>
              <li className="about-activity">
                <ImPointRight /> Watching Sci-Fi Movies
              </li>
            </ul>

            <p style={{ color: "#2979FF" }}>
              "You become what you think about"
            </p>
            <footer className="blockquote-footer">Jaloliddin</footer>
          </blockquote>
        </Card.Body>
      </Card>
  );
}

export default AboutCard;