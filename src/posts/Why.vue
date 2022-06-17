<template>
  <post-head :date="date" :author="author">{{ title }}</post-head>
  <p>{{ first }}</p>

  <p>
    I felt pretty cool after doing that and wanted to share this with someone.
    But no one whom I thought would find it cool came to mind.
  </p>

  <p>
    I did share it extemporarily with another dev from the company. This dev, on
    looking at the code asked me whether I copied it from somewhere (this I took
    both as a compliment and an insult).
  </p>

  <p>
    Nevertheless, not having an obvious avenue to share one's wins leads to a
    certain flavor of bleakness that can be quite the demotivator.
  </p>

  <p>
    The reason for this is, at the time of writing, I'm the only dev in the
    company who works on Frappe Books. Suffice to say there is little to no
    common ground between me and the other devs regarding work (afaik everyone
    else works—directly or indirectly—on the company flagship ERPNext).
  </p>

  <p>
    So, to allay this lonerism, I decided that I'd write about the wins and
    losses, and other learnings that I come across on this journey to making
    Frappe Books a great product.
  </p>
</template>

<script>
export default {
  data() {
    return {
      path: '/why',
      title: 'Why does this blog exist?',
      author: '18alantom',
      date: '2022-01-31',
      first: `
      A few days ago, I refactored all the charting code in Frappe Books.
      This is something I thought would be difficult and would take me a week or
      so. But I surprised myself by managing to do it in under 24 hours, divided
      into 3 bursts.
      `,
    };
  },
};
</script>
