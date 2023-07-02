<template>
  <div>
    <Bar :chartData="chartData" :options="chartOptions" v-if="chartData.datasets.length > 0" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'BarChart',
  components: { Bar },
  mounted(){
    this.fetchChartData()
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
  methods: {
    fetchChartData() {
      this.$axios.get('home')
        .then((response) => {
          console.log(response.data.data.leasing_chart)
          const leasingChart = response.data.data.leasing_chart;
          this.chartData.labels = leasingChart.map(item => item.leasing_name);
          this.chartData.datasets[0].data = leasingChart.map(item => item.count);
          this.chartData.datasets[0].backgroundColor = this.generateRandomColors(leasingChart.length);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    generateRandomColors(numColors) {
      const colors = [];
      for (let i = 0; i < numColors; i++) {
        colors.push('#' + (Math.random() * 0xffffff << 0).toString(16));
      }
      return colors;
    },
  },
};
</script>