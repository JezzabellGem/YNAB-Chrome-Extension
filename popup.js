// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.



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
		var categoryamount = categories[index][1]
		var negative = categoryamount[0]=='-'
		categoryamount = categoryamount.replace('-', '');//removes -
		categoryamount = categoryamount.replace('$', '');//removes $
		categoryamount = categoryamount.replace('.', '');//removes .
		categoryamount = categoryamount.replace(',', '');//removes ,
		categoryamount = categoryamount.replace(' ', '');//removes space
		categoryamount = categoryamount.replace('\n', '');//removes return
		categoryamount = categoryamount.replace('\t', '');//removes tab
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