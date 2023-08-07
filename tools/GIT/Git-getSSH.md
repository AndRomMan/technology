# Создание SSH-ключа

[TOC]

## [Подключение к GitHub с помощью SSH](https://docs.github.com/ru/authentication/connecting-to-github-with-ssh)

## [Git SSH Windows - пошаговое руководство](https://only-to-top.ru/blog/tools/2019-12-08-git-ssh-windows.html)

## [Работа с Git через консоль: устанавливаем SSH-ключи](https://htmlacademy.ru/blog/boost/frontend/git-console#install-ssh-keys)

## 1 Генерируем ключ в терминале bash

### Вариант использования ed25519 — это алгоритм для генерации ключей

```bash
ssh-keygen -t ed25519 -C "demromdeveloper@gmail.com"
```

### Если система не поддерживает ed25519, то генерировать другим способом

```bash
ssh-keygen -t rsa -b 4096 -C "demromdeveloper@gmail.com"
```

Команда создаст новый SSH-ключ, используя вашу электронную почту как метку: укажите электронную почту, которую использовали при регистрации аккаунта в github.

Запрашивается пароль - если не хотите вводить каждый раз при обращении к github, то введите пароль от github (gitlab).

## 2 Запуск SSH-agent

```bash
eval "$(ssh-agent -s)"

eval `ssh-agent -s`
```

Получаем ответ следующего формата с разными числами:
 `Agent pid 31724`

## Добавляем закрытый ключ в ssh-agent: `id_rsa` или `id_ed25519` по умолчанию, если ввели другое имя, то вписать его

```bash
ssh-add ~/.ssh/id_ed25519

ssh-add ~/.ssh/id_rsa

ssh-add ~/.ssh/id_rsa_work

```

## 4 Копируем содержимое `id_ed25519.pub` или `id_rsa.pub`

* `cat ~/.ssh/id_rsa.pub` - в терминале увидите содержимое публичного ключа

* командой: `clip < ~/.ssh/id_rsa.pub` или ``clip < ~/.ssh/id_ed25519.pub`

* или просто выделяем в файле содержимое - полностью все!!!

## 5 Добавление нового ключа SSH в учетную запись GitHub
  
  `https://github.com/settings/keys`
  
  Создаем ключ - кнопка: New SSH key.
  В поле Key вставляем содержимое буфера (код из id_ed25519.pub).
