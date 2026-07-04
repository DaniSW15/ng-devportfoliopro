# Guía de Git - Conceptos Fundamentales

## ¿Qué es Git?

Git es un **sistema de control de versiones**. Imagina que es como una máquina del tiempo para tu código:
- Guarda **snapshots** (fotos) de tu proyecto en diferentes momentos
- Te permite volver atrás si algo sale mal
- Permite que múltiples personas trabajen en el mismo proyecto sin pisarse

---

## Conceptos Clave

### 1. **Repository (Repositorio)**
Es tu carpeta del proyecto completa con histórico de cambios. Tiene dos partes:

- **Local**: Tu máquina (en la carpeta `.git` oculta)
- **Remote**: Servidor (como GitHub)

```
Tu Computadora                    GitHub
┌─────────────────────┐          ┌──────────────────┐
│ ng-devportfoliopro  │  ────→   │ DaniSW15/...     │
│ (repositorio local) │  ←────   │ (repositorio     │
└─────────────────────┘          │  remoto)         │
                                 └──────────────────┘
```

### 2. **Staging Area (Área de Espera)**
Es una zona intermedia entre tu carpeta y el historial.

**Analogía:** Es como un carrito de compras:
- Editas archivos en tu carpeta (sacas cosas del estante)
- Los agregas al **staging** (los pones en el carrito)
- Haces **commit** (pagas y confirmas la compra)

```
Archivos Modificados  →  Staging Area  →  Commit (Historial)
       ↓                      ↓                   ↓
❌ No están guardados   ⏳ Listos para       ✅ Guardados
                        guardar              permanentemente
```

### 3. **Commit**
Es un "punto de guardado" con:
- Un **mensaje** descriptivo
- La **fecha y autor**
- Un **hash** único (como un ID)
- Los cambios exactos

```
git commit -m "Add login page component"

Esto crea:
Commit 3d04bea
Author: Daniel CG <daniel.cg15.tab@gmail.com>
Date: Fri Jul 3 19:08:23 2026
Message: "Add login page component"
```

### 4. **Branch (Rama)**
Es una línea independiente de desarrollo. Por defecto existe `main`.

**Analogía:** Es como tener copias paralelas del proyecto:

```
main branch (la "rama principal")
    │
    ├─ Commit A
    │
    ├─ Commit B
    │  
    └─ Commit C ← HEAD apunta aquí (último cambio)
```

Para trabajar sin romper algo en `main`, creas una rama:

```
main        feature-auth
  │             │
  A─────┬───B   │
        │   │   │
        ├───C   D ← trabajas aquí sin afectar main
        │       │
        ├───────E
        │       │
        F───────┴─ Se fusionan (merge)
```

---

## Flujo de Trabajo Básico

### Paso 1: Ver qué cambió
```bash
git status
```
Te muestra:
- Archivos **modificados** (rojo)
- Archivos en **staging** (verde)

### Paso 2: Agregar cambios al staging
```bash
# Un archivo específico
git add src/app/features/auth/login.component.ts

# Todos los cambios
git add .

# Interactivamente (elige qué agregar)
git add -p
```

### Paso 3: Guardar con commit
```bash
git commit -m "descripción clara de qué cambió"
```

**Buenas prácticas para mensajes:**
- ✅ `feat: add login page component`
- ✅ `fix: correct email validation regex`
- ✅ `docs: update readme with setup instructions`
- ❌ `changes` (muy vago)
- ❌ `asdf` (sin sentido)

### Paso 4: Enviar a GitHub
```bash
git push origin main
```

Esto sube tu rama `main` local al servidor GitHub.

---

## Situaciones Comunes

### Problema: "Cometí un error en mi commit"

**Opción 1: Cambiar el mensaje (solo el último commit)**
```bash
git commit --amend -m "nuevo mensaje"
```

**Opción 2: Agregar cambios olvidados (sin nuevo commit)**
```bash
# Edita el archivo
git add archivo-olvidado.ts
git commit --amend --no-edit
```

**Opción 3: Volver atrás (deshacer commits)**
```bash
# Ver últimos commits
git log --oneline

# Volver atrás 1 commit pero GUARDAR cambios
git reset --soft HEAD~1

# Volver atrás 1 commit y DESCARTAR cambios
git reset --hard HEAD~1
```

### Problema: "Agregué un archivo secreto a Git"

Esto pasó en tu proyecto con los tokens en `.env`:

1. **El archivo tenía secretos**
2. **Lo committeaste** (se guardó en el historial)
3. **Lo pushteaste** (se subió a GitHub)
4. **GitHub lo detectó** (bloqueó el push)

**Solución:**
```bash
# 1. Edita el archivo para quitar secretos
nano .env

# 2. Agrega a .gitignore para que no vuelva a ocurrir
echo ".env" >> .gitignore

# 3. Enmienda el commit anterior
git add .env .gitignore
git commit --amend --no-edit

# 4. Fuerza el push (reescribe el historial remoto)
git push origin main --force
```

