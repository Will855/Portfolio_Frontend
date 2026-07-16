# Graph Report - portfolio  (2026-07-11)

## Corpus Check
- 108 files · ~404,426 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 787 nodes · 988 edges · 76 communities (45 shown, 31 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f5f711fa`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 81|Community 81]]
- [[_COMMUNITY_Community 83|Community 83]]
- [[_COMMUNITY_Community 84|Community 84]]
- [[_COMMUNITY_Community 85|Community 85]]
- [[_COMMUNITY_Community 86|Community 86]]

## God Nodes (most connected - your core abstractions)
1. `Files` - 25 edges
2. `Files` - 24 edges
3. `supabase` - 15 edges
4. `Files` - 13 edges
5. `Portfolio Personal - React + Vite` - 12 edges
6. `Documentación Técnica del Portfolio` - 12 edges
7. `Files` - 12 edges
8. `isSupabaseConfigured` - 11 edges
9. `useCards()` - 11 edges
10. `About (informationContent)` - 11 edges

## Surprising Connections (you probably didn't know these)
- `NavMenu()` --calls--> `useNavItems()`  [EXTRACTED]
  src/core/components/navbar/navMenu.tsx → src/core/hooks/useNavItems.ts
- `ResponsiveMenu()` --calls--> `useNavItems()`  [EXTRACTED]
  src/core/components/navbar/menuResponsive.tsx → src/core/hooks/useNavItems.ts
- `useAppDataReady()` --calls--> `useCards()`  [EXTRACTED]
  src/core/hooks/useAppDataReady.ts → src/modules/projects/hooks/useCards.ts
- `Footer()` --calls--> `trackContactAttempt()`  [EXTRACTED]
  src/core/components/footer/Footer.tsx → src/core/utils/analytics.ts
- `fetchProjectsMeta()` --calls--> `getStoragePublicUrl()`  [EXTRACTED]
  src/modules/projects/hooks/useProjectsMeta.ts → src/shared/services/supabase/supabaseStorage.ts

## Communities (76 total, 31 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (36): AdminContent(), ProjectContentEditor(), Grid(), CardData, cards, FALLBACK_KNOWLEDGES, FALLBACK_SKILLS, BlockType (+28 more)

### Community 1 - "Community 1"
Cohesion: 0.15
Nodes (13): AdminProjects(), MarkdownEditor(), MarkdownEditorProps, ProjectFormModal(), ProjectFormModalProps, COLOR_CONFIG, LightboxModalProps, emptyForm (+5 more)

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (38): Animaciones, 🏗️ Arquitectura, Arquitectura General, code:typescript (import React from 'react';), code:javascript (// src/config/firebase.js), code:typescript (// src/components/utils/cardAnimations.ts), 🎯 Componentes, /components (+30 more)

### Community 3 - "Community 3"
Cohesion: 0.05
Nodes (37): dependencies, dompurify, gsap, @gsap/react, react, react-dom, react-ga4, react-router-dom (+29 more)

### Community 4 - "Community 4"
Cohesion: 0.06
Nodes (35): 1. Sistema CRUD de Proyectos, 2. Editor de Contenido por Proyecto, 3. Panel Admin Responsivo, Acceder al editor, Agregar bloques, Características técnicas, `cards` (proyectos unificados), code:sql (INSERT INTO public.admin_emails (email) VALUES ('tu@email.co) (+27 more)

### Community 5 - "Community 5"
Cohesion: 0.09
Nodes (22): AdminDashboard(), AdminLayout(), NAV, AdminMessages(), MagneticBtnProps, CONTACT_INFO, Footer(), useAdminAuth() (+14 more)

### Community 6 - "Community 6"
Cohesion: 0.06
Nodes (32): code:block1 (src/), code:typescript (// utils/cardAnimations.ts), code:typescript (export const isValidEmail = (email: string): boolean => {), code:typescript (export interface HeroContent {), code:typescript (import type { CardRow, InfoSectionRow } from './supabase';), code:typescript (import React, { useEffect, useMemo, useState } from "react";), code:typescript (import React, { useEffect, useRef } from 'react';), code:typescript (import React from 'react';) (+24 more)

### Community 7 - "Community 7"
Cohesion: 0.08
Nodes (31): code:block1 (supabase/), code:`sql (-- Ejemplo: Agregar contenido de prueba para el proyecto "E-), code:`sql (-- Portfolio Supabase: schema + RLS), code:`markdown (# Supabase setup), code:block13 ((Sustituye por el email con el que te registraste.) Sin este), code:` ({), code:` (v2.106.0), code:`sql (-- Storage bucket and RLS for portfolio-assets) (+23 more)

### Community 8 - "Community 8"
Cohesion: 0.05
Nodes (33): AdminHero(), AdminInfoSections(), COLOR_OPTIONS, ColorOption, EditableSection, EditableSectionItem, SectionEditor(), SectionType (+25 more)

### Community 9 - "Community 9"
Cohesion: 0.07
Nodes (26): code:block1 (src/), code:typescript (/**), code:css (/* Estilos para el texto con efecto glitch */), code:typescript ('use client';), code:typescript (import React, { useEffect, useRef } from 'react'; // Importa), code:typescript (/**), code:typescript (import React, { useState, useEffect } from 'react';), code:typescript (import React from 'react';) (+18 more)

### Community 10 - "Community 10"
Cohesion: 0.09
Nodes (22): 🙏 Agradecimientos, Animaciones, 👤 Autor, 🎯 Características Principales, code:block1 (src/), code:bash (git clone [URL_DEL_REPOSITORIO]), code:bash (npm install), code:bash (npm run dev) (+14 more)

### Community 11 - "Community 11"
Cohesion: 0.09
Nodes (21): 1. Ejecutar la migración SQL, 2. Cómo usar el editor de contenido, 3. Ver el contenido en la página pública, 4. Flujo de datos, 5. Fallback, 6. Verificar que funciona, 7. Troubleshooting, 8. Estructura de la base de datos (+13 more)

### Community 12 - "Community 12"
Cohesion: 0.11
Nodes (17): 1. Propósito de la página, 2.1 Stack, 2.2 Estructura de carpetas (src), 2.3 Flujo de datos y rutas, 2.4 Patrones usados, 2. Arquitectura, 3.1 Rutas y navegación, 3.2 Consistencia de nombres y tipos (+9 more)

### Community 14 - "Community 14"
Cohesion: 0.15
Nodes (12): About (informationContent), code:tsx (<SkillSection />), Datos internos, Dependencias, ExpAndTecnologies, Mejoras sugeridas, Props, Propósito (+4 more)

### Community 15 - "Community 15"
Cohesion: 0.17
Nodes (11): code:tsx (<ContactForm />), Dependencias, Envío, Estructura del archivo, Form (ContactForm), Mejoras sugeridas, Props, Propósito (+3 more)

### Community 16 - "Community 16"
Cohesion: 0.17
Nodes (10): cardAnimations.ts, handleMouseMove, infoHandler.ts, isValidEmail, Propósito, resetCardPosition, showInfo(button, info), Ubicación (+2 more)

### Community 17 - "Community 17"
Cohesion: 0.18
Nodes (10): Animations, Dependencias, Glitch, Mejoras sugeridas, Propósito, StarsBackground, Ubicación, Uso (+2 more)

### Community 18 - "Community 18"
Cohesion: 0.18
Nodes (10): code:tsx (<Footer />), Configuración, Dependencias, Estructura, Footer, Mejoras sugeridas, Props, Propósito (+2 more)

### Community 19 - "Community 19"
Cohesion: 0.18
Nodes (10): code:tsx (<NavMenu />), Dependencias, Mejoras sugeridas, menuResponsive, Navbar, NavMenu, Props, Propósito (+2 more)

### Community 20 - "Community 20"
Cohesion: 0.18
Nodes (6): FormData, FormField, SOCIAL_ITEMS, SOCIAL_LINKS, SocialLink, isValidEmail()

### Community 21 - "Community 21"
Cohesion: 0.20
Nodes (9): Card, CardDetails (proyectPage), Cards (Grid, Card, CardDetails), Dependencias, Grid, Mejoras sugeridas, Propósito, Ubicación (+1 more)

### Community 22 - "Community 22"
Cohesion: 0.20
Nodes (9): CircleProfile, code:tsx (<CircleProfile), Comportamiento, Dependencias, Mejoras sugeridas, Props, Propósito, Ubicación (+1 more)

### Community 23 - "Community 23"
Cohesion: 0.20
Nodes (9): code:tsx (<Input), Dependencias, Estilos, Input (inpput.jsx), Mejoras sugeridas, Props, Propósito, Ubicación (+1 more)

### Community 24 - "Community 24"
Cohesion: 0.20
Nodes (9): code:tsx (<MagneticBtn iconName="link" subtitle="Ver más" />), Comportamiento, Dependencias, MagneticBtn, Mejoras sugeridas, Props, Propósito, Ubicación (+1 more)

### Community 25 - "Community 25"
Cohesion: 0.20
Nodes (9): code:bash (export PONYTAIL_DEFAULT_MODE=ultra), code:json ({ "defaultMode": "lite" }), Configure Default Mode, Deactivate, Levels, More, Ponytail Help, Skills (+1 more)

### Community 26 - "Community 26"
Cohesion: 0.22
Nodes (8): Componentes en demos/, config/project.ts, Demos, Dependencias, Mejoras sugeridas, Propósito, Ubicación, Uso

### Community 27 - "Community 27"
Cohesion: 0.06
Nodes (49): code:typescript (import React, { useEffect, useRef } from "react";), code:typescript (/**), code:typescript (/**), code:javascript (/** @type {import('tailwindcss').Config} */), code:typescript (import React, { useState } from 'react';), code:typescript (// NotFoundPage.tsx), code:typescript (import React from 'react';), code:typescript (/**) (+41 more)

### Community 28 - "Community 28"
Cohesion: 0.22
Nodes (9): code:`typescript (import React, { useState, useEffect } from 'react';), code:`typescript (import React from "react";), code:`typescript (export interface CardData {), code:`typescript (import React, { useRef, useState, useEffect } from "react";), File: src/modules/projects/admin/AdminContentEditor.tsx, File: src/modules/projects/components/ExpAndTecnologies.tsx, File: src/modules/projects/config/cards.ts, File: src/modules/projects/pages/ProjectDetailsPage.tsx (+1 more)

### Community 29 - "Community 29"
Cohesion: 0.22
Nodes (8): Boundaries, Intensity, Output, Persistence, Ponytail, Rules, The ladder, When NOT to be lazy

### Community 30 - "Community 30"
Cohesion: 0.22
Nodes (8): Boundaries, Intensity, Output, Persistence, Ponytail, Rules, The ladder, When NOT to be lazy

### Community 31 - "Community 31"
Cohesion: 0.25
Nodes (7): code:block1 (src/), Directory Structure, File Format, File Summary, Notes, Purpose, Usage Guidelines

### Community 32 - "Community 32"
Cohesion: 0.25
Nodes (7): code:block1 (src/), Directory Structure, File Format, File Summary, Notes, Purpose, Usage Guidelines

### Community 33 - "Community 33"
Cohesion: 0.29
Nodes (6): public.admin_emails, public.cards, public.contact_submissions, public.content_blocks, public.hero_content, public.projects_meta

### Community 34 - "Community 34"
Cohesion: 0.40
Nodes (4): Boundaries, Hunt, Output, Tags

### Community 35 - "Community 35"
Cohesion: 0.40
Nodes (4): Boundaries, Examples, Format, Scoring

### Community 36 - "Community 36"
Cohesion: 0.40
Nodes (4): hosting, ignore, public, rewrites

### Community 37 - "Community 37"
Cohesion: 0.50
Nodes (3): Boundaries, Output, Scan

## Knowledge Gaps
- **370 isolated node(s):** `public`, `ignore`, `rewrites`, `name`, `private` (+365 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **31 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `trackContactAttempt()` connect `Community 5` to `Community 20`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **Why does `Files` connect `Community 27` to `Community 31`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **Why does `Files` connect `Community 28` to `Community 32`, `Community 62`, `Community 63`, `Community 64`, `Community 65`, `Community 66`, `Community 67`, `Community 68`, `Community 69`, `Community 70`, `Community 71`, `Community 72`, `Community 73`, `Community 74`, `Community 75`, `Community 76`, `Community 77`, `Community 78`, `Community 79`, `Community 80`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **What connects `public`, `ignore`, `rewrites` to the rest of the system?**
  _370 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06919945725915876 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.1471861471861472 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.05128205128205128 - nodes in this community are weakly interconnected._