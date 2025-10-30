export default function MarketerTemplate({ portfolio }: { portfolio: any }) {
  const { heroData, aboutData, skillsData, projectsData, contactData } = portfolio;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center px-4 max-w-4xl">
          {heroData?.photoUrl && (
            <img
              src={heroData.photoUrl}
              alt={heroData.name}
              className="w-40 h-40 rounded-full mx-auto mb-8 object-cover shadow-2xl"
            />
          )}
          <h1 className="text-6xl md:text-8xl font-extrabold mb-6 text-gray-900">
            {heroData?.name || 'Your Name'}
          </h1>
          <p className="text-2xl md:text-3xl text-purple-600 font-medium">
            {heroData?.tagline || 'Your Tagline'}
          </p>
        </div>
      </section>

      {/* About Section */}
      {aboutData?.bio && (
        <section className="py-24 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-12 text-center text-gray-900">About</h2>
            <p className="text-xl text-gray-700 leading-relaxed whitespace-pre-wrap">
              {aboutData.bio}
            </p>
          </div>
        </section>
      )}

      {/* Services/Skills Section */}
      {skillsData?.skills && skillsData.skills.length > 0 && (
        <section className="py-24 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold mb-16 text-center text-gray-900">Services</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {skillsData.skills.map((skill: string, index: number) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition text-center"
                >
                  <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{skill}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case Studies Section */}
      {projectsData && projectsData.length > 0 && (
        <section className="py-24 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold mb-16 text-center text-gray-900">Case Studies</h2>
            <div className="space-y-12">
              {projectsData.map((project: any, index: number) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } gap-8 items-center`}
                >
                  {project.imageUrl && (
                    <div className="flex-1">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-80 object-cover rounded-2xl shadow-xl"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-4 text-gray-900">{project.title}</h3>
                    <p className="text-lg text-gray-700 mb-6">{project.description}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition"
                      >
                        View Case Study
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
        <section className="py-24 px-4 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-12">Let&apos;s Work Together</h2>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {contactData.email && (
                <a
                  href={`mailto:${contactData.email}`}
                  className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition text-lg"
                >
                  Email Me
                </a>
              )}
              {contactData.linkedin && (
                <a
                  href={contactData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition text-lg"
                >
                  LinkedIn
                </a>
              )}
            </div>
            {contactData.phone && (
              <p className="text-2xl font-medium">{contactData.phone}</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
