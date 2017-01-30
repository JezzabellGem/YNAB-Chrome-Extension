# YNAB Chrome Extension Description, Installation Instructions and How-To Guide

What does the YNAB Chrome extension do? 

This extension was created to show you how much money you should have in each respective bank account according to how you have things labeled and allocated in YNAB. 

How do I install it?

1) Clone the repository locally using Git

2) Open the extensions window in Chrome

![](screenshots/Screen Shot 1.png)

3) Make sure developer mode is checked and click Load Unpacked Extension

![](screenshots/Screen Shot 2.png)

4) Browse to your project folder and select the repository folder

5) The extension should now be listed in your Chrome extensions area. If you update or make changes to the extension, you must click reload to have them take effect.

![](screenshots/Screen Shot 3.png)

How do I use it?

Once you’ve installed the extension and enabled it, you should see a red square in the upper right corner of your Chrome window.

Open YNAB and sign in.

With YNAB open, click the extension icon.

You’ll see a pop up containing the amounts you should have in each account, and then you can make transfers accordingly.

Currently the accounts and the labels are fixed. We have it broken into 3 categories: Spending, Savings and Billing. If the category name contains “spending” or “savings” it will be counted as belonging to that account, otherwise it’s counted as billing. It isn't styled, so it's ungly, but it's functional. 
