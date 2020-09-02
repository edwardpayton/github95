# Your Github 🐙 profile<br /> With a Windows 95 🖥️ style<br /> Built with React 🚀

Welcome to Github95 - where you can browse Github without the distractions of a modern website. Rewind to a time where the experience was simpler, grey, and so pixelated you needed to squint!

[Vist Github95 now](https://github95.now.sh/)

![](example-images/github95-desktop.png?raw=true)

Use Github95 to search repositories, delve into the contents of a repository, and find out facts about Github users.

The app is built with [React](https://reactjs.org), [Recoil](https://recoiljs.org) for state management, and the [React95](https://github.com/arturbien/React95) component library to give it the Windows 95 charm.

This started off as a small lockdown project to try out the Github GraphQL API, and generating some good insights from it. The project quickly developed into a fun faux desktop, with icons and applications.

## Running locally

Developed using Yarn, use npm if you prefer

```bash
yarn
yarn start
```

## Notes

For state management I'm using the experimental Recoil library from Facebook. Being a new library still in development it is not fully stable. There's a console error when running the app locally that's caused by a Recoil bug, as documented in this [issue](https://github.com/facebookexperimental/Recoil/issues/12) on the Recoil repo. I'll update the app once a solution becomes available.

## Roadmap

- [ ] Better error handling (eg for when the api is unavilable)
- [ ] Performance improvments, code refactoring
- [ ] Use the Github OAuth API to allow users to login
- [ ] After OAuth is done, spec and add mutations (eg to reply to issues, act on events)
- [ ] Open developers from Trending Explorer window (clicking a dev currently does nothing)
- [ ] Option to create desktop shortcuts for repos and users (eg add link to React / favourite repo on the desktop)
