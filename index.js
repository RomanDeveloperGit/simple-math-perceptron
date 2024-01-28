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

      // console.log(
      //   `Входящее: ${input}, на выходе получается: ${receivedOutput}, на выходе ожидается: ${expectedOutput}, ошибка: ${error}`
      // );

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

const executeEpochsWithBiasAdjustment = (
  epochCount = 1,
  additionalDescription = ""
) => {
  for (let i = 1; i < epochCount; i++) {
    const epochResult = perceptronNeuralNetwork.executeEpoch(dataset);

    // console.log(epochResult);

    perceptronNeuralNetwork.setBias(
      perceptronNeuralNetwork.bias - epochResult.averageError
    );

    console.log(
      `после ${i} эпохи предсказание: 3 ${additionalDescription}`,
      perceptronNeuralNetwork.predictOutput(3)
    );
    console.log(
      `после ${i} эпохи предсказание: 4 ${additionalDescription}`,
      perceptronNeuralNetwork.predictOutput(4)
    );
  }
};

// TEST: подготавливаем данные
const MULTIPLIER = 3;
const dataset = Array.from({ length: 10000 }, (_, index) => {
  // для нормализации данных
  const input = index / 1000;

  return [input, input * MULTIPLIER];
});

// TEST: создаем перцептрон и гоняем эпохи с корректировками байса
const perceptronNeuralNetwork = new PerceptronNeuralNetwork(1.5, 1.5);
console.log(perceptronNeuralNetwork);

console.log("Стартовые предсказания", perceptronNeuralNetwork.predictOutput(3));
console.log("Стартовые предсказания", perceptronNeuralNetwork.predictOutput(4));

executeEpochsWithBiasAdjustment(4, `* ${MULTIPLIER} ->`);
