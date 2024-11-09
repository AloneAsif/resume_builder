var updateResume = function () {
    var _a;
    var profile = document.getElementById("profile").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var role = document.getElementById("role").value;
    var education = document.getElementById("education").value;
    var experience = document.getElementById("experience").value;
    var skills = document.getElementById("skills").value;
    var profilePicture = (_a = document.getElementById("profile_picture").files) === null || _a === void 0 ? void 0 : _a[0];
    // Generate a unique identifier for the resume
    var uniqueId = "resume_".concat(new Date().getTime());
    // Store data in localStorage
    var resumeData = {
        profile: profile,
        name: name,
        email: email,
        phone: phone,
        role: role,
        education: education,
        experience: experience,
        skills: skills,
        profilePicture: profilePicture ? URL.createObjectURL(profilePicture) : ""
    };
    localStorage.setItem(uniqueId, JSON.stringify(resumeData));
    // Display resume
    document.getElementById("display_profile_text").textContent = profile;
    document.getElementById("display_name").textContent = name;
    document.getElementById("display_email").textContent = email;
    document.getElementById("display_phone").textContent = phone;
    document.getElementById("display_education").textContent = education;
    document.getElementById("display_role").textContent = role;
    var experienceList = document.getElementById("display_experience");
    experienceList.innerHTML = "";
    experience.split(",").forEach(function (item) {
        var li = document.createElement("li");
        li.textContent = item.trim();
        experienceList.appendChild(li);
    });
    var skillsList = document.getElementById("display_skills");
    skillsList.innerHTML = "";
    skills.split(",").forEach(function (skill) {
        var li = document.createElement("li");
        li.textContent = skill.trim();
        skillsList.appendChild(li);
    });
    if (profilePicture) {
        var reader_1 = new FileReader();
        reader_1.onload = function () {
            document.getElementById("display_profile_picture").src = reader_1.result;
        };
        reader_1.readAsDataURL(profilePicture);
    }
    // Hide the form
    var form = document.getElementById("resume_form");
    form.style.display = 'none';
    // Show shareable link and download option
    displayShareableLinkAndDownload(uniqueId);
};
var displayShareableLinkAndDownload = function (uniqueId) {
    // Create shareable link
    var linkContainer = document.getElementById("shareable_link");
    linkContainer.innerHTML = "Shareable Link: <a href=\"?resume=".concat(uniqueId, "\">View Resume</a>");
    // Create download PDF button
    var downloadButton = document.createElement("button");
    downloadButton.textContent = "Download as PDF";
    downloadButton.onclick = function () { return downloadResumeAsPDF(); };
    linkContainer.appendChild(downloadButton);
};
var downloadResumeAsPDF = function () {
    var resumeElement = document.querySelector(".wraper_div");
    var opt = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    // Generate PDF and download it
    html2pdf().set(opt).from(resumeElement).save();
};
var form = document.getElementById("resume_form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    updateResume();
});
