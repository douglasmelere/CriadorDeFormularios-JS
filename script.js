class Form {
  items = [];
  method = "GET";

  constructor(container, method, action) {
    this.container = document.querySelector(container);
    this.method = method;
    this.action = action;
  }

  addItem(item) {
    this.items.push(item);
  }

  render() {
    const formElement = document.createElement("form");
    formElement.setAttribute("method", this.method);
    formElement.setAttribute("action", this.action);

    for (let i in this.items) {
      this.items[i].render(formElement);
    }

    this.container.appendChild(formElement);
  }
}

class Input {
  _type = "text";
  required = false;

  constructor(name, label) {
    this.name = name;
    this.label = label;
  }

  get type() {
    return this._type;
  }

  set type(type) {
    if (["text", "password", "email", "submit"].includes(type)) {
      this._type = type;
    } else {
      throw new Error(`Input "${type}" doesn't exist.`);
    }
  }
  render(formElement) {
    const element = document.createElement("input");
    element.type = this.type;
    element.name = this.name;
    element.placeholder = this.label;
    element.required = this.required;
    formElement.appendChild(element);
  }
}

class Button extends Input {
  constructor(label) {
    super(undefined, label);
    this.type = "submit";
  }
  render(formElement) {
    const element = document.createElement("input");
    element.type = this.type;
    element.value = this.label;
    formElement.appendChild(element);
  }
}

// IMPLEMENTAÇÃO

// Form
const form = new Form(".formArea", "POST", "https://www.google.com");

// E-mail
const email = new Input('email", "Digite seu e-mail');
email.type = "email";
email.required = true;
form.addItem(email);

// Password
const password = new Input('email", "Digite seu e-mail');
password.type = "password";
password.required = true;
form.addItem(password);

// Button
const button = new Button("Enviar");
form.addItem(button);

form.render();
