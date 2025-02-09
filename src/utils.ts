function preserveUrls(text: string): [string, Map<string, string>] {
    const urlPattern = /(https?:\/\/[^\s\n]+|file:\/\/[^\s\n]+)/g;
    const urlMap = new Map<string, string>();
    let counter = 0;
    
    return [text.replace(urlPattern, (match) => {
        const placeholder = `__URL_PLACEHOLDER_${counter}__`;
        urlMap.set(placeholder, match);
        counter++;
        return placeholder;
    }), urlMap];
}

function restorePreservedContent(text: string, contentMap: Map<string, string>): string {
    let result = text;
    for (const [placeholder, content] of contentMap) {
        result = result.replace(placeholder, content);
    }
    return result;
}

export function removeJavaScriptComments(text: string): string {
    // Preserve content that shouldn't be modified
    const [textWithPlaceholders, urlMap] = preserveUrls(text);
    
    // Handle string literals to avoid removing comment-like patterns inside them
    const stringPattern = /(["'`])((?:\\.|[^\\])*?)\1/g;
    const stringMap = new Map<string, string>();
    let counter = 0;
    
    const textWithoutStrings = textWithPlaceholders.replace(stringPattern, (match) => {
        const placeholder = `__STRING_PLACEHOLDER_${counter}__`;
        stringMap.set(placeholder, match);
        counter++;
        return placeholder;
    });

    // Remove comments from the remaining text
    let result = textWithoutStrings
        // Remove single-line comments (both with and without leading whitespace)
        .replace(/^\s*\/\/.*$/gm, '')
        .replace(/([^:]|^)\/\/.*$/gm, '$1')
        // Remove multi-line comments (both with and without leading whitespace)
        .replace(/^\s*\/\*[\s\S]*?\*\//gm, '')
        .replace(/\/\*[\s\S]*?\*\//g, '');

    // Restore preserved content
    result = restorePreservedContent(result, stringMap);
    result = restorePreservedContent(result, urlMap);
    
    // Clean up empty lines but preserve indentation
    result = result
        .replace(/\n\s*\n\s*\n/g, '\n\n')  // Convert multiple blank lines to double blank lines
        .replace(/^\s*\n/gm, '\n')          // Remove leading empty lines
        .replace(/\n\s*$/g, '\n');          // Remove trailing empty lines
    
    return result.trim();
}

export function removeInlineSingleLineComments(text: string): string {
    const inlineComment = /\/\/.*$/gm;
    text = text.replace(inlineComment, '');
    return text.trim();
}

export function removeMultiLineComments(text: string): string {
  const multiLineComment = /\/\*[\s\S]*?\*\//gm;
  text = text.replace(multiLineComment, '');
  text = text.replace(/^\s*\n/gm, '\n'); 
  return text;
}

export function removePythonComments(text: string): string {
    const [textWithPlaceholders, urlMap] = preserveUrls(text);
    
    // Handle string literals
    const stringPattern = /(["']{1,3})((?:\\.|[^\\])*?)\1/g;
    const stringMap = new Map<string, string>();
    let counter = 0;
    
    const textWithoutStrings = textWithPlaceholders.replace(stringPattern, (match) => {
        const placeholder = `__STRING_PLACEHOLDER_${counter}__`;
        stringMap.set(placeholder, match);
        counter++;
        return placeholder;
    });

    // Remove comments
    let result = textWithoutStrings
        .replace(/#.*$/gm, ''); // Changed from /^\s*#.*$/gm

    // Restore preserved content
    result = restorePreservedContent(result, stringMap);
    result = restorePreservedContent(result, urlMap);
    
    // Clean up empty lines but preserve indentation
    result = result
        .replace(/^\s*\n\s*\n\s*$/gm, '\n')
        .replace(/\n\s*\n\s*\n/g, '\n\n');
    
    return result.trim();
}

export function removeJavaComments(text: string): string {
  return removeJavaScriptComments(text);
}
export function removeCSharpComments(text: string): string {
  return removeJavaScriptComments(text);
}

export function removeJSXComments(text: string): string {
    // Preserve URLs and strings first
    const [textWithPlaceholders, urlMap] = preserveUrls(text);
    
    const stringPattern = /(["'`])((?:\\.|[^\\])*?)\1/g;
    const stringMap = new Map<string, string>();
    let counter = 0;
    
    const textWithoutStrings = textWithPlaceholders.replace(stringPattern, (match) => {
        const placeholder = `__STRING_PLACEHOLDER_${counter}__`;
        stringMap.set(placeholder, match);
        counter++;
        return placeholder;
    });

    // Remove comments
    let result = textWithoutStrings
        .replace(/\{\/\*[\s\S]*?\*\/\}/gm, '') // JSX comments
        .replace(/\/\/.*$/gm, '')  // Changed from /\/\/[^\n]*$/gm to /\/\/.*$/gm
        .replace(/\/\*[\s\S]*?\*\//gm, ''); // Multi-line comments

    // Restore preserved content
    result = restorePreservedContent(result, stringMap);
    result = restorePreservedContent(result, urlMap);
    
    // Clean up empty lines but preserve indentation
    result = result
        .replace(/^\s*\n\s*\n\s*$/gm, '\n') // Multiple empty lines to single
        .replace(/^[ \t]*\/\/.*$/gm, '') // Remove any remaining single-line comments with indentation
        .replace(/\n\s*\n\s*\n/g, '\n\n'); // Normalize multiple newlines
    
    return result.trim();
}