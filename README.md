# Star Wars Quasar SWAPI App

This is a demo application that I decided to experiment with Quasar (https://quasar.dev/) using their CLI to create a Vue application with Typescript, and the SWAPI API (https://swapi.dev/) as a data provider. A list of problems I encountered and possible improvements to the application will follow.

## Starting de development server

I initialized the project using the quasar cli, but it is possible to run it with yarn:

```bash
npm install
yarn quasar dev
```

### Problems

- Typescript: Configuring and dealing with typescript and eslint was one of the most time consuming tasks of this project, seeing as I had only experience with typescript natively in Angular and integrating it with React, implementing on Vue3 was new, but valuable experience. This makes the project more scalable and enjoyable to maintain, and it is well worth when thinking about bigger applications.
- Google API: To retrieve character's images, I used the google developer free API and a project key, which has the limitation of up to 100 requests per day. Theres also often the problem of finding images that requesting it directly causes a code 404, to work around this I made it so it would take the next image, increasing the number of requests per character.
- Git: Because I started this project on a copy/paste from another previous of mine, I ended up messing up the commits and losing track of them, so theres no history of the changes.

### Improvements

All the problems listed above have possible improvements, and there are some other things I would like to have done, given more time.

- Componentization: I ended up choosing routes as a prop giver for the character detail page, as it gives the option to refresh and not leave the area and also go to a specific character via ID. There are other places where I could have used separate components, props and go deeper into v-binds and such but it ended up not being necessary or convenient.
- Typescript: I would like to go further into models (getters and setters, not only the interface) and typing in general, but the initial configuration proved to be too much of a time sink for the purpose of this project.
- Styling: I would like to put a more thematic feel to the app, and show more knowledge of css, but I ended up prioritizing the functionality and flow of the components.
- Testing: In an ideal world I would start with the tests and then start developing the app, in a small project like this it wouldn't have been that difficult and it is a great knowledge to have.
