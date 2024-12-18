
export function removeJavaScriptComments(text: string): string {
  text = text.replace(/\/\/.*$/gm, '');
  text = text.replace(/\/\*[\s\S]*?\*\//gm, '');
  text = text.replace(/^\s*\n/gm, '\n'); 
  return text;
}

export function removeInlineSingleLineComments(text: string): string {
  const inlineComment = /\/\/.*$/g;
  text = text.replace(inlineComment, '');
  return text;
}

export function removeMultiLineComments(text: string): string {
  const multiLineComment = /\/\*[\s\S]*?\*\//gm;
  text = text.replace(multiLineComment, '');
  text = text.replace(/^\s*\n/gm, '\n'); 
  return text;
}

export function removePythonComments(text: string): string {
  const singleLineComment = /^\s*#.*$/gm;
  text = text.replace(singleLineComment, '');
  text = text.replace(/^\s*\n/gm, '\n'); 
  return text;
}

export function removeJavaComments(text: string): string {
  return removeJavaScriptComments(text);
}
export function removeCSharpComments(text: string): string {
  return removeJavaScriptComments(text);
}