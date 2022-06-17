<template>
  <div class="my-5">
    <div class="border-2 rounded-lg my-2">
      <svg :viewBox="`0 0 ${width} ${height}`">
        <path :d="path" fill="transparent" stroke="#666" stroke-width="2" />
      </svg>
      <p
        class="w-full bg-white rounded-b-lg p-2 mb-0 text-gray-600 text-sm border-t-2"
      >
        {{ path }}
      </p>
    </div>
    <div
      class="flex flex-row rounded-lg text-slate-600 p-2 text-sm gap-2"
      :class="isActive ? 'bg-slate-200' : 'bg-slate-100'"
    >
      <input
        type="text"
        v-model="pointString"
        class="w-full text-slate-600 outline-none bg-transparent pl-1"
        @focus="isActive = true"
        @blur="isActive = false"
      />
      <button class="btn" @click="reset">reset</button>
    </div>
    <figcaption class="mb-0">
      Try changing the data points to see the generated line and
      <code>d</code> attribute of the <code>&lt;path/&gt;</code> element that
      positions the line.
    </figcaption>
    <figcaption>
      <i>
        Note: The points are min-max scaled to <code>viewBox</code> coordinates.
        So they'll never render outside the container.
      </i>
    </figcaption>
  </div>
</template>

<script>
export default {
  data() {
    return {
      width: 600,
      height: 200,
      padding: 10,
      pointString: '10, 20, 100, -10, 30',
      isActive: false,
    };
  },
  computed: {
    count() {
      return this.data.length;
    },
    data() {
      return this.pointString
        .split(',')
        .map((v) => parseFloat(v.trim()))
        .filter((v) => !Number.isNaN(v));
    },
    xs() {
      const w = (this.width - 2 * this.padding) / (this.count - 1 || 1);

      return Array(this.count)
        .fill()
        .map((_, i) => i * w + this.padding);
    },
    ys() {
      let min = Math.min(...this.data);
      let max = Math.max(...this.data);
      if (min === max) {
        min = min - min / 2;
        max = max + max / 2;
      }
      const h = this.height - 2 * this.padding;
      return this.data.map((p) => {
        const zo = (p - min) / (max - min);
        return h - zo * h + this.padding;
      });
    },
    path() {
      if (this.count === 0) {
        return 'M 0.0 0.0';
      }
      let p = `M ${this.xs[0].toFixed(1)} ${this.ys[0].toFixed(1)}`;
      if (this.count === 1) {
        return p;
      }
      const ys = this.ys.slice(1);
      const xs = this.xs.slice(1);

      xs.map((x, i) => {
        p += ` L ${x.toFixed(1)} ${ys[i].toFixed(1)}`;
      });
      return p;
    },
  },
  methods: {
    reset() {
      this.pointString = '10, 20, 100, -10, 30';
    },
  },
};
</script>
