function setup() // p5.js setup function
{
    /* Create a JavaScript object named "grid." This will contain handy information about the grid of cells.
    cell_size: The size, in pixels, of each cell
    width: The amount of cells in a row
    height: The amount of cells in a column
    colors: A 2-D array that contains the colors for all cells in the grid, stored as a number. */
    grid = { cell_size: 10, width: 41, height: 41, colors: [] };
    
    createCanvas(grid.width * grid.cell_size, grid.height * grid.cell_size); // Create a canvas 410 pixels wide, and 410 pixels tall

    frameRate(24); // draw() will be called 24 times per second

    // Initialize the grid
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

function draw()
{
    noStroke() // no outlines

    /* // Draw the bot based on its current direction (bot.direction) and coordinates (bot.x & bot.y)
    fill('white');
    switch (bot.direction)
    {
        case 0:
            triangle((bot.x + 0.5) * grid.cell_size, bot.y * grid.cell_size, bot.x * grid.cell_size, (bot.y + 1) * grid.cell_size, (bot.x + 1) * grid.cell_size, (bot.y + 1) * grid.cell_size);
            break;
        case 1:
            triangle((bot.x + 1) * grid.cell_size, (bot.y + 0.5) * grid.cell_size, bot.x * grid.cell_size, bot.y * grid.cell_size, bot.x * grid.cell_size, (bot.y + 1) * grid.cell_size);
            break;
        case 2:
            triangle((bot.x + 0.5) * grid.cell_size, (bot.y + 1) * grid.cell_size, (bot.x + 1) * grid.cell_size, bot.y * grid.cell_size, bot.x * grid.cell_size, bot.y * grid.cell_size);
            break;
        default:
            triangle(bot.x * grid.cell_size, (bot.y + 0.5) * grid.cell_size, (bot.x + 1) * grid.cell_size, (bot.y + 1) * grid.cell_size, (bot.x + 1) * grid.cell_size, bot.y * grid.cell_size);
            break;
    } */

    // Use the bot's current coordinates to determine what color it's standing on. Change its direction accordingly.
    if (grid.colors[bot.x][bot.y] % 2) // if the bot is standing on either a red or blue tile, then increment bot.direction
        bot.direction = ++bot.direction % 4;
    else // if the bot is standing on either a black, yellow, or green tile, then decrement bot.direction
    {
        if (bot.direction)
            --bot.direction;
        else
            bot.direction = 3;
    }

    // Increment the color of the tile that the bot's standing on
    grid.colors[bot.x][bot.y] = ++grid.colors[bot.x][bot.y] % 5;
    switch (grid.colors[bot.x][bot.y])
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
    rect(bot.x * grid.cell_size, bot.y * grid.cell_size, grid.cell_size, grid.cell_size);
    
    // Update the bot's coordinates by using its old coordinates and its new direction
    fill('white');
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

function keyPressed()
{
    if (isLooping()) // if the program is running, then pause the program
        noLoop();
    else // otherwise, resume the program
        loop();
}

function mousePressed()
{
    // console.log("Mouse (x,y): (" + x_position + ',' + y_position + ')');

    if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) // if the user clicked in the canvas
    {
        bot.x = floor(round(mouseX) / grid.cell_size); // change the x-coordinate of the bot
        bot.y = floor(round(mouseY) / grid.cell_size); // change the y-coordinate of the bot
    }

    // Remove the triangle from the display
}