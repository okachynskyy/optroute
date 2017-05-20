import { Injectable } from '@angular/core';

@Injectable()
export class NearestNeighbourService {

  public optimize(matrix) {
    return new Promise((resolve, reject) => {

      const order = [0];
      let row = 0;
      for (let i = 0; i < matrix.length - 1; i++) {
        let min = Infinity;
        let minIndex = 0;
        for (let j = 0; j < matrix[row].length; j++) {
          if (matrix[row][j] < min && order.indexOf(j) === -1) {
            minIndex = j; min = matrix[row][j];
          }
        }
        order.push(minIndex);
        row = minIndex;
      }

      resolve(order);
    });
  }
}