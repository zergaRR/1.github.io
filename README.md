<p align="center">
  <img src="public/images/hero.jpg" alt="АПЕКС Академия — обучение команды" width="720" />
</p>

<h1 align="center">АПЕКС <span>Академия бизнеса</span></h1>
<p align="center">
  Внутренняя обучающая платформа команды сетевого маркетинга:<br/>
  пошаговые модули, видеоуроки, практика, квизы и командный рейтинг.
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql&logoColor=white" />
  <img alt="Drizzle ORM" src="https://img.shields.io/badge/Drizzle-ORM-c5f74f?logo=drizzle&logoColor=black" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white" />
  <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-d9a441" />
</p>

---

## Что это

Полнофункциональное веб-приложение для обучения и мотивации партнёрской команды МЛМ-компании.
Участники проходят программу от первого клиента до Президентского уровня: смотрят видео,
читают материалы, делают практику, сдают квизы — и растут в командном рейтинге.

### Возможности

| Раздел | Что внутри |
|---|---|
| **Лендинг** | Программа, методика, истории партнёров, FAQ — для рекрутинга и онбординга |
| **Мой путь** | Дашборд: продолжить обучение, прогресс по ступеням, активность за 7 дней, топ команды |
| **Курсы** | 6 ступеней от «Новичок» до «Лидер», фильтр по уровням, пошаговая дорожная карта модуля |
| **Уроки** | 4 типа материалов: видео (с перемоткой через HTTP Range), статьи с разметкой, инфографика, квизы с зачётом от 2/3 |
| **Геймификация** | XP за уроки и квизы, 8 рангов (Старт → Корона), 10 достижений, автоматические сертификаты за завершённые курсы |
| **Команда** | Пьедестал и полный рейтинг партнёров по XP, статистика структуры |
| **Новости** | Командная лента с рубриками и закреплением важного |
| **Админка** | Загрузка видео/инфографики с прогрессом, конструктор уроков (выбор из медиатеки или внешняя ссылка), публикация новостей, управление медиафайлами |
| **Доступ** | Роли: основатель (admin), наставник (mentor), партнёр (student); админка закрыта от студентов |

## Стек

- **Next.js 16** (App Router, Server Components, Server Actions) + **React 19**
- **PostgreSQL 16** + **Drizzle ORM** (`drizzle-kit push` для схемы)
- **Tailwind CSS 4** с фирменной темой «сосновый лес + золото»
- Сессии в БД + httpOnly cookie (`bcryptjs` для паролей)
- Медиатека: файлы на диске (`UPLOAD_DIR`), отдача через `/api/files/[segment]` со стримингом и Range

## Быстрый старт

Требования: **Node.js ≥ 20** (лучше 22), **npm**, **PostgreSQL ≥ 14** (или Docker).

```bash
# 1. Клонировать и установить зависимости
git clone <url-вашего-репозитория> apex-academy
cd apex-academy
npm ci

# 2. Настроить окружение
cp .env.example .env

# 3. Поднять PostgreSQL (один из вариантов):
docker compose up -d        # готовый контейнер из репозитория
#   …или используйте свой PostgreSQL и поправьте DATABASE_URL в .env

# 4. Применить схему и наполнить базу демо-данными
npm run db:push
npm run db:seed

# 5. Запустить
npm run dev                 # режим разработки → http://localhost:3000
# npm run build && npm start  # продакшен
```

### Демо-аккаунты

| Роль | Email | Пароль |
|---|---|---|
| Основатель (admin) | `admin@academy.pro` | `admin123` |
| Наставник (mentor) | `diana@academy.pro` | `mentor123` |
| Партнёр (student) | `student@academy.pro` | `student123` |

> Демо-аккаунты созданы сидом (`npm run db:seed`). Пароли храните в секрете и **смените их в продакшене**.

## Скрипты

| Команда | Назначение |
|---|---|
| `npm run dev` | Dev-сервер |
| `npm run build` / `npm start` | Продакшн-сборка и запуск |
| `npm run typecheck` | Проверка типов TypeScript |
| `npm run db:push` | Применить схему к БД (drizzle-kit) |
| `npm run db:seed` | Наполнить БД: 6 курсов, 23 урока, 18 вопросов квизов, новости, рейтинг |
| `npm run db:studio` | Drizzle Studio — визуальный просмотр БД |

## Структура

```
├── src/
│   ├── app/
│   │   ├── page.tsx              # лендинг
│   │   ├── login/                # вход и регистрация
│   │   ├── (app)/                # авторизованная зона (layout проверяет сессию)
│   │   │   ├── dashboard/        # «Мой путь»
│   │   │   ├── courses/          # каталог и карточка курса с пошаговым планом
│   │   │   ├── learn/[lessonId]/ # плеер урока: видео / статья / инфографика / квиз
│   │   │   ├── team/             # пьедестал и рейтинг команды
│   │   │   ├── news/             # командная лента
│   │   │   ├── profile/          # награды, сертификаты, лестница рангов
│   │   │   └── admin/            # медиатека, конструктор уроков, новости
│   │   └── api/                  # auth, upload, files/[segment], health
│   ├── components/               # Shell, CourseCard, ProgressRing, Avatar, Logo…
│   ├── db/                       # schema.ts (Drizzle), seed.ts (демо-данные)
│   └── lib/                      # auth (сессии), actions (server actions), ranks, achievements
├── public/images/                # сгенерированные обложки и hero
├── docker-compose.yml            # PostgreSQL 16 одной командой
├── drizzle.config.ts             # схема ← DATABASE_URL из .env
└── .github/workflows/ci.yml      # CI: typegen, tsc, build, drizzle-push, seed
```

## Медиатека и хранение файлов

Загруженные видео и изображения сохраняются в `UPLOAD_DIR` (по умолчанию `./data/uploads`,
каталог в `.gitignore`) и отдаются через `GET /api/files/<имя-файла>`:

- потоковая отдача + `Accept-Ranges` — перемотка видео работает;
- `Content-Length`, неизменяемый `Cache-Control`, защита от `..` в пути;
- удаление файла из админки удаляет и строку в `media`, и файл с диска.

Для продакшена с несколькими инстансами подключите S3-совместимое хранилище вместо локального диска.

## CI

GitHub Actions (`.github/workflows/ci.yml`) на каждый push/PR:
поднимает PostgreSQL 16 как service, применяет схему, запускает seed, вызывает `next typegen`,
`tsc --noEmit` и `npm run build`.

## Деплой

1. Любая площадка с Node.js ≥ 20 (VPS, Docker, Vercel + внешний Postgres).
2. `DATABASE_URL` и (опционально) `UPLOAD_DIR` — переменные окружения.
3. Персистентное хранилище для `UPLOAD_DIR` (volume/диск), иначе медиатека очистится при редеплое.
4. Команды: `npm ci && npm run build && npm start`.

Продакшн-чеклист: сменить демо-пароли (`admin123`…), выставить сильные значения, ограничить доступ к `.env`.

## Лицензия

[MIT](LICENSE) © 2026 АПЕКС Академия бизнеса.
