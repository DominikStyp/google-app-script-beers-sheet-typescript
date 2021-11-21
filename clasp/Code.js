"use strict";
function getCurrentDate() {
    return new Date().toISOString().slice(0, 10);
}
function insertTestDateWhenVoteColumnIsEdited() {
    var activeCell = SpreadsheetApp.getActive()
        .getActiveSheet()
        .getActiveCell();
    var columnIndex = activeCell.getColumn();
    var rowIndex = activeCell.getRowIndex();
    if (columnIndex === 5) {
        // if we edit vote column we append the date to the test column
        var testDateColumnIndex = 12;
        var dateCell = SpreadsheetApp.getActive()
            .getActiveSheet()
            .getRange(rowIndex, testDateColumnIndex);
        if (activeCell.getValue() === "" || activeCell.getValue() === "-") {
            dateCell.setValue("");
        }
        else {
            dateCell.setValue(getCurrentDate());
        }
    }
}
function changeCommaToDotOnEdit() {
    var activeCell = SpreadsheetApp.getActive()
        .getActiveSheet()
        .getActiveCell();
    var value = activeCell.getValue();
    if (value && value.toString().match(/^\d+,\d+$/g)) {
        activeCell.setValue(value.toString().replace(",", "."));
    }
}
function createCustomMenu() {
    var menu = SpreadsheetApp.getUi().createMenu("?? Custom");
    menu.addItem("Current Date", "pasteCurrentDate");
    menu.addToUi();
}
function pasteCurrentDate() {
    SpreadsheetApp.getActive()
        .getActiveSheet()
        .getActiveCell()
        .setValue(getCurrentDate());
}
// https://spreadsheet.dev/triggers-in-google-sheets
function onOpen() {
    createCustomMenu();
}
function onEdit() {
    insertTestDateWhenVoteColumnIsEdited();
    changeCommaToDotOnEdit();
}
