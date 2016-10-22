// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.



function writeTextToPopup(textToBeWritten) {
  document.getElementById('status').textContent += textToBeWritten;
}


function summarizeAccounts(results) {
    var spending=0
    var billing=0
    var savings=0

    var rows=results[0]

    for(index=0;index<rows.length;index++){
		var row = rows[index] // get the current row
		
		var name = row[0] // extract the name from the row
		var amount = row[1] // extract amount from the row
		var checked = row[2] // if the row is checked

		
		if(checked == 1){ // if the row is checked, 
			continue      // we skip the rest of the loop and continue with the next row.
			            
		}
		
		// remove all unwanted characters
	    amount = amount.replace('$', ''); // removes $
		amount = amount.replace('.', ''); // removes .
		amount = amount.replace(',', ''); // removes ,
		amount = amount.replace(' ', ''); // removes space
		amount = amount.replace('\n', ''); // removes return
		amount = amount.replace('\t', ''); // removes tab
		
		amount = Number(amount) // turns amount from string to number
		
		// determine which category amount should be added to
		//this loop will run once for every row
		if(name.includes('Spending')){
			spending = spending + amount
		}
		else if (name.includes('Savings')){
			savings = savings + amount
		}
		else{
			billing = billing + amount // anything not marked as savings or spending
			                           // goes to billing
		}
    } 

    // these amounts get put into the popup
	writeTextToPopup(' spending '+(spending/100))
	writeTextToPopup(' savings '+(savings/100))
	writeTextToPopup(' billing '+(billing/100))
}

// this code give us access to the YNAB page
// first line gives me the name of the row
// second line gives me the amount
// third line tells me if it's checked or not
document.addEventListener('DOMContentLoaded', function() {
    writeTextToPopup("Erin Rocks")
  chrome.tabs.executeScript({
    code: 'Array.from(document.getElementsByClassName("is-sub-category")).map(function(row) {\
return[\
row.getElementsByClassName("budget-table-cell-name")[0].innerText,\
row.getElementsByClassName("budget-table-cell-available")[0].innerText,\
row.getElementsByClassName("is-checked").length\
]})'
  }, summarizeAccounts );
  
});