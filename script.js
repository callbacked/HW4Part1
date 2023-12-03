/*
GUI Assignment: Homework 4
Date: 11/07/2023
Name: Alexander Vasquez Romero Jr
Email: alexander_vasquez1@student.uml.edu
Description: My JS file for generating the multiplication table, now with jQuery form validation
*/

// Table generation function
function generateTable() {
    // Retrieve start and end values for the multiplier from the form
    var multiplierStart = parseInt(document.getElementById('multiplierStart').value);
    var multiplierEnd = parseInt(document.getElementById('multiplierEnd').value);

    // Retrieve start and end values for the multiplicand from the form
    var multiplicandStart = parseInt(document.getElementById('multiplicandStart').value);
    var multiplicandEnd = parseInt(document.getElementById('multiplicandEnd').value);

    // Clear previous error messages
    document.getElementById('errorMessage').innerHTML = '';

    // Validate the input: checks if the numbers are within the specified range and are integers, throws errors if not
    if (!isValidInput(multiplierStart, multiplierEnd, multiplicandStart, multiplicandEnd)) {
        //document.getElementById('errorMessage').innerHTML = 'Error: Please enter integers within the range of -50 to 50.';
        return;
    } 

/*
Cited:
- Usage of various JS features:
https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
*/
    var table = '<table border="1"><tr><th></th>';

    // Loop to create the header row for multipliers.
    // It adds a table header (<th>) for each multiplier from multiplierStart to multiplierEnd.
    for (var i = multiplierStart; i <= multiplierEnd; i++) {
        table += '<th>' + i + '</th>';
    }
    table += '</tr>';

    // Rows for multiplicands and calculations
    // Outer loop: Iterates through each multiplicand, creating a new row (<tr>) for each.
    // Inner loop: Within each row, iterates through multipliers, calculating and adding the product of multiplicand and multiplier in table data cells (<td>).
    for (var j = multiplicandStart; j <= multiplicandEnd; j++) {
        table += '<tr><th>' + j + '</th>';
        for (var k = multiplierStart; k <= multiplierEnd; k++) {
            table += '<td>' + (j * k) + '</td>';
        }
        table += '</tr>';
    }
    table += '</table>';

    // Output the generated table HTML into the 'tableContainer' element
    document.getElementById('tableContainer').innerHTML = table;
}
/* Cited:
using loops to add on to elements -> https://www.w3schools.com/js/js_loop_for.asp
picture of a table to help me visualize how my for loop should work -> https://learnerszonehome.files.wordpress.com/2019/07/html_table_structure.gif
*/

// function that checks if input is valid (number lies between -50 to 50)
function isValidInput(multiplierStart, multiplierEnd, multiplicandStart, multiplicandEnd) {
    return Number.isInteger(multiplierStart) && Number.isInteger(multiplierEnd) &&
           Number.isInteger(multiplicandStart) && Number.isInteger(multiplicandEnd) &&
           multiplierStart >= -50 && multiplierEnd <= 50 &&
           multiplicandStart >= -50 && multiplicandEnd <= 50;
}

// jQuery Validation setup
/* Cited:
https://www.sitepoint.com/basic-jquery-form-validation-tutorial/
*/

$(document).ready(function() {
    $("#tableForm").validate({
        rules: {
// rules for input validation
            multiplierStart: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            multiplierEnd: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            multiplicandStart: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            multiplicandEnd: {
                required: true,
                number: true,
                range: [-50, 50]
            }
        },
// Messages thrown for validation errors
        messages: {
            multiplierStart: {
                required: "This field is required",
                number: "Please enter a valid number",
                range: "Value must be between -50 and 50"
            },
            multiplierEnd: {
                required: "This field is required",
                number: "Please enter a valid number",
                range: "Value must be between -50 and 50"
            },
            multiplicandStart: {
                required: "This field is required",
                number: "Please enter a valid number",
                range: "Value must be between -50 and 50"
            },
            multiplicandEnd: {
                required: "This field is required",
                number: "Please enter a valid number",
                range: "Value must be between -50 and 50"
            }
        },
        submitHandler: function(form) {
            generateTable();
            console.log('Form is valid and submitted');
            return false; // Prevent form submission
        },
        invalidHandler: function(event, validator) {
            
            console.log('Form is invalid and not submitted'); // This will be called when the form is submitted with invalid inputs (using for debug purposes)
        }
    });
});