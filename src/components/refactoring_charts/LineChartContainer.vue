<template>
  <div class="mb-5">
    <div class="border-2 rounded-lg my-2">
      <LineChart
        :colors="lineColors"
        :xLabels="xLabels"
        :yLabelDivisions="yLabelDivisions"
        :points="points"
        :drawAxis="axisOn && drawAxis"
        :drawXGrid="drawXGrid"
        :viewBoxHeight="viewBoxHeight"
        :aspectRatio="aspectRatio"
        :axisPadding="axisPadding"
        :pointsPadding="pointsPadding"
        :xLabelOffset="yLabelOffset"
        :yLabelOffset="axisOn ? xLabelOffset : xLabelOffset - 10"
        :gridColor="gridColor"
        :axisColor="axisColor"
        :thickness="lineThickness"
        :axisThickness="axisThickness"
        :gridThickness="gridThickness"
        :fontSize="fontSize"
        :fontColor="fontColor"
        :bottom="bottom"
        :left="left"
        :extendGridX="extendGridX"
        :tooltipDispDistThreshold="tooltipDispDistThreshold"
        :showTooltip="showTooltip"
        :useGradients="useGradients"
      />
    </div>
    <div
      v-if="showControls"
      class="flex flex-col rounded-lg text-slate-600 p-2 text-sm bg-slate-100"
    >
      <div class="flex flex-row justify-between w-full">
        <button class="btn" @click="toggleIsShowing">{{ buttonText }}</button>
        <button class="btn" @click="reset">reset</button>
      </div>

      <div
        class="grid grid-cols-2 md:grid-cols-4 w-full p-2 gap-y-4 gap-x-8 mt-2 border-t-2"
        v-if="isShowing"
      >
        <div class="control">
          <p class="lbl">points</p>
          <input class="inp" type="text" v-model="pointsString" />
        </div>
        <div class="control">
          <p class="lbl">xLabels</p>
          <input class="inp" type="text" v-model="xLabelsString" />
        </div>

        <div class="control">
          <p class="lbl">lineColors</p>
          <input class="inp" type="text" v-model="lineColorsString" />
        </div>
        <div class="control">
          <p class="lbl">lineThickness</p>
          <input
            class="inp"
            type="number"
            v-model="lineThickness"
            min="0"
            max="100"
            step="0.1"
          />
        </div>

        <div class="control">
          <p class="lbl">fontColor</p>
          <input class="inp-color" type="color" v-model="fontColor" />
        </div>
        <div class="control">
          <p class="lbl">fontSize</p>
          <input
            class="inp"
            type="number"
            v-model="fontSize"
            min="0"
            max="100"
            step="0.1"
          />
        </div>

        <div class="control">
          <p class="lbl">yLabelOffset</p>
          <input
            class="inp"
            type="number"
            v-model="yLabelOffset"
            min="-100"
            max="100"
            step="0.1"
          />
        </div>
        <div class="control">
          <p class="lbl">xLabelOffset</p>
          <input
            class="inp"
            type="number"
            v-model="xLabelOffset"
            min="-100"
            max="100"
            step="0.1"
          />
        </div>

        <div class="control">
          <p class="lbl">axisPadding</p>
          <input
            class="inp"
            type="number"
            v-model="axisPadding"
            min="-100"
            max="100"
            step="0.1"
          />
        </div>
        <div class="control">
          <p class="lbl">pointsPadding</p>
          <input
            class="inp"
            type="number"
            v-model="pointsPadding"
            min="-100"
            max="100"
            step="0.1"
          />
        </div>

        <div class="control">
          <p class="lbl">axisThickness</p>
          <input
            class="inp"
            type="number"
            v-model="axisThickness"
            min="0"
            max="100"
            step="0.1"
          />
        </div>
        <div class="control">
          <p class="lbl">axisColor</p>
          <input class="inp-color" type="color" v-model="axisColor" />
        </div>

        <div class="control">
          <p class="lbl">gridThickness</p>
          <input
            class="inp"
            type="number"
            v-model="gridThickness"
            min="0"
            max="100"
            step="0.1"
          />
        </div>
        <div class="control">
          <p class="lbl">gridColor</p>
          <input class="inp-color" type="color" v-model="gridColor" />
        </div>

        <div class="control">
          <p class="lbl">bottomOffset</p>
          <input
            class="inp"
            type="number"
            v-model="bottom"
            min="-100"
            max="100"
            step="0.1"
          />
        </div>
        <div class="control">
          <p class="lbl">leftOffset</p>
          <input
            class="inp"
            type="number"
            v-model="left"
            min="-100"
            max="100"
            step="0.1"
          />
        </div>

        <div class="control">
          <p class="lbl">yLabelDivisions</p>
          <input
            class="inp"
            type="number"
            v-model="yLabelDivisions"
            min="0"
            max="100"
            step="1"
          />
        </div>
        <div class="control">
          <p class="lbl">extendGridX</p>
          <input
            class="inp"
            type="number"
            v-model="extendGridX"
            min="-100"
            max="100"
            step="1"
          />
        </div>

        <div class="control">
          <p class="lbl">viewBoxHeight</p>
          <input
            class="inp"
            type="number"
            v-model="viewBoxHeight"
            min="0"
            max="10000"
            step="10"
          />
        </div>

        <div class="control">
          <p class="lbl">drawAxis</p>
          <input class="inp-check" type="checkbox" v-model="drawAxis" />
        </div>
        <div class="control">
          <p class="lbl">drawXGrid</p>
          <input class="inp-check" type="checkbox" v-model="drawXGrid" />
        </div>

        <div class="control">
          <p class="lbl">useGradients</p>
          <input class="inp-check" type="checkbox" v-model="useGradients" />
        </div>
      </div>
    </div>
    <figcaption>
      <slot></slot>
    </figcaption>
  </div>
