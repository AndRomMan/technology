# Aliases — bash and git

[TOC]

## Просмотреть список aliases в bash: `alias -p`

## Aliases `C:\Users\ronin\.bashrc`

Не забываем ставить пробел если за командой будут вводиться ключи или другие данные

```bash
alias cl='clear'
alias his='history'

alias npmup='npm update'
alias npmout='npm outdated'
alias npmun='npm uninstall'
```

## Aliases `C:/Users/ronin/.gitconfig`

```bash
[alias]
res = restore
sw = switch
cho = checkout
com = commit
st = status
br = branch
logs = log --pretty=format:'%C(yellow)%h%Creset|%Cgreen%ad%Creset|%C(blue)%d%Creset|%s' --date=short --graph
logf = log --pretty=format:'%C(yellow)%H%Creset | %Cgreen%ad%Creset | %s | %Cred%an%Creset'
logh = log --oneline --graph
type = cat-file -t
dump = cat-file -p
```
