const ApplicationName="Quickrooms";


// Call the Data Setters
SetApplicationName(ApplicationName);

// Data Setters
function SetApplicationName(params) {
    document.getElementById("ApplicationName").innerHTML = params;
}