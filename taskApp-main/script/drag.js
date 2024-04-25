// Seleciona todos os elementos com a classe "task" e "swim-lane"
const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".swim-lane");

// Adiciona listeners de eventos para cada elemento "task"
draggables.forEach((task) => {
  // Adiciona classe "is-dragging" quando o elemento começa a ser arrastado
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
  });
  // Remove classe "is-dragging" quando o elemento termina de ser arrastado
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
});

// Adiciona listeners de eventos para cada zona de destino "swim-lane"
droppables.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();

    // Insere a tarefa arrastada acima da tarefa mais próxima na zona de destino
    const bottomTask = insertAboveTask(zone, e.clientY);
    const curTask = document.querySelector(".is-dragging");

    if (!bottomTask) {
      zone.appendChild(curTask);
    } else {
      zone.insertBefore(curTask, bottomTask);
    }
  });
});

// Função para encontrar a tarefa mais próxima acima do cursor do mouse
const insertAboveTask = (zone, mouseY) => {
  const els = zone.querySelectorAll(".task:not(.is-dragging)");

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  els.forEach((task) => {
    const { top } = task.getBoundingClientRect();

    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });

  return closestTask;
};

// Classe para criar um menu de navegação responsivo para dispositivos móveis
class MobileNavbar {
  constructor(mobileMenu, navList, navLinks,){
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this)
  }

  // Anima os links do menu de navegação
  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation
      ? (link.style.animation = "")
      : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`);
    });
  }

  // Manipula o clique no menu de navegação
  handleClick(){
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.animateLinks();
  }

  // Adiciona evento de clique ao menu de navegação
  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
  }

  // Inicializa o menu de navegação
  init(){
    if(this.mobileMenu){
      this.addClickEvent();
    }
    return this;
  }
}

// Cria uma instância do menu de navegação para dispositivos móveis
const mobileNavbar = new MobileNavbar(
  ".mobile-menu",
  ".nav-list",
  ".nav-list li",
);

// Inicializa o menu de navegação
mobileNavbar.init()
