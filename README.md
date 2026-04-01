# BruceKZ Blog

<p align="center">
  A modern VuePress knowledge garden for course notes, technical writing, and long-lived study material.
</p>

<p align="center">
  <a href="https://blog.bruce12138.com"><img alt="Site" src="https://img.shields.io/badge/site-blog.bruce12138.com-0f172a?style=for-the-badge&logo=vercel&logoColor=white"></a>
  <img alt="VuePress" src="https://img.shields.io/badge/VuePress-2.0.0--rc.26-3eaf7c?style=for-the-badge&logo=vuedotjs&logoColor=white">
  <img alt="Vue" src="https://img.shields.io/badge/Vue-3.5.20-42b883?style=for-the-badge&logo=vue.js&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.9.2-3178c6?style=for-the-badge&logo=typescript&logoColor=white">
  <img alt="Theme Plume" src="https://img.shields.io/badge/Theme-Plume%201.0.0--rc.192-111827?style=for-the-badge">
  <img alt="Yarn" src="https://img.shields.io/badge/Yarn-4.9.4-2c8ebb?style=for-the-badge&logo=yarn&logoColor=white">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-16a34a?style=for-the-badge">
</p>

## Overview

This repository powers [blog.bruce12138.com](https://blog.bruce12138.com), a personal documentation site built around structured learning rather than short-lived posts.

The project is designed to keep study material readable on the web, maintainable in Git, and pleasant to extend over time. It currently focuses on:

- course notes
- technical notes
- curated slide mirrors and reference material
- a documentation-first writing workflow

## Project Snapshot

| Area | Value | Notes |
|---|---:|---|
| NLP note files | 14 | Structured course notes under `docs/courses/nlp/notes` |
| Course collections | 4 | `archive`, `bigdata`, `nlp`, `toc` |
| Tech note files | 3 | Living technical notes under `docs/tech` |
| GitHub workflows | 2 | Docs build and course sync automation |

## Stack

| Layer | Choice | Why it is here |
|---|---|---|
| Site framework | `VuePress 2.0.0-rc.26` | Static-doc workflow with markdown-first authoring |
| Frontend runtime | `Vue 3.5.20` | Required by the docs stack and custom components |
| Theme | `vuepress-theme-plume 1.0.0-rc.192` | Clean documentation layout with home-page support |
| Language tooling | `TypeScript 5.9.2` | Safer config and ecosystem compatibility |
| Markdown enhancements | `vuepress-plugin-md-enhance`, `markdown-it`, `@mdit/plugin-tasklist` | Better note authoring and richer content blocks |
| Math rendering | `KaTeX 0.16.22` | Formula-heavy course notes |
| Styling | `sass-embedded` | Custom theme overrides and layout tuning |
| Package manager | `Yarn 4.9.4` with `node-modules` linker | Reproducible local development |

## Content Architecture

```text
.
├── docs/
│   ├── README.md                 # blog homepage
│   ├── tech/                     # technical notes
│   ├── courses/                  # course-specific material
│   │   ├── nlp/
│   │   ├── bigdata/
│   │   ├── toc/
│   │   └── archive/
│   └── .vuepress/                # site config, theme overrides, assets
├── .github/workflows/            # build and sync automation
└── package.json
```

## Development

### Requirements

- Node.js compatible with the current VuePress toolchain
- Yarn `4.9.4`

### Run locally

```bash
yarn docs:dev
```

### Build production output

```bash
yarn docs:build
```

## Writing Model

This project treats notes as long-lived documentation artifacts, not disposable drafts.

The rough workflow is:

1. collect lecture material, references, and PDFs
2. rewrite content into structured markdown
3. improve readability for both learning and review
4. publish through the VuePress site

That means the repository is optimized for:

- readable markdown in Git
- stable internal links
- incremental refinement over time
- easy expansion into new courses or note domains

## Automation

The repository includes GitHub Actions under [`.github/workflows/`](/Users/bruce12138/Projects/blog/.github/workflows):

- `docs.yml` for documentation publishing/build flow
- `sync-cs552.yml` for course-material synchronization

## License

MIT
