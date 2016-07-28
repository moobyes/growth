import {NavController, ModalController, NavParams} from "ionic-angular";
import {Component} from "@angular/core";
import {HELPER_ARTICLES} from "../../../data/HELPER_ARTICLES";
import {TODO_LISTS} from "../../../data/TODO_LISTS";
import {TodoModal} from "../../../modals/TodoModal";
import {HtmlModal} from "../../../modals/HtmlModal";
import {BookListModal} from "../../../modals/BookListModal/index";
import {SkillModal} from "../../../modals/SkillModal/index";
import {SECTIONS} from "../../../data/SECTIONS";

@Component({
  templateUrl: "build/pages/main/section/index.html"
})
export class Section {
  basicView:string = "articleView";
  articles = HELPER_ARTICLES["zh-cn"];
  private sectionInfo;
  private section;

  constructor(public nav:NavController, private modalCtrl:ModalController, public params:NavParams) {
    this.nav = nav;
    this.modalCtrl = modalCtrl;
    this.params = params;

    this.section = params.get("section");
    this.sectionInfo = SECTIONS[this.section];
  }

  presentTodoModal(params) {
    let todoLists = TODO_LISTS["zh-cn"][params.domain];
    let todoModal = this.modalCtrl.create(TodoModal, {todoLists: todoLists, domain: params.domain});
    todoModal.present();
  }

  presentHtmlModal(params) {
    let htmlModal, modalParams;
    modalParams = this.generateHtmlModalParams(params);

    htmlModal = this.modalCtrl.create(HtmlModal, modalParams);
    htmlModal.present();
  }

  generateHtmlModalParams(params) {
    let slug, modalParams;

    if (params.type === "desc") {
      slug = "assets/desc/" + params.slug + ".html";
      modalParams = {slug: slug, pageTitle: "简介"};
    } else {
      slug = "assets/article/" + params.slug + ".html";
      modalParams = {slug: slug, pageTitle: "文章", articleTitle: params.title};
    }

    return modalParams;
  }

  presentSkillModal(domain) {
    let skillModal = this.modalCtrl.create(SkillModal, {domain: domain});
    skillModal.present();
  }

  presentGrowthModal(params) {
    let htmlModal, slug, modalParams;

    if (params.type === "book") {
      modalParams = {domain: params.domain};
      htmlModal = this.modalCtrl.create(BookListModal, modalParams);
    } else if (params.type === "tool") {
      slug = "assets/tool/" + params.domain + ".html";
      modalParams = {slug: slug, pageTitle: "工具"};
      htmlModal = this.modalCtrl.create(HtmlModal, modalParams);
    } else if (params.domain) {
      slug = "assets/growth/" + params.domain + "/" + params.slug + ".html";
      modalParams = {slug: slug, pageTitle: "Growth"};
      htmlModal = this.modalCtrl.create(HtmlModal, modalParams);
    }

    htmlModal.present();
  }
}
