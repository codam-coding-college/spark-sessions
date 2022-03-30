## Setting Up MLX42
*updated: 04/03/2021*

During the Spark Session, we'll be writing a little program that can open a window, draw some pixels, and even move pixels!

Before we can do that, we need to set up the MLX42 library and **link** the compiled library with our source code.

1. Download the MLX42 library into the **root directory**.
	- [Download here](https://github.com/codam-coding-college/MLX42)
    - **For the next steps we will assume you've called the folders `MLX42` or `MLX`**.

2. Create a `main.c` in the root directory with the following content (remember to include **MLX42/MLX42.h**):
    ```
    int	main(void)
    {
    	mlx_t	*mlx;
    
    	mlx = mlx_init(256, 256, "Hello World!", false);
    	return (0);
    }
    ```
	Do not worry yet what the parameters are, we will cover them later.
    This will help you check at the end if you're linking your MLX42 correctly to your source files.

3. Now let's create our own Makefile in the root directory, which will compile our `main.c` into a program.  
    Add the required rules - `$(NAME)`, `clean`, `fclean`, `re`, `all`.  
    Here's a [helpful guide on Makefiles](https://noahloomans.com/tutorials/makefile/) written by another student, Noah Loomans.

4. Compile the MLX42 library, so that you get a `libmlx42.a` file.
    **Tip: you could have your Makefile do all this too.** *Hint: `make -C dir`*

5. Using miniLibX requires that we link the necessary **internal API’s**. Here's what you should add to your project Makefile:
    - Once again, **the following commands assume you've named your mlx folder `mlx` (for Mac) or `mlx_linux`**. Also, `OBJ` here refers to the **object files of your project**, e.g. `main.o`, not the mlx files.
    - For macOS: *(make sure the compilation command is on one line)*
        ```
        $(NAME): $(OBJ)
            $(CC) $(OBJ) -Lmlx -lmlx -framework OpenGL -framework AppKit -o $(NAME)
        ```
    - For Linux: first run `sudo apt-get install gcc make xorg libxext-dev libbsd-dev` to install the required `xorg`, `libxext-dev`, and `libbsd-dev` dependencies
        ```
        $(NAME): $(OBJ)
            $(CC) $(OBJ) -Lmlx_linux -lmlx -lXext -lX11 -lm -lz -o $(NAME)
        ```

6. Additional steps if you’re doing this through **Windows Subsystem for Linux**: you need to install [Xming](https://sourceforge.net/projects/xming/) first.
    - Once Xming is installed, exit Xming and launch XLaunch. Choose the following options:  
        `Multiple windows` -> `Start no client` -> Enable `"No access control"` -> `Finish`
    - Then execute this command: `export DISPLAY=localhost:0.0`
    - You can check if everything’s working by running `sudo apt-get install x11-apps` and then executing `xeyes`.
    - **Note**: XLaunch has to be active and the `export DISPLAY` command above must have been run before you can launch graphic programs using miniLibX.

7. Now try running `make` in your project directory. Does your program compile without errors? Your program itself won't do anything for now. If everything works, great! Now you're ready for the SparkSession and your project!