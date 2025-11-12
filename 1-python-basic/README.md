# Running a basic Python program

This one's not super useful, but if you have a Python program you need to run, but can't install Python (but you have Docker?), you can can run Python in Docker.

First you have to build the image. This step will take a while the first time, as you have to download some base images from the Docker Hub, then build them all locally.
(Note the `.` at the end of the command. That's important. It tells the Docker command to look for a Dockerfile in the current directory)

```sh
docker build -t python-basic:v1 .
```

Then you can tell Docker to create a container from the image and run that container.
```sh
docker run python-basic:v1
```

That's it. You've run your first container. It's not super fancy, but it runs.

## Immutability
One of the things to remember about Docker (and containers) is that the containers and images are immutable.
That means that once created, they don't change. You can overwrite an image with a new image, but otherwise the images you create don't change.
Let's see that in action.

Open `app.py` and change `"Hello world"` to something else like `"Hello there"`.
Now that we've changed app.py, run the container again:

```sh
docker run python-basic:v1
```

That should do the same thing it did last time. We changed the code, but we didn't change the image, even though the code is run by the image.
If you look at the `Dockerfile`, you'll see that copying `app.py` into the container image is one of the steps.
That copying happens when you build the image, not when you run it.

Let's create a new Docker image using the new `app.py`.
Notice that I use the tag `v2` instead of `v1` this time.
This create a new image, and lets us keep the old one around for later use.

```sh
docker build -t python-basic:v2 .
```

Now you can run the new container with

```sh
docker run python-basic:v2
```

AND, you can still run a container from the old image with

```sh
docker run python-basic:v1
```

This immutability can be very useful, especially in a situation where you want to roll back to a previous working version of your code.
