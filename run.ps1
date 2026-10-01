$ErrorActionPreference="Stop"
Start-Process powershell.exe -ArgumentList '-NoExit','-Command',"Set-Location '$PSScriptRoot\backend'; npm run start:dev"
Start-Sleep -Seconds 3
Start-Process powershell.exe -ArgumentList '-NoExit','-Command',"Set-Location '$PSScriptRoot\frontend'; npm run dev"
Write-Host "Expense Splitter -> http://localhost:5173"
