export default function GeneralTemplate({ portfolio }: { portfolio: any }) {
  const { heroData, aboutData, skillsData, projectsData, contactData } = portfolio;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="text-center px-4 max-w-5xl">
          {heroData?.photoUrl && (
            <img
              src={heroData.photoUrl}
              alt={heroData.name}
              className="w-36 h-36 rounded-full mx-auto mb-8 object-cover border-4 border-white shadow-2xl"
            />
          )}
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            {heroData?.name || 'Your Name'}
          </h1>
          <p className="text-2xl md:text-3xl text-blue-100">
            {heroData?.tagline || 'Your Tagline'}
          </p>
        </div>
      </section>

      {/* About Section */}
      {aboutData?.bio && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-neutral-900">About</h2>
            <p className="text-lg text-neutral-700 leading-relaxed whitespace-pre-wrap text-center">
              {aboutData.bio}
            </p>
          </div>
        </section>
      )}

      {/* Experience/Skills Section */}
      {skillsData?.skills && skillsData.skills.length > 0 && (
        <section className="py-20 px-4 bg-neutral-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-neutral-900">Experience & Skills</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillsData.skills.map((skill: string, index: number) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-600 hover:shadow-lg transition"
                >
                  <p className="text-lg font-semibold text-neutral-900">{skill}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects/Work Section */}
      {projectsData && projectsData.length > 0 && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-neutral-900">Work</h2>
            <div className="space-y-12">
              {projectsData.map((project: any, index: number) => (
                <div key={index} className="bg-neutral-50 rounded-xl p-8 shadow-md hover:shadow-lg transition">
                  <div className="flex flex-col md:flex-row gap-8">
                    {project.imageUrl && (
                      <div className="md:w-1/3">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-4 text-neutral-900">{project.title}</h3>
                      <p className="text-neutral-700 mb-6 leading-relaxed">{project.description}</p>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-800 transition"
                        >
                          View More →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {contactData && (
        <section className="py-20 px-4 bg-neutral-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12">Get In Touch</h2>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {contactData.email && (
                <a
                  href={`mailto:${contactData.email}`}
                  className="bg-teal-700 px-8 py-3 rounded-lg font-semibold hover:bg-teal-800 transition"
                >
                  {contactData.email}
                </a>
              )}
              {contactData.phone && (
                <a
                  href={`tel:${contactData.phone}`}
                  className="bg-neutral-700 px-8 py-3 rounded-lg font-semibold hover:bg-neutral-600 transition"
                >
                  {contactData.phone}
                </a>
              )}
            </div>
            <div className="flex justify-center gap-6">
              {contactData.linkedin && (
                <a
                  href={contactData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 font-semibold text-lg"
                >
                  LinkedIn
                </a>
              )}
              {contactData.github && (
                <a
                  href={contactData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-white font-semibold text-lg"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
