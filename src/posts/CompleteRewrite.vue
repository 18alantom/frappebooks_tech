<template>
  <post-head :date="date" :author="author">{{ title }}</post-head>
  <p>{{ first }}</p>
  <!-- Add content below -->

  <h2>Why</h2>

  <p>
    A few months into working on Frappe Books, I started noticing a certain lack
    of cogency in the codebase, atleast to an extent that I'd prefer. There were
    bad patterns that gave me a strong sense of foreboding.
    <di>In the future, lots of users, lots of support...</di>
  </p>

  <p>
    Besides this, extending its feature set felt more arduous than it should be.
    And making it cross-platform would involve a large-scale refactor insofar as
    to warrant a complete rewrite anyway.
  </p>
  <p>Also it's just 30k lines of code, so might as well... ¯\_(ツ)_/¯</p>

  <h2>Starting the Rewrite</h2>

  <p>
    Before going ahead, I asked a few devs their thoughts regarding this, they
    all basically told me that it's the worst idea ever. I was also sent a link
    to the
    <l href="https://en.wikipedia.org/wiki/Second-system_effect"
      >Second-system effect</l
    >.
  </p>

  <p>
    But I'm the kind of fool who would rather touch the pan to find out whether
    it is hot, than take someone's word for it.
    <di>Else how will you know what "hot" even means?!</di>
  </p>

  <p>
    So, when the weekend arrived, I got to it. I already had the design in my
    head and across several <code>.md</code> files, so I got to coding the first
    iteration.
  </p>

  <h2>And Then I Gave Up</h2>

  <p>
    A few thousand lines and around 15 hours in, I deemed it not worth the
    effort. What I realised is: <code><i>re</i>writing != writing</code>
  </p>

  <p>
    When rewriting software you don't have the same kind of freedom as when
    writing it. A mental reference to the original has to be maintained.
  </p>

  <p>
    Because of this, you have to take into account two models. The first one
    being the extant inferior one, and the second being the idealistic one that
    you haven't yet written.
  </p>

  <p>
    The thing is if you don't have a close to perfect idea (the probability of
    which decreases with an increase in LoC) of the inferior codebase, chances
    are your idealistic version will end up with similar issues (but perhaps
    cleanly written). Edge cases aren't obvious and code written to account for
    them, even less so.
  </p>

  <p>
    This is why incremental refactors maybe a better idea, the inferior copy is
    in constant reference.
  </p>

  <p>
    You also have to attain feature parity and then some, i.e. there are targets
    and expectations. Dead hand of the software to be replaced.
  </p>

  <p>
    The ideal behind a rewrite is that to take your software to some fictional
    idealistic point <b>C</b> from point <b>B</b>, where it currently is, would
    take longer than just rewriting it from point <b>A</b>. So if you don't go
    beyond point <b>B</b> in your rewrite, the whole exercise is moot.
  </p>

  <h2>Secondhand Wisdom Aside; The Real Reason</h2>

  <p>
    The above section is just some post-stupidity wisdom gained from having
    touched the pan. I was warned of all the pitfalls. So it's just me
    confirming that the pan was indeed, hot.
  </p>

  <p>
    The real reason is, towards the end of my first 15 hour bout, my psyche
    started catching fire. I was experiencing some serious crisis.
  </p>

  <p>
    The first version was written over 2 years by several devs. I'd planned to
    attain feature parity in one month, which may have been doable, but I still
    needed to maintain and push the extant version (lest the project appear
    moribund for the second time in two years).
  </p>

  <p>This meant that I was trying to hit a moving target with divided focus.</p>

  <p>
    If I had to pull it off in a month, I'd have to clock in at more than 16
    hours per day, which means I'd have to suspend all normal routines. I
    remember doing something of the sort once earlier, and at the end of that my
    mind had become churned ice cream and I had dropped 7 kilos of what felt
    like muscle mass.
  </p>

  <p>
    Something of this sort can't be done with context switches, it requires
    constant lazer focus.
  </p>

  <p>
    So given these circumstances, the ephemerality of my human self, and the
    finiteness of our universe — where even blackholes die — there was no way I
    could justify a ground-up rewrite, and so I let go...
  </p>

  <hr />

  <p>
    After having extrapolated my 15 hours and then freaking out, I've since
    regained some equanimity and have concluded that I can still achieve
    whatever I've set out to do with incremental refactors.
  </p>

  <p>
    There's no need for a complete rewrite, so the title should've been
    <i>First and Last Attempt at a Complete Rewrite</i>.
  </p>
</template>

<script>
export default {
  data() {
    return {
      path: '/frappebooks_tech/complete_rewrite',
      title: 'First Attempt at a Complete Rewrite',
      author: '18alantom',
      date: '2022-03-08',
      first: `
        Doing a complete rewrite of Frappe Books has been on my mind for around a month,
        so I thought I'd give it a shot. This post isn't about how I rewrote it from
        scratch — in Rust — and made it run faster than light. It's kinda the opposite.
      `,
    };
  },
};
</script>
