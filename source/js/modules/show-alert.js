function showAlert({ heading, button = {}, icon }) {
  const alert = new Alert({ heading, button, icon });
  requestAnimationFrame(() => alert.open());
  return alert;
}
