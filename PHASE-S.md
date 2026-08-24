# Фаза S — фоновый запуск оркестрации (будильник для ИИ)

## Как это работает
ИИ не умеет звонить сам: работа идёт только внутри сессии, когда приходит сообщение.
Но запуск сессии можно автоматизировать снаружи:

## Вариант 1 — CLI + планировщик Windows (рекомендуется)
1. Установить CLI (однократно):
   ```powershell
   npm i -g opencode-ai
   opencode --version
   ```
2. Проверить неинтерактивный режим:
   ```powershell
   opencode run "прочитай C:\Users\e\Documents\Projects\ax_game_orcestation\NEXT-SESSION.md и продолжи работу"
   ```
3. Задача планировщика (например, каждый день в 10:00):
   ```powershell
   $action  = New-ScheduledTaskAction -Execute "opencode" -Argument 'run "продолжи по NEXT-SESSION (рабочая папка C:\Users\e\Documents\Projects)"' -WorkingDirectory "C:\Users\e\Documents\Projects"
   $trigger = New-ScheduledTaskTrigger -Daily -At 10:00
   Register-ScheduledTask -TaskName "LimeDrive Orchestra" -Action $action -Trigger $trigger
   ```
4. Результаты каждого прогона — коммиты в оба репо + записи в LOG.md.
   Утром смотришь `STATUS.md` и последний коммит.

## Вариант 2 — opencode serve (если поддерживается версией)
`opencode serve` поднимает HTTP-API → скрипт дёргает /session с промптом по cron.
Проверить: `opencode serve --help`.

## Ограничения
- Прогон должен сам коммитить и пушить (правила уже в NEXT-SESSION.md).
- Долгие фазы лучше дробить: один прогон = одна фаза (см. PLAN-*.md).
