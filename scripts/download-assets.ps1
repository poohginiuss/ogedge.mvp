$ErrorActionPreference = "Stop"

$base = "https://www.figma.com/api/mcp/asset"
$root = "$PSScriptRoot/.."

$assets = @(
    # Backgrounds
    @{ id = "df7f6f5e-56a3-4597-be97-10b81affa134"; out = "public/images/hero-valorant-bg.png" },
    @{ id = "6e93931c-e2c7-41b5-9402-147c2c779b55"; out = "public/images/order-process-bg.png" },

    # Logos
    @{ id = "1d21aad6-7a10-400c-9d5c-dc1a57f00c50"; out = "public/images/logos/logo-white.png" },
    @{ id = "424c45eb-41d9-4c0e-9231-78da9e9db741"; out = "public/images/logos/logo-red.png" },

    # Characters / Game art
    @{ id = "0a3fe886-d9f1-41a5-81da-5992783bd91a"; out = "public/images/characters/reviewer.png" },
    @{ id = "0d6d6c24-3794-4de1-8e39-dfdd12a138d2"; out = "public/images/characters/reyna.png" },
    @{ id = "0ef1927b-b091-4a09-bb17-11b5c3a34437"; out = "public/images/characters/patch-notes-vip.png" },
    @{ id = "d2322940-59d3-42dd-a732-2221821c4445"; out = "public/images/characters/valorant-tournament.png" },
    @{ id = "b3bbc901-94fb-4f9c-a1a1-d41e1b2c568a"; out = "public/images/characters/weekly-event.png" },

    # Valorant Ranks
    @{ id = "fc7c6ba9-1423-4771-bb1d-50533214ed55"; out = "public/images/ranks/iron.png" },
    @{ id = "06ca2439-e1ca-4e24-9496-0398a5f5648c"; out = "public/images/ranks/bronze.png" },
    @{ id = "17d31c8a-d011-4b12-9462-509a2fa795ad"; out = "public/images/ranks/silver.png" },
    @{ id = "83a49599-b9ad-4834-b0a9-f5a896f61179"; out = "public/images/ranks/gold.png" },
    @{ id = "65bf0b8e-af91-4a73-87e0-1e1ff6f3f14d"; out = "public/images/ranks/platinum.png" },
    @{ id = "44632dd0-a188-4ff3-8987-46db345c36b7"; out = "public/images/ranks/diamond.png" },
    @{ id = "0b21df32-3c36-4d34-a52d-38200f355e1f"; out = "public/images/ranks/ascendant.png" },
    @{ id = "644459f7-de78-441c-ba75-436aebc19145"; out = "public/images/ranks/immortal.png" },
    @{ id = "defdbcec-576a-4e6d-bf12-b0395e5e89cc"; out = "public/images/ranks/radiant.png" },

    # Payment icons
    @{ id = "bb64b211-1f57-4539-984f-c17011a38fe1"; out = "public/images/payments/paypal.png" },
    @{ id = "592d6d76-9b64-417d-805e-eff8cbd091fb"; out = "public/images/payments/mastercard.png" },
    @{ id = "3920761c-b96f-4e6b-af75-57fcaaa266b3"; out = "public/images/payments/visa.png" },
    @{ id = "1007feba-bc79-4bd5-aea7-87f3ebb03870"; out = "public/images/payments/applepay.png" },
    @{ id = "0086579d-f201-461c-8c13-3d2eb64d0292"; out = "public/images/payments/gpay.png" },
    @{ id = "1f43abb3-502a-40dc-8f16-6b3fd99bf637"; out = "public/images/payments/crypto.png" },
    @{ id = "f491b4d6-0e69-4476-aeed-fe0a03dba35d"; out = "public/images/payments/skrill.png" },
    @{ id = "19724a2c-7dda-4b83-9d56-ca94a174dc27"; out = "public/images/payments/venmo.png" },
    @{ id = "6400eb21-1678-46c8-9786-d9c6df2e38f3"; out = "public/images/payments/klarna.png" },
    @{ id = "d088e0af-0f8d-4848-b782-14ad149c89a8"; out = "public/images/payments/zelle.png" },
    @{ id = "cec30a98-d6f8-48c6-a52c-1c6653332c40"; out = "public/images/payments/wechatpay.png" },

    # Social icons
    @{ id = "2c6f99aa-b6e8-4f00-a7a7-7d9d8a212585"; out = "public/images/social/whatsapp.png" },
    @{ id = "a7bc5ac5-dc34-4918-910a-8a3fb010d2b4"; out = "public/images/social/skype.png" },
    @{ id = "f1cf7a7b-82c4-4f97-b3c5-b251df4cde12"; out = "public/images/social/discord.png" },
    @{ id = "aa92819d-15c5-4af4-a171-2b4f9b28a77b"; out = "public/images/social/instagram.png" },
    @{ id = "1da226f3-bb31-4e00-9551-b3acd44df4c7"; out = "public/images/social/twitter.png" },
    @{ id = "5a0379ee-917d-43bb-8234-c8a5f1bc12bc"; out = "public/images/social/facebook.png" },

    # US Flag (header language switcher)
    @{ id = "0c3b922e-278e-4c00-aa6a-68eefef5090f"; out = "public/images/icons/flag-us.png" }
)

$total = $assets.Count
$count = 0
$failed = @()

foreach ($a in $assets) {
    $count++
    $url = "$base/$($a.id)"
    $outPath = Join-Path $root $a.out
    Write-Host "[$count/$total] $($a.out)"
    try {
        Invoke-WebRequest -Uri $url -OutFile $outPath -UseBasicParsing
    } catch {
        Write-Host "  FAILED: $_" -ForegroundColor Red
        $failed += $a.out
    }
}

Write-Host ""
Write-Host "Done. Downloaded: $($total - $failed.Count) / $total" -ForegroundColor Green
if ($failed.Count -gt 0) {
    Write-Host "Failed downloads:" -ForegroundColor Red
    $failed | ForEach-Object { Write-Host "  - $_" }
}
