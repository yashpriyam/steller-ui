


const generateDummyData = () => {
  const dummyData = [];

  for (let i = 1; i <= 100; i++) {
    const job = {
      companyName: `Example Company ${i}`,
      companyLogo: `☠️`,
      jobTitle: `Web Developer ${i}`,
      experienceRequired: `${Math.floor(Math.random() * 10)}-${
        Math.floor(Math.random() * 10) + 5
      } years`,
      techStack: "React, Node.js, MongoDB",
      package: `$${Math.floor(Math.random() * 5000) + 5000} - $${
        Math.floor(Math.random() * 5000) + 10000
      }`,
      jobLink: `job-link-${i}`,
      companyLinkedInProfileLink: `company-linkedin-${i}`,
    };

    dummyData.push(job);
  }

  return dummyData;
};

export const jobDataList = generateDummyData();
