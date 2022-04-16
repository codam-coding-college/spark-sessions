# Spark Session: MLX42
*Updated: 30/03/2022*

Session description:
> Learn the basics of working with MLX42

This tutorial was written by de la Hamette Leon Jean Laurenti, [click here](https://github.com/codam-coding-college/MLX42/wiki) for the documentation regarding MLX42.

**Hint: Most question you will have will most likely be answered by reading the documentation or the MLX42.h file!**

## Topics
1. Window Management
2. Pixel Putting
3. More Pixels
4. Events & Hooks

### Window Management
Our first step will be to open up a window! (30 mins)

1. In the set-up instructions, Some code was given to you for your `main.c` that included a call to `mlx_init`.  
    But what does it do and what is its prototype? What does it return? (5 mins)
	- What are the variables we are passing to `mlx_init` ?
	- Study and understand the return value type and its layout!
	- Change the parameters to create a window with a width of **800** and a height of **400**, a title of your choice and make it so that we can **not** resize our window.

2. What happens if you compile and run the program at this point? Your window should have only popped up for a moment.  
    To make it stay longer, we need to use `mlx_loop`. (15 mins)
    - What does it do and what is its prototype?
    - Once you understand that, add `mlx_loop` to your code.
    - Do you now get a window that stays open?

3. How do we properly exit our application? When our application closes, MLX42 needs clean up its resources.
	To make this possible use `mlx_terminate` (2 mins)
	- Understand the purpose of having this function.
	- **Important**: `mlx_loop` should be called before this function in your code. Do you know why?

***Break (5 mins)***

### Images & Pixel Putting
Time to put something on that empty window. (60 mins)

1. Let there be colourful pixels! As of now your window is pretty much void of anything. Just like a painter we need a canvas to draw on, its time to learn about images in MLX...
	- What exactly is an image anyway?
	- How do we create a new image? What are the prototypes and the return value?
	- Study and understand the return value type and its layout!
    - Once you understand that, go ahead and initialise an image with a size of the window.

2. MLX already provides a function to put a pixel onto an image, however, it is of more value to actually understand what is going on behind the scenes.
	- What does the function do?
	- How does it achieve the actual 'putting' of a pixel?
	- What can we learn about how colors are represented?

3. Time to become Bob Ross and draw a nice little pixel, put a **white** pixel in the **middle** of your image.

5. Our image/canvas is all ready to be shown! Let's look at `mlx_image_to_window`. What parameters does it take?  
    Add the function to your code and see if your little white dot is showing in your window. (10 mins)

***Break (5 mins)***

### More Pixels
Let's get fancier. Now we're gonna try drawing *lines*. (25 mins)

1. Draw a single horizontal white line running across the middle of the entire screen. You'll need to call `mlx_pixel_put` in a loop. (15 mins)

2. Now draw a single vertical white line down the middle of the entire screen. You should end up with what looks like a crosshair in your window. (10 mins)

&nbsp;  
### Hooks
You might have noticed that we can already very easily close our window, however we are not properly taking care of our resources. So lets see how we can hook onto the 'X' close button to do just that. (35 mins)

1. Hooks, are vital to making your program interactive. They allow you to intercept keyboard or mouse events and respond to them. You can think of hooks as functions that get called when an event occurs. MLX provides 2 types of hooks, specialized and generic ones.
	- What exactly are generic and specialized hooks ?
	- Here's something that might help you understand: [Hooks](https://github.com/codam-coding-college/MLX42/wiki/Hooks)

2. Regarding hooking onto the keyboard, MLX provides a header file that neatly displays all the different keycodes.



3. miniLibX uses the event codes and masks set out in the [**X11** library](https://code.woboq.org/qt5/include/X11/X.h.html). What do event codes and masks do? (5 mins)
    - Here's something that might help you understand: [event processing](https://tronche.com/gui/x/xlib/events/processing-overview.html)

4. What are the **event codes** and **masks** for key presses, key releases, and the 'X' close button? (10 mins)
    - Here's a really helpful resource: [handling mouse and keys](https://github.com/VBrazhnik/FdF/wiki/How-to-handle-mouse-buttons-and-key-presses%3F)
    - **Watch out**: the Linux event code for the 'X' close button is different than on macOS. Whereas Mac users can use the code for "DestroyNotify", Linux (and WSL) users will need the code for "ClientMessage".

5. Write a function that: (10 mins)
    - takes as its argument a **pointer to a struct** containing at least your mlx pointer and window pointer *(either make a new struct or expand your existing one)*;
    - destroys your window and exits your program.

6. Add a call to `mlx_hook` in your main that calls this exiting function when the 'X' button is pressed. (5 mins)
    - Does your window close now when you press the 'X' close button on your window?

### Bonus
Let's get some movement on screen: make your crosshair move in 4 directions!  

First, however, let's make our crosshair smaller, because who needs a crosshair that big?

1. Expand your struct to include **at least** the following variables you'll need for your drawing function:
    - object width & height;
    - starting x & y positions (i.e. the coordinates of the leftmost pixel of your crosshair).

2. Make a `draw_crosshair` function that:
    - accepts your data/game struct as its parameter;
    - can render a crosshair of a particular **width** and **height**, instead of only the height/width of the screen;
    - renders that crosshair in the **middle of the screen** *(you'll have to do some math using the object dimensions and starting positions, sorry)*;
    - calls `mlx_put_image_to_window` at the end.  
3. Get a **30 x 30** pixel crosshair onto your window. Did it work?

Now let's hook into keyboard events!
1. Add a call to `mlx_hook` in your main that calls a function `keypress` when keys are...well, pressed.

2. Write that `keypress` function that:
    - calls your exit function when the `ESC` key is pressed;
    - moves the crosshair up, down, left, and right when the corresponding key is pressed.
        - you can choose to use the arrow keys or `W`-`A`-`S`-`D` keys.
        - I've included helpful diagrams below for the keycodes you'll need.

3. Add a call to `mlx_loop_hook` in your main that calls a function to render the new image with the modified object coordinates.

4. Do you now have a crosshair that can move across your screen?
    - If you're seeing a trail of crosshairs, you're probably not rendering the background each time.
    - If your program is crashing when you hit one of the walls, perhaps you should add checks to your keypress function.
