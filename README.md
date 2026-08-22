# ax_game_orchestration

Центр управления проектом [limedrive](https://github.com/pop31-ai/limedrive):
планирование, статус, цикл «генерация → проверка → ремонт» для игр на JSON-движке.

## Что здесь лежит

| Файл | Назначение |
|------|-----------|
| `PLAN.md` | Оркестрация работ: фазы, время, критерии приёмки, статус |
| `LOG.md` | Журнал выполнения (append-only) |
| `STATE.md` | Текущий срез: что готово, что блокировано |

## Цикл качества игры

```
PROMPT.md ──► ИИ генерирует JSON
                 │
                 ▼
        tools/validate.js        (схема: структура, цвета, типы)
                 │ FAIL
                 ▼
        ремонтный промпт ──► ИИ исправляет ──┐
                 ▲                           │
                 └───────────────────────────┘
                 │ PASS
                 ▼
        tools/check-game.js      (headless-плейтест в player.html:
                                 JS-ошибки, зависания, чёрный экран)
                 │ FAIL ──► ремонтный промпт ──► ИИ ...
                 ▼ PASS
              игра принята
```

## Быстрый старт (в репо limedrive)

```bash
cd limedrive
npm install
node tools/validate.js            # схема всех примеров
npm run check -- --all            # валидация + автоплейтест всех игр
node tools/check-game.js examples/01-lime-platformer.json   # одна игра
```

После прогона отчёты для «ремонта» ИИ появляются в `limedrive/reports/*.repair.md`.
