# Журнал

## 2026-08-22 18:00 — Старт оркестрации
- Создан центр управления (этот репо).
- Ревизия limedrive: локально на 1 коммит впереди origin, есть незакоммиченные правки player.html (шахматы).

## 2026-08-22 ~17:40 — Анализ сходства игр (Фаза 2, частично)
Инструмент: `limedrive/tools/analyze-games.js`.
Ключевые находки:
- 7 из 15 игр — клоны одного скелета платформера
  (01, 03, 06, 07, 11, 12, 13; сходство 56–87% по профилю сущностей):
  hero + platforms + pickups + enemies + hazards + boss + finish.
- Реально уникальные жанры: 02 space-invaders (шутер с формациями),
  04 puzzle-cubes (толкание блоков/рубильники), 05 race-lime (автофизика),
  08 tower-defense (волны/башни), 09 neon-runner (раннер), 10 chess-battle (ТБС).
- `15-dungeon-crawl` использует чужой словарь компонентов
  (Health/AIControl/Platformer вместо EnemyAI/Patrol) — выбивается из системы.
- Компоненты в JSON (`components:[...]`) — декоративны: player.html
  диспетчеризует только по `entity.type` и `properties.*`.

## 2026-08-22 ~17:50 — Первые фиксы (Фаза 0, частично)
- Снят BOM с `examples/player.html` и с валидатора цветовых правил:
  разрешены `#RRGGBBAA`, `rgba()`, `hsla()` (было ~150 ложных ошибок).
- В GAME_TYPES добавлен `endless-runner`.
- Обнаружен BOM в `examples/14-tower-defense.json` → JSON не парсится (фикс запланирован).
- Найдены битые данные: `02-space-invaders` entity[11] w/h=0,
  `09-neon-runner` entity[37] w/h=0 (фикс запланирован).
