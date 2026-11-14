/** Site footer: copyright and a one-line hint about the rules. */
import { t } from '../../content/strings.js';

export default function Footer() {
  return (
    <footer
      id="how"
      className="flex flex-wrap justify-between gap-3 border-t border-forest-divider px-5 py-5 text-sm text-muted-dark sm:px-10"
    >
      <span>{t.site.copyright}</span>
      <span>{t.site.footerHint}</span>
    </footer>
  );
}
