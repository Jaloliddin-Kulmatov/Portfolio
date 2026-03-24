import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import Particle from "../Particle";

// Images
import blogWeb from "../../Assets/Projects/blog_web.png";
import foodReal from "../../Assets/Projects/food_real.png";
import amazonPrice from "../../Assets/Projects/amazon_price.jpg"; // placeholder

function Projects() {
  const webProjects = [
    {
      img: blogWeb,
      title: "Kulmatovs_blog_v2",
      description:
          "Personal blog built with Flask, HTML & CSS. Easily manage content and supports dark/light modes.",
      tech: ["Flask", "HTML", "CSS"],
      github: "https://github.com/Jaloliddin-Kulmatov/Kulmatovs_blog_v2",
      demo: "https://kulmatovs-blog.onrender.com/",
    },
    {
      img: foodReal,
      title: "Food_Reel",
      description:
          "Recipe / food app built with Firebase, HTML & CSS. Users can explore and search recipes dynamically.",
      tech: ["Firebase", "HTML", "CSS"],
      github: "https://github.com/Jaloliddin-Kulmatov/Food_Reel",
      demo: "https://food-reel.onrender.com/",
    },
    {
      img: amazonPrice,
      title: "Amazon_price_alert",
      description:
          "Tracks Amazon product prices and sends notifications when they drop below a threshold.",
      tech: ["Python", "Web Scraping", "Automation"],
      github: "https://github.com/Jaloliddin-Kulmatov/Amazon_price_alert",
    },
  ];

  const pythonDataProjects = [
    {
      title: "Price_vs_search_trend_data_analyze",
      description:
          "Analyzed product prices vs search trends using Python & Pandas for actionable insights.",
      tech: ["Python", "Pandas", "Data Analysis"],
      github:
          "https://github.com/Jaloliddin-Kulmatov/Price_vs_search_trend_data_analyze",
    },
    {
      title: "Internet_Speed_complain_twits",
      description:
          "Analyzed Twitter data for complaints about internet speed using NLP techniques.",
      tech: ["Python", "NLP", "Data Analysis"],
      github:
          "https://github.com/Jaloliddin-Kulmatov/Internet_Speed_complain_twits",
    },
    {
      title: "Cheepest_flight_finder",
      description:
          "Web scraper and analyzer to find the cheapest flights across multiple providers.",
      tech: ["Python", "Web Scraping", "Data Analysis"],
      github: "https://github.com/Jaloliddin-Kulmatov/Cheepest_flight_finder",
    },
  ];

  const pythonGames = [
    {
      title: "Pong_game",
      description:
          "Classic Pong game implemented in Python with simple AI opponent and score tracking.",
      tech: ["Python", "Game Development"],
      github: "https://github.com/Jaloliddin-Kulmatov/Pong_game",
    },
    {
      title: "Snake_game",
      description:
          "Classic Snake game implemented in Python with increasing difficulty.",
      tech: ["Python", "Game Development"],
      github: "https://github.com/Jaloliddin-Kulmatov/Snake_game",
    },
    {
      title: "Turtle_race_game",
      description:
          "Race simulation game using Python Turtle graphics to simulate competitive racing.",
      tech: ["Python", "Turtle Graphics", "Game Development"],
      github: "https://github.com/Jaloliddin-Kulmatov/Turtle_race_game",
    },
  ];

  const renderProjectCard = (proj, idx, hasImage = true) => (
      <Col md={6} lg={4} className="mb-4" key={idx}>
        <Card className="project-card h-100 shadow-sm p-0 border-0 rounded-4" style={{ transition: "transform 0.3s, box-shadow 0.3s" }}>
          {hasImage && proj.img && (
              <div className="project-img-wrapper position-relative">
                <Card.Img
                    variant="top"
                    src={proj.img}
                    className="project-img rounded-top-4"
                    style={{ objectFit: "cover", height: "180px" }}
                />
                <div className="tech-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-wrap align-items-end p-2" style={{ background: "rgba(0,0,0,0.2)", borderRadius: "12px" }}>
                  {proj.tech.map((tech, i) => (
                      <Badge key={i} bg="light" text="dark" className="me-1 mb-1">{tech}</Badge>
                  ))}
                </div>
              </div>
          )}
          <Card.Body className="d-flex flex-column justify-content-between">
            <div>
              <Card.Title className="text-primary">{proj.title}</Card.Title>
              <Card.Text className="text-muted">{proj.description}</Card.Text>
            </div>
            <div className="mt-2 d-flex flex-wrap gap-2">
              {proj.github && (
                  <Button
                      variant="dark"
                      href={proj.github}
                      target="_blank"
                      className="flex-grow-1"
                  >
                    GitHub
                  </Button>
              )}
              {proj.demo && (
                  <Button
                      variant="primary"
                      href={proj.demo}
                      target="_blank"
                      className="flex-grow-1"
                  >
                    Live Demo
                  </Button>
              )}
            </div>
          </Card.Body>
        </Card>
      </Col>
  );

  return (
      <Container fluid className="project-section position-relative">
        <Particle />
        <Container>
          <h1 className="project-heading text-center mb-4" style={{ color: "#2979FF" }}>
            My Recent <strong className="purple">Projects</strong>
          </h1>
          <p className="text-center mb-5" style={{ color: "#000" }}>
            A few projects I've built recently
          </p>

          <h2 className="group-heading mb-3 text-primary">🌐 Web Apps</h2>
          <Row>{webProjects.map((proj, idx) => renderProjectCard(proj, idx))}</Row>

          <h2 className="group-heading mt-5 mb-3 text-primary">🐍 Python Data Projects</h2>
          <Row>{pythonDataProjects.map((proj, idx) => renderProjectCard(proj, idx, false))}</Row>

          <h2 className="group-heading mt-5 mb-3 text-primary">🎮 Python Games</h2>
          <Row>{pythonGames.map((proj, idx) => renderProjectCard(proj, idx, false))}</Row>
        </Container>

        <style jsx>{`
        .project-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }
        .tech-overlay {
          pointer-events: none;
        }
      `}</style>
      </Container>
  );
}

export default Projects;