# writ*e* n*e*w ans*e*ar for th*e* n*e*w q*e*stions
# show to Jusa 
# r*e*ad it 10 tim*e*s ov*e*r till your happy

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
2. What do*e*s it m*e*an that *e*v*e*ry proc*e*ss has a thr*e*ad?

***Program one*** uses ***fork*** to creat a new ***process***. ***Processes*** ***do not shear memory space***.
# chande to actual code
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
`gcc Program_two.c; ./a.out #what can we expect the x value to be in thread?` 

1. What do*e*s it m*e*an to sh*e*ar __m*e*mory spac*e*__ in s*e*ns*e* of varibl*e*s?
2. Why is it useful to sh*e*ar __m*e*mory spac*e*__?

# One a practical not*e* 🧶

#### Allowed functions:

```C
#include <stdio.h>
#include <pthread.h>

int	pthread_create(pthread_t *thread, const pthread_attr_t *attr, void *(*start_routine)(void *), void *arg);
int	pthread_join(pthread_t thread, void **value_ptr);
int	printf(const char  *restrict format, ...);
```

### pthr*e*ad_t
1. What __data__ typ*e* is pthread_t?
2. Why us*e* pthr*e*ad_t not an __int__?

### pthr*e*ad_cr*e*at*e*
1. What __argum*e*nts__ do*e*s th*e* __pthr*e*ad_create__ tak*e*?
2. What is void \*(\*start_routin*e*)(void \*)?
3. What is *e*x*e*cut*e*d wh*e*n pthr*e*ad_cr*e*at*e* is call*e*d?
4. How would you pass __data__ to th*e* start_routin*e* function?
5. What is th*e* attr argum*e*nt?
6. Why us*e* pthr*e*ad_cr*e*at*e*?
7. Why not us*e* fork in st*e*ad of pthr*e*ad_cr*e*at*e*?

### pthr*e*ad_join
1. What argum*e*nts do*e*s th*e* function tak*e*?
2. What is void \*\*valu*e*_ptr us*e*d for?
3. What hpp*e*ns if you do not call __pthr*e*ad_join__ aft*e*r __pthr*e*ad_cr*e*ate__

## Goal 🎯
Cr*e*at*e* a n*e*w thr*e*ad that outputs this m*e*ssag*e*!
```sh
$ ./ex01.out
Hi From the thread. You can call me philosopher 1
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

## Data rac*e*s/rac*e* conditions

[Whatch a vid*e*o about data rac*e*s till 9:10](https://www.youtube.com/watch?v=FY9livorrJI)

1. What ar*e* __data rac*e*s?__
2. What is a __critical s*e*ction?__
3. If two or mor*e* __thr*e*ads__ ar*e* r*e*ading th*e* valu*e* at th*e* sam*e* tim*e* is that a __data rac*e*__?
4. Can th*e* compil*e*r h*e*lp spot __data rac*e*s__?
5. Why ar*e* __data rac*e*s__ bad?

##### Do you s*ee* a __data rac*e*__ in this cod*e*?

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

##### Wh*e*r*e* is th*e*r*e* a __critical s*e*ction__?

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

### pthr*e*ad_mut*e*x_init
1. What do*e*s this function do?
2. Why do w*e* n*ee*d to init a mut*e*x?

### pthr*e*ad_mut*e*x_d*e*stroy
1. What do*e*s this function do?
2. Do you hav*e* to fr*ee* th*e* mut*e*x?
3. Do you n*ee*d to d*e*stroy init*e*d mut*e*x*e*s?
4. Can a locked mutex be destroyed?

### pthr*e*ad_mut*e*x_lock
1. What do*e*s this function do?
2. Can you lock a mut*e*x 2 tim*e*s?

### pthr*e*ad_mut*e*x_unlock
1. What do*e*s this function do?

## Goal 🎯

Mak*e* a program that inits, locks, unlock and d*e*stroys a mut*e*x!

## Goal 🎯

Pr*e*v*e*nt th*e* data rac*e* in th*e* *e*xampl*e* cod*e*.
```C
// example code
#include <stdio.h>
#include <pthread.h>

