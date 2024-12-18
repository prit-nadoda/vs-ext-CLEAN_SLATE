
export function removeJavaScriptComments(text: string): string {
  text = removeSingleLineComments(text);
  text = removeMultiLineComments(text);
  return text;
}

export function removeSingleLineComments(text: string): string {
  const singleLineComment = /^\s*\/\/.*$/gm;
  text = text.replace(singleLineComment, '');
  text = text.replace(/^\s*\n/gm, '\n'); 
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
