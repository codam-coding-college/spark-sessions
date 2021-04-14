# Spark Session: libasm
*updated: 01/04/2021*

Project description:
> Get familiar with assembly language

This tutorial was written with help from Thijs Bruineman (tbruinem) and [this great tutorial series](https://youtube.com/playlist?list=PLetF-YjXm-sCH6FrTz4AQhfH6INDQvQSn).

## Topics
1. nasm
2. Registers
3. Instructions
4. Syscall
5. Sections
6. Stack Alignment

## Setting Up nasm
For libasm, we'll be using the [Netwide Assembler](https://www.nasm.us/) (`nasm`) to compile our assembly code.
If you haven't already, install `nasm` on your system using the following command:
- For Linux: `sudo apt update && sudo apt install nasm`
- For macOS: [install Homebrew](https://brew.sh/) if you don't have it yet, then run `brew install nasm`

## Registers
1. Registers are internal memory storage locations in the processor that temporarily hold memory.  
    In x86_64 architecture, we have access to 64-bit registers. What does that "64-bit" mean? (5 mins)
2. We won't go into details about all the registers. Broadly, some registers are used for specific purposes - such as segment registers and the Flags register - while some are for general use. These latter ones are called **General Purpose Registers** and there are **16** of them in 64-bit x86 architecture. What are the registers? (10 mins)
3. You're not limited to working with these registers in their 64-bit entirety though. You can access smaller "sections" of these registers through identifiers. For example, the least significant 2 bytes (16 bits) of RAX can be treated as a 16-bit register called AX. (15 mins)
    ![register breakdown](https://i.imgur.com/nToJ8HY.jpg)
    - **Question**: what is AL in this case?
    - Here's a table showing the breakdown of every general purpose register:
    ![gpr](https://i.imgur.com/4UQtei7.jpg?1)  
    [source, with many other helpful tips](https://aaronbloomfield.github.io/pdr/book/x86-64bit-asm-chapter.pdf)
    - **Question**: how would you access the lowest 8 bits of R8?
    - **Question**: are these "sub"registers independent? For example, will modifying `al` affect `ax`?
4. In 64-bit architecture, most registers no longer serve the special purposes for which they're named - like "accumulator" (rax) and "counter" (rcx). But there's still some things to keep in mind about certain registers. (15 mins)
    - RAX is commonly used to store ___ when functions are called within assembly code.
    - RSP is called the Stack Pointer and RBP is the Base Pointer. What do they do?
    - Lastly, 6 specific registers are used to pass parameters to functions. What are they and which arguments do they correspond to?
5. There are certain registers whose values are preserved across function calls - **callee-saved registers** - and registers whose values are not preserved and must be saved if you want to make sure your values aren't changed - **caller-saved registers**. (10 mins)
    - Which are the callee-saved registers?
    - Note that which registers are caller/callee-saved vary by system, thus ["calling conventions"](https://en.wikipedia.org/wiki/X86_calling_conventions#x86-64_calling_conventions).
    - The convention states that the original values within callee-saved registers should be saved by the called function (the callee). The expectation is that those registers hold the same value after the called function returns. What does this mean if we wish to use a callee-saved register?
    - Here's a handy table with the registers and their usages: [link](https://stackoverflow.com/questions/18024672/what-registers-are-preserved-through-a-linux-x86-64-function-call)

***Break (5 mins)***

## Instructions
There are [a lot](https://en.wikipedia.org/wiki/X86_instruction_listings) of instructions you can use in x86 assembly, but we're going to focus on a few key ones.
1. Figure out what the following instructions do: (30 mins)

    | instruction  | example  |
    |---|---|
    | mov | mov rax, rbx |
    | push | push rax |
    | pop | pop rax |
    | add | add rax, 42 |
    | sub | sub rax, 42 |
    | inc | inc rax |
    | dec | dec rax |
    | cmp | cmp rax, 42 |
    | jmp | jmp _main  |
    | je/jne/jl/jg | je _done |
    | call | call _printf |
    | ret | ret |

    - Make sure you know which operand is affecting which!
2. What effect would the following `jmp` instruction have? (5 mins)
    ```
    _main:
        jmp _main
    ```
3. Registers can also serve as pointers. Putting square brackets - `[]` - around registers allows you to access the value the register is **pointing to**, rather than the value of the register itself. (5 mins)
    - What's the difference then between `mov rax, rbx` and `mov rax, [rbx]`?

## Syscall
Now let's look at system calls or **syscall**s, which allow a program to request a service from the kernel.
1. All syscalls have an associated ID. This ID is what you pass into RAX within your assembly code to call on a system function. These IDs vary by operating system. (5 mins)
    - For Linux: [syscall IDs as found in unistd_64.h](https://code.woboq.org/linux/linux/arch/x86/include/generated/uapi/asm/unistd_64.h.html)
    - For macOS: [syscall IDs in syscalls.master](https://opensource.apple.com/source/xnu/xnu-1504.3.12/bsd/kern/syscalls.master). Note: You'll need to add `0x200000` before each ID.
    - What are the syscall IDs for `write()` and `exit()` for your system?
2. As with normal functions, syscalls can take arguments. Just like in C, `write` takes an fd, a buffer, and the number of bytes to write. We talked about parameter registers earlier. If you want to call `write`, which parameters would you pass to which register? (10 mins)  
    Here's a convenient table for you:
    | syscall  | rax | rdi | rsi | rdx | rcx (r10 for Linux) | r8 | r9 |
    |---|---|---|---|---|---|---|---|
    | write | | | | | | | |
3. Let's write a simple assembly program that calls `exit()` with `0` as an argument. This should make the program exit with a status of 0, indicating no errors. (15 mins)
    - First, create a `.s` file. Here's what the first part of your code should look like:
        ```
        section .text ; this is the section for code
        global  _main ; this tells the kernel where the program begins
        _main:
        ```
        - Note: for Linux users, you'll need to remove the `_` before `_main`.
    - To make a system call, you need to:
        1. pass the syscall ID into RAX
        2. pass any arguments for the syscall
        3. use the `syscall` instruction  
    
        Go ahead and turn those steps into assembly code.
    - Although you'll be creating a library for libasm, today we're just going to make a standalone program. So the compilation steps will be different. To compile your `.s` file, run these commands:
        - **Note**: remember to change `myfile.s` & `myfile.o` to your actual file name
        - For Linux: `nasm -felf64 myfile.s && gcc myfile.o`
        - For mac: `nasm -fmacho64 myfile.s && gcc myfile.o`
    - Run `./a.out` and then `echo $?`. Does it output `0`?

***Break (5 mins)***

## Sections
1. Assembly files can be divided into 3 **sections** (there are [more](https://www.nasm.us/doc/nasmdoc7.html#section-7.1.3) but we won't get into them now): `.data`, `.bss`, and `.text` (as seen earlier). What are each of these sections meant for? (5 mins)
2. Let's make use of a new section: the `.data` section. We're going to write a program that outputs "Hello, world!" followed by a newline. (20 mins)
    - Let's start by declaring a new section (section order doesn't matter in an assembly file):
        ```
        section .data
            text db "Hello, world!", 10
        ```
        - What is "text" here? And what does "db" mean? What is the "10" at the end?
    - Next declare your `.text` section as you did in the previous exercise.
    - For this exercise, we're going to call `write()` first to output our `text` onto **stdout**. Remember the instruction order for calling `exit()` earlier. What values do you need to move into which registers?
    - Finish with a call to `exit()` again like you did earlier.
    - Compile with the same commands you used earlier. Do you get "Hello, world!"?
        - Note: your compiler may throw up some warnings, but if your program was compiled successfully, just ignore it!

## Stack Alignment
Stack alignment can be a tricky thing to understand. What you need to know is that x86_64 requires that your stack be aligned on a 16-byte boundary.
- When your program starts at `main` (or `start`), `rsp` (the stack pointer) is 16-byte aligned.
- If you make an external function call, however, such as `call printf` or `call myownfunction`, an **8-byte return address** is pushed onto the stack. Because we're temporarily leaving this function and we need to know where to come back to, right?
- But this means the stack is now misaligned by **8 bytes**. So how do we re-align our stack? (15 mins)

You can find more detailed explanations of the stack and alignment online.  
Here's a helpful link for later: [what does it mean to align the stack](https://stackoverflow.com/questions/4175281/what-does-it-mean-to-align-the-stack/4176397#4176397)

## Bonus
1. Write a `compare` function in assembly that compares 2 integers and returns:
    - `1` if `a > b`;
    - `-1` if `a < b`;
    - `0` if `a == b`.

    The function prototype is `int compare(int64_t a, int64_t b)`.  

2. You'll also make a test main C file. It should:
    - include <inttypes.h> for the `int64_t` types;
    - have your `compare` function prototype;
    - call your `compare` function with a variety of inputs (positive, negative, 0s) and print the return.
3. If you're on macOS, you'll probably need to prefix your function with `_` in your assembly code, so that it's `global _compare` and `_compare:`. Because [reasons](https://stackoverflow.com/questions/5908568/what-is-the-reason-function-names-are-prefixed-with-an-underscore-by-the-compile). Linux does not require this.
4. Compile and run it to see if your function is working correctly.
    - For Linux: `nasm -felf64 compare.s && gcc compare.o main.c`
    - For macOS: `nasm -fmacho64 compare.s && gcc compare.o main.c`


