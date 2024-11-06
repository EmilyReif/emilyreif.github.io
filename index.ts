// tslint:disable:g3-no-void-expression

import * as d3 from 'd3';
import { LitElement, html, svg } from 'lit';
import { customElement } from 'lit/decorators';
import { classMap } from 'lit/directives/class-map';
import { repeat } from 'lit/directives/repeat';
import { styleMap } from 'lit/directives/style-map';
import { projects, Project } from './projects';

/**
 * Component for spreadsheet duplicates.
 */
@customElement('index-component')
export class TreesComponent extends LitElement {

  constructor() {
    super();
  }

  createRenderRoot() {
    return this;
  }

  override render() {
    return html`
    <div class='topbar'>
      ${this.renderNav('about', '#about')}
      ${this.renderNav('projects', '#projects')}
      ${this.renderNav('papers [↗]', 'https://scholar.google.com/citations?user=J1hMgtAAAAAJ')}
    </div>
    <div class='about-holder'>
      <div class='content'>
        <h1 class='font-lg' id='about'>Emily Reif</h1>
        ${this.renderAbout()}
      </div>
    </div>
    <div class='content'>
      <h1 class='font-lg'  id='projects'>Projects</h1>
      ${this.renderProjects()}
    </div> 
    `;
  }

  private renderExternal() {
    const button = (iconImage: string, link: string) => {
      return html`
        <a href=${link} target="_blank" class='icon-link'><img src='./images/${iconImage}'></img></a>
      `;
    }
    return html`
    <div class='external'>
      ${button('twitter.png', 'https://twitter.com/emilyrreif')}
      ${button('github.png', 'https://github.com/EmilyReif')}
      ${button('scholar.png', 'https://scholar.google.com/citations?user=J1hMgtAAAAAJ')}
    </div> `
  }

  private renderNav(name: string, link: string) {
    return html`<div class='nav'> <a href=${link}>${name}</a></div>`
  }

  private renderAbout() {
    return html`
    <div>
    I'm currently a PhD student at the University of Washington, advised by <a href=https://nasmith.github.io/ target="_blank"> Noah Smith</a> and <a href=https://homes.cs.washington.edu/~jheer/ target="_blank"> Jeff Heer</a>. 
    I'm also a senior software engineer on Google DeepMind's <a href=https://pair.withgoogle.com/ target="_blank"> People + AI Research</a> team. 
    <br>
    <br>

    I want to understand why machine learning models (mostly language models) do what they do.
    
    <br>
    <br>
    <i>"The model is an artifact of the data is an artifact of the model is…"</i>
    <br>
    <br>

    I'm especially interested in using visualization to understand pretraining/finetuning/evaluation data, and how those data curation choices impact the model.

    <br>
    <br>

    I also create new interfaces to explore the boundaries of these models’ capabilities, for a wide range of users from pathologists, to creative writers, to visual artists.
    <br>
    <br>
    <br>
    <div class='email font-sm'> 
      ereif[@]google.com 
      <br>
      <a href='Reif Resume.pdf' target="_blank"> resume </a> </div>
    ${this.renderExternal()}
    </div>
    `;
  }


  private link(name: string, link: string) {
    // return html`<a href=${link}>${name}[↗]</a>`
    return html`<a class='upper' href=${link} target="_blank">${name}</a>`
  }

  private renderProjects() {
   return repeat(projects, project => this.renderProject(project));
  }
  private renderProject(project: Project) {
    const links = project.links.map(link => html`<div>${this.link(link.name, link.link)}</div>`);
    return html`
    <div class='title'>${project.name}</div>
    <div class='project'>
      <a class='img-holder'  href=${project.links[0].link} target="_blank"> <img src="./images/${project.image}"></img></a>

      <div class='info font-sm'>
        <div>${project.description}</div>
        <div>
          ${links}
        </div>
      </div>
    </div>
    `;
  }

}