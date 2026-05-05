$ErrorActionPreference = "Stop"
$root = Resolve-Path "$PSScriptRoot/.."
$imagesDir = Join-Path $root "public/images"

$renamed = 0
$skipped = 0

Get-ChildItem -Path $imagesDir -File -Recurse | ForEach-Object {
    $bytes = Get-Content $_.FullName -Encoding Byte -TotalCount 8 -ErrorAction SilentlyContinue
    if (-not $bytes) { return }
    $hex = ($bytes | ForEach-Object { $_.ToString('X2') }) -join ' '

    $isSvg = $hex.StartsWith("3C 73 76 67") -or $hex.StartsWith("3C 3F 78 6D")
    $isPng = $hex.StartsWith("89 50 4E 47")
    $isJpg = $hex.StartsWith("FF D8 FF")

    $current = $_.Extension.ToLower()
    $expected = if ($isSvg) { ".svg" } elseif ($isPng) { ".png" } elseif ($isJpg) { ".jpg" } else { $null }

    if ($expected -and $current -ne $expected) {
        $newName = [System.IO.Path]::ChangeExtension($_.FullName, $expected)
        if (Test-Path $newName) {
            Write-Host "SKIP (target exists): $($_.Name) -> $([System.IO.Path]::GetFileName($newName))" -ForegroundColor Yellow
            $script:skipped++
        } else {
            Move-Item -LiteralPath $_.FullName -Destination $newName
            Write-Host "RENAMED: $($_.Name) -> $([System.IO.Path]::GetFileName($newName))" -ForegroundColor Green
            $script:renamed++
        }
    }
}

Write-Host ""
Write-Host "Renamed: $renamed, Skipped: $skipped" -ForegroundColor Cyan
