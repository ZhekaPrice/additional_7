module.exports = function solveSudoku(matrix) {
  // your solution
 
  function Column(j, matrix) {
    count = 0, column = [];
    while (count < 9) {
      column.push(matrix[count][j]);
      count++;
    }
      return column;
    }
    
    function Line(i, matrix) {
      let count = 0, line = [];
      while (count < 9) {
        line.push(matrix[i][count]);
        count++;
      }
      return line;
    }
    
    function getSquare(i , j, matrix) {
      numberSq = 0;
      index = Math.floor(i / 3) + Math.floor(j / 3);
      set_one = new Set([0,1,2]),
      set_two = new Set([3,4,5]),
      set_three = new Set([6,7,8]);
      if (set_one.has(i)) {
        numberSq = index;
      } 
      else 
        if (set_two.has(i)) {
          numberSq = index + 2;
        } 
        else 
          if (set_three.has(i)) {
            numberSq = index + 4;
          }
      return numberSq;
    }
    
    function getTransposeToSquare(matrix) {
      let Arr = [];
      matrix.forEach( (el) => {
        Arr.push(el.slice());
      });
    
      str = [], matrixsq = [];
      m = 0, n = 0; p = 0;
      while (p < 3) {
      while (n < 3) {
      while (m < 3) { 
        str = str.concat(Arr[m].splice(0, 3));
        m++;
      }
        matrixsq.push(str);
        str = [];
        m = 0;
        n++;
      }
        Arr.splice(0, 3);
        n = 0;
        p++;
      } 
      return matrixsq;
    }
    
    function main(matrix) {
      for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] == 0) {
          var numbers = [], uniq = [];
          var square = getTransposeToSquare(matrix);
          var index = getSquare(i , j, matrix);
          var line = Line(i, matrix);
          var model = [1,2,3,4,5,6,7,8,9];
          var column = Column(j, matrix);
          square = square[index]; 
          numbers = numbers.concat(line, column, square).sort();
          for (n = 0; n < numbers.length; n++) {
            if (!uniq.includes(numbers[n])) {
              uniq.push(numbers[n]);
            } 
          }
          uniq.shift(); 
          model = model.filter( (el) => {
            return !uniq.includes(el);
          });
      for (var k = 0; k < model.length; k++) {
        matrix[i][j] = model[k];
        if (main(matrix)) return main(matrix); 
      }
        matrix[i][j] = 0;
        return false;
      }
      }
      }
      return matrix;
    }
    return main(matrix);
}
