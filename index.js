// Общая концепция:
// Принимаем входное значение. Умножаем на вес, добавляем байс. Пропускаем через функцию активации. Получаем выход.
// X - входящее, Y - выходящее.
// Обучение: заполняем рандомным весом и байсом. Начинаем эпоху. Даем N пар: [[X1, Y1], [X2, Y2], ..., [XN, YN]].
// Смотрим отклонения предсказанных Y-ков от ожидаемых. Эпоха возвращает выкладку по примерам и среднюю ошибку.

// Можем после каждой эпохи менять байс либо вес.

class PerceptronNeuralNetwork {
  constructor(weight, bias) {
    this.weight = weight;
    this.bias = bias;
  }

  setWeight(newValue) {
    this.weight = newValue;
  }

  setBias(newValue) {
    this.bias = newValue;
  }

  calculateRawOutput(input) {
    return input * this.weight + this.bias;
  }

  // Заглушка
  activateOutput(value) {
    return value;
  }

  predictOutput(input) {
    return this.activateOutput(this.calculateRawOutput(input));
  }

  executeEpoch(dataset) {
    let errorsSum = 0;

    const report = dataset.map(([input, expectedOutput]) => {
      const receivedOutput = this.predictOutput(input);
      const error = receivedOutput - expectedOutput;

      console.log(
        `Входящее: ${input}, на выходе получается: ${receivedOutput}, на выходе ожидается: ${expectedOutput}, ошибка: ${error}`
      );

      errorsSum += error;

      return {
        input,
        receivedOutput,
        expectedOutput,
        error,
      };
    });

    const averageError = errorsSum / dataset.length;

    return {
      report,
      averageError,
    };
  }
}

// TEST: умножение на 3
const perceptronNeuralNetwork = new PerceptronNeuralNetwork(2, 4);
console.log(perceptronNeuralNetwork);

const dataset = Array.from({ length: 10 }, (_, index) => {
  // для нормализации данных
  const input = (index + 1) / 100;

  return [input, input * 3];
});

console.log("Стартовые предсказания", perceptronNeuralNetwork.predictOutput(3));
console.log("Стартовые предсказания", perceptronNeuralNetwork.predictOutput(4));

// 1 эпоха
const firstEpochResult = perceptronNeuralNetwork.executeEpoch(dataset);

console.log(firstEpochResult);

perceptronNeuralNetwork.setBias(
  perceptronNeuralNetwork.bias - firstEpochResult.averageError
);

console.log("после first", perceptronNeuralNetwork.predictOutput(3));
console.log("после first", perceptronNeuralNetwork.predictOutput(4));

// 2 эпоха
const secondEpochResult = perceptronNeuralNetwork.executeEpoch(dataset);

console.log(secondEpochResult);

perceptronNeuralNetwork.setBias(
  perceptronNeuralNetwork.bias - secondEpochResult.averageError
);

console.log("после second", perceptronNeuralNetwork.predictOutput(3));
console.log("после second", perceptronNeuralNetwork.predictOutput(4));

// 3 эпоха
const thirdEpochResult = perceptronNeuralNetwork.executeEpoch(dataset);

console.log(thirdEpochResult);

perceptronNeuralNetwork.setBias(
  perceptronNeuralNetwork.bias - thirdEpochResult.averageError
);

console.log("после third", perceptronNeuralNetwork.predictOutput(3));
console.log("после third", perceptronNeuralNetwork.predictOutput(4));

console.log(perceptronNeuralNetwork);
