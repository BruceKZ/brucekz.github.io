# EPFL Homework LaTeX Template

A simple LaTeX template for EPFL homework.

---

## Usage

1. Copy the whole template folder, for example to `HW_03`.
2. Open `main.tex` and fill in the fields at the top:
   - `\student{Student Name}`
   - `\sciper{000000}`
   - `\course{Course Name}`
   - `\courseshort{COURSE}`
   - `\assnumber{Homework X}`
   - `\studentemail{student.name@epfl.ch}`.
3. Write your answers in `solutions/problem1.tex`, `solutions/problem2.tex`, and add more files if needed.
4. Compile with XeLaTeX. If you use `minted`, enable `-shell-escape`.

If you use my Docker + VS Code setup on macOS, see [macOS Lightweight LaTeX Workflow](./local_latex.md).

---

## Expected Structure

```text
EPFL_Homework_Template/
├── .vscode/
│   └── settings.json
├── main.tex
├── resources/
│   └── EPFL_Logo_R.png
└── solutions/
    ├── problem1.tex
    └── problem2.tex
```

- `main.tex`: preamble, page style, title, and all `\input{...}` entries.
- `solutions/`: one file per problem.
- `resources/`: images and other static files.
- `.vscode/settings.json`: project-level LaTeX Workshop config.

---

## Advantages

- Ready to use with student name, `sciper`, course, homework number, and email fields.
- Good for proof-based homework with theorem-like environments already configured.
- Supports automata/state diagrams with `tikz`.
- Supports code blocks with `minted` and `listings`.
- Keeps each problem in a separate file, which is easier to manage.
- Works well with a Docker-based LaTeX workflow.

---

## EPFL Logo

Download the logo yourself from the official EPFL pages, then put it here:

```text
resources/EPFL_Logo_R.png
```

Official links:

