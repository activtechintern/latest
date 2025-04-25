

const About = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">About StartHub</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-4">
          StartHub is dedicated to empowering the next generation of entrepreneurs by providing a comprehensive platform 
          for ideation, collaboration, and resource access. We believe that great ideas can come from anywhere, and our 
          mission is to help transform those ideas into successful ventures.
        </p>
        <p className="text-gray-700">
          By connecting students, faculty, mentors, and resources, we're building an ecosystem where innovation thrives 
          and entrepreneurial spirits are nurtured.
        </p>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-gray-700 mb-4">
          StartHub began as a student-led initiative in 2023, born from the recognition that many brilliant ideas on campus 
          never reached their full potential due to lack of resources, guidance, or collaborative opportunities.
        </p>
        <p className="text-gray-700 mb-4">
          What started as a simple forum for sharing ideas has evolved into a comprehensive platform offering tools for 
          ideation, team formation, mentorship connections, and funding opportunities.
        </p>
        <p className="text-gray-700">
          Today, StartHub serves thousands of students across multiple universities, having helped launch over 50 successful 
          startups and securing more than $2 million in seed funding for student entrepreneurs.
        </p>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-5 rounded-lg">
            <h3 className="font-semibold text-lg mb-2 text-starthub-blue">Innovation</h3>
            <p className="text-gray-700">
              We believe in pushing boundaries and thinking outside the box to solve real-world problems.
            </p>
          </div>
          <div className="bg-blue-50 p-5 rounded-lg">
            <h3 className="font-semibold text-lg mb-2 text-starthub-blue">Collaboration</h3>
            <p className="text-gray-700">
              Great ideas flourish with diverse perspectives and collaborative effort.
            </p>
          </div>
          <div className="bg-blue-50 p-5 rounded-lg">
            <h3 className="font-semibold text-lg mb-2 text-starthub-blue">Inclusivity</h3>
            <p className="text-gray-700">
              Entrepreneurship should be accessible to everyone regardless of background.
            </p>
          </div>
          <div className="bg-blue-50 p-5 rounded-lg">
            <h3 className="font-semibold text-lg mb-2 text-starthub-blue">Impact</h3>
            <p className="text-gray-700">
              We prioritize ideas and ventures that create meaningful positive change.
            </p>
          </div>
        </div>
      </section>
      <section>
  <h2 className="text-2xl font-semibold mb-4">StartHub</h2>
  <p className="text-gray-700 mb-6">
    StartHub is powered by a dedicated team of entrepreneurs, educators, and industry professionals who are passionate 
    about fostering innovation and supporting the next generation of business leaders.
  </p>
  <p className="text-gray-700 mb-6">
    One of our key partners is <strong>SARVAH</strong> – an acronym for 
    <em> “SGGSIET Alumni Run Venture Accelerator Hub”</em>. Inspired by the Sanskrit word “<strong>सर्व</strong>” meaning "all", "everything", and "inclusive", 
    SARVAH is committed to guiding students and aspiring entrepreneurs through mentorship, seed funding, market access, and more.
  </p>
  <div className="grid md:grid-cols-3 gap-6">
    <div className="text-center">
      <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-3"></div>
      <h3 className="font-semibold">Shri. Sunil Raithatha</h3>
      <p className="text-sm text-gray-600">Chairman, Board of Governors, SGGSIET, Nanded</p>
    </div>
    <div className="text-center">
      <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-3"></div>
      <h3 className="font-semibold">Dr. Manesh Kokare</h3>
      <p className="text-sm text-gray-600">Director, SGGSIET, Nanded</p>
    </div>
    <div className="text-center">
      <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-3"></div>
      <h3 className="font-semibold">Mr. Abhay Deshpande</h3>
      <p className="text-sm text-gray-600">Director of SARVAH</p>
    </div>
    <div className="text-center">
      <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-3"></div>
      <h3 className="font-semibold">Mr. Vikas Rathod</h3>
      <p className="text-sm text-gray-600">Director of SARVAH</p>
    </div>
  </div>
</section>

    </div>
  );
};

export default About;
