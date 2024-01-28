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
    return input * this.weight;
  }

  // Заглушка
  activateOutput(rawOutput) {
    return rawOutput;
  }

  predictOutput(input) {
    return this.activateOutput(this.calculateRawOutput(input)) + this.bias;
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
  perceptronNeuralNetwork,
  epochCount = 1,
  iterationCallback
) => {
  const startBias = perceptronNeuralNetwork.bias;

  for (let i = 1; i < epochCount; i++) {
    const epochResult = perceptronNeuralNetwork.executeEpoch(dataset);

    // console.log(epochResult);

    perceptronNeuralNetwork.setBias(
      perceptronNeuralNetwork.bias - epochResult.averageError
    );

    iterationCallback(i);
  }

  return {
    startBias,
    finalBias: perceptronNeuralNetwork.bias,
  };
};

const recalculateWeight = (perceptronNeuralNetwork, startBias) => {
  const biasesDiff = perceptronNeuralNetwork.bias - startBias;

  perceptronNeuralNetwork.setWeight(
    perceptronNeuralNetwork.weight - biasesDiff
  );
};

// TEST: подготавливаем данные
const MULTIPLIER = 3;
const dataset = Array.from({ length: 100000 }, (_, index) => {
  // для нормализации данных
  const input = index / 10000;

  return [input, input * MULTIPLIER];
});

// TEST: создаем перцептрон и делаем первое предсказание
const perceptronNeuralNetwork = new PerceptronNeuralNetwork(1.5, 1.5);
console.log(perceptronNeuralNetwork);

console.log("Стартовые предсказания", perceptronNeuralNetwork.predictOutput(3));
console.log("Стартовые предсказания", perceptronNeuralNetwork.predictOutput(4));

// Гоняем эпохи и делаем предсказания:
const iterationCallback = (epochIndex) => {
  console.log(
    `после ${epochIndex} эпохи предсказание: 3 * ${MULTIPLIER} ->`,
    perceptronNeuralNetwork.predictOutput(3)
  );
  console.log(
    `после ${epochIndex} эпохи предсказание: 4 * ${MULTIPLIER} ->`,
    perceptronNeuralNetwork.predictOutput(4)
  );
};

const epochsResult1 = executeEpochsWithBiasAdjustment(
  perceptronNeuralNetwork,
  4,
  iterationCallback
);

console.log({ epochsResult1 });

recalculateWeight(perceptronNeuralNetwork, epochsResult1.startBias);

const epochsResult2 = executeEpochsWithBiasAdjustment(
  perceptronNeuralNetwork,
  4,
  iterationCallback
);

console.log({ epochsResult2 });

// Если число мелкое, то не корень извлекаем, а в квадрат возводим.
// Деление - умножение. Такие пары чередовать в алгоритме каком-нибудь. Попробовать.
