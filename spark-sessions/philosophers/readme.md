# Exercise 00 ~(20min)
##### [*Really good read about threads.*](https://csc-knu.github.io/sys-prog/books/Andrew%20S.%20Tanenbaum%20-%20Modern%20Operating%20Systems.pdf#%5B%7B%22num%22%3A3419%2C%22gen%22%3A0%7D%2C%7B%22name%22%3A%22XYZ%22%7D%2C16%2C753%2C1%5D) <- You can search this if you like.
## Lets Talk Threads
### Why use ***threads***? ~ (5min)

### What are threads? ~ (5min)

#### What are the differences between processes and threads ~ 5(min)

# Ex 01 ~(20min)

## Preamble:

![image](https://user-images.githubusercontent.com/47741591/162574543-2bb3b5b9-33a4-4a9b-ab9e-31870473ad53.png)

### Description:
Create a thread, see what it does, how it works.
### Goal to achieve:
Create a new thread that outputs this message!
```sh
$ ./ex01.out
Hi From thread. You can call me philosopher 0
```
#### Allowed functions:
> printf
>
> pthread_create,
>
> pthread_join
---
### what is pthread_t ~(5min)
1. what data type is this?
### pthread_create ~ (5min)
1. How does the prototype look like?
2. What arguments does the function take?
3. What is void \*(\*start_routine)(void \*)?
4. How would you pass data to the start_routine function?
5. What is the attr argument?
### pthread_join ~ (5min)
1. How does the prototype look like?
2. What arguments does the function take?
3. What is void \*\*value_ptr used for?

# Ex02 ~(5min - 10min)

Goal:

creat 20 threads that will print the following

```ascii
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
Hi From thread. You can call me philosopher 0
```

# Ex03 ~35min

## Race conditions

[Whatch a video about data races](https://www.youtube.com/watch?v=FY9livorrJI)

1. What are race conditions?
2. What is a critical section?

How to spot race conditions?

Do you see a data race in this code?

```C
//example code
#include <stdio.h>
#include <pthread.h>

void	*rutine(void *ptr)
{
	while (*(int *)ptr < 1000)
	{
		*(int *)ptr += 1;
	}
	printf("Done\n");
	return (NULL);
}

int	main()
{
	pthread_t	thread;
	int		index;

	index = 0;
	pthread_create(&thread, NULL, rutine, &index);
	while (index < 10000)
	{
		index++;
	}
	pthread_join(thread, NULL);
	return (0);
}
```
### What are mutexes?

	What is the pthread_mutex_t data type?
    
### pthread_mutex_init ~ 5(min)

	What does this function do?

### pthread_mutex_destroy ~ 5(min)

	What does this function do?
	Do you have to free the mutex?

### pthread_mutex_lock ~ 5 (min)

![image](https://user-images.githubusercontent.com/47741591/162641384-72f74c56-fbe1-41d2-9e72-5ecb59019dba.png)

	What does this function do?
	Can you lock a mutex that is not inited?

### pthread_mutex_unlock ~ 25 (min)

![image](https://user-images.githubusercontent.com/47741591/162641393-60777fe9-a1bd-4660-aed0-c512019aee4d.png)

	What does this function do?
	What happens when u unlock a mutex 2times?

Goal:	
Make a program that inits, locks, unlock and destroys a mutex!

Goal:
Prevent the data race in the example code.

# ex04

## Deadlocks

What is a deadlock?
When does a deadlock occur?


#### Goal:

Goal:
Produce a program that has a deadlock.

# Break

![image](https://user-images.githubusercontent.com/47741591/162641349-a2107f6e-85d9-47bf-8b9e-38a91aaa76d6.png)

# ex05
creat 20 threads that will print the following
the order does not matter

```ascii
Hi From thread. You can call me philosopher 1
Hi From thread. You can call me philosopher 2
Hi From thread. You can call me philosopher 3
Hi From thread. You can call me philosopher 4
Hi From thread. You can call me philosopher 5
Hi From thread. You can call me philosopher 6
Hi From thread. You can call me philosopher 7
Hi From thread. You can call me philosopher 8
Hi From thread. You can call me philosopher 9
Hi From thread. You can call me philosopher 10
Hi From thread. You can call me philosopher 11
Hi From thread. You can call me philosopher 12
Hi From thread. You can call me philosopher 13
Hi From thread. You can call me philosopher 14
Hi From thread. You can call me philosopher 15
Hi From thread. You can call me philosopher 16
Hi From thread. You can call me philosopher 17
Hi From thread. You can call me philosopher 18
Hi From thread. You can call me philosopher 19
Hi From thread. You can call me philosopher 20
Hi From thread. You can call me philosopher 21
```

# Bonus

make a program that will use 3 created threads to add up an int to 42. Threads can increment the int every .5sec
once the value is 42 the program has to print "Got it!\n" and exit.

catch:
The threads do not know when the value is 42

What is a monitoring thread?

a monitoring thread is a concept used in the philosopher's project. a monitoring thread will keep track of the int variable. If the value is 42 let the threads know to finish and exit.

![image](https://user-images.githubusercontent.com/47741591/162580113-4eb7f53e-cdd5-4055-8174-e06392e301fc.png)
