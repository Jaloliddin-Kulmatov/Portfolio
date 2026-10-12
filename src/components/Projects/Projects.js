import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import Particle from "../Particle";

// Images
import icom from "../../Assets/Projects/icom.jpg";
import talaba from "../../Assets/Projects/talaba.jpg";
import ctest from "../../Assets/Projects/ctest.jpg";
import scaps from "../../Assets/Projects/scaps.jpg";
import findMe from "../../Assets/Projects/findme.jpg";
import blogWeb from "../../Assets/Projects/blog_web.jpg";
import foodReal from "../../Assets/Projects/food_real.jpg";

const GH = "https://github.com/Jaloliddin-Kulmatov/";

function Projects() {
  const aiProjects = [
    {
      img: icom,
      title: "ICOM",
      description:
          "Platform for international students in Korea: chat, internships, visa and housing guides, banking and an AI assistant. Internship posts are collected and translated with AI twice a day. Led to a patent and a conference paper.",
      tech: ["Next.js", "TypeScript", "Flask", "PostgreSQL", "Groq LLM"],
      github: GH + "ICOM-v1",
      demo: "https://icom.ai.kr",
    },
    {
      img: talaba,
      title: "TALABA",
      description:
          "ICOM for students in Uzbekistan, in Uzbek: community, jobs, university admission help, housing, scholarships and an AI assistant.",
      tech: ["Next.js", "TypeScript", "Tailwind", "Python"],
      github: GH + "talaba",
      demo: "https://talaba-zeta.vercel.app",
    },
    {
      title: "Nori (노리다)",
      description:
          "Upload an English CV and get a Korean-style résumé PDF. AI translates and reorganizes it for jobs in Korea.",
      tech: ["Flask", "Groq LLM", "pdfplumber", "ReportLab"],
      github: GH + "Nori",
    },
    {
      title: "VoiceMimic",
      description:
          "Record or upload a short voice clip, type any text, and hear it in that voice with XTTS-v2 voice cloning.",
      tech: ["Python", "Flask", "XTTS-v2", "JavaScript"],
      github: GH + "voice-mimic",
    },
  ];

  const webProjects = [
    {
      img: ctest,
      title: "C-Test Trainer",
      description:
          "Practice site for the German onSET test: 4 full timed tests, 24 grammar topics, 593 vocabulary words, a mistake notebook and progress charts.",
      tech: ["HTML", "CSS", "JavaScript"],
      github: GH + "ctest-trainer",
      demo: "https://ctest-trainer-eight.vercel.app",
    },
    {
      img: scaps,
      title: "SCAPS IV Extractor",
      description:
          "Research tool from the JBNU Solar Cell Lab: turns SCAPS-1D simulation files into one Excel table (Voc, Jsc, FF, PCE). Runs in the browser.",
      tech: ["JavaScript", "Python", "FastAPI"],
      github: GH + "Scaps_data_parameters",
      demo: "https://scaps-data-1b9a.vercel.app",
    },
    {
      img: findMe,
      title: "Find_me",
      description:
          "Finds where a username exists across 40+ websites, with Python serverless functions on Vercel.",
      tech: ["Python", "Serverless", "JavaScript"],
      github: GH + "Find_me",
      demo: "https://find-me-sandy.vercel.app",
    },
    {
      img: blogWeb,
      title: "Flask Blog",
      description:
          "Blog platform with login, admin roles, a rich-text editor, comments and a contact form. PostgreSQL on Render.",
      tech: ["Flask", "PostgreSQL", "Bootstrap"],
      github: GH + "Kulmatovs_blog_v2",
      demo: "https://kulmatovs-blog.onrender.com/",
    },
    {
      img: foodReal,
      title: "Food Reels",
      description:
          "Hackathon prototype: watch short food videos and order the dish without leaving the feed. Mobile-first web app.",
      tech: ["HTML", "CSS", "JavaScript"],
      github: GH + "Food_Reel",
    },
  ];

  const pythonDataProjects = [
    {
      title: "Multivariable Regression",
      description:
          "House price valuation model with multivariable regression on the Boston housing data.",
      tech: ["Python", "Jupyter", "scikit-learn"],
      github: GH + "Multivariable_Regression",
    },
    {
      title: "Price vs Search Trends",
      description:
          "Analyzed product prices against search trends using Python and Pandas.",
      tech: ["Python", "Pandas", "Data Analysis"],
      github: GH + "Price_vs_search_trend_data_analyze",
    },
    {
      title: "Cheapest Flight Finder",
      description:
          "Searches flight APIs and sends an alert when a cheaper flight appears.",
      tech: ["Python", "APIs", "Automation"],
      github: GH + "Cheepest_flight_finder",
    },
  ];

  const pythonGames = [
    {
      title: "Pong_game",
      description:
          "Classic Pong game implemented in Python with simple AI opponent and score tracking.",
      tech: ["Python", "Game Development"],
      github: GH + "Pong_game",
    },
    {
      title: "Snake_game",
      description:
          "Classic Snake game implemented in Python with increasing difficulty.",
      tech: ["Python", "Game Development"],
      github: GH + "Snake_game",
    },
    {
      title: "Turtle_race_game",
      description:
          "Race simulation game using Python Turtle graphics to simulate competitive racing.",
      tech: ["Python", "Turtle Graphics", "Game Development"],
      github: GH + "Turtle_race_game",
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
            Products, research tools and experiments I've built
          </p>

          <h2 className="group-heading mb-3 text-primary">🤖 AI &amp; Full-Stack Products</h2>
          <Row>{aiProjects.map((proj, idx) => renderProjectCard(proj, idx))}</Row>

          <h2 className="group-heading mt-5 mb-3 text-primary">🌐 Tools &amp; Websites</h2>
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