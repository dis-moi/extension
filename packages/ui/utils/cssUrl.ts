/**
 * Construit une valeur `url()` CSS à partir d'une URL quelconque.
 *
 * Les guillemets ne sont pas une coquetterie. Une URL nue s'arrête au premier
 * caractère que la grammaire CSS n'accepte pas dans un jeton `url(` — une
 * parenthèse, une apostrophe, une espace. Le bundler inline les petits SVG
 * sous forme de `data:` sans encoder ces caractères, si bien qu'un simple
 * `transform='translate(…)'` dans le fichier source suffit à casser la
 * déclaration. Et le navigateur ne se contente pas d'ignorer la règle fautive :
 * il arrête d'analyser la feuille de style, et tout ce qui suit est perdu.
 */
const cssUrl = (url: string): string => `url("${url.replace(/"/g, '%22')}")`;

export default cssUrl;