</template>
<script>
import LineChart from './LineChart.vue';
const defaultConfig = {
  pointsString: '10, 80, -10, 50, 0; 10, 20, 100, -10, 30',
  points: [
    [10, 80, -10, 50, 0],
    [10, 20, 100, -10, 30],
  ],

  xLabelsString: 'A, B, C, D, E',

  gridColor: '#CCCCCC',
  axisColor: '#CCCCCC',

  lineColorsString: '#B7BFC6, #0089FF',
  lineThickness: 5,

  fontColor: '#415668',
  fontSize: 24,

  xLabelOffset: 25,
  yLabelOffset: 20,

  axisPadding: 30,
  pointsPadding: 20,

  axisThickness: 1,
  gridThickness: 0.5,

  bottom: 25,
  left: 45,

  yLabelDivisions: 4,
  extendGridX: 0,

  drawAxis: true,
  drawXGrid: true,

  useGradients: true,
  viewBoxHeight: 600,
};

export default {
  props: {
    axisOn: { type: Boolean, default: true },
    showTooltip: { type: Boolean, default: false },
    showControls: { type: Boolean, default: true },
  },
  data() {
    return {
      ...defaultConfig,
      tooltipDispDistThreshold: 20,
      aspectRatio: 3,
      isShowing: false,
    };
  },
  computed: {
    xLabels() {
      return this.xLabelsString
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length);
    },
    lineColors() {
      return this.lineColorsString
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length);
    },
    points() {
      return this.pointsString.split(';').map((line) =>
        line
          .split(',')
          .map((v) => parseFloat(v.trim()))
          .filter((v) => !Number.isNaN(v))
      );
    },
    buttonText() {
      return this.isShowing ? 'hide controls' : 'show controls';
    },
  },
  methods: {
    reset() {
      Object.keys(defaultConfig).forEach((k) => {
        this[k] = defaultConfig[k];
      });
    },
    toggleIsShowing() {
      this.isShowing = !this.isShowing;
      this.$emit('showing-toggle', this.buttonText);
    },
  },
  components: { LineChart },
};
</script>

<style scoped>
.inp {
  @apply w-full rounded-md py-0.5 px-1.5 text-slate-600 focus:bg-slate-50 outline-none;
}

.inp-color {
  @apply w-full rounded-md  text-slate-600 focus:bg-slate-50 outline-none;
}

.inp-check {
}
.lbl {
  @apply m-0 p-0 font-mono text-sm text-slate-500 mb-0.5;
}

.control {
  /* @apply bg-green-100; */
}

input[type='color'] {
  -webkit-appearance: none;
}

input[type='color']::-webkit-color-swatch-wrapper {
  padding: 0;
}

input[type='color']::-webkit-color-swatch {
  @apply rounded-md border-0;
}
</style>
