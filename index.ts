// tslint:disable:g3-no-void-expression

import './timeline-component';

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators';
import { repeat } from 'lit/directives/repeat';
import { mainProjects, Project } from './projects';

const PROJECT_COLLABORATORS_SHOWN = 16;

function formatProjectCollaborators(names: readonly string[]): string {
  if (names.length === 0) {
    return '';
  }
  if (names.length <= PROJECT_COLLABORATORS_SHOWN) {
    return names.join(', ');
  }
  const head = names.slice(0, PROJECT_COLLABORATORS_SHOWN);
  return `${head.join(', ')} — and ${names.length - PROJECT_COLLABORATORS_SHOWN} more (full author list on the paper)`;
}

/** Set to false to hide the timeline section and its nav link. */
const SHOW_TIMELINE = true;

/**
 * Component for spreadsheet duplicates.
 */
@customElement('index-component')
export class TreesComponent extends LitElement {
  createRenderRoot() {
    return this;
  }

  override render() {
    return html`
    <div class='topbar'>
      ${this.renderNav('about', '#about')}
      ${SHOW_TIMELINE ? this.renderNav('timeline', '#timeline') : null}
      ${this.renderNav('projects', '#projects')}
      ${this.renderNav('papers [↗]', 'https://scholar.google.com/citations?user=J1hMgtAAAAAJ')}
    </div>
    <div class='about-holder'>
      <div class='content'>
        <h1 class='font-lg' id='about'>Emily Reif</h1>
        ${this.renderAbout()}
      </div>
    </div>
    ${SHOW_TIMELINE
      ? html`
    <div class='content timeline-content'>
      <div class='timeline-title-wrap'>
        <h1 class='font-lg' id='timeline'>Professional timeline</h1>
      </div>
      <timeline-component></timeline-component>
    </div>
    `
      : null}
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
    };
    return html`
    <div class='external'>
      ${button('twitter.png', 'https://twitter.com/emilyrreif')}
      ${button('github.png', 'https://github.com/EmilyReif')}
      ${button('scholar.png', 'https://scholar.google.com/citations?user=J1hMgtAAAAAJ')}
    </div> `;
  }

  private renderNav(name: string, link: string) {
    return html`<div class='nav'> <a href=${link}>${name}</a></div>`;
  }

  private renderAbout() {
    return html`
    <div>
    I'm currently a PhD student at the University of Washington, advised by <a href=https://nasmith.github.io/ target="_blank"> Noah Smith</a> and <a href=https://homes.cs.washington.edu/~jheer/ target="_blank"> Jeff Heer</a>. 
    I'm also a research scientist on Google DeepMind's <a href=https://pair.withgoogle.com/ target="_blank"> People + AI Research</a> team. 
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
      ereif[@]google.com // emreif[@]cs.washington.edu
      <br>
      <a href='Reif Resume.pdf' target="_blank"> resume </a> </div>
    ${this.renderExternal()}
    </div>
    `;
  }

  private link(name: string, link: string) {
    return html`<a class='upper' href=${link} target="_blank">${name}</a>`;
  }

  private renderProjects() {
    return repeat(
      mainProjects,
      (project) => project.name,
      (project) => this.renderProject(project)
    );
  }

  private renderProject(project: Project) {
    const links = project.links.map(
      (link) => html`<div>${this.link(link.name, link.link)}</div>`
    );
    const collab = project.collaborators.length
      ? html`<div class='project-collaborators'>
        <div class='project-collaborators-label font-sm'>With</div>
        <div class='project-collaborators-names'>${formatProjectCollaborators(
          project.collaborators
        )}</div>
      </div>`
      : null;
    return html`
    <div class='title'>${project.name}</div>
    <div class='project'>
      <a class='img-holder'  href=${project.links[0].link} target="_blank"> <img src="./images/${project.image}"></img></a>

      <div class='info font-sm'>
        <div>${project.description}</div>
        ${collab}
        <div class='project-links'>
          ${links}
        </div>
      </div>
    </div>
    `;
  }
}
