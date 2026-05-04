$ErrorActionPreference = "Stop"
$dir = "c:\Users\Bernardyoe\Documents\Website Osis"
$files = Get-ChildItem -Path $dir -Filter "*.html" | Where-Object { $_.Name -ne "index.html" }

$navSearch = @"
            <a href="contactus.html" class="btn-contact">Contact Us</a>
        </div>
    </nav>
"@

$navReplace = @"
            <a href="contactus.html" class="btn-contact">Contact Us</a>
            <button class="hamburger" id="hamburger" aria-label="Toggle menu">
                <span></span><span></span><span></span>
            </button>
        </div>
    </nav>

    <!-- Mobile Overlay -->
    <div class="mobile-overlay" id="mobileOverlay"></div>

    <!-- Mobile Navigation Drawer -->
    <nav class="mobile-nav" id="mobileNav">
        <a href="index.html" class="mobile-nav-link">Homepage</a>
        <a href="aboutus.html" class="mobile-nav-link">About Us</a>
        <a href="anggota.html" class="mobile-nav-link">Anggota</a>
        <a href="komunitas.html" class="mobile-nav-link" onclick="toggleMobileDropdown(event, 'komunitas-dd')">Komunitas <i class="fa-solid fa-chevron-down"></i></a>
        <div class="mobile-dropdown" id="komunitas-dd">
            <a href="komunitas-animation.html">Animation Community</a>
            <a href="komunitas-revival.html">Community of Revival</a>
            <a href="komunitas-podcast.html">Podcast Community</a>
            <a href="komunitas-pmr.html">PMR Community</a>
            <a href="komunitas-theatre.html">Theatre Community</a>
            <a href="komunitas-photography.html">Photography Community</a>
            <a href="komunitas-emagazine.html">E-Magazine Community</a>
            <a href="komunitas-cooking.html">Cooking Community</a>
            <a href="komunitas-mural.html">Mural Community</a>
            <a href="komunitas-dance.html">Dance Community</a>
            <a href="komunitas-paskibra.html">Paskibra Community</a>
            <a href="komunitas-music.html">Music Community</a>
            <a href="komunitas-tech.html">Tech Community</a>
        </div>
        <a href="acara.html" class="mobile-nav-link" onclick="toggleMobileDropdown(event, 'acara-dd')">Acara <i class="fa-solid fa-chevron-down"></i></a>
        <div class="mobile-dropdown" id="acara-dd">
            <a href="acara-paskah.html">Acara Paskah</a>
            <a href="acara-jawa-social-quest.html">JAWA's Social Quest</a>
        </div>
        <a href="contactus.html" class="mobile-contact-btn"><i class="fa-solid fa-envelope"></i> Contact Us</a>
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
