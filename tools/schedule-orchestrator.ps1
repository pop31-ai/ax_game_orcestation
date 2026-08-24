# LimeDrive Orchestra Scheduler (ASCII-only for PowerShell 5.1)
# Registers/removes daily background AI run driven by NEXT-SESSION.md brief.

param(
  [string]$Time = "10:00",
  [string]$Model = "opencode/x-preview-f-free",
  [switch]$Remove
)

$taskName = 'LimeDrive Orchestra'
$workdir = 'C:\Users\e\Documents\Projects'
$prompt = 'Read C:\Users\e\Documents\Projects\ax_game_orcestation\NEXT-SESSION.md and continue the work according to the plan. Work in phases: one phase per run. After each phase: update PLAN/LOG/STATUS, commit and push both repositories. Respond in Russian.'

if ($Remove) {
  Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue
  Write-Host '[-] Task removed'
  exit 0
}

$argStr = 'run -m ' + $Model + ' "' + $prompt + '"'
$action = New-ScheduledTaskAction -Execute 'opencode' -Argument $argStr -WorkingDirectory $workdir
$trigger = New-ScheduledTaskTrigger -Daily -At $Time
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -ExecutionTimeLimit (New-TimeSpan -Hours 2)

Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Force | Out-Null
Write-Host '[+] Task registered daily at' $Time
Write-Host '[+] Manual run now:' $argStr
Write-Host '[+] Remove: .\schedule-orchestrator.ps1 -Remove'
