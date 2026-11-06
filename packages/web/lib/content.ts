import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type ContentLocale = 'fr' | 'en';

export interface ContentPage {
  slug: string;
  locale: ContentLocale;
  title: string;
  description: string;
  body: string;
}

const DESCRIPTION_MAX = 160;

const contentDir = (locale: ContentLocale): string =>
  path.join(process.cwd(), 'content', locale);

export const listContentSlugs = (locale: ContentLocale): string[] =>
  fs
    .readdirSync(contentDir(locale))
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.slice(0, -'.mdx'.length))
    .sort();

/**
 * Retire le balisage d'une ligne de Markdown pour n'en garder que le texte.
 * Les images disparaissent entièrement — leur texte alternatif ne décrit pas
 * la page — tandis que les liens ne laissent que leur libellé.
 */
const plainText = (line: string): string =>
  line
    .replace(/^>+\s*/, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/[*_`]/g, '')
    .replace(/\\(.)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

const isProse = (line: string): boolean =>
  line !== '' && !line.startsWith('#') && !/^([-*+|]|\d+\.)\s/.test(line);

const truncate = (text: string): string => {
  if (text.length <= DESCRIPTION_MAX) {
    return text;
  }

  const cut = text.slice(0, DESCRIPTION_MAX - 1);
  const lastSpace = cut.lastIndexOf(' ');

  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
};

/**
 * Faute de description dans l'entête, on tire la première phrase du corps.
 * C'est un filet, pas une fatalité : une page dont le texte d'ouverture se
 * prête mal au résumé gagne à déclarer sa propre `description`.
 */
const firstSentence = (body: string): string => {
  const prose = body
    .split('\n')
    .map((line) => plainText(line.trim()))
    .find(isProse);

  return prose ? truncate(prose) : '';
};

export const readContentPage = (
  locale: ContentLocale,
  slug: string,
): ContentPage | null => {
  const dir = contentDir(locale);
  const filePath = path.join(dir, `${slug}.mdx`);

  // Le slug vient de l'URL : il ne doit jamais désigner un fichier hors du
  // dossier de contenu de la langue demandée.
  if (path.dirname(path.resolve(filePath)) !== path.resolve(dir)) {
    return null;
  }

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const { content, data } = matter(fs.readFileSync(filePath, 'utf-8'));

  return {
    slug,
    locale,
    title: typeof data.title === 'string' ? data.title : '',
    description:
      typeof data.description === 'string'
        ? data.description
        : firstSentence(content),
    body: content,
  };
};
