# NEXT-SESSION — бриф подхвата

_Прочти меня вслух ИИ: «продолжи по NEXT-SESSION» — этого достаточно._

## Контекст (2 файла, 5 минут)
1. `STATUS.md` — прогресс всех фаз (авто).
2. `PLAN-2026-08-23.md` — текущий день: фазы R2…R8, N, A.

## Правила дома
- Репо продукта: `C:\Users\e\Documents\Projects\limedrive` (origin: pop31-ai/limedrive).
- Репо оркестрации: `C:\Users\e\Documents\Projects\ax_game_orcestation`.
- Паттерн работы: механика в `examples/player.html` → фикстура `_fixture-*.json` →
  тест `tests/mode-*.test.js` (puppeteer, клавиши down/up, НЕ press) →
  регресс `node tools/check-game.js --all` → коммит → пуш → фикстуру удалить.
- Дебаг состояния игры: `window.LimeDriveDebug()` в консоли страницы.
- PowerShell ломает `node -e` со кавычками/кириллицей — скрипты писать файлами.

## Порядок сегодня (приоритет)
1. **R2** Кислород+плавание (07): maxOxygen/oxygenDrain/swimForce/diveSpeed, HUD O₂
2. **R4** Гравиполя (13): gravityField low/high/flip + radius на pad'ах
3. **R3** Свет/тьма (06): lanternRadius-оверлей, phaseInWalls/visibleInLight
4. **R6** Капитал (11): цель capitalGoal, доход/штраф
5. **R5** Стелс (12): visionRange/Angle конусы, hackTime терминалы
6. **R7** Удалить 14-tower-defense.json (фейк) + почистить index/landing
7. **N** Нейроночка: tools/neuro-game-nn.js (MLP 15→16→7 на чистом JS)
8. **R8** Финал: PROMPT.md дополнить режимами rpg/diver/light/gravity/stealth/capital

## Внешние зависимости (нужен человек)
- **GitHub Pages**: `gh auth login` → я включаю Pages → PWA на телефоне готова.
  Альтернатива: Settings → Pages → branch main, root.
- **Фаза S** (идея): фон-запуск ИИ через API opencode — проверить возможности клиента.

## Сделано к этой сессии (не повторять)
День 1: 5 режимов движка (сокобан/TD/раннер/шутер/гонки) + QA-конвейер + доки.
День 2: R1 RPG-бой+ключи (тест 4/4), раннер-конкуренты (7/7), PWA-комплект
(manifest+sw+тач-кнопки+иконки+лендинг, коммит ce275c0/f0b55c1), статус-индикатор.
