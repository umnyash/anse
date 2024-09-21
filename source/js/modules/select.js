function initSelect(selectElement) {
  new Choices(selectElement, { // eslint-disable-line
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
    // placeholder: true,
    // placeholderValue: 'fff',
  });
}
