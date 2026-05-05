$ErrorActionPreference = "Stop"
$root = Resolve-Path "$PSScriptRoot/.."
$base = "https://www.figma.com/api/mcp/asset/"

$icons = @(
    # Why Choose Us (6)
    @{ url = "24cf07eb-e7e6-44a8-848f-31d50067eca1"; path = "icons/why/star-square.svg" }
    @{ url = "34cf4633-57c9-4b61-ae81-d24da2156b5b"; path = "icons/why/support.svg" }
    @{ url = "3d801c83-bbd6-4378-af02-2fc653d378ac"; path = "icons/why/face-happy.svg" }
    @{ url = "12505a72-f693-4715-94fe-48cacb6db11c"; path = "icons/why/reorder.svg" }
    @{ url = "c42989f6-5d1b-42cc-b8db-c6c0236828a0"; path = "icons/why/safety.svg" }
    @{ url = "91f68a6e-6568-48c9-8328-1e4402b405b6"; path = "icons/why/reward-stars.svg" }

    # Order Process (4 icons + bg)
    @{ url = "5cfcce90-ac24-41ed-b040-c7f666208539"; path = "order-process-bg-new.png" }
    @{ url = "e1140e84-52e8-4501-b758-d7dd256fb4aa"; path = "icons/order/shopping-cart.svg" }
    @{ url = "6d5b4f3b-58d2-4a7f-93f8-a2b5ae94e599"; path = "icons/order/checklist.svg" }
    @{ url = "ea1c24e1-5181-497b-b750-5b3be578b061"; path = "icons/order/secure-payment.svg" }
    @{ url = "ae67ece8-45e6-451b-b22f-8ad72d9edbf7"; path = "icons/order/steps.svg" }

    # Reviews
    @{ url = "f829bca9-f7e5-4282-818e-d44b1b6e8786"; path = "icons/reviews/star.svg" }
    @{ url = "93b954cf-7aab-4f63-af33-316c70fae0fc"; path = "icons/reviews/stars-5.svg" }
    @{ url = "bc8264d1-58c7-4c19-8fcc-5a67295bcc11"; path = "icons/reviews/arrow-up-duotone.svg" }
    @{ url = "db401265-4431-4010-b3e5-a58dc0bfdf8b"; path = "icons/reviews/arrow-outlined.svg" }
    @{ url = "eb01a610-ff0b-4ca2-9529-c258dc06ea2d"; path = "icons/reviews/tap.svg" }
    @{ url = "cb519ccc-b27e-43ae-ba7e-11f45f22b1c4"; path = "icons/reviews/avatar-default.png" }

    # Services Config — trust badges
    @{ url = "d0e7607f-4eb8-442a-aea8-82eddeca6e16"; path = "icons/services/lock.svg" }
    @{ url = "485ce963-f945-48d1-9d16-02cd777473b0"; path = "icons/services/vpn.svg" }
    @{ url = "eec4f2e2-488b-4fc5-a7a2-dbe2f6e79c0e"; path = "icons/services/safe-lock.svg" }
    @{ url = "44fa9a1d-b498-41f3-a36e-95afadad5f94"; path = "icons/services/support.svg" }
    @{ url = "29a4d47e-f555-47fa-b98c-4695ea7163d1"; path = "icons/services/refund.svg" }
    @{ url = "caf77a8f-e742-4144-80c3-4ef9609e362d"; path = "icons/services/cash.svg" }

    # Services Config — category tabs
    @{ url = "e48c346b-beae-4067-a81d-c21dc595e6b9"; path = "icons/services/safety-outlined.svg" }
    @{ url = "4854fc87-39f5-4396-b195-ed9ebdef1cd0"; path = "icons/services/rocket.svg" }
    @{ url = "abc9b68e-8794-417d-ad31-918986f74855"; path = "icons/services/crown.svg" }
    @{ url = "3d6b35b3-757c-45d7-8538-30cb3e0461fb"; path = "icons/services/order-light.svg" }

    # Services Config — platform pills
    @{ url = "51293cf9-2f62-4cf9-aebc-6b133d6090d0"; path = "icons/services/windows.svg" }
    @{ url = "d4adaf1c-b017-4e04-acc2-25ca80022394"; path = "icons/services/xbox.svg" }
    @{ url = "6668bb8c-d589-4f92-aff4-f069f2a4d63f"; path = "icons/services/playstation.svg" }
    @{ url = "63a1858b-d58e-43df-babb-8d8797f8bd3d"; path = "icons/services/nintendo.svg" }
    @{ url = "6500b23a-7b3c-4657-a70b-fd6ac7163454"; path = "icons/services/pc-active-dot.svg" }

    # Services Config — UI icons
    @{ url = "46113b12-c572-4374-b4da-a6fd93a3791e"; path = "icons/services/arrow-up.svg" }
    @{ url = "3773567e-a5ed-4e74-a4f6-ceb1ab6960dd"; path = "icons/services/info.svg" }
    @{ url = "4050ead3-d010-4a82-b47b-1ce5f83311f6"; path = "icons/services/info-2.svg" }
    @{ url = "2931925d-0fbe-4507-a939-dab820e3d6d8"; path = "icons/services/info-3.svg" }
    @{ url = "59c21573-ef07-44f9-8a0f-d374ce9aa99d"; path = "icons/services/check.svg" }
    @{ url = "e085e694-6876-4e92-a5c3-ddfdb35c720b"; path = "icons/services/switch-on.svg" }
    @{ url = "58682ea8-effe-4c58-b503-2fc9ad290847"; path = "icons/services/switch-off.svg" }
    @{ url = "9cb17d3b-ab6b-42d2-83a7-df253aaebe09"; path = "icons/services/delete.svg" }
    @{ url = "05ff6641-3e94-46fe-8297-0b06edb0f48f"; path = "icons/services/slider-plus.svg" }
    @{ url = "c9a8b949-64fd-41d1-b069-9da4d21be91b"; path = "icons/services/tap.svg" }
    @{ url = "cc769041-53be-445e-985a-6137e2b7b52e"; path = "icons/services/secured.svg" }

    # Services Config — checkout payment cards (small, displayed inline next to "Secured and trusted checkout with")
    @{ url = "1f6d811b-981a-4de4-9968-b66464e5e868"; path = "icons/services/pay-visa.svg" }
    @{ url = "eecc8900-29e3-4089-b393-841591e5a93e"; path = "icons/services/pay-mastercard.svg" }
    @{ url = "1986b132-d60c-4e8d-9a3f-ed510c72453c"; path = "icons/services/pay-paypal.svg" }
    @{ url = "de1ef82c-cb20-4742-b0c3-82c0bf38c37a"; path = "icons/services/pay-applepay.svg" }
    @{ url = "2a6dd6d3-4a41-480b-bf84-1b1cee0eb42d"; path = "icons/services/pay-gpay.svg" }
    @{ url = "0eae1e82-3d6f-4b09-b866-3b9b935a5f9a"; path = "icons/services/pay-crypto.svg" }
    @{ url = "9c50b0a5-bc93-4d7e-8ec6-fbd54ae2803d"; path = "icons/services/pay-venmo.svg" }
    @{ url = "a5c15433-27d2-4f59-82f4-932002c88ba3"; path = "icons/services/pay-zelle.svg" }
)

