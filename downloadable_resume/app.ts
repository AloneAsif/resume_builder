const updateResume = () => {
  const profile = (document.getElementById("profile") as HTMLTextAreaElement).value;
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const phone = (document.getElementById("phone") as HTMLInputElement).value;
  const role = (document.getElementById("role") as HTMLInputElement).value;
  const education = (document.getElementById("education") as HTMLTextAreaElement).value;
  const experience = (document.getElementById("experience") as HTMLTextAreaElement).value;
  const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;
  const profilePicture = (document.getElementById("profile_picture") as HTMLInputElement).files?.[0];

  // Generate a unique identifier for the resume
  const uniqueId = `resume_${new Date().getTime()}`;

  // Store data in localStorage
  const resumeData = {
    profile,
    name,
    email,
    phone,
    role,
    education,
    experience,
    skills,
    profilePicture: profilePicture ? URL.createObjectURL(profilePicture) : ""
  };
  localStorage.setItem(uniqueId, JSON.stringify(resumeData));

  // Display resume
  (document.getElementById("display_profile_text") as HTMLElement).textContent = profile;
  (document.getElementById("display_name") as HTMLElement).textContent = name;
  (document.getElementById("display_email") as HTMLElement).textContent = email;
  (document.getElementById("display_phone") as HTMLElement).textContent = phone;
  (document.getElementById("display_education") as HTMLElement).textContent = education;
  (document.getElementById("display_role") as HTMLElement).textContent = role;

  const experienceList = document.getElementById("display_experience") as HTMLElement;
  experienceList.innerHTML = "";
  experience.split(",").forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.trim();
    experienceList.appendChild(li);
  });

  const skillsList = document.getElementById("display_skills") as HTMLElement;
  skillsList.innerHTML = "";
  skills.split(",").forEach((skill) => {
    const li = document.createElement("li");
    li.textContent = skill.trim();
    skillsList.appendChild(li);
  });

  if (profilePicture) {
    const reader = new FileReader();
    reader.onload = () => {
      (document.getElementById("display_profile_picture") as HTMLImageElement).src = reader.result as string;
    };
    reader.readAsDataURL(profilePicture);
  }

  // Hide the form
  const form = document.getElementById("resume_form") as HTMLFormElement;
  form.style.display = 'none';

  // Show shareable link and download option
  displayShareableLinkAndDownload(uniqueId);
};

const displayShareableLinkAndDownload = (uniqueId: string) => {
  // Create shareable link
  const linkContainer = document.getElementById("shareable_link") as HTMLElement;
  linkContainer.innerHTML = `Shareable Link: <a href="?resume=${uniqueId}">View Resume</a>`;

  // Create download PDF button
  const downloadButton = document.createElement("button");
  downloadButton.textContent = "Download as PDF";
  downloadButton.onclick = () => downloadResumeAsPDF();
  linkContainer.appendChild(downloadButton);
};

const downloadResumeAsPDF = () => {
  const resumeElement = document.querySelector(".wraper_div") as HTMLElement;
  const opt = {
    margin:       0.5,
    filename:     'resume.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  // Generate PDF and download it
  html2pdf().set(opt).from(resumeElement).save();
};

const form = document.getElementById("resume_form") as HTMLFormElement;
form.addEventListener("submit", (event) => {
  event.preventDefault();
  updateResume();
});
