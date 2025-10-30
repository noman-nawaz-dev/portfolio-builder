export default function EngineerTemplate({ portfolio }: { portfolio: any }) {
  const { heroData, aboutData, skillsData, projectsData, contactData } = portfolio;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center px-4">
          {heroData?.photoUrl && (
            <img
              src={heroData.photoUrl}
              alt={heroData.name}
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-indigo-500"
            />
          )}
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            {heroData?.name || 'Your Name'}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            {heroData?.tagline || 'Your Tagline'}
          </p>
        </div>
      </section>

      {/* About Section */}
      {aboutData?.bio && (
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
            <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-wrap">
              {aboutData.bio}
            </p>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skillsData?.skills && skillsData.skills.length > 0 && (
        <section className="py-20 px-4 bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Technical Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skillsData.skills.map((skill: string, index: number) => (
                <div
                  key={index}
                  className="bg-gray-700 px-6 py-4 rounded-lg text-center font-medium hover:bg-indigo-600 transition"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projectsData && projectsData.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsData.map((project: any, index: number) => (
                <div key={index} className="bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition">
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:text-indigo-300 font-medium"
                      >
                        View Project →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {contactData && (
        <section className="py-20 px-4 bg-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12">Get In Touch</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {contactData.email && (
                <a
                  href={`mailto:${contactData.email}`}
                  className="bg-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                  Email Me
                </a>
              )}
              {contactData.linkedin && (
                <a
                  href={contactData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  LinkedIn
                </a>
              )}
              {contactData.github && (
                <a
                  href={contactData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
                >
                  GitHub
                </a>
              )}
            </div>
            {contactData.phone && (
              <p className="text-gray-300 mt-8 text-lg">{contactData.phone}</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
