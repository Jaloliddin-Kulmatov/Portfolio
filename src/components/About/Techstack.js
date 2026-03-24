import React from "react";

function Techstack() {
    return (
        <div className="tech-wrapper">

            {/* TITLE */}
            <h1 className="tech-title">
                Professional <span>Skillset</span>
            </h1>

            {/* CONTENT BOX */}
            <div className="tech-box">

                <p><strong>Programming Languages</strong><br/>
                    Python • C++ • JavaScript • TypeScript
                </p>

                <p><strong>Frontend Development</strong><br/>
                    React.js • Next.js • HTML • CSS • Tailwind CSS
                </p>

                <p><strong>Backend Development</strong><br/>
                    Node.js • Flask
                </p>

                <p><strong>Databases</strong><br/>
                    MongoDB • PostgreSQL
                </p>

                <p><strong>AI / Data</strong><br/>
                    NumPy • Pandas • Matplotlib • OpenAI API • Chatbots •
                    Prompt Engineering • LLM Integration
                </p>

                <p><strong>Tools</strong><br/>
                    Git • Docker
                </p>

            </div>

        </div>
    );
}

export default Techstack;