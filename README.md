# KleanSlate - VS Code Extension

## Overview

**KleanSlate** is a powerful Visual Studio Code extension designed to automatically clean and remove comments from source code while maintaining the integrity of the code structure. It ensures that only comments are removed, leaving the rest of the code untouched, and prevents unwanted blank lines or formatting issues. With KleanSlate, developers can clean up their code in seconds and keep the workspace organized.

## Demo

![KleanSlate Demo](assets/demo.gif)

*Note: If you're viewing this on VS Code Marketplace and the GIF isn't visible, you can view the demo video [here](https://github.com/prit-nadoda/vs-ext-injectify/blob/main/assets/demo.mp4).*

## Features

- **Comment Removal**: Removes both single-line (`//`) and multi-line (`/* */`) comments from code.
- **Cross-Language Support**: Works with multiple programming languages, including JavaScript, TypeScript, Python, Java, and C#.
- **Preserve Code Structure**: Retains all the code structure while removing comments. Empty lines created by comment removal are consolidated into a single blank line to avoid unnecessary gaps.
- **Efficient**: The extension works seamlessly with large code files, offering quick performance.

## Supported Languages

### Programming Languages
- JavaScript
- TypeScript
- Python
- Java
- C#

### Frameworks & Extensions
- JSX (React)
- TSX (React with TypeScript)
- JavaScript React
- TypeScript React

## Installation

1. Open **Visual Studio Code**.
2. Navigate to the **Extensions** view by clicking on the Extensions icon in the Activity Bar on the side of the window.
3. Search for **KleanSlate**.
4. Click **Install** to install the extension.

Alternatively, you can install it via the command line:

```bash
code --install-extension KleanSlate
```

## Usage

### Clean Selected Text

1. **Select the text** you want to clean from the editor.
2. **Run the Command**: Press `Ctrl + Shift + P` (Windows/Linux) or `Cmd + Shift + P` (Mac) to open the Command Palette.
3. Type `KleanSlate: Clean Selection` and hit Enter.
4. The selected text will be cleaned of comments, and any resulting empty lines will be replaced with a single blank line.

### Clean Entire Document

1. **Select the entire document** or use the "Select All" feature (`Ctrl + A` / `Cmd + A`).
2. **Run the Command**: Press `Ctrl + Shift + P` (Windows/Linux) or `Cmd + Shift + P` (Mac) to open the Command Palette.
3. Type `KleanSlate: Clean Selection` and hit Enter.
4. The document will be cleaned of comments and formatted as described.

## How It Works

- **Comment Detection**: The extension uses regular expressions to detect single-line comments (e.g., `//`) and multi-line comments (e.g., `/* */`) in supported languages.
- **Comment Removal**: The comments are completely removed from the code, including inline comments and block comments.
- **Empty Line Handling**: After comment removal, the extension ensures there are no multiple consecutive empty lines. It consolidates them into a single blank line, preserving the structure of the code.

## Contributing

We welcome contributions to KleanSlate! If you have any ideas for new features, improvements, or bug fixes, feel free to:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Create a new Pull Request.

Please ensure that your code follows the existing style conventions and passes any relevant tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [VS Code API](https://code.visualstudio.com/api) for providing a powerful extension framework.
- Regular expressions for handling comment patterns and cleaning.
