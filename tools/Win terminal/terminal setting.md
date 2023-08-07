[TOC]

# Настройки терминала Windows


## Конфигурация терминала Windows

Путь к настройке `C:\Users\ronin\AppData\Local\Microsoft\Windows Terminal\settings.json`

## Запрещение создания профиля

Чтобы запретить создание динамического профиля, добавьте генератор профилей в массив disabledProfileSources в глобальных параметрах.

`"disabledProfileSources": ["Windows.Terminal.Wsl", "Windows.Terminal.Azure", "Windows.Terminal.PowershellCore"]`

### Образец настройки файла setting.json

```json
    "disableAnimations": true,
    "disabledProfileSources": 
    [
        "Windows.Terminal.Wsl",
        "Windows.Terminal.Azure",
        "Windows.Terminal.PowershellCore"
    ],
    "experimental.rendering.software": false,
```