[ -f ~/.git-completion.bash ] && . ~/.git-completion.bash

# запуск проекта payment C:\OpenServer\domains\payment
alias payment='C:/OpenServer/modules/php/PHP_8.0/php.exe -S localhost:8000 -t public/'
alias cdup='cd ..'
alias cdb='cd -'
alias cl='clear'
alias his='history'
alias g='git'
alias npmauf='npm audit fix'
alias npmauff='npm audit fix --force'

alias npmup='npm update'
alias npmout='npm outdate'
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



# --save-dev / -D - разработка: linters, compilators, task-runners
# --save / -S     - интегрируется в проект: libraries, frameworks  
# --global / -g
