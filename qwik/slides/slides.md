---
class: text-center
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
title: The Qwik workshop
backround: none
---

# The qwik workshop

---

# Another front-end framework?

<v-clicks>

- <logos-vue />
- <logos-svelte />
- <logos-react />
- <logos-angular />
- <logos-qwik />
- <logos-fresh />
- <logos-solid />
- <logos-astro />

</v-clicks>

---

# The selling points

<v-clicks>

- Resumability
- Familiar dx

</v-clicks>

---
layout: two-cols
---


![hands dirty](https://images.pexels.com/photos/4720368/pexels-photo-4720368.jpeg?cs=srgb&dl=pexels-cottonbro-studio-4720368.jpg&fm=jpg&w=300&h=600) 

::right::

## Time to get your hands dirty

<br />

<v-clicks>

- We'll be building a small app for listing the past Knowit JS guild meetings
- The app has already been built using Next.js
- Your job: transfer that app to Qwik
- https://qwik.builder.io/docs/
- https://github.com/cybercom-finland/code-forward-23 

</v-clicks>

<v-clicks>

1. Clone the repo  `git clone git@github.com:cybercom-finland/code-forward-23.git`
2. Go to `./qwik/next/` and run `npm install && npm run build && npm start`

</v-clicks>

---
layout: center
---

# Step 1: Skaffold Qwik and load data

---
layout: two-cols
---


<div v-click="1">

```bash
# Go to ./qwik

npm create qwik@latest
# use e.g. qwik-yourname as the project name and  select "Empty app"
# Install these additional depencies,
npm install @amcharts/amcharts5 rambda amcharts capitalize @types/capitalize

# Alternatively: use ./qwik/qwik-empty 

```
</div>


<div v-click="4">

```typescript


export const useGuildList = routeLoader$(async () => {
  const data = // await  fetch etcd
  return data;
});

export default component$(() => {
  const guildListSignal = useGuildList();
  // guildListSignal.value
  return <div></div>
}


```
</div>



::right::

<v-clicks at="2">


- Edit routes/src/index.tsx so that it displays the guild list found at `./qwik/common/guildlist.json`
as a json string

- Treat the loading of guildlist.json as server-side data fetching in the Next.js version

</v-clicks>


<v-clicks at="5">

- Boilerplate can be copied from `./qwik/samples/index.tsx` --> `./qwik/qwik-yourname/src/routes/index.tsx`

</v-clicks>

<v-clicks at="6">

<br/>

<div class='margin-and-center'>

<Counter initial=5 danger=60 warning=150 />

</div>

</v-clicks>

---
layout: center
---

# Step 2: Port GuildList and GuildItem to qwik

---

<v-clicks>

- `next/src/components/GuildList.tsx` --> `qwik/qwik-juho/src/components/GuildList.tsx`
- `next/src/components/GuildItem.tsx` --> `qwik/qwik-juho/src/components/GuildItem.tsx` 
- `next/src/app/globals.css` --> `qwik/qwik-juho/src/global.css`
- Render GuildList with the prefetched data in `routes/index.tsx`
- `component$`
- `onClick$`
- `class`
- `GuildItem` needs some trimming at this point, we'll add the missing logic later:
    - comment out `useStates` and `useEffects` 
    - make onClick-handlers just return null
    - hard-code `showStats` to `false` 

</v-clicks>

<v-click>

<div class="margin-and-center">

<Counter initial=10 danger=60 warning=300 />

</div>

</v-click>

---

<v-click>

```typescript
// ./src/routes/index.tsx

<main><GuildList guilds={guildListSignal.value}/></main>

```

</v-click>


<div class="twocol" v-click>


```typescript

// next/components/GuildList
export const GuildList: FC<Props> = (props) => {
  if (!Array.isArray(props.guilds)) return;
  return (
    <ul>
      {props.guilds.map((repo) =>  <li key={repo.id} />)}
    </ul>
  );
};

```


```typescript

// ./qwik/components/GuildList
export default component$<Props>((props) => {
  if (!Array.isArray(props.guilds)) return null;
  return (
    <ul>
      {props.guilds.map((repo) =>  <li key={repo.id} />)}
    </ul>
  );
});

```



</div>


---
layout: center
---

# Step 3: Port SideBar and add the interactions

---

<v-clicks>

- `next/src/components/SideBar.tsx` --> `qwik/qwik-juho/src/components/SideBar.tsx`
- Render `SideBar` besides GuildList at `routes/index.tsx`
- Convert the `useContext` + `useReducer` combo to a context + store combo
    - start by just:

    ```typescript

    //const state = useContext(MainContext);
    //const dispatch = useContext(MainDispatchContext);
    const state = { favouriteGuild: undefined, showAllStats: false };

    ```
- Use Qwik's version of context combined with *a store* to set the logic inside 
side bar and guildItem (we'll do this together soon, but feel free to advance by yourself )



</v-clicks>

<div class="margin-and-center" v-click>

<Counter initial=5 danger=60 warning=150 />

</div>

---
layout: two-cols
---

![together](https://images.pexels.com/photos/12240932/pexels-photo-12240932.jpeg?cs=srgb&dl=pexels-oan%C4%83-andrei-12240932.jpg&fm=jpg&h=400&w=300&fit=crop) 

::right::

## Let's deal with that store thing together...

<br/>

<v-clicks>

1. Create a context in `routes/index.tsx`
    ```typescript
    export const CTX = createContextId<AppState>("some.id");
    ```
2. Create a store 
    ```typescript
    const appData = useStore({ 
        favouriteGuild: "", 
        showAllStats: false
    })
    ```
3. Set the created store as the value of the created context
    ```typescript
    useContextProvider(CTX, appData);
    ```

</v-clicks>

---

## Inside `./components/SideBar.tsx`

<br/>

<v-clicks>

1. use the context 
   ```typescript
   const state = useContext(CTX);
   ```
2. Change the state:
   ```typescript
      <button
        onClick$={() => {
          state.showAllStats = !state.showAllStats;
        }}
      >
   ```
3. Your job: adjust the logic for setting a favourite guild inside `./src/components/GuildListItem.tsx`

</v-clicks>

<div class="margin-and-center" v-click>

<Counter initial=3 danger=60 warning=120 />

</div>


---
layout: center
---

# Step 4: Add stats to GuildItem and finalize

---


<v-clicks>

- Use the sample: `./qwik/samples/RepoStats.tsx`  --> `./qwik-yourname/src/components/RepoStats.tsx`
- In GuildItem: Add logic for showing and hiding based on either local or global state
    ```typescript
      const showStats = useSignal(false);
      useTask$(({ track }) => {
        track(() => state.showAllStats);
        showStats.value = state.showAllStats;
      });
    ```
- ...and render the RepoStats component
    ```typescript
      <div>
        {showStats.value ? <RepoStats name={repo.name} /> : <p>Stats hidden</p>}
      </div>
    ```


</v-clicks>

---
