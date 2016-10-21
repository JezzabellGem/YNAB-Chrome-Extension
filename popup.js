// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function() 
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}//this adds a trim function to any string to remove white space - this changes
 //what it means to be a string, but only for strings that come after this function

function renderStatus(statusText) {
  document.getElementById('status').textContent += statusText;
}
function summarizeAccounts(results) {
    var spending=0
    var billing=0
    var savings=0
    var categories=results[0]
    for(index=0;index<categories.length;index++){
		var categoryname = categories[index][0]
		var categoryamount = categories[index][1].trim()//because java script is magic?
		var negative = categoryamount[0]=='-'
		categoryamount = categoryamount.replace(/[-,$.]/g, '');
		categoryamount = Number(categoryamount)
		if(negative){
		categoryamount = -categoryamount
		}
		if(categoryname.includes('Spending')){
			spending = spending + categoryamount
		}
		else if (categoryname.includes('Savings')){
			savings = savings + categoryamount
		}
		else{
			billing = billing + categoryamount
		}
    } //this loop will run once for every category row
	renderStatus(' spending '+(spending/100))
	renderStatus(' savings '+(savings/100))
	renderStatus(' billing '+(billing/100))
}

function testing() {
    return 5;
}
document.addEventListener('DOMContentLoaded', function() {
    renderStatus("Erin Rocks")
  chrome.tabs.executeScript({
    code: 'Array.from(document.getElementsByClassName("is-sub-category")).map(function(row) {\
return[\
row.getElementsByClassName("budget-table-cell-name")[0].innerText,\
row.getElementsByClassName("budget-table-cell-available")[0].innerText\
]})'
  }, summarizeAccounts );
  
});