$htmlFiles = Get-ChildItem -Path '.' -Filter '*.html'
foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Check if scroll-reveal is already included
    if ($content -notmatch 'scroll-reveal\.js') {
        # Try to insert after mobile-nav.js
        if ($content -match '<script src="mobile-nav\.js"></script>') {
            $content = $content -replace '<script src="mobile-nav\.js"></script>', "<script src=`"mobile-nav.js`"></script>`n    <script src=`"scroll-reveal.js`"></script>"
            Set-Content -Path $file.FullName -Value $content -NoNewline
            Write-Host "Injected into $($file.Name)"
        } elseif ($content -match '</body>') {
            # Fallback: insert before </body>
            $content = $content -replace '</body>', "    <script src=`"scroll-reveal.js`"></script>`n</body>"
            Set-Content -Path $file.FullName -Value $content -NoNewline
            Write-Host "Injected before body in $($file.Name)"
        }
    } else {
        Write-Host "Already exists in $($file.Name)"
    }
}
