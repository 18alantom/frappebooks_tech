<template>
  <post-head :date="date" :author="author">{{ title }}</post-head>
  <p>{{ first }}</p>
  <!-- Add content below -->
  <p>
    Supporting translations in Frappe Books has always been at the back of my
    mind. Never at the front. Around three weeks back someone DMed me for
    language support. It shifted to the front.
  </p>

  <p>
    I had no idea how to go about doing this, so I consulted
    <router-link to="/why"
      >the developer who had asked me whether I had copied the code I had
      written</router-link
    >
    (from here on out, and in future posts, I'll refer to this developer as
    Dwight).
  </p>

  <p>
    Dwight spoke in complications: dedicated translation portals, servers, APIs,
    JavaScript ASTs, etc. He also warned me that fetching the strings that have
    to be translated is like the hardest thing ever.
  </p>

  <p>
    I don't know why he said that, he was probably thinking of writing an AST
    parser from scratch. Eventually, I felt complicators gonna complicate and
    decided to figure it out from scratch.
  </p>

  <h2>Fetching the strings</h2>

  <p>
    This was like the easiest thing. Strings that have to be translated in
    Frappe Books are <code>t</code>{{ ' ' }}
    <l
      href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates"
      >tagged templates</l
    >:
  </p>

  <codeblock>t`This string will be translated`;</codeblock>

  <p>As you can imagine, the regex to find these strings is equally simple:</p>

  <codeblock>
    {{ regexExampleOne }}
  </codeblock>

  <p>
    There are two parts to this pattern. The
    <code>{{ regexExampleTwo }}</code> captures everything in the backticks. And
    the negative lookback <code>{{ regexExampleThree }}</code> ensures that it
    doesn't match non <code>t</code> tagged templates.
  </p>

  <p>
    Because of the simplicity of this regex, I ditched my initial plans of using
    <l href="https://github.com/returntocorp/semgrep">Semgrep</l> which would
    have been a bit of an overkill.
  </p>

  <p>
    Now I know that anyone can come up with valid strings that can circumvent
    this pattern. The thing is these edge cases won't occur. For instance:
    characters such as <i>è</i> are not normalized into the grave accent and the
    <i>e</i>, which means this 👇 won't be <code>null</code>:
  </p>

  <codeblock>'è'.match(/[^`]/);</codeblock>

  <p>
    And nested translations are a <i>Don't</i> (according to
    <l
      href="https://github.com/frappe/books/wiki/Contributing-Translations#donts-of-using-t"
      >this</l
    >
    text):
  </p>
  <codeblock>
    {{ example }}
  </codeblock>
  <p>
    So by ignoring highly improbably edge cases, the core can be kept really
    simple.
  </p>

  <p>
    <i
      >Note: if you do find some valid and probable string, please raise an
      <l href="https://github.com/frappe/books/issues/new">issue</l>, 
      <l href="https://t.me/nalamot">DM</l> me, or
      <l href="https://twitter.com/18alantom">tweet</l> at me.</i
    >
  </p>

  <h2>The hard thing</h2>

  <p>
    Frappe Books didn't always use tagged templates, it used to use this format:
  </p>

  <codeblock>_('Forsooth {0} {1}!', ['my', 'lord']);</codeblock>

  <p>
    This 👆 doesn't do much for readability and <code>_</code> has
    <l
      href="https://stackoverflow.com/questions/32197927/standard-conventions-for-indicating-a-function-argument-is-unused-in-javascript"
      >connotations in JS</l
    >. So I decided to change it to <code>t</code> tagged templates:
  </p>

  <codeblock>t`Forsooth ${ 'my' } ${ 'lord' }!`;</codeblock>

  <p>
    The beauty of this syntax is that, to mark a string as translateable, it's
    just one additional char: <code>t</code>.
  </p>

  <p>
    The hard part was migrating Vue 2 to Vue 3, this is what took like 90% of
    the time.
    <di>
      I thought we were talking about translations, where did Vue migration come
      from?!
    </di>
    The thing is Frappe Books used to use Vue 2, and that did not have support
    for the tagged template syntax.
  </p>
  <p>
    Now if you're thinking
    <di
      >This guy's the dumbest developer ever, who gets sidetracked into
      framework migrations in the middle of a task? You could've just used a
      standard function!</di
    >
    My response is, migrating Vue from 2 to 3 was another thing at the back of
    my mind, that too got bumped to the front. Also, I really like the tagged
    template syntax!
  </p>

  <h2>The rest of the system</h2>

  <p>
    The rest of it is pretty simple. A single script
    <code> generateTranslations.js</code>
    runs the regex pattern over all the code in the repository and either
    generates or regenerates the <code>language.csv</code>.
  </p>

  <img src="../assets/enabling_translations/script.png" />
  <figcaption>The script takes ~100ms to run.</figcaption>

  <p>
    When required, the <code>language.csv</code> file is fetched from the repo,
    as opposed to packaging it into the binary.
  </p>

  <p>This because:</p>
  <ol>
    <li>
      Receiving language updates should not be dependent on releases. If a
      language file update is merged, you'll be able to receive it immediately.
    </li>
    <li class="line-through">
      We live in a world where the people on HN bitch about electron app binary
      sizes.
    </li>
  </ol>

  <p>
    All in all, devving this wasn't really difficult, not counting the Vue
    migration, it took around 2 to 3 days. This can be attributed to not having
    written a JavaScript AST parser from scratch (which would've been fun but
    way more work).
  </p>

  <hr />

  <p>
    I'm not super happy with everything I've done. For instance, I should've
    probably used <code>json</code> instead of <code>csv</code>. This is
    something that will now remain at the back of my mind, at least until
    someone DMs me to do something about it.
  </p>

  <p class="mb-1">
    <b>FAQ: I think I might be Dwight. Am I Dwight?</b>
  </p>

  <p>
    No, you're not. Dwight is an imaginary character in the Frappe Books extended
    universe. All resemblances to any real persons are purely coincidental,
    unintended, and probably hallucinatory.
  </p>
</template>

<script>
export default {
  data() {
    return {
      path: '/enabling_translations',
      title: 'Enabling Translations',
      author: '18alantom',
      date: '2022-02-17',
      first: `Not everyone knows English, and it is generally the least favorite
        language of polyglots (don't quote me on this). Suffice to say
        translations are important.`,
      regexExampleOne: '/(?<!\w)t`([^`]+)`/g;',
      regexExampleTwo: 't`([^`]+)`',
      regexExampleThree: '(?<!\w)',
    };
  },
  computed: {
    example() {
      return `// DON'T
        t\`Nested $\{ t\`Translations\` }\`;

        // DO
        const translations = t\`Translations\`;
        t\`Nested $\{ translations }\`;`
        .split('\n')
        .map((i) => i.trim())
        .join('\n');
    },
  },
};
</script>
