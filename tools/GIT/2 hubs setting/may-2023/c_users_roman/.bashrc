[ -f ~/.git-completion.bash ] && . ~/.git-completion.bash

# запуск проекта payment C:\OpenServer\domains\payment
alias payment='C:/OpenServer/modules/php/PHP_8.0/php.exe -S localhost:8000 -t public/'
alias cl='clear'
alias his='history'
alias g='git'

alias npmup='npm update'
alias npmout='npm outdated'
alias npmun='npm uninstall'

# history setting
#    append to the history file, don't overwrite it
shopt -s histappend

PROMPT_COMMAND='history -a'
#    don't put duplicate lines or lines starting with space in the history
HISTCONTROL=ignoreboth

#    for setting history length
HISTSIZE=1000
HISTFILESIZE=2000
     
# В Git Bash с minTTY на Windows интерактивные подсказки не будут работать
#alias vuew='winpty vue.cmd'


# --save-dev / -D - devDependencies, разработка: linters, compilators, task-runners
# yarn add --dev <package> 
# --save / -S     - интегрируется в проект: libraries, frameworks  
# yarn add <package>
# npm uninstall <package> / yarn remove <package>
# npm --global / -g 
# yarn global 