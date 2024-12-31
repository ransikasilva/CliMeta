function validateFeedback() {
    var feedbackName = document.getElementById("feedbackName").value;
    var feedbackEmail = document.getElementById("feedbackEmail").value;
    var feedbackImprovements = document.getElementById("feedbackImprovements").value;
    var feedbackUpdates = document.getElementById("feedbackUpdates").value;

    if (feedbackName.trim() === "") {
        alert("Name must be filled out");
        return false;
    }

    if (feedbackEmail.trim() === "") {
        alert("Email must be filled out");
        return false;
    } else {
        var emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(feedbackEmail)) {
            alert("Invalid email format");
            return false;
        }
    }

    if (document.getElementById('inforYes').checked === false && feedbackImprovements.trim() === "") {
        alert("Please suggest improvements for our website.");
        return false;
    }

    if (feedbackUpdates === "") {
        alert("Please enter how would you like to receive updates.");
        return false;
    }

    return true;
}

function adjustImprovementsRequirement() {
    var feedbackImprovementsInput = document.getElementById("feedbackImprovements");
    var inforYes = document.getElementById("inforYes");

    if (inforYes.checked) {
        feedbackImprovementsInput.removeAttribute("required");
    } else {
        feedbackImprovementsInput.setAttribute("required", "");
    }
}

window.onload = function() {
    adjustImprovementsRequirement(); 
};

function previewFeedback() {
    if (validateFeedback()) {
        var feedbackName = document.getElementById("feedbackName").value;
        var feedbackEmail = document.getElementById("feedbackEmail").value;
        var feedbackImprovements = document.getElementById("feedbackImprovements").value;
        var feedbackRating = document.querySelector('input[name="feedbackRating"]:checked').value;
        var feedbackUpdates = document.getElementById("feedbackUpdates").value;
        var feedbackRecommend = document.querySelector('input[name="feedbackRecommend"]:checked').value;
        var feedbackAdditional = document.getElementById("feedbackAdditional").value;

        var previewMessage = "Name: " + feedbackName + "<br>";
        previewMessage += "Email: " + feedbackEmail + "<br>";
        previewMessage += "Improvements you suggested: " + feedbackImprovements + "<br>";
        previewMessage += "Rating: " + feedbackRating + "<br>";
        previewMessage += "Updates: " + feedbackUpdates + "<br>";
        previewMessage += "Recommend: " + feedbackRecommend + "<br>";
        previewMessage += "Additional comments: " + feedbackAdditional;

        document.getElementById("modalContent").innerHTML = previewMessage;
        document.getElementById("myModal").style.display = "block";
        document.getElementById("submitConfirmation").style.display = "block";
    }
}
//source: https://www.youtube.com/watch?v=8JBl2Ug7P_E
function submitFeedback() { 
    var feedbackName = document.getElementById("feedbackName").value;
    var feedbackEmail = document.getElementById("feedbackEmail").value;
    var feedbackImprovements = document.getElementById("feedbackImprovements").value;
    var feedbackRating = document.querySelector('input[name="feedbackRating"]:checked').value;
    var feedbackUpdates = document.getElementById("feedbackUpdates").value;
    var feedbackRecommend = document.querySelector('input[name="feedbackRecommend"]:checked').value;
    var feedbackAdditional = document.getElementById("feedbackAdditional").value;

    var messageBody = "Name: " + feedbackName + "\n";
    messageBody += "Email: " + feedbackEmail + "\n";
    messageBody += "Improvements you suggested: " + feedbackImprovements + "\n";
    messageBody += "Rating: " + feedbackRating + "\n";
    messageBody += "Updates: " + feedbackUpdates + "\n";
    messageBody += "Recommend: " + feedbackRecommend + "\n";
    messageBody += "Additional comments: " + feedbackAdditional;

    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "ransikasilva03.22@gmail.com",
        Password: "8703328A4FC9AC05871B0BEFFE0556A5E93A",
        To: "neethila.20230150@iit.ac.lk", 
        From: "ransikasilva03.22@gmail.com", 
        Subject: "Feedback Submission",
        Body: messageBody
    }).then(function (message) {
        if (message === 'OK') {
            document.getElementById("myModal").style.display = "none";
            document.getElementById("thankYouModal").style.display = "block";
            document.forms["feedbackForm"].reset();
        } else {
            alert("Failed to submit feedback!");
        }
    });
}

function cancelSubmission() {
    document.getElementById("myModal").style.display = "none";
    document.getElementById("submitConfirmation").style.display = "none";
}

function closeThankYouModal() {
    document.getElementById("thankYouModal").style.display = "none";
}
