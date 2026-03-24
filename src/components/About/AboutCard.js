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
              My interests include{" "}
              <span className="purple">ML, Robotics, Data Science</span> and{" "}
              <span className="purple">Web Development</span>.
              <br />
              I'm also co-building{" "}
              <span className="purple">My Start-ups</span> — coming very soon.
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