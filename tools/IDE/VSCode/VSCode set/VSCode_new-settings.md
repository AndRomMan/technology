Проверить как работает синхронизация

==================================
Using the mouse wheel to scroll over editor tabs
workbench.editor.scrollToSwitchTabs

==================================
The
editor.semanticTokenColorCustomizations
setting allows users to override the default
theme rules and to customize the theming.

https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide#theming

"editor.semanticTokenColorCustomizations": {
    "enabled": true, // enable semantic highlighting for all themes
    "rules": {
        // different color for all constants
        "property.readonly": "#35166d",

        // make all symbol declarations bold
        "*.declaration": { "bold": true }
    }
}
==================================
