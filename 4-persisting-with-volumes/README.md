# Persisting data with Docker Volumes

Remember how we talked about immutability in the first tutorial? Once you build an image, it doesn't change. And when you run a container, any changes you make inside that container disappear when the container stops.

That's great for consistency, but it's a problem when you want to:
1. Edit code and see changes without rebuilding the image every time
2. Store data (like a database) that needs to stick around even after the container stops

That's where Docker volumes come in.

## Two types of volumes

Docker has two main ways to persist data:

**Bind mounts** - Connect a folder on your computer to a folder in the container. Perfect for development when you want to edit code on your computer and see changes reflected immediately in the container.

**Named volumes** - Docker manages a special storage area for your data. Perfect for databases and other data that needs to persist, but you don't need to edit directly.

## Using bind mounts for live code editing

Let's start with a fun example. In the `src` folder, you'll find a mystical Docker Fortune Teller web app built with Express. Take a look at `src/index.js` to see what it does - it's a simple app that displays random fortunes and Docker wisdom.

First, let's build the image and run it normally. Look at the Dockerfile to see the steps being executed to build this image:

```sh
docker build -t fortune-teller:v1 .
```

Now run it:

> [!TIP]
> If you get a message that the container couldn't be started because the port is already allocated, you probably have a container running already on port 3000. Either change the port in the Dockerfile and docker run command, or stop the currently running container with `docker stop`

```sh
docker run -p 3000:3000 fortune-teller:v1
```

Visit http://localhost:3000 in your browser and click around to get some fortunes and wisdom. Pretty neat!

Now let's make a change. Open `src/index.js` and add a new fortune to the `fortunes` array. Maybe something like:

```javascript
"You will soon master the art of containerization.",
```

Save the file and visit http://localhost:3000 again. Click the fortune button a few times.

You won't see your new fortune! That's immutability at work. The image was built with the original code, and it doesn't change just because you edited the file. You'd need to rebuild the image to see your changes.

Let's try something different. Close the Docker process and stop the container. Use a bind mount to connect your local `src` folder to the container:

```sh
docker run -p 3000:3000 -v $(pwd)/src:/app -v /app/node_modules fortune-teller:v1
```

> [!NOTE]
> The `-v` flag creates a volume. The format is `-v /path/on/your/computer:/path/in/container`
> `$(pwd)` is a command that outputs your current directory, so `$(pwd)/src` is the full path to your src folder.

Wait, why are there TWO `-v` flags? Here's the thing: when you mount `src` to `/app`, it completely replaces everything in `/app`, including the `node_modules` folder that was installed when we built the image. Your local `src` folder doesn't have `node_modules` (and you don't want it to - those should be in the container).

The second volume `-v /app/node_modules` creates an anonymous volume specifically for the `node_modules` directory. This tells Docker "preserve the node_modules that's already in the container, don't overwrite it with the bind mount." Docker handles the conflict by giving priority to the more specific path (`/app/node_modules` is more specific than `/app`).

This is a common pattern in Docker development with Node.js!

Visit http://localhost:3000 and click around. You should see your new fortune in the mix!

Now try this: With the container still running, edit `src/index.js` again and add another fortune or change some of the HTML styling. Save the file, then refresh your browser.

Wait, the changes aren't showing up? That's because Node.js loaded the file when it started and doesn't automatically reload when files change. Stop the container (CTRL+C three times) and start it again with the same bind mount command:

```sh
docker run -p 3000:3000 -v $(pwd)/src:/app -v /app/node_modules fortune-teller:v1
```

Now you'll see your latest changes! The bind mount means the container is reading your actual files from your computer, not from the immutable image. Every time you start the container, it sees the current state of your files.

This is incredibly useful for development. You can edit your code in your favorite editor, restart the container, and see your changes immediately without rebuilding the image.

### Live reloading with nodemon (not a Docker thing, just a useful tip)

Having to restart the container every time you make a change gets old fast. That's where `nodemon` comes in - it watches your files and automatically restarts Node.js when it detects changes.

The `package.json` already includes nodemon as a dev dependency, and there's an `npm run dev` command set up to use it.

To run the container with the `npm run dev` command instead of the `npm start` that's in the Dockerfile, we can add `npm run dev` to the end of the `docker run` command:

```sh
docker run -p 3000:3000 -v $(pwd)/src:/app -v /app/node_modules fortune-teller:v1 npm run dev
```

Visit http://localhost:3000 and then, with the container still running, edit `src/index.js` and add a new fortune or change some styling. Save the file and watch your terminal - you'll see nodemon detect the change and restart the server automatically. Refresh your browser and boom - your changes are there without manually restarting!

This is the typical Node.js development workflow with Docker: bind mounts for live file updates + nodemon for automatic server restarts = a smooth development experience where you can see changes instantly.

## Why immutability still matters (even with bind mounts)

Even with bind mounts, remember that the image itself is still immutable:

- The **base image** (Node.js, system packages) doesn't change unless you rebuild
- The **dependencies** in `node_modules` don't change unless you rebuild (that's why we needed the anonymous volume!)
- Only the **source code** in your bind-mounted folder changes in real-time

This is actually a powerful development workflow:
- Your runtime environment is consistent and predictable (immutable image)
- Your source code can be edited freely (bind mount)
- Dependencies are managed through rebuilds, not ad-hoc installs
- You can commit your code changes while knowing the environment stays stable and repeatable

When you're done developing and ready to deploy, you rebuild the image with your final code. The image becomes immutable again, containing your tested, working code. Bind mounts are for development; immutable images are for production.

## What's next?

Bind mounts are perfect for code, but what about data that needs to persist, like databases? For that, Docker has **named volumes**, which we'll cover in the next tutorial. Named volumes let you persist data that you don't need to edit directly, like database files, while keeping the same benefits of containerization.
