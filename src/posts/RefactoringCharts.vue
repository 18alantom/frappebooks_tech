<template>
  <post-head :date="date" :author="author">{{ title }}</post-head>
  <p>{{ first }}</p>

  <!-- Section One -->
  <h2>Why would you refactor the charts?</h2>
  <p>
    If you look at the gif below, you'll notice that the chart takes ~800ms to
    load (trust me). I wouldn't be surprised if you thought the chart was being
    rendered by an abacus.
  </p>
  <img src="../assets/refactoring_charts/jank.gif" />
  <figcaption>
    Reloading the Dashboard, slowed down 0.5x. Witness the jank, in
    <em>slowmo</em>!
  </figcaption>
  <p>
    Whenever I come across this kind of jank in modern software running on
    modern hardware, I get irked, and reasonably so. There is no reason for it
    to be this way.
  </p>
  <p>
    Naturally, I had to do something about it. I initially thought about using
    something like <l href="https://github.com/chartjs/Chart.js">Chart.js</l> or
    maybe <l href="https://github.com/d3/d3">D3</l> even. But there were
    multiple reasons not to:
  </p>
  <ol>
    <li>
      The charting library used by Frappe Books was built in-house, so it would
      probably end up annoying someone.
    </li>
    <li>I needed a high degree of control over how the charts looked.</li>
    <li>
      An innate quotient for hubris that causes me to think
      <di>I wonder if can do it better...</di>.
    </li>
  </ol>
  <p>
    I had no idea what it takes to make a chart. My only experience with
    charting data was from being spoonfed by
    <l href="https://github.com/matplotlib/matplotlib">matplotlib</l> and
    <l href="https://github.com/mwaskom/seaborn">seaborn</l> (Python charting
    libraries).
  </p>

  <!-- Section Two -->
  <h2>The Refactoring</h2>
  <p>
    I initially thought of using
    <l href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API"
      >HTML Canvas</l
    >, but since Canvas has no DOM, it would involve writing code for object
    detection and what not. So I went with SVG.
  </p>
  <p>
    Given my lack of knowledge with how SVG worked, I thought it would take
    multiple days. But SVG primitives turned out to be suprisingly simple and
    rewriting the charts in Frappe Books took less than a day of
    <em>coding time</em>.
  </p>

  <!-- Section Two p One -->
  <h3>The Super Simple</h3>
  <p>
    The actual rewriting was easier, but more involved that I thought. For
    instance a simple line chart would be just a single SVG
    <code>&lt;path/&gt;</code> element:
  </p>
  <SimplePath />
  <p>
    Of course if I rewrote the Cashflow chart in Books using a single
    <code>&lt;path/&gt;</code> element, I'd very quickly become the company
    idiot.
  </p>

  <!-- Section Two p Three -->
  <h3>The Not So Simple</h3>
  <p>
    Things start to get a bit more involved when one gets into the deets of a
    chart.
    <di
      >A chart has to have labels! How can a chart not have labels, how will I
      know what the data is?</di
    >
    So we gotta add labels, two sets of them, for the <i>x</i> and the
    <i>y</i> axis:
  </p>
  <p>
    Of course, once labels are added, some would argue that a line chart
    wouldn't be a line chart without grid and axis lines. Not the kind of people
    I would want to argue with, so we gotta add that in too.
  </p>
  <p>
    With all of that, things have to be customizable customizable right..
    <em>Right</em>? Right!
  </p>
  <LineChartContainer @showing-toggle="(b) => (controlsButtonText = b)"
    >Click on <i>{{ controlsButtonText }}</i> to toggle chart
    customization.</LineChartContainer
  >
  <p>
    Just adding in a few components has caused the simple line chart having just
    one <code>&lt;path/&gt;</code> element to explode in complexity.
    <em
      >You can
      <l href="https://developer.chrome.com/docs/devtools/open/"
        >inspect element</l
      >
      to check how many elements it has now.</em
    >
  </p>
  <p>
    We aren't even half way there. The people who would argue about the axis and
    the grids, are probably going
    <di
      >You forgot the y-grid lines, also what about the x and y axis ticks,
      major ticks, minor ticks, I want to control the height of the ticks, inset
      ticks, outset...</di
    >
    but at this point I have my fingers in my ears and am slowly walking away.
  </p>

  <!-- Section Two p Three -->
  <h3>Cherry on the Chart</h3>
  <p>
    Another thing that bothered me about the chart was how the tooltip behaved.
    It was a <em>bit</em> jarring.
  </p>
  <p>
    Actually this wasn't an after thought, the crassness of this UX persists
    beyond the initial loading time. So it at least tantamount to the previous
    issue if not more important.
  </p>
  <img src="../assets/refactoring_charts/tooltip.gif" />
  <figcaption>The tooltip of no one's dreams.</figcaption>
  <p>
    If there are two lines and I'm hovering above the lower line, the tooltip
    shows above the upper line with info about both the points. <em>What?!</em>
  </p>
  <p>
    The kind of behaviour I want is that the tooltip appears above the cursor
    when I'm close to a datapoint and it should only show info pertinent to that
    point.
  </p>
  <p>
    Now, if you're as stupid as me, you're probably thinking
    <di>
      that's super simple to achieve, just slap an <code>onhover</code> on that
      point and call it day!
    </di>
    And you'd be wrong because:
  </p>
  <ol>
    <li>
      The line has no points, it's a single element, so
      <code>onhover</code> would capture the entire line.
    </li>
    <li>
      <code>onhover</code> works only if you're <em>on</em> the element, not
      near it.
    </li>
  </ol>
  <p>
    But, you're probably smarter than me and thought
    <di>that's not gonna be simple</di> and you're right. This involves:
  </p>
  <ol>
    <li>
      Converting the cursor's DOM coordinates into SVG
      <code>viewBox</code> coordinates.
    </li>
    <li>Calculating the distance to all the points.</li>
    <li>Render tooltip on the basis of the distance.</li>
  </ol>

  <!-- Section Two p Three p One -->
  <h4>Point One - The Coordinates</h4>
  <p>
    This is fairly simple once you know that you can get the inverse
    transformation matrix from the SVG using:
  </p>
  <codeblock>const inv = svgElement.getScreenCTM().inverse();</codeblock>
  <p>
    Then you can create a <code>DOMPoint</code> using viewport coordinates,
    transform it, and get the SVG <code>viewBox</code> coordinates from it:
  </p>
  <codeblock>
    const {x, y} = new DOMPoint(cursorX, cursorY).matrixTransform(inv);
  </codeblock>
  <p>In the window below you can see the effect of the transform.</p>
  <CoordinatesTransform />

  <!-- Section Two p Three p Two -->
  <h4>Point Two - The Distance</h4>
  <p>
    Now we need to know which point are nearest to the cursor. For which we need
    to calculate the distance to all the points, <em>right?</em>
  </p>
  <p>You may have realized that:</p>
  <ol>
    <li>That the points lie on a grid.</li>
    <li>Each cell has exactly one point.</li>
    <li>The cursor can be only in one cell at a time.</li>
    <li>The coordinates of this cell can be obtained by division.</li>
  </ol>
  <p>
    Because of this realization, a jank inducing <code>O(n)</code> becomes a
    quick <code>O(1)</code>. Now we just need to calculate the distance to a
    single point everytime <code>mouseover</code> is triggered over the SVG
    element.
  </p>
  <p>
    <i>
      Note: by division I mean
      <code>Math.floor(cursorLocation / cellSize)</code>
    </i>
  </p>
  <p>Here's a box to illustrate this calculation:</p>
  <TheDistance />

  <!-- Section Two p Three p Three -->
  <h4>Point Three - The Tooltip</h4>
  <p>
    Okay, this is a bit anticlimactic. Frappe Books already had
    <l href="https://popper.js.org/docs/v2/virtual-elements/">popper.js</l>
    as a dependency, so I thought <di>eh, I'll just use that</di>. And so here
    👇 is the final line chart, tooltip and all, almost an exact replica of the
    one in Frappe Books!
  </p>
  <LineChartContainer
    :showTooltip="true"
    :showControls="false"
    :axisOn="false"
  ></LineChartContainer>

  <p>
    And if you're wondering about the jankiness of this implementation, here's a
    gif:
  </p>
  <img src="../assets/refactoring_charts/nojank.gif" />
  <figcaption>
    This too is slowed down 0.5x like the first gif, in fact I had to use a
    higher frame rate for the empty state to show.
  </figcaption>

  <hr />
  <p>A few closing thoughts...</p>
  <p>
    Writing sufficiently performant code is made much easier by using
    <l href="https://github.com/vuejs/vue">Vue.js</l>. CLOC of only the line
    chart at the time of writing is ~300. Doing this using Vanilla JS has
    potential to be faster (obviously) but would've been way more complicated,
    and much harder to do well.
  </p>
  <p>
    This post was just about the line chart, the donut chart was a
    <em>whole other thing</em>, not as complex, but more mathematically
    involved. Due to the absolutely unintuitive nature of drawing arcs in SVG,
    using <code>&lt;path/&gt;</code>, I had to breakout some trigo to solve this
    one. No, I won't be writing a post on that, you can
    <l
      href="https://github.com/frappe/books/pull/311/files#diff-797bee25d2e6496e019d8a6d3841f326475f41375f14226b749c1e165d88fa80R116"
      >look at the code</l
    >
    if you want though. ✌️
  </p>
</template>
<script>
import CoordinatesTransform from '../components/refactoring_charts/CoordinatesTransform.vue';
import LineChartContainer from '../components/refactoring_charts/LineChartContainer.vue';
import SimplePath from '../components/refactoring_charts/SimplePath.vue';
import TheDistance from '../components/refactoring_charts/TheDistance.vue';
export default {
  data() {
    return {
      path: '/frappebooks_tech/refactoring_charts',
      title: 'Refactoring Charts',
      author: '18alantom',
      date: '2022-02-08',
      controlsButtonText: 'show controls',
      first: `
      I had to rewrite the charts in Frappe Books. This seemed like the only
      option. Well almost. The other option was to push improvements to the
      charting library itself. But, I wasn't in control of that library, and
      besides it's easier to just do it from scratch.
      `,
    };
  },
  components: {
    SimplePath,
    CoordinatesTransform,
    TheDistance,
    LineChartContainer,
  },
};
</script>
