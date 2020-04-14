function buttons() {
    $("#project1btn").on("click", function (event) {
        event.preventDefault();
        location.href = "geometry.html";
    });
    $("#project2btn").on("click", function (event) {
        event.preventDefault();
        location.href = "https://thepalad1n.github.io/trainSched/";
    });
    $("#project3btn").on("click", function (event) {
        event.preventDefault();
        location.href = "https://thepalad1n.github.io/psych/";
    });
    $("#project4btn").on("click", function (event) {
        event.preventDefault();
        location.href = "https://thepalad1n.github.io/trivaGame/";
    });
    $("#project5btn").on("click", function (event) {
        event.preventDefault();
        location.href = "https://thepalad1n.github.io/crystalCollector/";
    });
    $("#project6btn").on("click", function (event) {
        event.preventDefault();
        location.href = "https://thepalad1n.github.io/gifTastic/";
    });
}
buttons();