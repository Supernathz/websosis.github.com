$ErrorActionPreference = "Stop"
$dir = "c:\Users\Bernardyoe\Documents\Website Osis"
$files = Get-ChildItem -Path $dir -Filter "*" | Where-Object { $_.Name -ne "index" }

$navSearch = @"
            <a href="contactus" class="btn-contact">Contact Us</a>
        </div>
    </nav>
"@

$navReplace = @"
            <a href="contactus" class="btn-contact">Contact Us</a>
            <button class="hamburger" id="hamburger" aria-label="Toggle menu">
                <span></span><span></span><span></span>
            </button>
        </div>
    </nav>

    <!-- Mobile Overlay -->
    <div class="mobile-overlay" id="mobileOverlay"></div>

    <!-- Mobile Navigation Drawer -->
    <nav class="mobile-nav" id="mobileNav">
        <a href="index" class="mobile-nav-link">Homepage</a>
        <a href="aboutus" class="mobile-nav-link">About Us</a>
        <a href="anggota" class="mobile-nav-link">Anggota</a>
        <a href="komunitas" class="mobile-nav-link" onclick="toggleMobileDropdown(event, 'komunitas-dd')">Komunitas <i class="fa-solid fa-chevron-down"></i></a>
        <div class="mobile-dropdown" id="komunitas-dd">
            <a href="komunitas-animation">Animation Community</a>
            <a href="komunitas-revival">Community of Revival</a>
            <a href="komunitas-podcast">Podcast Community</a>
            <a href="komunitas-pmr">PMR Community</a>
            <a href="komunitas-theatre">Theatre Community</a>
            <a href="komunitas-photography">Photography Community</a>
            <a href="komunitas-emagazine">E-Magazine Community</a>
            <a href="komunitas-cooking">Cooking Community</a>
            <a href="komunitas-mural">Mural Community</a>
            <a href="komunitas-dance">Dance Community</a>
            <a href="komunitas-paskibra">Paskibra Community</a>
            <a href="komunitas-music">Music Community</a>
            <a href="komunitas-tech">Tech Community</a>
        </div>
        <a href="acara" class="mobile-nav-link" onclick="toggleMobileDropdown(event, 'acara-dd')">Acara <i class="fa-solid fa-chevron-down"></i></a>
        <div class="mobile-dropdown" id="acara-dd">
            <a href="acara-paskah">Acara Paskah</a>
            <a href="acara-jawa-social-quest">JAWA's Social Quest</a>
        </div>
        <a href="contactus" class="mobile-contact-btn"><i class="fa-solid fa-envelope"></i> Contact Us</a>
    </nav>
"@

$footerSearch = @"
    </footer>
</body>
"@

$footerReplace = @"
    </footer>

    <script src="mobile-nav.js"></script>
</body>
"@

foreach ($file in $files) {
    Write-Host "Processing $($file.Name)..."
    $content = [System.IO.File]::ReadAllText($file.FullName)
    
    $contentUpdated = $false
    
    if ($content.Contains($navSearch)) {
        $content = $content.Replace($navSearch, $navReplace)
        $contentUpdated = $true
    }
    
    if ($content.Contains($footerSearch)) {
        $content = $content.Replace($footerSearch, $footerReplace)
        $contentUpdated = $true
    }
    
    if ($contentUpdated) {
        [System.IO.File]::WriteAllText($file.FullName, $content)
        Write-Host "Updated $($file.Name)"
    } else {
        Write-Host "No changes needed for $($file.Name) or pattern not found"
    }
}
Write-Host "Done!"
