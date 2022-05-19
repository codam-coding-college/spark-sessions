# Topics
1. Thr*e*ads.
2. Data rac*e*s.
3. Mut*e*x*e*s.
4. D*e*adlocks.

# L*e*ts talk __Thr*e*ads__
__Thr*e*ads__ are a part of proc*e*ss*e*s. Ev*e*ry proc*e*ss is built of many parts, addr*e*ss spac*e*, m*e*mory spac*e*, PID, __"thr*e*ad of *e*x*e*cution"__, *e*nvironm*e*nt, *e*tc.. In 2001 th*e* first Multicor*e* proc*e*ssors w*e*r*e* introduc*e*d, and th*e* ability to add mor*e* thr*e*ads p*e*r proc*e*ss cam*e* along. __Proc*e*ss*e*s__ do not __sh*e*ar m*e*mory space__ with oth*e*r proc*e*ss*e*s and hav*e* additional information associat*e*d with th*e*m lik*e* PID, nam*e* spac*e*, *e*tc, but __thr*e*ads__ ar*e* mor*e* lightw*e*ight and sh*e*ar m*e*mory spac*e* with oth*e*r thr*e*ads b*e*longing to th*e* sam*e* proc*e*ss.

This is what I __m*e*an__ by that a proc*e*ss has a __thr*e*ad__.

<img width="547" alt="Screen Shot 2022-05-09 at 3 28 42 PM" src="https://user-images.githubusercontent.com/47741591/167420512-c56cd56a-757b-4177-be03-a990bf2b982a.png">

