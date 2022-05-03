# Spark Sessions

Educational content for the Spark Sessions

## Philosophy
When students enter 42's core curriculum they might only have ever programmed 4 or 5 C modules. These projects are divided in parts of no more than 50 lines of code. So when these students start their core curriculum they might get overwhelmed by a project like `ft_printf`, which requires a >100 lines of code, and has a lot of moving parts. To help with students with tackling such a relatively complex project the Spark Sessions were created. By exploring a couple relevant concepts in a structured way, we hope to jumpstart the designer mindset that is needed for building larger projects.

Each session consists of a couple exercises to help students understand some core functionality of a given Intra project. For example: the get_next_line spark session covers the use of static variables.

Each session is hosted by 1 or more moderators, they are students that are very comfortable with the project. They help the attendees run through the exercises.

See `./philosophy/` for more information.

## Development
Install `NodeJS >= 16.x`

Run:
```
git clone --recursive git@github.com:codam-coding-college/spark-sessions.git
cd spark-sessions
chmod -R 777 hooks/
cp hooks/* .git/hooks/
```
