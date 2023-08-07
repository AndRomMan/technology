
Для перехода к следующей итерации в цикле ForEach
следует добавить условие выхода из итерации и сделать return
по условию.

var myArr = [1,2,3,4];

myArr.forEach(function(elem){
  if (elem === 3) {
    return;
  }

  console.log(elem);
});

// Выход: 1, 2, 4
