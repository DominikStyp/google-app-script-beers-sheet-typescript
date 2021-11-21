import SheetRange = GoogleAppsScript.Spreadsheet.Range;
import BaseMenu = GoogleAppsScript.Base.Menu;

function getCurrentDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function insertTestDateWhenVoteColumnIsEdited(): void {
  let activeCell: SheetRange = SpreadsheetApp.getActive()
    .getActiveSheet()
    .getActiveCell();

  let columnIndex: number = activeCell.getColumn();
  let rowIndex: number = activeCell.getRowIndex();

  if (columnIndex === 5) {
    // if we edit vote column we append the date to the test column
    let testDateColumnIndex: number = 12;
    let dateCell: SheetRange = SpreadsheetApp.getActive()
      .getActiveSheet()
      .getRange(rowIndex, testDateColumnIndex);

    if (activeCell.getValue() === "" || activeCell.getValue() === "-") {
      dateCell.setValue("");
    } else {
      dateCell.setValue(getCurrentDate());
    }
  }
}

function changeCommaToDotOnEdit(): void {
  let activeCell: SheetRange = SpreadsheetApp.getActive()
    .getActiveSheet()
    .getActiveCell();
  let value = activeCell.getValue();
  if (value && value.toString().match(/^\d+,\d+$/g)) {
    activeCell.setValue(value.toString().replace(",", "."));
  }
}

function createCustomMenu(): void {
  let menu: BaseMenu = SpreadsheetApp.getUi().createMenu("?? Custom");
  menu.addItem("Current Date", "pasteCurrentDate");
  menu.addToUi();
}

function pasteCurrentDate(): void {
  SpreadsheetApp.getActive()
    .getActiveSheet()
    .getActiveCell()
    .setValue(getCurrentDate());
}

// https://spreadsheet.dev/triggers-in-google-sheets
function onOpen(): void {
  createCustomMenu();
}

function onEdit(): void {
  insertTestDateWhenVoteColumnIsEdited();
  changeCommaToDotOnEdit();
}
