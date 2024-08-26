export const addTailwindClassesToContent = (html) => {
  if (!html) return '';

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const headers = doc.querySelectorAll(
    'h1, h2, h3, h4, h5, h6, p, ul, ol, li, a',
  );

  headers.forEach((el) => {
    switch (el.tagName.toLowerCase()) {
      case 'h1':
        el.className = 'text-4xl font-bold mt-4';
        break;
      case 'h2':
        el.className = 'text-3xl font-semibold mt-4';
        break;
      case 'h3':
        el.className = 'text-2xl font-semibold mt-4';
        break;
      case 'h4':
        el.className = 'text-xl font-semibold mt-4';
        break;
      case 'h5':
        el.className = 'text-lg font-medium mt-4';
        break;
      case 'h6':
        el.className = 'text-base font-medium mt-4';
        break;
      case 'p':
        el.className = 'mt-2 mb-4 text-base leading-relaxed';
        break;
      case 'ul':
        el.className = 'list-disc list-inside mt-2 mb-4';
        break;
      case 'ol':
        el.className = 'list-decimal list-inside mt-2 mb-4';
        break;
      case 'li':
        if (el.getAttribute('data-list') === 'bullet') {
          el.className = 'list-disc list-inside ml-4';
        } else {
          el.className = 'ml-4';
        }
        break;
      case 'a':
        el.className = 'text-blue-600 hover:underline';
        break;
      default:
        break;
    }
  });

  return doc.body.innerHTML;
};