- [EPFL Corporate Identity](https://www.epfl.ch/campus/services/website/website-guide/website-elements-and-functions/graphic-charter-and-logo/)
- [EPFL Logo Files](https://inside.epfl.ch/corp-id/logo-fichiers/)

The second page is the official logo download page. It may require EPFL login.

---

## Full Template

```latex
\documentclass[11pt]{scrartcl}
\newcommand*\student[1]{\newcommand{\thestudent}{{#1}}}
\newcommand*\sciper[1]{\newcommand{\thesciper}{{#1}}}
\newcommand*\course[1]{\newcommand{\thecourse}{{#1}}}
\newcommand*\courseshort[1]{\newcommand{\thecourseshort}{{#1}}}
\newcommand*\assnumber[1]{\newcommand{\theassnumber}{{#1}}}
\newcommand*\studentemail[1]{\newcommand{\thestudentemail}{{#1}}}
\newcommand*\acknowledgment[1]{\newcommand{\theacknowledgment}{{#1}}}
\setcounter{secnumdepth}{4}

\student{Student Name}
\sciper{000000}
\course{Course Name}
\courseshort{COURSE}
\assnumber{Homework X}
\studentemail{student.name@epfl.ch}
\acknowledgment{}

%----------------------------------------------------------------------------------------
%	PACKAGES AND OTHER DOCUMENT CONFIGURATIONS
%----------------------------------------------------------------------------------------

\usepackage[utf8]{inputenc} % Required for inputting international characters
\usepackage[T1]{fontenc} % Use 8-bit encoding
\usepackage[sc]{mathpazo}
\usepackage{subcaption}
\usepackage[UTF8]{ctex}
\usepackage[hidelinks]{hyperref}
\usepackage{inconsolata}
\usepackage[svgnames,table]{xcolor}
\usepackage{booktabs}
\usepackage{boldline}
\usepackage{mathtools}
\usepackage{chemfig}
\usepackage{caption}
\usepackage[english]{babel} % English language hyphenation
\usepackage{amssymb}
\usepackage{amsmath}% Math packages
\usepackage{bm}
\usepackage{listings} % Code listings, with syntax highlighting
\usepackage{graphicx} % Required for inserting images
\usepackage{float}
\usepackage{minted} % Requires -shell-escape when compiling.
\usepackage{courier} %% Sets font for listing as Courier.
\usepackage{amsthm}
\usepackage[ruled,vlined]{algorithm2e}
\usepackage{enumitem}
\usepackage{makecell}
\usepackage{tikz}
\usetikzlibrary{automata,positioning,arrows.meta}

\theoremstyle{plain}
\newtheorem{theorem}{Theorem}[section]
\newtheorem{lemma}[theorem]{Lemma}
\newtheorem{claim}[theorem]{Claim}
\newtheorem{proposition}[theorem]{Proposition}
\newtheorem{corollary}[theorem]{Corollary}

\theoremstyle{definition}
\newtheorem{definition}[theorem]{Definition}
\newtheorem{example}[theorem]{Example}

\theoremstyle{remark}
\newtheorem{remark}[theorem]{Remark}

\makeatletter
\renewenvironment{proof}[1][\proofname]{%
  \par\pushQED{\qed}%
  \normalfont
  \topsep6\p@\@plus6\p@\relax
  \trivlist
  \item[\hskip\labelsep\bfseries #1\@addpunct{.}]%
}{%
  \popQED\endtrivlist\@endpefalse
}
\makeatother

%----------------------------------------------------------------------------------------
%	DOCUMENT MARGINS
%----------------------------------------------------------------------------------------

\usepackage{geometry} % For page dimensions and margins
\geometry{
	paper=a4paper, 
	top=10pt, % Top margin
	bottom=20pt, % Bottom margin
	left=2cm, % Left margin
	right=2cm, % Right margin
	headheight=18pt,
	footskip=18pt,
	includehead,
	includefoot,
}
\setlength\parindent{0pt}

%----------------------------------------------------------------------------------------
%	SECTION TITLES
%-----------------------------L-----------------------------------------------------------

\addtokomafont{section}{\LARGE\bfseries\sffamily}
\addtokomafont{subsection}{\Large\bfseries}
\addtokomafont{subsubsection}{\large\itshape}
\addtokomafont{paragraph}{\bfseries}

%----------------------------------------------------------------------------------------
%	HEADERS AND FOOTERS
%----------------------------------------------------------------------------------------

\usepackage[singlespacing=true]{scrlayer-scrpage}
\clearpairofpagestyles
\ofoot*{\pagemark} % Right footer
\ifoot*{} % Left footer
\renewcommand\thesubsection{\thesection.\alph{subsection}}

%----------------------------------------------------------------------------------------
%	TITLE SECTION
%----------------------------------------------------------------------------------------

\title{
    \includegraphics[width=65mm]{resources/EPFL_Logo_R.png} \\[0.1cm]
    \normalfont\LARGE \thecourse \\ \theassnumber \\[0.1cm]
    \rule{\linewidth}{0.5pt} \\[0.1cm]
}

%%%%%%%%%%%%%% Multi-Author Example %%%%%%%%%%%%%%
% \author{\small
% \begin{minipage}[t]{0.32\textwidth}\centering
%     Name A (ID 123) \\ \texttt{\url{user.a@epfl.ch}}
% \end{minipage}\hfill
% \begin{minipage}[t]{0.32\textwidth}\centering
%     Name B (ID 456) \\ \texttt{\url{user.b@epfl.ch}}
% \end{minipage}\hfill
% \begin{minipage}[t]{0.32\textwidth}\centering
%     Name C (ID 789) \\ \texttt{\url{user.c@epfl.ch}}
% \end{minipage}
% }
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


%%%%%%%%%%%%%% Single-Author Template %%%%%%%%%%%%%
\author{
    {\small \thestudent\ (\thesciper) \quad \texttt{\url{\thestudentemail}}}
}
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\date{\normalsize \today}

\begin{document}

\maketitle

\ifx\theacknowledgment\empty\else
\textit{\theacknowledgment}
\fi

%%%%%%%%%%%%%%%%%%%% Code Template %%%%%%%%%%%%%%%%%%%%
% \begin{minted}[fontsize=\small, breaklines]{python}
% def greet(name):
%     print(f"Hello, {name}!")
% \end{minted}
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%%%%%%%%%%%%%%%%%%%% Result Template %%%%%%%%%%%%%%%%%%%%
% \begin{quote}
% \begin{verbatim}
% Code result/OUTPUT here
% \end{verbatim}
% \end{quote}
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%----------------------------------------------------------------------------------------
%	DOCUMENT BODY
%----------------------------------------------------------------------------------------

\input{solutions/problem1}

\input{solutions/problem2}

\end{document}
```
