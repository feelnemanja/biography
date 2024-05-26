function Start() {
    document.getElementById("home-div").style.display = "none";
    document.getElementById("question1-div").style.display = "block";
}

var username = document.getElementById("name").value;


function Next() {
    if (document.getElementById("name").value.lenght == null && document.getElementById("name").value == "") {
        alert("Name must be filled out");
    }
    else {
        document.getElementById("question1-div").style.display = "none";
        document.getElementById("question2-div").style.display = "block";
    }
}
function Next1() {
    document.getElementById("question2-div").style.display = "none";
    document.getElementById("question3-div").style.display = "block";
}
function Next2() {
    document.getElementById("question3-div").style.display = "none";
    document.getElementById("question4-div").style.display = "block";
}
function Next3() {
    document.getElementById("question4-div").style.display = "none";
    document.getElementById("question5-div").style.display = "block";
}
function Submit() {
    document.getElementById("question5-div").style.display = "none";
    var rangenumber = document.getElementById("onetofive").value;
    switch (parseInt(rangenumber)) {
        case 1:
            document.getElementById("usernameinput1").innerHTML = " " + document.getElementById("name").value;
            document.getElementById("smile1-div").style.display = "block";
            break;
        case 2:
            document.getElementById("usernameinput2").innerHTML = " " + document.getElementById("name").value;
            document.getElementById("smile2-div").style.display = "block";
            break;
        case 3:
            document.getElementById("usernameinput3").innerHTML = " " + document.getElementById("name").value;
            document.getElementById("smile3-div").style.display = "block";
            break;
        case 4:
            document.getElementById("usernameinput4").innerHTML = " " + document.getElementById("name").value;
            document.getElementById("smile4-div").style.display = "block";
            break;
        case 5:
            document.getElementById("usernameinput5").innerHTML = " " + document.getElementById("name").value;
            document.getElementById("smile5-div").style.display = "block";
            break;

        default:
            alert("error");
            break;
    }

}

function Other() {

    if (document.getElementById("otherradio").checked) {
        document.getElementById("otherinput").style.display = "block";
    }

}
function CancelOther() {
    if (!document.getElementById("otherradio").checked) {
        document.getElementById("otherinput").style.display = "none";
    }
}