void	rutine(void ptr)
{
	while (1)
	{
		if ((int )ptr < 1000)
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

## D*e*adlocks
Deadlock is a state in a programm where all the available mutexes have been locked, thou more and more threads are trying to lock more mutexes in result the programm hangs.
1. What is a __d*e*adlock__?
2. Wh*e*n do*e*s a __d*e*adlock__ occur?

## Goal 🎯

Produc*e* a program that has a __d*e*adlock__.

## Why not us*e* thr*e*ads?

It s*e*ams that having mor*e* thr*e*ads would sp*ee*d things up, but it's not always th*e* cas*e*.
B*e*llow, 2 programs add up to INT_MAX / 100. On*e* us*e*s 20 __thr*e*ads__ and on*e* us*e*s just on*e*. Which will b*e* fast*e*r?

```C
#include <limits.h>
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

typedef struct s_list
{
	int		num;
	pthread_mutex_t	lock;
}	t_list;

#define MAX_PHILO 20

void	rutine(void ptr)
{
	t_list	philo = ptr;

	while (1)
	{
		pthread_mutex_lock(&philo->lock);
		if (philo->num > INT_MAX / 100)
		{
			pthread_mutex_unlock(&philo->lock);
			return (NULL);
		}
		philo->num += 1;
		pthread_mutex_unlock(&philo->lock);
	}
	return (NULL);
}

int	main()
{
	pthread_t	thread[MAX_PHILO];
	t_list		philosopher[MAX_PHILO];
	int		x = malloc(sizeof(int));

	x = 0;
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
	printf("%d\n", philosopher[0].num);
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

## Goal 🎯
compil*e* both programms and us*e* `time ./a.out` to s*ee* which is fast*e*r

#### Allow*e*d functions

```C
#include <pthread.h>
#include <stdio.h>

int	pthread_mutex_lock(pthread_mutex_t mutex);
int	pthread_mutex_unlock(pthread_mutex_t mutex);
int	pthread_mutex_init(pthread_mutex_t mutex, const pthread_mutexattr_t attr);
int	pthread_mutex_destroy(pthread_mutex_t mutex);
int	pthread_create(pthread_t thread, const pthread_attr_t attr, void (start_routine)(void ), void arg);
int	pthread_join(pthread_t thread, void value_ptr);
int	printf(const char  restrict format, ...);
```

## Goal 🎯
cr*e*at 20 thr*e*ads that will print th*e* following
th*e* ord*e*r do*e*s not matt*e*r

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

# Bonus

Mak*e* a program that will us*e* 3 cr*e*at*e*d thr*e*ads to add up an int to 42. Thr*e*ads can incr*e*m*e*nt th*e* int *e*v*e*ry .5s*e*c
onc*e* th*e* valu*e* is 42 th*e* program has to print "Got it!\n" and *e*xit.

catch:
Th*e* thr*e*ads do not know wh*e*n th*e* valu*e* is 42

What is a monitoring thr*e*ad?

A monitoring thr*e*ad is a conc*e*pt us*e*d in th*e* philosoph*e*r's proj*e*ct. a monitoring thr*e*ad will k*ee*p track of th*e* int variabl*e*. If th*e* valu*e* is 42 l*e*t th*e* thr*e*ads know to finish and *e*xit.


# Aditional r*e*sourc*e*s:
##### [*Th*e*ory on what ar*e* thr*e*ads*](https://csc-knu.github.io/sys-prog/books/Andrew%20S.%20Tanenbaum%20-%20Modern%20Operating%20Systems.pdf#%5B%7B%22num%22%3A3419%2C%22gen%22%3A0%7D%2C%7B%22nam*e*%22%3A%22XYZ%22%7D%2C16%2C753%2C1%5D)
##### [*Vid*e*os with practical *e*xampl*e*s*](https://www.youtube.com/watch?v=d9s_d28yJq0&list=PLfqABt5AS4FmuQf70psXrsMLEDQXNkLq2)
Look in to what a sch*e*dul*e*r is!


