$(document).ready(function () {
    loadEmployees();


});

function loadEmployees() {
    let getRequest = $.ajax({
        type: "GET",
        url: "http://localhost:3000/kursevi"
    });

    getRequest.done(function (data) {
        $("#coursesTable tbody").empty();
        $.each(data, function (i, element) {
            $("#coursesTable tbody").append(`<tr>
                <td>${element.Course}</td>
                <td>${element.Startingdate}</td>
                <td>${element.Duration}</td>
                <td>${element.Price}</td>
                <td>
                    <button id="${element.id}_view" class="btn btn-outline-info text-dark" onclick="openModal1()"> View Details </button>
                </td>
                <td class="openreservationclass">
                    <button id="${element.id}_reserve" class="btn btn-outline-success text-dark" onclick="openModal(this)"> Make Reservation </button>
                </td>
                </tr>`)
        });

        $("#coursesTable").dataTable();
    });

    getRequest.fail(function (err) {
        alert(err.statusText);
    });
}
function openModal1() {
    var modal = document.getElementById('detailModal');
    if (modal) {
        modal.style.display = 'block';
    } else {
        console.error('Modal with id "11111" not found.');
    }
}





function openModal(button) {

    var modal = document.getElementById('myModal');
    if (modal) {
        modal.style.display = 'block';
    } else {
        console.error('Modal with id "myModal" not found.');
    }
    var row = button.closest("tr");
    var cells = row.getElementsByTagName("td");
    var courseName = cells[0].innerText; 
    var price = cells[3].innerText; 

    
    document.getElementById("courseName").value = courseName;
    document.getElementById("price").value = price;
}

function closeModal() {
    var modal = document.getElementById('detailModal');
    if (modal) {
        modal.style.display = 'none';
    }
}
function deleteEmployee(element_id, event) {
    $.ajax({
        url: "http://localhost:3000/savedcourses/" + element_id,
        type: "DELETE",
        dataType: "json",
        success: function () {
            $(event.target).parent().parent().remove();
        },
        error: function () {
            alert("Neuspelo brisanje");
        }
    })
}
$(document).ready(function () {
   
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    
    $('#myForm').validate({
        rules: {
            name: "required",
            surname: "required",
            note: "required",
            email: {
                required: true,
                email: true
            }

        },
        submitHandler: function (form) {
            var formData = {

                name: $('#name').val(),
                surname: $('#surname').val(),
                email: $('#email').val(),
                courseName: $('#courseName').val(),
                price: $('#price').val(),
                note: $('#note').val(),
            };

            
            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/savedcourses/', 
                contentType: 'application/json',
                data: JSON.stringify(formData),
                success: function (response) {
                    console.log('Data saved successfully:', response);

                  
                    updateTable(); 
                    modal.style.display = "none"; 
                },
                error: function (xhr, status, error) {
                    console.error('Error saving data:', error);
                    
                }
            });

            return false; 
        }
    });

   
    function updateTable() {
    $.get('http://localhost:3000/savedcourses/', function (data) {
        var tableBody = $('#dataTable tbody');
        tableBody.empty(); 

        $.each(data, function (index, entry) {
            var row = '<tr>' +
                '<td>' + entry.name + '</td>' +
                '<td>' + entry.surname + '</td>' +
                '<td>' + entry.email + '</td>' +
                '<td>' + entry.courseName + '</td>' +
                '<td>' + entry.price + '</td>' +
                '<td>' + entry.note + '</td>' +
                '<td><button class="btn btn-outline-info text-dark editBtn" data-reservation-id="' + entry.id + '">Change Reservation</button></td>' +
                '<td><button class="btn btn-danger deleteBtn" data-reservation-id="' + entry.id + '">Delete Reservation</button></td>' +
                '</tr>';
            tableBody.append(row);
        });
    }).fail(function (xhr, status, error) {
        console.error('Error fetching data:', error);
        
    });
}


    

    updateTable(); 

});
function deleteReservation(reservationId, button) {
    $.ajax({
        url: 'http://localhost:3000/savedcourses/' + reservationId,
        type: 'DELETE',
        dataType: 'json',
        success: function () {
            $(button).closest('tr').remove();
            console.log('Reservation deleted successfully.');
        },
        error: function (xhr, status, error) {
            console.error('Error deleting reservation:', error);
            alert('Failed to delete reservation.');
        }
    });
}


$(document).on('click', '.deleteBtn', function () {
    var reservationId = $(this).attr('data-reservation-id');
    var confirmation = confirm('Are you sure you want to delete this reservation?');
    
    if (confirmation) {
        deleteReservation(reservationId, this);
    }
});


function toggleTables() {
    var table1 = document.getElementById("coursesTable");
    var table2 = document.getElementById("dataTable");
    var viewButton = document.getElementById("viewReservations");
    var backButton = document.getElementById("backToCourses");
    var money = document.getElementById("totalSum")
    table1.style.display = "none";
    table2.style.display = "block";
    viewButton.style.display = "none";
    backButton.style.display = "block";
    money.style.display="block";

}

function showCourses() {
    var table1 = document.getElementById("coursesTable");
    var table2 = document.getElementById("dataTable");
    var viewButton = document.getElementById("viewReservations");
    var backButton = document.getElementById("backToCourses");
    var money = document.getElementById("totalSum")
    table1.style.display = "block";
    table2.style.display = "none";
    viewButton.style.display = "block";
    backButton.style.display = "none";
    money.style.display="none";
}







