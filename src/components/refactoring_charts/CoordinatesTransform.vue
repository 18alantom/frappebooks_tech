<template>
  <div class="my-5 flex flex-col items-center">
    <div class="border-2 rounded-lg my-2 w-full">
      <svg
        :viewBox="`0 0 ${width} ${height}`"
        @mousemove="onMouseMove"
        @mouseleave="reset"
        ref="svgelem"
      >
        <path
          fill="transparent"
          stroke="#999"
          stroke-dasharray="10, 10"
          stroke-width="2"
          :d="diskCross"
        />
        <circle :cx="cx" :cy="cy" r="20" fill="#666" />
        <text
          :x="vbX + 40"
          :y="vbY - 20"
          fill="#666"
          class="font-mono text-3xl"
        >
          client: ({{ clientX }}, {{ clientY }})
        </text>
        <text :x="cx + 40" :y="cy + 40" fill="#666" class="font-mono text-3xl">
          viewBox: ({{ cx }}, {{ cy }})
        </text>
      </svg>
    </div>
    <button class="btn-interactive" @click="useTransform = !useTransform">
      {{ useTransform ? 'using transform' : 'not using transform' }}
    </button>
    <figcaption class="mb-0">
      Click on
      <i>{{ useTransform ? 'using transform' : 'not using transform' }}</i>
      to toggle the use of transforms.
      {{
        useTransform
          ? 'The circle will render underneath the cursor because of the transform.'
          : "The circle will not be aligned with the cursor because it's using viewport coordinates."
      }}
    </figcaption>
    <figcaption class="mb-0">
      <code>client</code> refers to cursor viewport coordinates i.e.
      <code>clientX</code> and <code>clientY</code> from
      <l href="https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent"
        >MouseEvent</l
      >, and <code>viewBox</code> refers to circle render coordinates in the SVG
      <l
        href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox"
        >viewBox</l
      >.
    </figcaption>
    <figcaption>
      <i
        >Note: here the <code>viewBox</code> has a width of {{ width }} and a
        height of {{ height }}, so depending on the scroll location, the circle
        may render outside the <code>viewBox</code>. You can try scrolling the
        page to bring it into view.
      </i>
    </figcaption>
  </div>
</template>

<script>
const W = 2100;
const H = W / 3;

export default {
  data() {
    return {
      clientX: W / 2,
      clientY: H / 2,
      width: W,
      height: H,
      vbX: W / 2,
      vbY: H / 2,
      useTransform: false,
      cx: W / 2,
      cy: H / 2,
    };
  },
  computed: {
    diskCross() {
      return `M 0 ${this.cy} H ${this.width} M ${this.cx} 0 V ${this.height}`;
    },
  },
  methods: {
    reset() {
      this.cx = this.vbX = W / 2;
      this.cy = this.vbY = H / 2;
    },
    onMouseMove({ clientX, clientY }) {
      this.clientX = clientX;
      this.clientY = clientY;
      this.setVbCoords(clientX, clientY);
      if (!this.useTransform) {
        this.cx = this.clientX;
        this.cy = this.clientY;
      } else {
        this.cx = this.vbX;
        this.cy = this.vbY;
      }
    },
    setVbCoords(clientX, clientY) {
      const inv = this.$refs.svgelem.getScreenCTM().inverse();
      const point = new DOMPoint(clientX, clientY);
      const { x, y } = point.matrixTransform(inv);
      this.vbX = parseInt(x);
      this.vbY = parseInt(y);
    },
  },
};
</script>
