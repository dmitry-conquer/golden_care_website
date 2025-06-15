import { openModal } from "../modal";

export default class Members {
  private readonly selectors = {
    member: "[data-js-member]",
    memberBio: "[data-js-member-bio]",
    modal: "member-modal",
    modalSlot: "[data-modal-slot]",
  };
  private members: HTMLElement[] = [];
  private scroll: any;

  constructor(scroll: any) {
    this.scroll = scroll;
    this.members = Array.from(document.querySelectorAll(this.selectors.member));

    this.init();
  }

  private init() {
    this.bindEvents();
  }

  private bindEvents() {
    this.members.forEach(member => {
      member.addEventListener("click", this.handleMemberClick);
    });
  }

  private handleMemberClick = (e: MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    const bio = target.querySelector(this.selectors.memberBio);
    const modalSlot = document.querySelector(this.selectors.modalSlot);
    if (!bio || !modalSlot) return;
    modalSlot.innerHTML = bio.innerHTML;
    openModal(this.selectors.modal, this.scroll);
  };
}