[after the session more on the same topic](https://csc-knu.github.io/sys-prog/books/Andrew%20S.%20Tanenbaum%20-%20Modern%20Operating%20Systems.pdf#page=134)

1. What is a thr*e*ad?
##### Answer
> One way of looking at a process is that it is a way to group related resources.  A process has an address space containing program text and data and other resources. These resources may include open files, child processes, pending alarms, signal handlers, accounting information, and more. By putting them together in the form of a process, they can be managed more easily. The other concept a process has is a ***thread*** of execution, usually shortened to just ***thread***.  The  ***thread***  has a  program counter that keeps track of which instruction to execute next.   It has registers,  which hold its current working variables. It has a  stack,  which contains the execution history, with one frame for each procedure called but not yet returned from. Although a  ***thread***  must execute in some process,  the  ***thread***  and its process are different concepts and can be treated separately.  Processes are used to group resources together;  ***threads***  are the entities scheduled for execution on the CPU. 
2. What do*e*s it m*e*an that *e*v*e*ry proc*e*ss has a thr*e*ad?
##### Answear
> The other concept a process has is a thread of execution, usually shortened to just thread. The thread has a program counter that keeps track of which instruction to execute next

***Program one*** uses ***fork*** to creat a new ***process***. ***Processes*** ***do not shear memory space***.

```C
//Program one writen in pseudocode
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main()
{
    int x;
    pid_t   pid;

    x = 25;
    make_process();
    child
    {
        printf("Child value %d\n", x++);
        sleep(1);
        printf("Child value %d\n", x++);
        sleep(1);
        printf("Child value %d\n", x++);
        sleep(1);
        printf("Child value %d\n", x++);
        sleep(1);
    }
    parent
    {
        sleep(5);
        printf("Parent value %d\n", x);
        wait(0);
    }
    return (0);
}
```
`gcc Program_one.c; ./a.out #what can we expect the x value to be in parent?` 
##### Answer  

> Child value 25
> 
> Child value 26
> 
> Child value 27
> 
> Child value 28
> 
> Parent value 25

***Program two*** uses __pthr*e*ad_cr*e*at*e*__ to creat a new __thr*e*ad__. __Thr*e*ads__ do not shear __memory spac*e*__.

```C
//Program_two writen in pseudocode
int main()
{
    int x;

    x = 25;
    make_a_thread();
    thread
    {
        printf("new thread value %d\n", x++);
        sleep(1);
        printf("new thread value %d\n", x++);
        sleep(1);
        printf("new thread value %d\n", x++);
        sleep(1);
        printf("new thread value %d\n", x++);
        sleep(1);
    }
    main thread
    {
        sleep(5);
        printf("Main thread value %d\n", x);
    }
    return (0);
}
```
`gcc Program_two.c; ./a.out #what can we expect the x value to be in parent?` 

##### Answer
> 29

1. What do*e*s it m*e*an to sh*e*ar __m*e*mory spac*e*__ in s*e*ns*e* of varibl*e*s?
##### Answer
> It means that you have access to the varibles for the seprate threads if you wish
2. Why is it useful to sh*e*ar __m*e*mory spac*e*__?
##### Answer
> You don't need to use pipes or signals to communicate information.

# One a practical not*e* 🧶

#### Allowed functions:

```C
#include <stdio.h>
#include <pthread.h>

int	pthread_create(pthread_t *thread, const pthread_attr_t *attr, void *(*start_routine)(void ), void *arg);
int	pthread_join(pthread_t thread, void **value_ptr);
int	printf(const char  *restrict format, ...);
```

### pthread_t
1. What **data** type is pthread_t?
##### Answer
> It is used to store threads
2. Why us*e* pthr*e*ad_t not an __int__?
##### Answer
> int can not store all the info that a thread type needs

### pthread_create
1. What __argum*e*nts__ do*e*s th*e* __pthr*e*ad_create__ tak*e*?

##### Answer
> It take 3 Args. a thread mem address, a function pointer, void mem address

2. What is void \*(\*start_routin*e*)(void \*)?

##### Answer
> A functions pointer which returns void * and takes void *

3. What is *e*x*e*cut*e*d wh*e*n pthr*e*ad_cr*e*at*e* is call*e*d?

##### Answer
> start_routine 

4. How would you pass __data__ to th*e* start_routin*e* function?

##### Answer
> You would pass it as the 4rd arg to pthread_create

5. What is th*e* attr argum*e*nt?

##### Answer
> attr allows you to set characteristics of a thread

6. Why us*e* pthr*e*ad_cr*e*at*e*?

##### Answer
> To create a thrad with in a process

7. Why not us*e* fork in st*e*ad of pthr*e*ad_cr*e*at*e*?
##### Answer
> Because frok make a new process and pthread_create creates a new thread

### pthread_join
1. What argum*e*nts do*e*s th*e* function tak*e*?

##### Answer
> value of the thread, a memory address of type void pointer

2. What is void \*\*valu*e*_ptr us*e*d for?

##### Answer
> to get the value returned from start_routine

3. What hpp*e*ns if you do not call __pthr*e*ad_join__ aft*e*r __pthr*e*ad_cr*e*ate__

##### Answer
> the main process will exit and the create thread will exit

## Goal 🎯
Cr*e*at*e* a n*e*w thr*e*ad that outputs this m*e*ssag*e*!
```sh
$ ./ex01.out
Hi From the thread. You can call me philosopher 1
```

#### Answer
```C
#include <stdio.h>
#include <pthread.h>

void	*routine(void *ptr)
{
	printf("Hi From thread. You can call me philosopher 0\n");
	return (NULL);
}

int	main()
{
	pthread_t	thread;

	pthread_create(&thread, NULL, routine, NULL);
	pthread_join(thread, NULL);
	return (0);
}
```

#### L*e*arn how to cr*e*at*e* thr*e*ads in a loop. Cr*e*at*e* 20 thr*e*ads that will print th*e* following.

## Goal 🎯
#### Achi*e*v*e* this output

```ASCII
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 1
```
###### Answer
```C
#include <stdio.h>
#include <pthread.h>

#define MAX_PHILO 20

void	*rutine(void *ptr)
{
	printf("Hi From thread. You can call me philosopher 0\n");
	return (NULL);
}

int	main()
{
	pthread_t	thread[MAX_PHILO];

	for (int i = 0; i < MAX_PHILO; i++)
	{
		pthread_create(&thread[i], NULL, rutine, NULL);
	}
	for (int i = 0; i < MAX_PHILO; i++)
	{
		pthread_join(thread[i], NULL);
	}
	return (0);
}
```
## Data rac*e*s/rac*e* conditions

[Whatch a vid*e*o about data rac*e*s till 9:10](https://www.youtube.com/watch?v=FY9livorrJI)

1. What ar*e* __data rac*e*s?__

##### Answer
> A data race is when data values become unpredeictable because two or more threads are writing to the same variable.

2. What is a __critical s*e*ction?__

##### Answer
> That is the segment of code where the data race is happening

3. If two or mor*e* __thr*e*ads__ ar*e* r*e*ading th*e* valu*e* at th*e* sam*e* tim*e* is that a __data rac*e*__?

##### Answer
> No

4. Can th*e* compil*e*r h*e*lp spot __data rac*e*s__?

##### Answer
> -g -fsanitize=thread

5. Why ar*e* __data rac*e*s__ bad?

#### Answer
> Because they lead to undefined behaviour 

##### Do you see a **data race** in this code?

```C
// example code
#include <stdio.h>
#include <pthread.h>

void	rutine(void ptr)
{
	while (1)
	{
		if ((int )ptr > 1000)
			break ;
		(int )ptr += 1;
	}
	printf("Done\n");
	return (NULL);
}

int	main()
{
	pthread_t	thread;
	int			index;

	index = 0;
	//keep in mind that the programm "splits in 2" after this call
	pthread_create(&thread, NULL, rutine, &index);
	while (1)
	{
		if (index > 10000)
			break ;
		index++;
	}
	pthread_join(thread, NULL);
	return (0);
}
```
##### Where there a **critical section**?
#### Answer
```C
		if ((int )ptr > 1000)
			break ;
		(int )ptr += 1;
		if (index > 10000)
			break ;
		index++;
```
## L*e*t's talk mut*e*x*e*s

Th*e* solution to __data rac*e*s__ can b*e* __mut*e*x*e*s__. Wh*e*n a __mut*e*x__ is us*e*d it *e*nsur*e*s that only on*e* __thr*e*ad__ can acc*e*ss a pi*e*c*e* of cod*e* at a tim*e*. Mutual *e*xclusion.

#### Allow*e*d functions
```C
#include <pthread.h>

int	pthread_create(pthread_t *thread, const pthread_attr_t *attr, void *(*start_routine)(void ), void *arg);
int	pthread_join(pthread_t thread, void **value_ptr);
int	printf(const char  *restrict format, ...);
int	pthread_mutex_lock(pthread_mutex_t mutex);
int	pthread_mutex_unlock(pthread_mutex_t mutex);
int	pthread_mutex_init(pthread_mutex_t mutex, const pthread_mutexattr_t attr);
int	pthread_mutex_destroy(pthread_mutex_t mutex);
```

For r*e*f*e*r*e*nc*e* This is how the __pthr*e*ad_mut*e*x_t data__ typ*e* looks lik*e*.

```C
struct _opaque_pthread_mutex_t {
  long __sig;
  char __opaque[__PTHREAD_MUTEX_SIZE__];
};
```

1. What is th*e* __pthr*e*ad_mut*e*x_t data__ typ*e*?

#### Answer
> It is a data type that you can lock.

### pthread_mutex_init
1. What does this function do?
#### Answer
> it make a mutex lockable, allocates resources for the mutex
```C
struct _opaque_pthread_mutex_t {
  long __sig; //it changes this value 
  char __opaque[__PTHREAD_MUTEX_SIZE__];
};
```

2. Why do w*e* n*ee*d to init a mut*e*x?

#### Answer
> because it alows for the mutex to be locked

### pthread_mutex_destroy
1.What does this function do?
> it makes a mutex not lockable, deallocates resources for the mutex
#### Answer

```C
struct _opaque_pthread_mutex_t {
  long __sig; //it changes this to 0
  char __opaque[__PTHREAD_MUTEX_SIZE__];
};
```

2. Do you hav*e* to fr*ee* th*e* mut*e*x?
#### Answer
> No!

3. Do you n*ee*d to d*e*stroy init*e*d mut*e*x*e*s?
#### Answer
> Yes and no, it is considered a good practice and it helps to spot bugs. It does not cause memory leaks on our systems or take up resources, I belive.

4. Can a locked mutex be destroyed?
#### Answer
> No and errno will be set to EBUSY

### pthread_mutex_lock
1. What does this function do?

#### Answer
> It locks a **mutex**. No other **threads** can access this block of code.  

2. Can you lock a mut*e*x 2 tim*e*s?

#### Answer
> No all the other threads will be waiting to for the mutex till it is onlocked.

3. Why do w*e* n*ee*d to lock mut*e*x*e*s?
> Because we want to limit the segment of code accessible to only 1 thread hence stop data race

### pthread_mutex_unlock
1. What does this function do?
#### Answer
> Unlocks a mutex. All threads can now access the code block.

2. Why do w*e* n*ee*d to unlock mut*e*x*e*s?
#### Answer
> Because we want to give access to all the threads to a segment of code

## Goal 🎯
Make a program that inits, locks, unlock and destroys a mutex!

#### Answer
```C
#include <pthread.h>

int	main()
{
	pthread_mutex_t	lock;

	pthread_mutex_init(&lock, NULL);
	pthread_mutex_lock(&lock);
	pthread_mutex_unlock(&lock);
	pthread_mutex_destroy(&lock);
	return (0);
}
```

## Goal 🎯

Pr*e*v*e*nt th*e* data rac*e* in th*e* *e*xampl*e* cod*e*.
```C
// example code
#include <stdio.h>
#include <pthread.h>

void	*rutine(void *ptr)
{
	while (1)
	{
		if (*(int *)ptr < 1000)
			break ;
		*(int *)ptr += 1;
	}
	printf("Done\n");
	return (NULL);
}

int	main()
{
	pthread_t	thread;
	int			index;

	index = 0;
	pthread_create(&thread, NULL, rutine, &index);
	while (1)
	{
		if (index < 10000)
			break;
		index++;
	}
	pthread_join(thread, NULL);
	return (0);
}
```

#### Answer
```C
#include <stdio.h>
#include <pthread.h>

typedef struct	s_int_lock
{
	int		num;
	pthread_mutex_t	lock;
}				t_num_lock;

void	*rutine(void *ptr)
{

	t_num_lock	*thread_safe_num;

	thread_safe_num	= ptr;
	while (1)
	{
		pthread_mutex_lock(&thread_safe_num->lock);
		if (thread_safe_num->num > 1000)
		{
			pthread_mutex_unlock(&thread_safe_num->lock);
			break ;
		}
		thread_safe_num->num += 1;
		pthread_mutex_unlock(&thread_safe_num->lock);
	}
	printf("Done\n");
	return (NULL);
}

int	main()
{
	t_num_lock	thread_safe_num;
	pthread_t	thread;

	thread_safe_num.num = 0;
	pthread_mutex_init(&thread_safe_num.lock, NULL);
	pthread_create(&thread, NULL, rutine, &thread_safe_num);
	while (1)
	{
		pthread_mutex_lock(&thread_safe_num.lock);
		if (thread_safe_num.num > 10000)
		{
			pthread_mutex_unlock(&thread_safe_num.lock);
			break;
		}
		thread_safe_num.num++;
		pthread_mutex_unlock(&thread_safe_num.lock);
	}
	pthread_mutex_destroy(&thread_safe_num.lock);
	pthread_join(thread, NULL);
	return (0);
}
```


## Deadlocks

1. What is a **deadlock**?
#### Answer
a dead lock is when the programm hangs because it tries to lock a mutex that is already lock and will never be unlocked
2. When does a **deadlock** occur?
#### Answer
when u do not unlock a mutex
## Goal:

Produce a program that has a deadlock.

### Answer

```C
#include <pthread.h>

int	main()
{
	pthread_mutex_t	lock;

	pthread_mutex_init(&lock, NULL);
	pthread_mutex_lock(&lock);
	pthread_mutex_lock(&lock);
	pthread_mutex_unlock(&lock);
	pthread_mutex_destroy(&lock);
	return (0);
}
```

## Why not use threads?
It seams that having more threads would speed things up, but it's not always the case.
Bellow, 2 programs add up to INT_MAX / 100. One uses 20 **threads** and one uses just one. Which will be faster?

```C
#include <limits.h>
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

typedef struct s_list
{
	int		*num;
	pthread_mutex_t	lock;
}	t_list;

#define MAX_PHILO 20

void	*rutine(void *ptr)
{
	t_list	*philo = ptr;

	while (1)
	{
		pthread_mutex_lock(&philo->lock);
		if (*philo->num > INT_MAX / 100)
		{
			pthread_mutex_unlock(&philo->lock);
			return (NULL);
		}
		*philo->num += 1;
		pthread_mutex_unlock(&philo->lock);
	}
	return (NULL);
}

int	main()
{
	pthread_t	thread[MAX_PHILO];
	t_list		philosopher[MAX_PHILO];
	int		*x = malloc(sizeof(int));

	*x = 0;
	for (int i = 0; i < 20; i++)
	{
		pthread_mutex_init(&philosopher[i].lock, NULL);
		pthread_mutex_lock(&philosopher[i].lock);
		philosopher[i].num = x;
		pthread_mutex_unlock(&philosopher[i].lock);
		pthread_create(&thread[i], NULL, rutine, &philosopher[i]);
	}
	for (int i = 0; i < MAX_PHILO; i++)
	{
		pthread_join(thread[i], NULL);
		pthread_mutex_destroy(&philosopher[i].lock);
	}
	printf("%d\n", *philosopher[0].num);
	free(philosopher[0].num);
	return (0);
}
```
```C
#include <limits.h>
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

int	main()
{
	int	x;

	x = 0;
	while (x < INT_MAX / 100)
	{
		x++;
	}
	printf("%d\n", x);
}
```
## Goal
compile both programms and use `time ./a.out` to see which is faster

## Goal:
creat 20 threads that will print the following
the order does not matter

```ASCII
Hi From the thread. You can call me philosopher 1
Hi From the thread. You can call me philosopher 2
Hi From the thread. You can call me philosopher 3
Hi From the thread. You can call me philosopher 4
Hi From the thread. You can call me philosopher 5
Hi From the thread. You can call me philosopher 6
Hi From the thread. You can call me philosopher 7
Hi From the thread. You can call me philosopher 8
Hi From the thread. You can call me philosopher 9
Hi From the thread. You can call me philosopher 10
Hi From the thread. You can call me philosopher 11
Hi From the thread. You can call me philosopher 12
Hi From the thread. You can call me philosopher 13
Hi From the thread. You can call me philosopher 14
Hi From the thread. You can call me philosopher 15
Hi From the thread. You can call me philosopher 16
Hi From the thread. You can call me philosopher 17
Hi From the thread. You can call me philosopher 18
Hi From the thread. You can call me philosopher 19
Hi From the thread. You can call me philosopher 20
Hi From the thread. You can call me philosopher 21
```

##### Answer

```C
#include <stdio.h>
#include <pthread.h>

typedef struct s_list
{
	int		index;
	pthread_mutex_t	lock;
}	t_list;

#define MAX_PHILO 20

void	*rutine(void *ptr)
{
	pthread_mutex_lock(&((t_list *)ptr)->lock);
	printf("Hi From thread. You can call me philosopher %d\n", (*(t_list *)ptr).index + 1);
	pthread_mutex_unlock(&((t_list *)ptr)->lock);
	return (NULL);
}

int	main()
{
	pthread_t	thread[MAX_PHILO];
	t_list		philosopher[MAX_PHILO];

	for (int i = 0; i < 20; i++)
	{
		pthread_mutex_init(&philosopher[i].lock, NULL);
		pthread_mutex_lock(&philosopher[i].lock);
		philosopher[i].index = i;
		pthread_mutex_unlock(&philosopher[i].lock);
		pthread_create(&thread[i], NULL, rutine, &philosopher[i]);
	}
	for (int i = 0; i < MAX_PHILO; i++)
	{
		pthread_join(thread[i], NULL);
		pthread_mutex_destroy(&philosopher[i].lock);
	}
	return (0);
}
```

# Bonus

Make a program that will use 3 created threads to add up an int to 42. Threads can increment the int every .5sec
once the value is 42 the program has to print "Got it!\n" and exit.

catch:
The threads do not know when the value is 42

What is a monitoring thread?

A monitoring thread is a concept used in the philosopher's project. a monitoring thread will keep track of the int variable. If the value is 42 let the threads know to finish and exit.

```C
#include <stdio.h>
#include <unistd.h>
#include <pthread.h>
#include <stdbool.h>

typedef struct	s_data
{
	bool			is_done;
	pthread_mutex_t	mutex_lock;
}				t_data;

void	*rutine(void *ptr)
{
	t_data	*data = ptr;

	while (1)
	{
		pthread_mutex_lock(&data->mutex_lock);
		if (data->is_done)
		{
			printf("I am dead\n");
			pthread_mutex_unlock(&data->mutex_lock);
			return (NULL);
		}
		pthread_mutex_unlock(&data->mutex_lock);
		sleep(1);
		printf("I am still alive\n");
	}
	return (NULL);
}

int	main()
{
	pthread_t		thread[4];
	t_data			data;


	data.is_done = false;
	pthread_mutex_init(&data.mutex_lock, NULL);
	for (int i = 0; i < 4; i++)
		pthread_create(&thread[i], NULL, rutine, &data);
	sleep(5);
	pthread_mutex_lock(&data.mutex_lock);
	data.is_done = true;
	pthread_mutex_unlock(&data.mutex_lock);
	for (int i = 0; i < 4; i++)
		pthread_join(thread[i], NULL);
	pthread_mutex_destroy(&data.mutex_lock);
	return (0);
}
```
# Aditional resources:
##### [*Theory on what are threads*](https://csc-knu.github.io/sys-prog/books/Andrew%20S.%20Tanenbaum%20-%20Modern%20Operating%20Systems.pdf#%5B%7B%22num%22%3A3419%2C%22gen%22%3A0%7D%2C%7B%22name%22%3A%22XYZ%22%7D%2C16%2C753%2C1%5D)
##### [*Videos with practical examples*](https://www.youtube.com/watch?v=d9s_d28yJq0&list=PLfqABt5AS4FmuQf70psXrsMLEDQXNkLq2)
Look in to what a scheduler is!


#### Why use **threads**?

##### Answer
> 1. Creating a thread goes 10–100 times faster than creating a process.
> 2. To shear address space
> 3. Performance
> 4. To work with blocking system calls
> 5. There is a blocking call

