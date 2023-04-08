import creatorImg from "../assets/personalImg.jpeg";
const About = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center w-full min-h-screen ml-60">
      <div className="w-[80%]">
        <h1 className="text-3xl font-bold text-center mb-5">
          About the <span className="text-[#00C8AC]">Quizmania</span>
        </h1>
        <main className="space-y-5">
          <p>
            Quizmania is a quiz app designed to help users improve their
            technical skills in various technologies, including HTML, CSS, JS,
            React, and many more. I provides technical questions related to
            these technologies, allowing users to test their knowledge and learn
            new concepts and sharp their existing skills in a fun and
            interactive way.
          </p>

          {/* about the author */}
          <section className="space-y-3">
            <h3 className="text-3xl font-bold text-center text-[#00C8AC]">
              Creator
            </h3>

            <div className="flex gap-10 text-left">
              <img
                className="w-56 drop-shadow-lg rounded-md "
                src={creatorImg}
                alt="creator img"
              />

              <div>
                <p>
                  Hi, I am{" "}
                  <span className="text-[#00C8AC] font-medium">
                    Vinay Pratap Singh
                  </span>{" "}
                  a skilled and passionate Full-Stack JavaScript developer with
                  a primary focus on the Frontend (ReactJS + TypeScript ||
                  NextJS + TypeScript).
                </p>
                <p>
                  I desires to learn and teach more about Full-Stack development
                  is what led me to create this project. My goal is to improve
                  my technical skills and knowledge so that I can share that
                  with others to help them out, particularly in areas such as
                  HTML, CSS, JavaScript, and React. I believes that through
                  education and collaboration, we can create better and more
                  innovative solutions in the tech industry.
                </p>
                {/* adding the social media links */}
                <section className="w-full flex items-center justify-center mt-5 gap-8 text-2xl text-[#00C8AC]">
                  <a
                    className="hover:drop-shadow-md hover:scale-110 transition-all ease-in-out duration-300"
                    href="https://harvi.me/"
                    target="_blank"
                  >
                    <i className="fa-solid fa-user-tie"></i>
                  </a>
                  <a
                    className="hover:drop-shadow-md hover:scale-110 transition-all ease-in-out duration-300"
                    href="https://www.linkedin.com/in/vinay-pratap-singh-harvi-4b265a212/"
                    target="_blank"
                  >
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                  <a
                    className="hover:drop-shadow-md hover:scale-110 transition-all ease-in-out duration-300"
                    href="https://github.com/Vinay-Pratap-Singh/"
                    target="_blank"
                  >
                    <i className="fa-brands fa-github"></i>
                  </a>
                  <a
                    className="hover:drop-shadow-md hover:scale-110 transition-all ease-in-out duration-300"
                    href="https://twitter.com/harvi2001"
                    target="_blank"
                  >
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a
                    className="hover:drop-shadow-md hover:scale-110 transition-all ease-in-out duration-300"
                    href="https://www.instagram.com/itsmevinayhere/"
                    target="_blank"
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </section>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default About;
