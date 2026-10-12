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
                    Python • TypeScript • JavaScript • C • C++ • SQL
                </p>

                <p><strong>Frontend Development</strong><br/>
                    React.js • Next.js • HTML • CSS • Tailwind CSS
                </p>

                <p><strong>Backend Development</strong><br/>
                    Flask • FastAPI • SQLAlchemy • REST APIs • JWT
                </p>

                <p><strong>Databases</strong><br/>
                    PostgreSQL (Neon) • SQLite
                </p>

                <p><strong>AI / Data</strong><br/>
                    NumPy • Pandas • Matplotlib • Seaborn • Plotly • scikit-learn •
                    OpenAI &amp; Groq LLM APIs • Function Calling • Embeddings • Hugging Face • XTTS voice cloning
                </p>

                <p><strong>Tools</strong><br/>
                    Git • GitHub • Vercel • Render • COMSOL • PC1D • SCAPS-1D
                </p>

            </div>

        </div>
    );
}

export default Techstack;