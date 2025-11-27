# YOUWARE.md

# 3D Model Marketplace Project

A minimalist, monochrome website for showcasing and submitting 3D models, built with React, TypeScript, and Tailwind CSS.

## Project Overview

This project is a clean, aesthetic platform designed to showcase 3D assets. It features a grid layout for browsing models, a submission system for creators, and informational pages. The design philosophy is strictly minimalist, utilizing a black, white, and light gray color palette with smooth spacing and modern typography.

### Key Features

- **Model Showcase**: Responsive grid layout displaying 3D models with titles, descriptions, and prices in GEL.
- **Submission System**: Dedicated page for users to submit their models, including a form for details and image uploads (up to 3 images).
- **Minimalist Design**: Strict monochrome theme, focusing on content and typography.
- **Responsive Layout**: Fully responsive design that works seamlessly on mobile and desktop.
- **Routing**: Client-side routing for smooth navigation between Home, Submit, About, and Contact pages.

## Technical Architecture

### Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React (available if needed)

### Project Structure

```
src/
├── assets/          # Static images and assets
├── components/      # Reusable UI components
│   ├── ui/          # Primitive components (Button, Input, Textarea)
│   ├── Layout.tsx   # Main site layout (Header, Footer)
│   └── ...
├── data/            # Mock data (models.ts)
├── pages/           # Page components (Home, SubmitModel, About, Contact)
├── App.tsx          # Main application entry with routing
└── main.tsx         # React entry point
```

### Customization Guide

The site is designed to be easily customizable:

1.  **Models Data**: Edit `src/data/models.ts` to update the list of displayed models, prices, and images.
2.  **Styling**:
    -   Global styles are in `src/index.css`.
    -   Theme colors are controlled via Tailwind classes (mostly `black`, `white`, `gray-50`, `gray-100`, etc.).
    -   To change the font or global theme, modify `tailwind.config.js` or `src/index.css`.
3.  **Content**:
    -   **Home**: `src/pages/Home.tsx`
    -   **About**: `src/pages/About.tsx`
    -   **Contact**: `src/pages/Contact.tsx`
    -   **Submission Form**: `src/pages/SubmitModel.tsx`

## Development Commands

-   **Install Dependencies**: `npm install`
-   **Start Development Server**: `npm run dev`
-   **Build for Production**: `npm run build`
-   **Preview Production Build**: `npm run preview`

## Backend Integration Note

Currently, the forms (Submission and Contact) are frontend-only and simulate a successful submission. To make them functional:
1.  Enable **Youware Backend** via MCP.
2.  Implement API endpoints to handle form data and file uploads (e.g., to R2 storage).
3.  Connect the forms in `SubmitModel.tsx` and `Contact.tsx` to these endpoints.

## Design System

-   **Colors**: Monochrome (Black `#000000`, White `#FFFFFF`, Grays).
-   **Typography**: Sans-serif, clean, legible.
-   **Spacing**: Generous whitespace to maintain a clean look.
-   **Interactions**: Subtle hover effects on buttons and cards; no aggressive animations.
