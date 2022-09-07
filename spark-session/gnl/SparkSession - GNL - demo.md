# Spark Session: get_next_line
*created: 06/09/2022*
*updated: 06/09/2022*

## Topics

1. Introduction
2. Divide and conquering
3. File descriptors
4. Static variables
5. Putting it into practice

## Introduction

- Define what a spark session is again and what the end goal is

### Divide and conquering

- Explain how dividing problems into smaller sub-problems simplifies the task
    - The idea is to help tackle the common problem of "Where do I even start ?"

### File descriptors

- As a group discuss:
    - What file descriptors are, come up with a simple explanation (They are basically file handles, ...)
    - What leaking file descriptors are and the importance of closing.
    - Provide a small example of using an fd.
- Have all the groups share their knowledge
    - Moderator makes sure to correct any misconceptions during that discussion

### Static variables

- As a group discuss:
    - What the `static` keyword represents.
    - What the difference is to using it with a variable, function & global.
- Have all the groups share their knowledge
    - Moderator makes sure to correct any misconceptions during that discussion

### Putting it into practice

- Small exercise that combines the above mentioned topics into one thing
    - Explore how open works (encourage researching on their own instead)
    - Explore how handling data works (reading and writing to a file)
    - Should be a just big enough problem that they need to divide up their tasks
    - Usage of the static keyword where possible & necessary
