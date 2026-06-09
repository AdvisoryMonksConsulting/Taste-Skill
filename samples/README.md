# Veska website sample deck

Concept deck: 10 sample website directions across sectors (cover + 10 pages, A4 landscape).

- Source: `veska-website-samples.html` (self-contained, no external assets)
- Output: `veska-website-samples.pdf`

Regenerate:
```bash
/opt/pw-browsers/chromium-1194/chrome-linux/chrome --headless --no-sandbox --no-pdf-header-footer \
  --print-to-pdf=samples/veska-website-samples.pdf "file://$PWD/samples/veska-website-samples.html"
```
