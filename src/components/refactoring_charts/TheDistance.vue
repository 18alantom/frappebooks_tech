<template>
  <div class="my-5 flex flex-col items-center">
    <div class="border-2 rounded-lg my-2 w-full">
      <svg
        :viewBox="`0 0 ${width} ${height}`"
        @mousemove="onMouseMove"
        @mouseleave="reset"
        class="rounded-md"
        ref="svgelem"
      >
        <rect
          v-if="d < th && d !== -1"
          :x="px - s / 2"
          :y="py - s / 2"
          :height="s"
          :width="s"
          fill="rgba(0, 137, 255, 0.20)"
        />
        <path
          fill="transparent"
          stroke="#999"
          stroke-dasharray="10, 10"
          stroke-width="2"
          :d="distLine"
        />
        <path fill="transparent" stroke="#ccc" stroke-width="1" :d="gridY" />
        <path fill="transparent" stroke="#ccc" stroke-width="1" :d="gridX" />
        <circle v-for="p in points" :cx="p.x" :cy="p.y" r="2" fill="#666" />
        <text
          v-if="d !== -1"
          :x="vbX + 40"
          :y="vbY - 20"
          fill="#666"
          class="font-mono text-4xl"
        >
          dist: {{ d.toFixed(1) }}
        </text>
      </svg>
    </div>
    <figcaption>
      When the distance from the cursor to the center of the cell is beneath the
      threshold of {{ th }}, the cell will turn blue.
    </figcaption>
  </div>
</template>

<script>
const W = 2400;
const H = W / 3;

export default {
  data() {
    return {
      s: 200,
      th: 40,
      clientX: W / 2,
      clientY: H / 2,
      width: W,
      height: H,
      vbX: W / 2,
      vbY: H / 2,
      px: -1,
      py: -1,
      d: -1,
    };
  },
  computed: {
    distLine() {
      if (this.px === -1 || this.py === -1) {
        return '';
      }

      return `M ${this.vbX} ${this.vbY} T ${this.px} ${this.py}`;
    },
    gridX() {
      return Array(parseInt(this.width / this.s))
        .fill()
        .map((_, i) => (i > 0 ? `M ${i * this.s} 0 V ${this.height}` : ''))
        .join(' ');
    },
    gridY() {
      return Array(parseInt(this.height / this.s))
        .fill()
        .map((_, i) => (i > 0 ? `M 0 ${i * this.s} H ${this.width}` : ''))
        .join(' ');
    },
    points() {
      const xis = Array(parseInt(this.width / this.s))
        .fill()
        .map((_, i) => i);
      const yis = Array(parseInt(this.height / this.s))
        .fill()
        .map((_, i) => i);

      const points = [];
      xis.forEach((xi) => {
        yis.forEach((yi) => {
          const x = xi * this.s + this.s / 2;
          const y = yi * this.s + this.s / 2;
          points.push({ x, y });
        });
      });

      return points;
    },
  },
  methods: {
    onMouseMove({ clientX, clientY }) {
      this.clientX = clientX;
      this.clientY = clientY;

      const { x, y } = this.getVbCoords(clientX, clientY);
      const xi = Math.floor(x / this.s);
      const yi = Math.floor(y / this.s);

      this.px = xi * this.s + this.s / 2;
      this.py = yi * this.s + this.s / 2;

      this.d = Math.sqrt((this.px - this.vbX) ** 2 + (this.py - this.vbY) ** 2);
    },
    getVbCoords(clientX, clientY) {
      const inv = this.$refs.svgelem.getScreenCTM().inverse();
      const point = new DOMPoint(clientX, clientY);
      const { x, y } = point.matrixTransform(inv);

      this.vbX = parseInt(x);
      this.vbY = parseInt(y);

      return { x: this.vbX, y: this.vbY };
    },
    reset() {
      this.vbX = W / 2;
      this.vbY = H / 2;
      this.px = -1;
      this.py = -1;
      this.d = -1;
    },
  },
};
</script>
