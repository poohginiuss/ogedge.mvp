# Downloads every asset referenced by the Figma Order View (node 1491:7440).
# Run from the project root. Files are placed under public/images/dashboard/orderview/.

$base = "public\images\dashboard\orderview"
$assets = @{
    # Hero / ranks / artwork
    "ranks\valorant-silver-2.png" = "https://www.figma.com/api/mcp/asset/b23db324-2327-4b7e-ab67-f14590e05a2c"
    "ranks\valorant-diamond-1.png" = "https://www.figma.com/api/mcp/asset/49ccefbd-4cd9-4bb8-aa20-7154ec6b3401"
    "games\valorant-hero.png" = "https://www.figma.com/api/mcp/asset/e44d88a9-0e26-4f48-b592-9d35e5f1fa05"
    "games\valorant-badge.png" = "https://www.figma.com/api/mcp/asset/5a15b763-ea9f-4b7e-b62b-01552815a315"

    # Chat avatars / dots
    "chat\user-avatar.png" = "https://www.figma.com/api/mcp/asset/aaa1e0f0-8155-42ff-beab-24ff61bc24ae"
    "chat\booster-avatar.png" = "https://www.figma.com/api/mcp/asset/724851a5-27a3-4331-8504-a2d3de9ec1dc"
    "chat\admin-dot.png" = "https://www.figma.com/api/mcp/asset/4b3ed818-758e-446f-af6c-55a5d43db04f"
    "chat\user-bubble-avatar.png" = "https://www.figma.com/api/mcp/asset/021d792a-a611-44a1-8acf-2b218fa7ecd1"
    "chat\booster-bubble-avatar.png" = "https://www.figma.com/api/mcp/asset/ed240776-ec5c-4f81-b6a5-5da304098214"

    # Hero ladder arrow (svg + bg container)
    "icons\ladder-arrow.svg" = "https://www.figma.com/api/mcp/asset/db9558fe-62ce-483d-99c1-c01894ff6472"
    "icons\ladder-arrow-bg.png" = "https://www.figma.com/api/mcp/asset/c97af9e7-b5d6-48f6-85ae-ff0d32f1ddc8"

    # Toolbar icons
    "icons\payment.svg" = "https://www.figma.com/api/mcp/asset/d8c40d31-3425-4059-a3c0-173b3d4bb6bc"
    "icons\support.svg" = "https://www.figma.com/api/mcp/asset/903710e5-29b3-4f23-ae08-243b4f9d6d21"
    "icons\review-star.svg" = "https://www.figma.com/api/mcp/asset/2f58075d-ecbd-40ab-84aa-42f80828a96f"

    # Panel header icons (order details / account details / description)
    # NOTE: order-details, account-details are SVG IconChip groups in figma — fetch as svg.
    "icons\order-details.svg" = "https://www.figma.com/api/mcp/asset/92f1a99c-f525-4f27-9385-2a492fd4d64f"
    "icons\account-details.svg" = "https://www.figma.com/api/mcp/asset/51946f35-ac4f-4244-9628-1c2ef80b3a1e"
    "icons\info-orange.svg" = "https://www.figma.com/api/mcp/asset/5ad8ab52-84b8-4316-a83b-9241467ae554"

    # Chat header glyphs
    "icons\bell.svg" = "https://www.figma.com/api/mcp/asset/7ab99622-f260-4da2-9be8-7350a2baca8c"
    "icons\profile-person.svg" = "https://www.figma.com/api/mcp/asset/ff8f03fb-23c1-46df-8f56-56c0034ed08e"
    "icons\report-flag.svg" = "https://www.figma.com/api/mcp/asset/e5c15a6f-ed6b-452f-94db-8a7071cc8344"
    "icons\copy.svg" = "https://www.figma.com/api/mcp/asset/9c35fe24-5364-4b57-bb65-ad4bd184705b"
    "icons\edit-eye.svg" = "https://www.figma.com/api/mcp/asset/d8c40d31-3425-4059-a3c0-173b3d4bb6bc"

    # Chat footer glyphs
    "icons\emoji.svg" = "https://www.figma.com/api/mcp/asset/d0ec0b1e-7053-4c34-8f03-ac4a08d0ff87"
    "icons\image-attach.svg" = "https://www.figma.com/api/mcp/asset/a61176f3-db9d-4b17-8990-32de49216bb9"
    "icons\send.svg" = "https://www.figma.com/api/mcp/asset/c8cb0f44-c327-4e4b-a02b-6d40d4e67471"

    # Booster rating star
    "icons\rating-star.svg" = "https://www.figma.com/api/mcp/asset/f68ef4cb-629e-4cd3-b6bd-af8cb57d9310"
    # Booster review dot icon
    "icons\review-dot.svg" = "https://www.figma.com/api/mcp/asset/c23e2bdf-ba99-4dc1-9b54-e07a5adf5cbe"
    # Booster online dot
    "icons\online-dot.svg" = "https://www.figma.com/api/mcp/asset/63e78f4f-5463-4d9e-bac0-db215b222550"
}

foreach ($entry in $assets.GetEnumerator()) {
    $dest = Join-Path $base $entry.Key
    $url = $entry.Value
    Write-Host "Downloading $($entry.Key)"
    try {
        curl.exe -s -L -o $dest $url
    }
    catch {
        Write-Host "FAILED: $($entry.Key) - $_"
    }
}
Write-Host "done."