$downloaded = 0
$failed = 0
$skippedFiles = @()

foreach ($icon in $icons) {
    $url = $base + $icon.url
    $outPath = Join-Path $root "public/images/$($icon.path)"
    $outDir = Split-Path $outPath -Parent
    if (-not (Test-Path $outDir)) {
        New-Item -ItemType Directory -Path $outDir -Force | Out-Null
    }

    try {
        Invoke-WebRequest -Uri $url -OutFile $outPath -UseBasicParsing -TimeoutSec 30
        # Verify content for .svg files
        if ($outPath.EndsWith('.svg')) {
            $bytes = Get-Content $outPath -Encoding Byte -TotalCount 8
            $hex = ($bytes | ForEach-Object { $_.ToString('X2') }) -join ' '
            if (-not ($hex.StartsWith("3C 73 76 67") -or $hex.StartsWith("3C 3F 78 6D"))) {
                Write-Host "WARN (not SVG): $($icon.path) starts with $hex" -ForegroundColor Yellow
                $skippedFiles += $icon.path
            }
        }
        Write-Host "OK: $($icon.path)" -ForegroundColor Green
        $downloaded++
    } catch {
        Write-Host "FAIL: $($icon.path) - $($_.Exception.Message)" -ForegroundColor Red
        $failed++
    }
}

Write-Host ""
Write-Host "Downloaded: $downloaded, Failed: $failed" -ForegroundColor Cyan
if ($skippedFiles.Count -gt 0) {
    Write-Host "Files with unexpected content:" -ForegroundColor Yellow
    $skippedFiles | ForEach-Object { Write-Host "  $_" }
}
