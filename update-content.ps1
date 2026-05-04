$ErrorActionPreference = "Stop"
$dir = "c:\Users\Bernardyoe\Documents\Website Osis"
$files = Get-ChildItem -Path $dir -Filter "*.html"

# Global Footer replacements
$oldAddress = "Jl. Macan No.21, Jakarta Barat"
$newAddress = "Jl. Green Ville Blok D, RT./RW:/RW.07/05, Duri Kepa, Kec. Kb. Jeruk, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11510, Indonesia"

$oldPhone = "+62 812 3456 7890"
$newPhone = "08111346152"

$oldEmail = "osis@smakipto.sch.id"
$newEmail = "bernard_yoe@tomang.ipeka.sch.id"

# Process all files
foreach ($file in $files) {
    Write-Host "Processing $($file.Name)..."
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $contentUpdated = $false

    if ($content.Contains($oldAddress)) {
        $content = $content.Replace($oldAddress, $newAddress)
        $contentUpdated = $true
    }
    
    if ($content.Contains($oldPhone)) {
        $content = $content.Replace($oldPhone, $newPhone)
        $contentUpdated = $true
    }
    
    if ($content.Contains($oldEmail)) {
        $content = $content.Replace($oldEmail, $newEmail)
        $contentUpdated = $true
    }
    
    # Special rules for contactus.html
    if ($file.Name -eq "contactus.html") {
        # Contact Emails
        $oldContactEmail = "bernard_yoe@tomang.ipeka.sch.id<br>info.osis@smakipto.sch.id</p>"
        $newContactEmail = "justin_phang@tomang.ipeka.sch.id (Stuco President)<br>bernard_yoe@tomang.ipeka.sch.id (Website AdmIn)</p>"
        if ($content.Contains($oldContactEmail)) {
            $content = $content.Replace($oldContactEmail, $newContactEmail)
            $contentUpdated = $true
        }
        
        # Contact Phone
        $oldContactPhone = "08111346152 (Humas OSIS)<br>+62 898 7654 3210 (Info Acara)</p>"
        $newContactPhone = "08111346152</p>"
        if ($content.Contains($oldContactPhone)) {
            $content = $content.Replace($oldContactPhone, $newContactPhone)
            $contentUpdated = $true
        }
        
        # Contact Address
        $oldContactAddress = "Jl. Macan No.21, Kedoya Utara,<br>Jakarta Barat 11520</p>"
        $newContactAddress = "$newAddress</p>"
        if ($content.Contains($oldContactAddress)) {
            $content = $content.Replace($oldContactAddress, $newContactAddress)
            $contentUpdated = $true
        }
    }
    
    # Special rules for anggota.html
    if ($file.Name -eq "anggota.html") {
        $regexPattern = '(<p class="member-desc"[^>]*>)[^<]*(</p>)'
        $newContent = [System.Text.RegularExpressions.Regex]::Replace($content, $regexPattern, '${1}PLACEHOLDER${2}')
        if ($content -ne $newContent) {
            $content = $newContent
            $contentUpdated = $true
        }
    }

    if ($contentUpdated) {
        [System.IO.File]::WriteAllText($file.FullName, $content)
        Write-Host "Updated $($file.Name)"
    }
}
Write-Host "Done!"
