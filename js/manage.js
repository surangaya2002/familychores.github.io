function addAdult() {
    // First check if a <tbody> tag exists, add one if not
    if ($("#tblAdults tbody").length == 0) {
        $("#tblAdults").append("<tbody></tbody>");
    }

    // Append product to the table
    $("#tblAdults tbody").append("<tr>" +
        "<td>" + $("#inputFname").val() + "</td>" +
        "<td>" + $("#inputLname").val() + "</td>" +
        "<td>" + $("#inputEmail").val() + "</td>" +
        "<td>" + $("#inputTelephone").val() + "</td>" +
        "<td>" +
        "<button type='button' onclick='adultEdit(this);' class='btn btn-default'>" +
        "<span class='glyphicon glyphicon-edit' />" +
        "</button>" +
        "<button type='button' onclick='adultDelete(this);' class='btn btn-default'>" +
        "<span title='Delete' class='glyphicon glyphicon-trash' />" +
        "</button>" +
        "</td>" +
        "</tr>");
}

function clearAdult() {
    $("#inputFname").val("");
    $("#inputLname").val("");
    $("#inputEmail").val("");
    $("#inputTelephone").val("");
    $("#inputUserName").val("");
    $("#inputPassword").val("");
}

function adultDelete(ctl) {
    $(ctl).parents("tr").remove();
}

function adultEdit(ctl) {
    _row = $(ctl).parents("tr");
    var cols = _row.children("td");
    $("#inputFname").val($(cols[0]).text());
    $("#inputLname").val($(cols[1]).text());
    $("#inputEmail").val($(cols[2]).text());
    $("#inputTelephone").val($(cols[3]).text());
    
    // Change Update Button Text
    $("#btnAdd").text("Update");
}

function productUpdate() {
    if ($("#btnAdd").text() == "Update") {
        productUpdateInTable();
    }
    else {
        addAdult();
    }
    
    // Clear form fields
    clearAdult();
    
    // Focus to product name field
    $("#inputFname").focus();
}

function productUpdateInTable() {
    // Add changed product to table
    $(_row).after(productBuildTableRow());
    
    // Remove old product row
    $(_row).remove();
    
    // Clear form fields
    formClear();
    
    // Change Update Button Text
    $("#updateButton").text("Add");
}