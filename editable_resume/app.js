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
    // Display resume
    document.getElementById("display_profile_text").textContent = profile;
    document.getElementById("display_name").textContent = name;
    document.getElementById("display_email").textContent = email;
    document.getElementById("display_phone").textContent = phone;
    document.getElementById("display_education").textContent = education;
    document.getElementById("display_role").textContent = role;
    var experienceList = document.getElementById("display_experience");
    experienceList.innerHTML = ""; // Clear existing items
    experience.split(",").forEach(function (item) {
        var li = document.createElement("li");
        li.textContent = item.trim(); // Trim whitespace
        experienceList.appendChild(li);
    });
    var skillsList = document.getElementById("display_skills");
    skillsList.innerHTML = ""; // Clear existing items
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
};
var form = document.getElementById("resume_form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    updateResume();
});
