import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const operators = ['+', '-', '*', '/', '÷', '×', '^'];

  const handleInput = (value) => {
    if (operators.includes(value) && operators.includes(input.slice(-1))) {
      setInput((prev) => prev.slice(0, -1) + value); // Reemplaza el último operador
    } else if (value === '.' && input.includes('.')) {
      return; // Evita múltiples puntos
    } else if (value === '√') {
      setInput((prev) => prev + '√('); // Abre un paréntesis después de la raíz cuadrada
    } else {
      setInput((prev) => prev + value);
    }
  };

  const calculateResult = () => {
    let formattedInput = input
      .replace(/÷/g, '/')
      .replace(/×/g, '*')
      .replace(/√/g, 'Math.sqrt')
      .replace(/²/g, '**2') // Reemplazo para elevar al cuadrado
      .replace(/³/g, '**3')
      .replace(/\| \|/g, 'Math.abs')
      .replace(/π/g, 'Math.PI')
      .replace(/log/g, 'Math.log10')
      .replace(/ln/g, 'Math.log')
      .replace(/\^/g, '**'); // Elevar a una potencia

    try {
      const evalResult = eval(formattedInput);
      if (typeof evalResult === 'number') {
        setResult(evalResult.toString());
      } else {
        setResult('Error');
      }
    } catch (error) {
      setResult('Error');
    }
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  };

  const handleSquare = () => setInput((prev) => prev + '²');
  const handleCube = () => setInput((prev) => prev + '³');
  const handlePower = () => setInput((prev) => prev + '^');
  const handlePi = () => setInput((prev) => prev + 'π');

  const handleLog = () => setInput((prev) => prev + 'log(');
  const handleLn = () => setInput((prev) => prev + 'ln(');

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {/* Pantalla de resultados */}
        <View style={styles.display}>
          <Text style={styles.inputText}>{input || '0'}</Text>
          <Text style={styles.resultText}>{result}</Text>
        </View>

        {/* Botones de la calculadora */}
        <View style={styles.buttonsContainer}>
          {/* Fila 1 */}
          <View style={styles.row}>
            <Button label="(" onPress={() => handleInput('(')} />
            <Button label=")" onPress={() => handleInput(')')} />
            <Button label="√" onPress={() => handleInput('√')} />
            <Button label="÷" onPress={() => handleInput('÷')} />
          </View>

          {/* Fila 2 */}
          <View style={styles.row}>
            <Button label="sin" onPress={() => handleInput('Math.sin(')} />
            <Button label="cos" onPress={() => handleInput('Math.cos(')} />
            <Button label="tan" onPress={() => handleInput('Math.tan(')} />
            <Button label="×" onPress={() => handleInput('×')} />
          </View>

          {/* Fila 3 */}
          <View style={styles.row}>
            <Button label="x²" onPress={handleSquare} />
            <Button label="x³" onPress={handleCube} />
            <Button label="|x|" onPress={() => handleInput('| |')} />
            <Button label="-" onPress={() => handleInput('-')} />
          </View>

          {/* Fila 4 */}
          <View style={styles.row}>
            <Button label="log" onPress={handleLog} />
            <Button label="ln" onPress={handleLn} />
            <Button label="π" onPress={handlePi} />
            <Button label="+" onPress={() => handleInput('+')} />
          </View>

          {/* Fila 5: Botones 7, 8, 9 y potencia */}
          <View style={styles.row}>
            <Button label="7" onPress={() => handleInput('7')} />
            <Button label="8" onPress={() => handleInput('8')} />
            <Button label="9" onPress={() => handleInput('9')} />
            <Button label="^" onPress={handlePower} />
          </View>

          {/* Fila 6: Botones 4, 5, 6 alineados a la izquierda */}
          <View style={styles.row}>
            <Button label="4" onPress={() => handleInput('4')} />
            <Button label="5" onPress={() => handleInput('5')} />
            <Button label="6" onPress={() => handleInput('6')} />
          </View>

          {/* Fila 7: Botones 1, 2, 3 alineados a la izquierda */}
          <View style={styles.row}>
            <Button label="1" onPress={() => handleInput('1')} />
            <Button label="2" onPress={() => handleInput('2')} />
            <Button label="3" onPress={() => handleInput('3')} />
          </View>

          {/* Fila 8: Botón grande de 0 y punto */}
          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, styles.zeroButton]} onPress={() => handleInput('0')}>
              <Text style={styles.buttonText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.largeDotButton]} onPress={() => handleInput('.')}>
              <Text style={styles.buttonText}>.</Text>
            </TouchableOpacity>
          </View>

          {/* Fila de botones "Igual" y "Clear" */}
          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearInput}>
              <Ionicons name="trash" size={32} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.equalsButton]} onPress={calculateResult}>
              <Ionicons name="checkmark" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const Button = ({ label, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#282c34',
    borderRadius: 0,
  },
  display: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#1e2126',
    padding: 30,
    borderBottomColor: '#444',
    borderBottomWidth: 1,
  },
  inputText: {
    color: '#61dafb',
    fontSize: 24,
  },
  resultText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Alinea los botones a la izquierda
    marginVertical: 10, // Aumenta el margen vertical para más espacio entre filas
    alignItems: 'center', // Alinea verticalmente los botones
  },
  button: {
    backgroundColor: '#3a3f45',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%', // Ajustado para mantener el tamaño consistente
    paddingVertical: 20,
    marginRight: 10, // Espacio entre los botones
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
  },
  equalsButton: {
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 10,
    width: '48.5%',
  },
  clearButton: {
    backgroundColor: '#f44336',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 10,
    width: '48.5%',
  },
  zeroButton: {
    backgroundColor: '#3a3f45',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%', // Botón grande para "0"
    paddingVertical: 20,
    borderRadius: 10,
  },
  largeDotButton: {
    backgroundColor: '#3a3f45',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%', // Botón más grande para el punto
    paddingVertical: 20,
    borderRadius: 10,
  },
});

export default App;
