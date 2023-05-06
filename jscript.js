
const gridContainer = document.querySelector('.grid-container');
const body = document.querySelector('body');
const clear = document.querySelector('.clear');
const randomColor = document.querySelector('.random');
const colorPicker = document.querySelector('.colorPicker');

let containerWidth = gridContainer.offsetWidth - 16;
let mouseDown = false;
let eraserMouseDown = false;
let isRandom = false;
let colorSelected = 'black';

//Select Color
colorPicker.addEventListener('input', func = e => {
    colorSelected = colorPicker.value;
})

//Random Color or Not
randomColor.addEventListener('click', func = () => {
    if(isRandom)
    {
        isRandom = false;
    }
    else
    {
        isRandom = true;
    }
});

//Clear color when clear is clicked
clear.addEventListener('click', Clear)

//Start coloring when mouse down
body.addEventListener('mousedown', func = (e) => {

    console.log(e.button);

    if(e.button === 0)
    {
        mouseDown = true;
    }
    else if(e.button === 2)
    {
        mouseDown = false;
        eraserMouseDown = true;
    }
});

//Stop coloring when mouse up
body.addEventListener('mouseup', func = (e) => {

    console.log(e.button);

    if(e.button === 0)
    {
        mouseDown = false;
    }
    else if(e.button === 2)
    {
        eraserMouseDown = false;
    }
});


//Makes grid and add properties to it
function makeGrid() {

    Reset();
    
    let gridNum = Number(prompt("Enter pixel width:"));

    let gridWidth = containerWidth / gridNum;

    for (let i = 0; i < gridNum * gridNum; i++) {

        const div = document.createElement("div");
        div.className = "grid";
        div.style.width = `${gridWidth}px`;
        div.style.height = `${gridWidth}px`;

        div.addEventListener('mouseover', hovering);

        div.addEventListener('mousedown', colorChange);

        gridContainer.appendChild(div);
        
    }

    gridContainer.addEventListener('mousedown', (event) => {
        event.preventDefault();
        mouseDown = true;
    });

    gridContainer.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });
      
    
    
}

//Deletes all Grids
function Reset()
{
    const gridAll = document.querySelectorAll(".grid");
    gridAll.forEach((grid) => { grid.remove() });
}

function Clear()
{
    const gridAll = document.querySelectorAll(".grid");
    gridAll.forEach((grid) => { grid.style.backgroundColor = "" });
}


// Changing Color when clicked & dragged
function hovering()
{  
    if(mouseDown && !eraserMouseDown)
    {
        if(!isRandom)
        {
            this.style.backgroundColor = colorSelected;
        }
        else
        {
            let randomR = Math.floor(Math.random() * 256);
            let randomG = Math.floor(Math.random() * 256);
            let randomB = Math.floor(Math.random() * 256);

            this.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
        }
    }
    else if (!mouseDown && eraserMouseDown)
    {

        this.style.backgroundColor = colorSelected;
    }
}

function colorChange(e)
{
    if(e.button === 0)
    {
        if(!isRandom)
        {
            this.style.backgroundColor = colorSelected;
        }
        else
        {
            let randomR = Math.floor(Math.random() * 256);
            let randomG = Math.floor(Math.random() * 256);
            let randomB = Math.floor(Math.random() * 256);

            this.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
        }
    }
    else if (e.button === 2)
    {
        this.style.backgroundColor = "";
    }
}


// Ask for size when starts
window.onload = () => {
    makeGrid();

}