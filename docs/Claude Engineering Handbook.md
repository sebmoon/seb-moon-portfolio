# Claude Engineering Handbook

Version: 1.0

Owner: Seb

---

# Mission

You are responsible for designing, building and maintaining my personal engineering portfolio website.

The portfolio exists to demonstrate technical ability, engineering thinking and product development skills to recruiters and engineering hiring managers.

The website is intended to help secure graduate engineering roles.

Every decision should support this objective.

---

# Primary Objectives

The website should:

• communicate engineering ability clearly

• demonstrate product development process

• present projects as engineering case studies

• load quickly

• be easy to maintain

• remain scalable for future projects

---

# Target Audience

Primary:

• Product Design Engineering recruiters

• Mechanical Design recruiters

• Manufacturing Engineering recruiters

• Dyson

• Apple

• Medical Device companies

• Advanced Manufacturing companies

Secondary:

• Academic staff

• Collaborators

• Other engineers

---

# Source of Truth

The connected Notion workspace is always the primary source of project information.

Never invent information.

Never infer technical specifications.

Never exaggerate achievements.

If information is missing, ask before writing.

---

# Technology Stack

Use only:

Next.js 15

React

TypeScript

Tailwind CSS

App Router

Vercel

Next/Image

Prefer built-in Next.js functionality over third-party packages.

Keep dependencies minimal.

---

# Design Philosophy

The portfolio should feel like an engineering document rather than a marketing website.

Design principles:

minimal

clean

structured

professional

calm

confident

consistent

Use whitespace generously.

Allow projects to speak for themselves.

Typography is more important than decoration.

Do not add unnecessary animations.

Avoid gimmicks.

---

# Colour Palette

Default:

White

Off-white

Dark charcoal

Grey

One accent colour only.

Avoid gradients unless specifically requested.

---

# Typography

Readable.

Modern.

Professional.

Large headings.

Comfortable paragraph width.

Consistent spacing.

---

# Images

Images are evidence.

Treat them as engineering documentation.

When importing from Notion:

download originals

optimise to WebP

create responsive versions

compress without noticeable quality loss

store locally

/public/images/project-name/

Never hotlink to Notion images.

---

# Projects

Every project should follow the same structure.

Overview

Problem

Objectives

Research

Ideation

CAD

Engineering Development

Prototyping

Testing

Manufacture

Final Outcome

Reflection

Downloads (where appropriate)

---

# Case Studies

Focus on engineering decisions.

Explain why decisions were made.

Show trade-offs.

Show evidence.

Use diagrams wherever possible.

---

# Writing Style

Professional.

Concise.

Natural.

Avoid buzzwords.

Avoid marketing language.

Avoid exaggeration.

Prefer short paragraphs.

Explain technical concepts clearly.

Write like an engineer explaining work to another engineer.

---

# Accessibility

Always use:

semantic HTML

keyboard navigation

descriptive alt text

correct heading hierarchy

accessible forms

WCAG AA colour contrast

---

# Performance

Target Lighthouse:

Performance >95

Accessibility >95

SEO >95

Best Practices >95

Optimise images.

Lazy load where appropriate.

Minimise JavaScript.

Avoid unnecessary client-side rendering.

---

# SEO

Every page should include:

title

description

Open Graph image

structured metadata

clean URLs

---

# Components

Build reusable components.

Examples:

Navigation

Footer

Project Card

Gallery

Timeline

Image Carousel

Case Study Section

Skills Grid

Contact Form

Avoid duplicate code.

---

# Folder Structure

src/

app/

components/

features/

hooks/

lib/

styles/

types/

public/

images/

docs/

context/

Keep folders organised.

---

# Git Workflow

Create logical commits.

Write descriptive commit messages.

Examples:

Add Formula Student project page

Improve navigation accessibility

Optimise project image loading

Never combine unrelated changes.

---

# Decision Making

Whenever there are multiple valid approaches:

Prefer:

simplicity

maintainability

performance

clarity

accessibility

Avoid complexity unless it solves a real problem.

---

# Communication

When suggesting changes:

Explain:

Why

Benefits

Trade-offs

Potential risks

Separate recommendations from implementation.

Never implement speculative changes without approval.

---

# Future Expansion

Design for future additions including:

Blog

Research

Publications

CAD viewer

Interactive prototypes

Video demonstrations

Engineering drawings

Downloadable PDFs

The architecture should remain scalable.
