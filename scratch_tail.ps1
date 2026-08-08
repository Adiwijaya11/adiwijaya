$log = 'C:\Users\madee\.gemini\antigravity-ide\brain\9babe580-4779-412a-a6f4-c89272326b1b\.system_generated\logs\transcript.jsonl'
$lines = Get-Content $log | Select-Object -Last 8
foreach ($line in $lines) {
  try { $j = $line | ConvertFrom-Json } catch { continue }
  if ($j.type -eq 'USER_INPUT') { Write-Output ('USER: ' + $j.content) }
  elseif ($j.tool_calls -and $j.tool_calls.Count -gt 0) { Write-Output ('TOOL: ' + $j.tool_calls[0].name) }
  elseif ($j.content) { Write-Output ('MSG: ' + ($j.content.Substring(0, [Math]::Min(120, $j.content.Length)))) }
}
