// Общая концепция:
// Принимаем входное значение. Умножаем на вес, добавляем байс. Пропускаем через функцию активации. Получаем выход.
// X - входящее, Y - выходящее.
// Обучение: заполняем рандомным весом и байсом. Начинаем эпоху. Даем N пар: [[X1, Y1], [X2, Y2], ..., [XN, YN]].
// Смотрим отклонения предсказанных Y-ков от ожидаемых. Эпоха возвращает выкладку по ошибкам и среднюю квадратичную ошибку.

// Можем после каждой эпохи менять байс.

class PerceptronNeuralNetwork {
  constructor(weight, bias) {
    this.weight = weight;
    this.bias = bias;
  }
}