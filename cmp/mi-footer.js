class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `&copy; 2021
     Marian Araceli García Alvarado, IC-52M.`;
  }
}
customElements.define(
  "mi-footer", MiFooter);
