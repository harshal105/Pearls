# Pearl’s
This repository hosts the source code for our final project in CPSC 481 (Human-Computer Interaction) Fall 2024, where we are developing a food ordering system called Pearl’s.

## Authors:
+ David Escarcia Rodriguez
+ Danielle Jourdain
+ Harshal Patel
+ Sara Velasco
+ Jenna Vlaar

## Getting Started
Visit the link to the deployed site.
https://harshal105.github.io/Pearls/

## Feature Walkthrough

### View Menu

- Touch the screen to scroll through the menu on a tablet device
- Use your mouse to scroll through the menu on a computer

### Jump to Menu Section

- Select menu section header to jump to sections

### Filter Menu

There are several ways to filter the menu items displayed on the screen. These options include: 

- Filter by palate
    - Select the palate you would like
    - Menu should filter items which are categorized by this palate.
- Filter by dietary preferences
    - Select the dietary preferences that you have
    - Menu should display only items which suit these dietary preferences.
- Filter by include
    - Type ingredients which you would like included in displayed dishes
    - Press the enter bar
    - Menu will display only items which include that ingredient
- Filter by exclude
    - Type ingredients which you would like excluded from displayed dishes
    - Press the enter bar
    - Menu will display only items which exclude that ingredient

### Removing Filter From Filter Menu

- If removing an ingredient include/exclude, click the checkbox beside the ingredient name in the filter panel to remove a filter that has been applied
- If removing a palate or dietary filter, click on the darkened box to unselect it.
- This will also remove the filter tag from the main menu screen.

### Removing Filter Tags From Main Menu

- On the home screen, click the `x` button beside the filtered ingredient name found below the navbar
- This will also remove the filter from the filter menu

### Quick Add Item to Cart

- Click the `+` button underneath the image of the food you would like to order. 
- One order for the item will be added to cart

### View Menu Item Pop Up

- Click the picture for the menu item and the pop up will open displaying a dish's full ingredient list, full description, image and title. 

### Close Menu Item Pop Up

- Click on the gray space outside of the pop-up or press the `x` button.
- Adding an item to the cart from the pop-up will also close the pop-up.

### Add Item to Cart (With Quantity)
- Click the picture for the menu item you would like to add to cart
- Once the modal opens up, use the small `+` button and `-` button to increase or decrease the quantity of items you want to add
- Once the desired quantity has been set, click the larger `+` button to add all of the items to the cart

### View Shopping Cart

- Click the cart icon in the top right corner of the screen
- If there is any items in the cart, there will be a small circle with the number of items in the top right corner of the icon

### Change Quantity of Items in Cart

- Use the `+` or `-` buttons next to the food item to modify the quantity

### Remove Items From Cart

- Click on the trash icon next to the food item

### Place Order

- Add item to shopping cart
- Click the cart icon in the top right corner of the screen
- Click the `Place Order` button.
- A popup modal will appear to confirm
- Click the popup `Place Order` button to confirm the order
- Click the `Edit Order` button, `X` button, or outside of the modal to return to the cart

### Back to Menu

- Click the cart icon in the top right corner of the screen
- Click the `Back to Menu` button from the shopping cart view to return to the home page 

### View Already Ordered Items

- Add item to shopping cart
- Click the cart icon in the top right corner of the screen
- Click the `Place Order` button.
- A popup modal will appear to confirm
- Click the popup `Place Order` button to confirm the order
- Click the `Order More` button.
- Click the cart icon in the top right corner of the screen
- There will be a header labelled “Already Ordered” with the previously ordered items below it
- These items can no longer be edited.


### Call Server

- Click on the bell icon found on the top left portion of the screen
- If you accidentally click on the bell icon, or you no longer need to call a server, click the `Cancel Call Server` button
- A server should dismiss this notification, but for the purpose of this prototype it will automatically dismiss after 5 seconds. 


### View Cart with Already Ordered and To-Be-Ordered Menu Items

- Add item to shopping cart
- Click the cart icon in the top right corner of the screen
- Select `Place Order` and confirm selection
- Select `Order More`
- Add another item to shopping cart
- View the shopping cart 
- The shopping cart should now have an already ordered section as well as a section with your to-be-ordered items. 