**IMPORTANTE: Los tokens expuestos SIEMPRE deben revocarse en la plataforma (GitHub)**

---

## Las Tres Zonas de Git

```
┌──────────────────────────────────────────┐
│        Tu Carpeta del Proyecto           │
│    (working directory)                   │
│  ← Editas archivos aquí                  │
└────────┬─────────────────────────────────┘
         │ git add
         ↓
┌──────────────────────────────────────────┐
│        Staging Area (Index)              │
│    ← Esperas a hacer commit              │
└────────┬─────────────────────────────────┘
         │ git commit
         ↓
┌──────────────────────────────────────────┐
│   Local Repository (.git folder)         │
│    ← Historial permanente en tu PC       │
└────────┬─────────────────────────────────┘
         │ git push
         ↓
┌──────────────────────────────────────────┐
│      Remote Repository (GitHub)          │
│    ← Visible para otros, sincronizado    │
└──────────────────────────────────────────┘
```

---

## Comandos Esenciales

### Inspeccionar
```bash
git status           # Ver estado actual
git log              # Ver historial de commits
git log --oneline    # Versión compacta del historial
git diff             # Ver cambios sin stagear
git diff --staged    # Ver cambios ya stageados
```

### Trabajar con cambios
```bash
git add .            # Stagear todos los cambios
git commit -m "msg"  # Commitear
git push             # Enviar a GitHub
git pull             # Descargar cambios del servidor
```

### Ramas
```bash
git branch           # Ver ramas locales
git branch feature   # Crear nueva rama
git checkout feature # Cambiar de rama
git switch feature   # Alternativa más nueva
git merge feature    # Fusionar rama en la actual
git branch -D feature # Eliminar rama
```

### Deshacer cosas
```bash
git restore archivo.ts       # Descartar cambios en un archivo
git restore --staged archivo # Quitar del staging
git reset HEAD~1             # Deshacer último commit (guardar cambios)
git reset --hard HEAD~1      # Deshacer y perder cambios
```

---

## Flujo Profesional (Recomendado)

Para este proyecto, sigue este patrón:

```bash
# 1. Crear rama para nueva feature
git checkout -b feat/auth-guard

# 2. Editar archivos
# ... escribes código ...

# 3. Verificar cambios
git status
git diff

# 4. Stagear y commitear
git add .
git commit -m "feat: implement token validation in auth guard"

# 5. Enviar a GitHub
git push origin feat/auth-guard

# 6. (En GitHub) Abrir Pull Request (PR)
# 7. Esperar revisión y aprobar
# 8. Mergear a main desde GitHub

# 9. Bajarte los cambios localmente
git checkout main
git pull origin main
```

---

## .gitignore - Lo que NO quieres guardar

Archivo que le dice a Git qué NO trackear:

```
# Archivos de ambiente (SECRETOS)
.env
.env.local
.env.*.local

# Dependencias (pesan mucho)
node_modules/
/dist

# Logs
*.log
npm-debug.log*

# IDE
.vscode/
.idea/
*.swp

# Sistema
.DS_Store
Thumbs.db
```

---

## Resumen: Lo que pasó en tu proyecto

### Escenario:
1. ✅ Creaste archivos `.env` y `.env.example` con tokens de GitHub
2. ❌ Los committeaste sin pensar
3. ❌ Los pusheaste a GitHub
4. 🔴 GitHub bloqueó el push (detectó secretos)

### Solución aplicada:
```bash
# 1. Identificamos los archivos con secretos
git show 3ee2dc1  # Vimos qué tenía

# 2. Los limpiamos (borramos tokens, pusimos placeholders)
nano .env
nano .env.example

# 3. Los agregamos a .gitignore
echo ".env" >> .gitignore

# 4. Enmendamos el commit (lo borramos del historial)
git commit --amend --no-edit

# 5. Forzamos el push para reescribir el historial remoto
git push origin main --force
```

### Lección:
**Siempre agrega `.gitignore` ANTES de trabajar con secretos.**

---

## Próximos pasos

1. **Revoca los tokens expuestos** en GitHub
2. **Usa variables de ambiente** para secretos:
   ```typescript
   // NUNCA hagas esto:
   const API_KEY = "sk_live_51234567890";
   
   // Haz esto:
   const API_KEY = process.env['API_KEY'];
   ```
3. **Crea nuevos tokens** si necesitas autenticación
4. **Guárdalos en `.env`** (que está en `.gitignore`)

---

## Recursos Adicionales

- [Git Book oficial](https://git-scm.com/book/es/v2)
- [Visualizador de Git](https://git-school.github.io/visualizing-git/)
- [GitHub Docs](https://docs.github.com/es)

---

**¿Preguntas?** Los conceptos de Git son la base de todo desarrollo profesional. ¡Practica hasta que se sienta natural!
