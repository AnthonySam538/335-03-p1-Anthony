/* Author: Anthony Sam (anthonysam538@csu.fullerton.edu)
This is the javascript file. While the .html file contains the programming 
for the html page, this .js file contains the programming for the ant.

The setup() function will automatically be called at the start, and the 
draw() function will be called on every frame. The keyPressed() function 
will be called when a key on the keyboard is pressed and the 
mousePressed() function will be called when the user clicks the mouse. 
updateSquare() is a function that can be called from within other 
functions. You could call the other functions like setup() and 
mousePressed() from other functions too, but that's typically not too 
useful. Anyways, we can see that updateSquare() is called within 
draw() and mousePressed(). By doing this, the number of lines of code goes 
down a bit, and maybe the code's more readable too.

Finally, this .js file uses a 2-D array that contains numbers associated 
with each of the 5 colors. By checking the number of a selected spot in 
the array, the ant is able to determine what color it is on so that it can 
change direction and change the tile's color. */

function setup() // p5.js setup function
{
    /* Create a JavaScript object named "grid." This will contain handy information about the grid of cells.
    cell_size: The size of each cell, in pixels
    width: The amount of cells in a row
    height: The amount of cells in a column
    colors: A 2-D array that contains the colors for all cells in the grid, stored as a number. */
    grid = { cell_size: 10, width: 41, height: 41, colors: [] };
    
    createCanvas(grid.width * grid.cell_size, grid.height * grid.cell_size); // Create a canvas 410 pixels wide, and 410 pixels tall

    frameRate(24); // draw() will be called 24 times per second

    // Initialize the grid (Note that the variables x and y here are declared as local variables, so they'll disappear when their for loops end)
    for (let x = 0; x < grid.width; ++x)
    {
        grid.colors[x] = []; // create nested array
        for (let y = 0; y < grid.height; ++y)
        {
            grid.colors[x][y] = 0; // initially, all tiles are black (0)
        }
    }

    // Create the bot object
    bot = { direction: 0, x: int(grid.width / 2), y: int(grid.height / 2) };
}

function draw() // p5.js draw function
{
    noStroke() // no outlines

    // Change the bot's direction by looking at its current coordinates.
    if (grid.colors[bot.x][bot.y] % 2) // if the bot is standing on either a red or blue tile, then increment bot.direction (Turn 90 degrees clockwise)
        bot.direction = ++bot.direction % 4;
    else // if the bot is standing on either a black, yellow, or green tile, then decrement bot.direction (Turn 90 degrees counterclockwise)
    {
        if (bot.direction)
            --bot.direction;
        else
            bot.direction = 3;
    }

    // Increment the color of the tile that the bot's standing on
    grid.colors[bot.x][bot.y] = ++grid.colors[bot.x][bot.y] % 5; // first, update the value in the 2-D array
    updateSquare();
    
    // Update the bot's coordinates, then redraw the bot
    fill('white'); // change the color we're currently using to white for the bot
    switch(bot.direction)
    {
        case 0: // facing north
            if (bot.y)
                --bot.y;
            else
                bot.y = grid.width - 1;
            triangle((bot.x + 0.5) * grid.cell_size, bot.y * grid.cell_size, bot.x * grid.cell_size, (bot.y + 1) * grid.cell_size, (bot.x + 1) * grid.cell_size, (bot.y + 1) * grid.cell_size);
            break;
        case 1: // facing east
            bot.x = ++bot.x % grid.width;
            triangle((bot.x + 1) * grid.cell_size, (bot.y + 0.5) * grid.cell_size, bot.x * grid.cell_size, bot.y * grid.cell_size, bot.x * grid.cell_size, (bot.y + 1) * grid.cell_size);
            break;
        case 2: // facing south
            bot.y = ++bot.y % grid.height;
            triangle((bot.x + 0.5) * grid.cell_size, (bot.y + 1) * grid.cell_size, (bot.x + 1) * grid.cell_size, bot.y * grid.cell_size, bot.x * grid.cell_size, bot.y * grid.cell_size);
            break;
        default: // facing west
            if (bot.x)
                --bot.x;
            else
                bot.x = grid.height - 1;
            triangle(bot.x * grid.cell_size, (bot.y + 0.5) * grid.cell_size, (bot.x + 1) * grid.cell_size, (bot.y + 1) * grid.cell_size, (bot.x + 1) * grid.cell_size, bot.y * grid.cell_size);
            break;
    }
}

// When a key on the keyboard is pressed, pause the bot
function keyPressed()
{
    if (isLooping()) // if the program is running, then pause the program
        noLoop();
    else // otherwise, resume the program
        loop();
}

// If the mouse clicked in the canvas, then relocate the bot to where the mouse clicked
function mousePressed()
{
    // console.log("Mouse (x,y): (" + x_position + ',' + y_position + ')');

    // First, remove the bot from where it currently is by drawing the tile it's standing on over the bot
    updateSquare();
    
    // Then, move the bot to where the mouse clicked
    if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) // if the user clicked in the canvas
    {
        bot.x = floor(round(mouseX) / grid.cell_size); // change the x-coordinate of the bot
        bot.y = floor(round(mouseY) / grid.cell_size); // change the y-coordinate of the bot
    }
}

// This code snippet was used twice, so I thought I'd put it in a function.
// This function uses the number found in grid.colors[][] to determine what color the square should now be
function updateSquare()
{
    switch (grid.colors[bot.x][bot.y]) // change the color we are currently using
    {
        case 0:
            fill('black');
            break;
        case 1:
            fill('red');
            break;
        case 2:
            fill('yellow');
            break;
        case 3:
            fill('blue');
            break;
        case 4:
            fill('green');
            break;
    }
    rect(bot.x * grid.cell_size, bot.y * grid.cell_size, grid.cell_size, grid.cell_size); // draw the square
}
