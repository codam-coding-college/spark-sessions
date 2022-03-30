# Spark Session: get_next_line
*updated: 30/03/2022*

Project description:
> Write a function which returns a line read from a file descriptor, without the newline.

## Topics

1. File Handling
2. Static Variables

### File Handling

1. File handling involves 4 major operations that you must understand perfectly
    - Identify these 4 operations, their corresponding system calls, and man pages. (10 mins)
    - Discuss and make sure everyone understands their prototypes and return values.
        Pay attention to the following: (15 mins)
        - The types of the arguments and the return values;
        - The differences between opening a file in **append**, **truncate**, or **default** mode;
        - File descriptors and the 3 special values reserved by the system.

*Break (5 mins)*

2. Now that we're comfortable with these 4 operations in theory, let's give them a try!
    - Create a text file anywhere on your filesystem that contains a few lines of text using your favorite editor or the command `echo`.
    - Let's practice reading from a file. Write a program that: (15 mins)
        - opens that file you made in **read-only** mode,
        - reads the complete contents of the file using a buffer smaller than the file content,
        - writes the contents of that buffer onto standard output,
        - closes the file.
    - Now let's practice writing to a file. Write a program that: (10 mins)
        - opens that file you made in **write-only** and **append** mode,
        - writes some additional characters to the file,
        - closes the file.
    - Then display the content of your text file in the terminal using the `cat` command.

*Break (5 mins)*

### Static Variables

1. What is a static variable?
    - Use the internet to find the definition of a static variable and its unique characteristics.
    - Discuss the following points together and make sure everyone understands: when might you use a static variable? Where is it allocated in memory? What are the disadvantages when it comes to memory and reusability?

2. Let's practice!
    - Write a function that: (10 mins)
        - declares a **static int**,
        - initializes that int to 0,
        - increments it by 1,
        - then returns the int value.
    - Write the accompanying main that calls that function in a loop 9 times and outputs the returned value using **write()** to the standard output on each iteration. What happens to the return value? (10 mins)
    - As a closing step, discuss whether it's possible or not to restore a static variable to its initial value.
