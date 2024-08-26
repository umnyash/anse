/* * * * * * * * * * * * * * * * * * * * * * * *
 * size-chart.js
 */
function initSizeChart(sizeChartElement) {
  const tableWrapperElement = sizeChartElement.querySelector('div');

  new SimpleBar(tableWrapperElement, { autoHide: false });
}
/* * * * * * * * * * * * * * * * * * * * * * * */
