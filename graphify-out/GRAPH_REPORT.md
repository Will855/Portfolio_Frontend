# Graph Report - portfolio-next  (2026-09-22)

## Corpus Check
- 145 files · ~411,890 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1096 nodes · 1422 edges · 106 communities (73 shown, 33 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `70cdb4f8`
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
- [[_COMMUNITY_Community 13|Community 13]]
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
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
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
- [[_COMMUNITY_Community 95|Community 95]]
- [[_COMMUNITY_Community 96|Community 96]]
- [[_COMMUNITY_Community 97|Community 97]]
- [[_COMMUNITY_Community 98|Community 98]]
- [[_COMMUNITY_Community 99|Community 99]]
- [[_COMMUNITY_Community 100|Community 100]]
- [[_COMMUNITY_Community 101|Community 101]]
- [[_COMMUNITY_Community 102|Community 102]]

## God Nodes (most connected - your core abstractions)
1. `Files` - 26 edges
2. `Files` - 25 edges
3. `supabase` - 19 edges
4. `compilerOptions` - 17 edges
5. `compilerOptions` - 16 edges
6. `Files` - 14 edges
7. `isSupabaseConfigured` - 13 edges
8. `Documentación Técnica del Portfolio` - 13 edges
9. `Files` - 13 edges
10. `getStoragePublicUrl()` - 12 edges

## Surprising Connections (you probably didn't know these)
- `PublicLayout()` --calls--> `useAppDataReady()`  [EXTRACTED]
  src/app/(public)/layout.tsx → src/core/hooks/useAppDataReady.ts
- `useNavItems()` --calls--> `useContentBlock()`  [EXTRACTED]
  src/core/hooks/useNavItems.ts → src/core/hooks/useContentBlock.ts
- `NavMenu()` --calls--> `useNavItems()`  [EXTRACTED]
  src/core/components/navbar/navMenu.tsx → src/core/hooks/useNavItems.ts
- `ResponsiveMenu()` --calls--> `useNavItems()`  [EXTRACTED]
  src/core/components/navbar/menuResponsive.tsx → src/core/hooks/useNavItems.ts
- `useAppDataReady()` --calls--> `useHeroContent()`  [EXTRACTED]
  src/core/hooks/useAppDataReady.ts → src/modules/profile/hooks/useHeroContent.ts

## Communities (106 total, 33 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.13
Nodes (16): AdminContent(), ProjectContentEditor(), MediaBlock(), MediaBlockProps, ProjectCardProps, Grid(), TextBlock(), TextBlockProps (+8 more)

### Community 1 - "Community 1"
Cohesion: 0.14
Nodes (13): AdminCertificates(), CertificateFormModal(), Props, TagInput(), TagInputProps, CertificateWidget(), CertificateWidgetProps, LightboxModal() (+5 more)

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (38): Animaciones, 🏗️ Arquitectura, Arquitectura General, code:typescript (import React from 'react';), code:javascript (// src/config/firebase.js), code:typescript (// src/components/utils/cardAnimations.ts), 🎯 Componentes, /components (+30 more)

### Community 3 - "Community 3"
Cohesion: 0.08
Nodes (24): devDependencies, autoprefixer, eslint, @eslint/js, eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals (+16 more)

### Community 4 - "Community 4"
Cohesion: 0.05
Nodes (35): 1. Sistema CRUD de Proyectos, 2. Editor de Contenido por Proyecto, 3. Panel Admin Responsivo, Acceder al editor, Agregar bloques, Características técnicas, `cards` (proyectos unificados), code:sql (INSERT INTO public.admin_emails (email) VALUES ('tu@email.co) (+27 more)

### Community 5 - "Community 5"
Cohesion: 0.09
Nodes (24): AdminDashboard(), AdminLayout(), NAV, MagneticBtn(), MagneticBtnProps, CONTACT_INFO, Footer(), useAdminAuth() (+16 more)

### Community 6 - "Community 6"
Cohesion: 0.06
Nodes (32): code:block1 (src/), code:typescript (// utils/cardAnimations.ts), code:typescript (export const isValidEmail = (email: string): boolean => {), code:typescript (export interface HeroContent {), code:typescript (import type { CardRow, InfoSectionRow } from './supabase';), code:typescript (import React, { useEffect, useMemo, useState } from "react";), code:typescript (import React, { useEffect, useRef } from 'react';), code:typescript (import React from 'react';) (+24 more)

### Community 7 - "Community 7"
Cohesion: 0.08
Nodes (31): code:block1 (supabase/), code:`sql (-- Ejemplo: Agregar contenido de prueba para el proyecto "E-), code:`sql (-- Portfolio Supabase: schema + RLS), code:`markdown (# Supabase setup), code:block13 ((Sustituye por el email con el que te registraste.) Sin este), code:` ({), code:` (v2.106.0), code:`sql (-- Storage bucket and RLS for portfolio-assets) (+23 more)

### Community 8 - "Community 8"
Cohesion: 0.08
Nodes (14): GlitchProps, LoadingScreen(), PublicLayout(), projectIds, projectMetaFallback, DEFAULT_NAV_ITEMS, EXCLUDED_NAV_ITEMS, filterNavItems() (+6 more)

### Community 9 - "Community 9"
Cohesion: 0.08
Nodes (26): code:block1 (src/), code:typescript (/**), code:css (/* Estilos para el texto con efecto glitch */), code:typescript ('use client';), code:typescript (import React, { useEffect, useRef } from 'react'; // Importa), code:typescript (/**), code:typescript (import React, { useState, useEffect } from 'react';), code:typescript (import React from 'react';) (+18 more)

### Community 10 - "Community 10"
Cohesion: 0.04
Nodes (44): 🙏 Agradecimientos, Animaciones, 👤 Autor, 🎯 Características Principales, code:block1 (src/), code:bash (git clone [URL_DEL_REPOSITORIO]), code:bash (pnpm install), code:bash (pnpm dev) (+36 more)

### Community 11 - "Community 11"
Cohesion: 0.09
Nodes (21): 1. Ejecutar la migración SQL, 2. Cómo usar el editor de contenido, 3. Ver el contenido en la página pública, 4. Flujo de datos, 5. Fallback, 6. Verificar que funciona, 7. Troubleshooting, 8. Estructura de la base de datos (+13 more)

### Community 12 - "Community 12"
Cohesion: 0.11
Nodes (17): 1. Propósito de la página, 2.1 Stack, 2.2 Estructura de carpetas (src), 2.3 Flujo de datos y rutas, 2.4 Patrones usados, 2. Arquitectura, 3.1 Rutas y navegación, 3.2 Consistencia de nombres y tipos (+9 more)

### Community 13 - "Community 13"
Cohesion: 0.14
Nodes (13): COLOR_CONFIG, LightboxModalProps, COLOR_CONFIG, KnowledgeTimelineItem(), KnowledgeTimelineItemProps, COLOR_CONFIG, FALLBACK_KNOWLEDGES, FALLBACK_SKILLS (+5 more)

### Community 14 - "Community 14"
Cohesion: 0.14
Nodes (12): About (informationContent), code:tsx (<SkillSection />), Datos internos, Dependencias, ExpAndTecnologies, Mejoras sugeridas, Props, Propósito (+4 more)

### Community 15 - "Community 15"
Cohesion: 0.15
Nodes (11): code:tsx (<ContactForm />), Dependencias, Envío, Estructura del archivo, Form (ContactForm), Mejoras sugeridas, Props, Propósito (+3 more)

### Community 16 - "Community 16"
Cohesion: 0.15
Nodes (10): cardAnimations.ts, handleMouseMove, infoHandler.ts, isValidEmail, Propósito, resetCardPosition, showInfo(button, info), Ubicación (+2 more)

### Community 17 - "Community 17"
Cohesion: 0.17
Nodes (10): Animations, Dependencias, Glitch, Mejoras sugeridas, Propósito, StarsBackground, Ubicación, Uso (+2 more)

### Community 18 - "Community 18"
Cohesion: 0.17
Nodes (10): code:tsx (<Footer />), Configuración, Dependencias, Estructura, Footer, Mejoras sugeridas, Props, Propósito (+2 more)

### Community 19 - "Community 19"
Cohesion: 0.17
Nodes (10): code:tsx (<NavMenu />), Dependencias, Mejoras sugeridas, menuResponsive, Navbar, NavMenu, Props, Propósito (+2 more)

### Community 20 - "Community 20"
Cohesion: 0.08
Nodes (25): AdminProjects(), ProjectFormModal(), ProjectFormModalProps, ContactForm(), FormData, FormField, SOCIAL_ITEMS, SOCIAL_LINKS (+17 more)

### Community 21 - "Community 21"
Cohesion: 0.18
Nodes (9): Card, CardDetails (proyectPage), Cards (Grid, Card, CardDetails), Dependencias, Grid, Mejoras sugeridas, Propósito, Ubicación (+1 more)

### Community 22 - "Community 22"
Cohesion: 0.18
Nodes (9): CircleProfile, code:tsx (<CircleProfile), Comportamiento, Dependencias, Mejoras sugeridas, Props, Propósito, Ubicación (+1 more)

### Community 23 - "Community 23"
Cohesion: 0.18
Nodes (9): code:tsx (<Input), Dependencias, Estilos, Input (inpput.jsx), Mejoras sugeridas, Props, Propósito, Ubicación (+1 more)

### Community 24 - "Community 24"
Cohesion: 0.18
Nodes (9): code:tsx (<MagneticBtn iconName="link" subtitle="Ver más" />), Comportamiento, Dependencias, MagneticBtn, Mejoras sugeridas, Props, Propósito, Ubicación (+1 more)

### Community 25 - "Community 25"
Cohesion: 0.18
Nodes (9): code:bash (export PONYTAIL_DEFAULT_MODE=ultra), code:json ({ "defaultMode": "lite" }), Configure Default Mode, Deactivate, Levels, More, Ponytail Help, Skills (+1 more)

### Community 26 - "Community 26"
Cohesion: 0.20
Nodes (8): Componentes en demos/, config/project.ts, Demos, Dependencias, Mejoras sugeridas, Propósito, Ubicación, Uso

### Community 27 - "Community 27"
Cohesion: 0.22
Nodes (9): code:typescript (/**), code:typescript (// NotFoundPage.tsx), code:typescript (/**), code:typescript (import { supabase } from '../../shared/services/supabase/sup), code:javascript (import { defineConfig } from 'vite';), File: src/core/components/NotFoundPage.tsx, File: src/core/hooks/useContentBlock.ts, File: src/core/utils/testSupabaseConnection.ts (+1 more)

### Community 28 - "Community 28"
Cohesion: 0.18
Nodes (11): code:`typescript (import React, { useRef } from "react";), code:`typescript (import React, { useState, useEffect } from 'react';), code:`typescript (import React, { useState, useCallback } from 'react';), code:`typescript (import React, { useRef, useEffect } from "react";), code:`typescript (import React, { useState, useEffect } from 'react';), File: src/modules/projects/admin/AdminContentEditor.tsx, File: src/modules/projects/admin/AdminProjectsCRUD.tsx, File: src/modules/projects/admin/ProjectFormModal.tsx (+3 more)

### Community 29 - "Community 29"
Cohesion: 0.20
Nodes (8): Boundaries, Intensity, Output, Persistence, Ponytail, Rules, The ladder, When NOT to be lazy

### Community 30 - "Community 30"
Cohesion: 0.20
Nodes (8): Boundaries, Intensity, Output, Persistence, Ponytail, Rules, The ladder, When NOT to be lazy

### Community 31 - "Community 31"
Cohesion: 0.25
Nodes (7): code:block1 (src/), Directory Structure, File Format, File Summary, Notes, Purpose, Usage Guidelines

### Community 32 - "Community 32"
Cohesion: 0.25
Nodes (7): code:block1 (src/), Directory Structure, File Format, File Summary, Notes, Purpose, Usage Guidelines

### Community 33 - "Community 33"
Cohesion: 0.43
Nodes (6): public.admin_emails, public.cards, public.contact_submissions, public.content_blocks, public.hero_content, public.projects_meta

### Community 34 - "Community 34"
Cohesion: 0.53
Nodes (4): Boundaries, Hunt, Output, Tags

### Community 35 - "Community 35"
Cohesion: 0.53
Nodes (4): Boundaries, Examples, Format, Scoring

### Community 36 - "Community 36"
Cohesion: 0.29
Nodes (5): hosting, cleanUrls, ignore, public, rewrites

### Community 37 - "Community 37"
Cohesion: 0.60
Nodes (3): Boundaries, Output, Scan

### Community 40 - "Community 40"
Cohesion: 0.06
Nodes (36): AdminInfoSections(), COLOR_OPTIONS, ColorOption, EditableSection, EditableSectionItem, SectionType, addSectionBtn, itemInput (+28 more)

### Community 45 - "Community 45"
Cohesion: 0.06
Nodes (36): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+28 more)

### Community 46 - "Community 46"
Cohesion: 0.12
Nodes (16): dependencies, dompurify, gsap, @gsap/react, mermaid, next, react, react-dom (+8 more)

### Community 47 - "Community 47"
Cohesion: 0.17
Nodes (11): name, overrides, postcss, sharp, private, type, version, name (+3 more)

### Community 48 - "Community 48"
Cohesion: 0.22
Nodes (9): code:typescript (/**), code:block2 (node_modules), code:typescript (import React from 'react';), code:typescript (import React, { useState, useEffect } from 'react';), File: .dockerignore, File: src/core/components/admin/AdminDashboard.tsx, File: src/core/components/admin/AdminLayout.tsx, File: src/core/components/navbar/navMenu.tsx (+1 more)

### Community 49 - "Community 49"
Cohesion: 0.22
Nodes (9): code:javascript (/** @type {import('tailwindcss').Config} */), code:typescript (import React from 'react';), code:typescript (// Importaciones necesarias), code:typescript (import React from 'react';), code:json ({), File: package.json, File: src/core/components/footer/Footer.tsx, File: src/core/components/PublicLayout.tsx (+1 more)

### Community 50 - "Community 50"
Cohesion: 0.36
Nodes (8): code:dockerfile (# Stage 1: Build), code:typescript (import React, { useState, useEffect, useRef } from 'react';), code:typescript (import React from 'react';), File: Dockerfile, File: src/core/components/LoadingScreen.tsx, File: src/core/components/navbar/menuResponsive.tsx, File: src/core/hooks/useNavItems.ts, Files

### Community 51 - "Community 51"
Cohesion: 0.29
Nodes (7): code:typescript (import React, { useEffect, useRef } from "react";), code:ini (server {), code:css (@media (max-width: 460px) {), File: nginx.conf, File: src/core/components/navbar/navMenu.css, File: src/core/components/StarsBackground.tsx, File: tailwind.config.js

### Community 52 - "Community 52"
Cohesion: 0.29
Nodes (7): code:typescript (import React, { useState } from 'react';), code:typescript (/**), code:typescript (import GA4 from 'react-ga4';), code:html (<!doctype html>), File: index.html, File: src/core/hooks/useAppDataReady.ts, File: src/core/utils/analytics.ts

### Community 53 - "Community 53"
Cohesion: 0.29
Nodes (7): scripts, build, dev, lint, preview, start, test

### Community 55 - "Community 55"
Cohesion: 0.53
Nodes (4): name, organization_id, organization_slug, ref

### Community 57 - "Community 57"
Cohesion: 0.40
Nodes (4): config, createJestConfig, config, createJestConfig

### Community 59 - "Community 59"
Cohesion: 0.50
Nodes (3): nextConfig, __dirname, nextConfig

### Community 62 - "Community 62"
Cohesion: 0.09
Nodes (22): devDependencies, autoprefixer, eslint, @eslint/js, eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals (+14 more)

### Community 68 - "Community 68"
Cohesion: 0.43
Nodes (7): SectionEditor(), AppDataReadyStatus, useAppDataReady(), useContentBlock(), useKnowledgeSections(), useSkillSections(), useProjectsMeta()

### Community 69 - "Community 69"
Cohesion: 0.15
Nodes (8): AdminMessages(), EMPTY_BLOCKS, ProjectContentBlock, CertificateRow, ContactSubmissionRow, ContentBlockRow, HeroContent, ProjectContentRow

### Community 71 - "Community 71"
Cohesion: 0.15
Nodes (13): dependencies, gsap, @gsap/react, mermaid, next, react, react-dom, react-markdown (+5 more)

### Community 95 - "Community 95"
Cohesion: 0.13
Nodes (8): AdminHero(), CircleProfileProps, CircleProfileSize, ExpAndTecnologies(), SkillSection(), useHeroContent(), Home(), Home()

### Community 96 - "Community 96"
Cohesion: 0.24
Nodes (11): fetchCards(), fetchCertificates(), DEFAULT_HERO, fetchHero(), fetchProjectsMeta(), ProjectMeta, isSupabaseConfigured, supabase (+3 more)

### Community 97 - "Community 97"
Cohesion: 0.33
Nodes (6): scripts, build, dev, lint, start, test

### Community 98 - "Community 98"
Cohesion: 0.40
Nodes (5): overrides, brace-expansion, glob, postcss, sharp

### Community 99 - "Community 99"
Cohesion: 0.40
Nodes (3): CardData, cards, CardRow

## Knowledge Gaps
- **503 isolated node(s):** `public`, `ignore`, `cleanUrls`, `__dirname`, `nextConfig` (+498 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **33 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `supabase` connect `Community 96` to `Community 0`, `Community 1`, `Community 99`, `Community 5`, `Community 69`, `Community 40`, `Community 13`, `Community 20`, `Community 95`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **Why does `useHeroContent()` connect `Community 95` to `Community 96`, `Community 68`?**
  _High betweenness centrality (0.002) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Community 71` to `Community 47`?**
  _High betweenness centrality (0.002) - this node is a cross-community bridge._
- **What connects `public`, `ignore`, `cleanUrls` to the rest of the system?**
  _503 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.12615384615384614 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._