function initSelect(selectElement) {
  return new Choices(selectElement, { // eslint-disable-line
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
    // placeholder: true,
    // placeholderValue: 'fff',
  });
}
