import Script from "next/script";

const themeScript = `
(function() {
  try {
    var d = document.documentElement;
    var t = localStorage.getItem('theme');
    if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      d.classList.add('dark');
    } else {
      d.classList.remove('dark');
    }
  } catch (e) {}
})();
`;

export default function ThemeScript() {
  return (
    <Script id="hasi-theme" strategy="beforeInteractive">
      {themeScript}
    </Script>
  );
}
