$ErrorActionPreference = "Stop"
$dir = "c:\Users\Bernardyoe\Documents\Website Osis"
$files = Get-ChildItem -Path $dir -Filter "*.html"

$newAddress = "Jl. Green Ville Blok D, RT./RW:/RW.07/05, Duri Kepa, Kec. Kb. Jeruk, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11510, Indonesia"
$newPhone = "08111346152"
$newEmail = "bernard_yoe@tomang.ipeka.sch.id"

foreach ($file in $files) {
    Write-Host "Processing $($file.Name)..."
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $contentUpdated = $false

    # Address Replacement
    $addrPattern = 'Jl\.\s*Macan\s*No\.21,\s*Jakarta\s*Barat'
    $newContent = [System.Text.RegularExpressions.Regex]::Replace($content, $addrPattern, $newAddress)
    if ($content -ne $newContent) {
        $content = $newContent
        $contentUpdated = $true
    }
    
    # Phone Replacement
    $phonePattern = '\+62\s*812\s*3456\s*7890'
    $newContent = [System.Text.RegularExpressions.Regex]::Replace($content, $phonePattern, $newPhone)
    if ($content -ne $newContent) {
        $content = $newContent
        $contentUpdated = $true
    }
    
    # Email Replacement (just in case there are multiline splits)
    $emailPattern = 'osis@smakipto\.sch\.id'
    $newContent = [System.Text.RegularExpressions.Regex]::Replace($content, $emailPattern, $newEmail)
    if ($content -ne $newContent) {
        $content = $newContent
        $contentUpdated = $true
    }

    if ($contentUpdated) {
        [System.IO.File]::WriteAllText($file.FullName, $content)
        Write-Host "Updated $($file.Name)"
    }
}
Write-Host "Done!"
