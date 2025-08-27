import React, { useState, useEffect } from 'react';
import { Zap, Trophy, BookOpen, Atom, FlaskConical, Play, CheckCircle2, XCircle, Beaker } from 'lucide-react';

interface Question {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'match';
  question: string;
  options?: string[];
  correct: string | string[];
  explanation: string;
  topic: string;
}

interface UserProgress {
  score: number;
  streak: number;
  completedLessons: string[];
  currentLevel: number;
}

const CHEMISTRY_QUESTIONS: Question[] = [
  // Elementos Químicos (12 preguntas)
  {
    id: '1',
    type: 'multiple-choice',
    question: '¿Cuál es el símbolo químico del sodio?',
    options: ['So', 'Na', 'N', 'Sa'],
    correct: 'Na',
    explanation: 'El símbolo del sodio es Na, que viene del latín "natrium".',
    topic: 'elementos'
  },
  {
    id: '2',
    type: 'multiple-choice',
    question: '¿Cuántos protones tiene el carbono?',
    options: ['4', '6', '12', '8'],
    correct: '6',
    explanation: 'El carbono tiene 6 protones, lo que define su número atómico.',
    topic: 'elementos'
  },
  {
    id: '3',
    type: 'multiple-choice',
    question: '¿Qué gas forma la mayor parte de la atmósfera?',
    options: ['Oxígeno', 'Dióxido de carbono', 'Nitrógeno', 'Hidrógeno'],
    correct: 'Nitrógeno',
    explanation: 'El nitrógeno constituye aproximadamente el 78% de la atmósfera terrestre.',
    topic: 'elementos'
  },
  {
    id: '4',
    type: 'multiple-choice',
    question: '¿Cuál es el elemento más abundante en el universo?',
    options: ['Oxígeno', 'Carbono', 'Hidrógeno', 'Helio'],
    correct: 'Hidrógeno',
    explanation: 'El hidrógeno constituye aproximadamente el 75% de la materia normal del universo.',
    topic: 'elementos'
  },
  {
    id: '5',
    type: 'fill-blank',
    question: 'El símbolo químico del oro es ___',
    correct: 'Au',
    explanation: 'Au viene del latín "aurum", que significa oro.',
    topic: 'elementos'
  },
  {
    id: '6',
    type: 'multiple-choice',
    question: '¿Cuál es el elemento más electronegativo?',
    options: ['Oxígeno', 'Flúor', 'Cloro', 'Nitrógeno'],
    correct: 'Flúor',
    explanation: 'El flúor es el elemento más electronegativo de la tabla periódica.',
    topic: 'elementos'
  },
  {
    id: '7',
    type: 'multiple-choice',
    question: '¿Cuántos electrones puede tener como máximo el nivel de energía 2?',
    options: ['2', '8', '18', '32'],
    correct: '8',
    explanation: 'El segundo nivel de energía puede contener máximo 8 electrones (2s² + 2p⁶).',
    topic: 'elementos'
  },
  {
    id: '8',
    type: 'fill-blank',
    question: 'El símbolo químico del hierro es ___',
    correct: 'Fe',
    explanation: 'Fe viene del latín "ferrum", que significa hierro.',
    topic: 'elementos'
  },
  {
    id: '9',
    type: 'multiple-choice',
    question: '¿Cuál es el gas noble más ligero?',
    options: ['Neón', 'Argón', 'Helio', 'Kriptón'],
    correct: 'Helio',
    explanation: 'El helio es el gas noble más ligero, con número atómico 2.',
    topic: 'elementos'
  },
  {
    id: '10',
    type: 'multiple-choice',
    question: '¿Qué elemento tiene el símbolo Pb?',
    options: ['Platino', 'Plomo', 'Paladio', 'Fósforo'],
    correct: 'Plomo',
    explanation: 'Pb viene del latín "plumbum", que significa plomo.',
    topic: 'elementos'
  },
  {
    id: '11',
    type: 'fill-blank',
    question: 'El número atómico del oxígeno es ___',
    correct: '8',
    explanation: 'El oxígeno tiene 8 protones, por lo que su número atómico es 8.',
    topic: 'elementos'
  },
  {
    id: '12',
    type: 'multiple-choice',
    question: '¿Cuál es el metal más reactivo?',
    options: ['Sodio', 'Potasio', 'Cesio', 'Litio'],
    correct: 'Cesio',
    explanation: 'El cesio es el metal más reactivo de la tabla periódica.',
    topic: 'elementos'
  },

  // Compuestos (12 preguntas)
  {
    id: '13',
    type: 'fill-blank',
    question: 'La fórmula del agua es ___',
    correct: 'H2O',
    explanation: 'H2O indica que una molécula de agua tiene 2 átomos de hidrógeno y 1 de oxígeno.',
    topic: 'compuestos'
  },
  {
    id: '14',
    type: 'multiple-choice',
    question: '¿Cuál es la fórmula del cloruro de sodio?',
    options: ['NaCl', 'NaC', 'ClNa', 'NaCl2'],
    correct: 'NaCl',
    explanation: 'NaCl es la sal común, formada por un átomo de sodio y uno de cloro.',
    topic: 'compuestos'
  },
  {
    id: '15',
    type: 'fill-blank',
    question: 'La fórmula del dióxido de carbono es ___',
    correct: 'CO2',
    explanation: 'CO2 tiene un átomo de carbono y dos átomos de oxígeno.',
    topic: 'compuestos'
  },
  {
    id: '16',
    type: 'multiple-choice',
    question: '¿Cuál es la fórmula del amoníaco?',
    options: ['NH3', 'NH4', 'N2H3', 'NH2'],
    correct: 'NH3',
    explanation: 'El amoníaco tiene un átomo de nitrógeno y tres átomos de hidrógeno.',
    topic: 'compuestos'
  },
  {
    id: '17',
    type: 'fill-blank',
    question: 'La fórmula del metano es ___',
    correct: 'CH4',
    explanation: 'El metano tiene un átomo de carbono y cuatro átomos de hidrógeno.',
    topic: 'compuestos'
  },
  {
    id: '18',
    type: 'multiple-choice',
    question: '¿Cuál es la fórmula del sulfato de calcio?',
    options: ['CaSO4', 'CaS', 'Ca2SO4', 'CaSO3'],
    correct: 'CaSO4',
    explanation: 'El sulfato de calcio se forma con un ion calcio (Ca²⁺) y un ion sulfato (SO4²⁻).',
    topic: 'compuestos'
  },
  {
    id: '19',
    type: 'fill-blank',
    question: 'La fórmula del peróxido de hidrógeno es ___',
    correct: 'H2O2',
    explanation: 'El peróxido de hidrógeno (agua oxigenada) tiene dos átomos de hidrógeno y dos de oxígeno.',
    topic: 'compuestos'
  },
  {
    id: '20',
    type: 'multiple-choice',
    question: '¿Cuál es la fórmula del hidróxido de sodio?',
    options: ['NaOH', 'NaO', 'Na2OH', 'NaH'],
    correct: 'NaOH',
    explanation: 'El hidróxido de sodio (soda cáustica) tiene sodio, oxígeno e hidrógeno.',
    topic: 'compuestos'
  },
  {
    id: '21',
    type: 'fill-blank',
    question: 'La fórmula del ácido sulfúrico es ___',
    correct: 'H2SO4',
    explanation: 'El ácido sulfúrico tiene dos hidrógenos, un azufre y cuatro oxígenos.',
    topic: 'compuestos'
  },
  {
    id: '22',
    type: 'multiple-choice',
    question: '¿Cuál es la fórmula del carbonato de calcio?',
    options: ['CaCO3', 'CaC', 'Ca2CO3', 'CaCO2'],
    correct: 'CaCO3',
    explanation: 'El carbonato de calcio (presente en el mármol) tiene calcio, carbono y tres oxígenos.',
    topic: 'compuestos'
  },
  {
    id: '23',
    type: 'fill-blank',
    question: 'La fórmula del óxido de aluminio es ___',
    correct: 'Al2O3',
    explanation: 'El óxido de aluminio tiene dos átomos de aluminio y tres de oxígeno.',
    topic: 'compuestos'
  },
  {
    id: '24',
    type: 'multiple-choice',
    question: '¿Cuál es la fórmula del nitrato de potasio?',
    options: ['KNO3', 'KN', 'K2NO3', 'KNO2'],
    correct: 'KNO3',
    explanation: 'El nitrato de potasio (salitre) tiene potasio, nitrógeno y tres oxígenos.',
    topic: 'compuestos'
  },

  // Ácidos y Bases (10 preguntas)
  {
    id: '25',
    type: 'fill-blank',
    question: 'El pH neutro es ___',
    correct: '7',
    explanation: 'Un pH de 7 indica una solución neutra, ni ácida ni básica.',
    topic: 'acidos-bases'
  },
  {
    id: '26',
    type: 'multiple-choice',
    question: '¿Qué indica un pH menor a 7?',
    options: ['Solución básica', 'Solución ácida', 'Solución neutra', 'Solución salina'],
    correct: 'Solución ácida',
    explanation: 'Un pH menor a 7 indica que la solución es ácida.',
    topic: 'acidos-bases'
  },
  {
    id: '27',
    type: 'multiple-choice',
    question: '¿Cuál es un ácido fuerte?',
    options: ['Ácido acético', 'Ácido clorhídrico', 'Ácido carbónico', 'Ácido bórico'],
    correct: 'Ácido clorhídrico',
    explanation: 'El ácido clorhídrico (HCl) es un ácido fuerte que se disocia completamente.',
    topic: 'acidos-bases'
  },
  {
    id: '28',
    type: 'fill-blank',
    question: 'Una base libera iones ___ en solución acuosa',
    correct: 'OH-',
    explanation: 'Las bases liberan iones hidróxido (OH⁻) en solución acuosa.',
    topic: 'acidos-bases'
  },
  {
    id: '29',
    type: 'multiple-choice',
    question: '¿Qué color toma el papel tornasol azul en una solución ácida?',
    options: ['Azul', 'Rojo', 'Verde', 'Amarillo'],
    correct: 'Rojo',
    explanation: 'El papel tornasol azul se vuelve rojo en presencia de ácidos.',
    topic: 'acidos-bases'
  },
  {
    id: '30',
    type: 'multiple-choice',
    question: '¿Cuál es una base fuerte?',
    options: ['Amoníaco', 'Hidróxido de sodio', 'Bicarbonato', 'Agua'],
    correct: 'Hidróxido de sodio',
    explanation: 'El hidróxido de sodio (NaOH) es una base fuerte que se disocia completamente.',
    topic: 'acidos-bases'
  },
  {
    id: '31',
    type: 'fill-blank',
    question: 'El pH del jugo de limón es aproximadamente ___',
    correct: '2',
    explanation: 'El jugo de limón es muy ácido, con un pH alrededor de 2.',
    topic: 'acidos-bases'
  },
  {
    id: '32',
    type: 'multiple-choice',
    question: '¿Qué se forma cuando un ácido reacciona con una base?',
    options: ['Sal y agua', 'Gas y agua', 'Sal y gas', 'Solo agua'],
    correct: 'Sal y agua',
    explanation: 'La reacción ácido-base (neutralización) produce sal y agua.',
    topic: 'acidos-bases'
  },
  {
    id: '33',
    type: 'multiple-choice',
    question: '¿Cuál es el pH aproximado del agua pura?',
    options: ['0', '7', '14', '1'],
    correct: '7',
    explanation: 'El agua pura tiene un pH de 7, siendo neutra.',
    topic: 'acidos-bases'
  },
  {
    id: '34',
    type: 'fill-blank',
    question: 'Un ácido libera iones ___ en solución acuosa',
    correct: 'H+',
    explanation: 'Los ácidos liberan iones hidrógeno (H⁺) en solución acuosa.',
    topic: 'acidos-bases'
  },

  // Reacciones (12 preguntas)
  {
    id: '35',
    type: 'multiple-choice',
    question: 'En una reacción de combustión completa, ¿qué se produce siempre?',
    options: ['CO y H2O', 'CO2 y H2O', 'CO2 y H2', 'C y H2O'],
    correct: 'CO2 y H2O',
    explanation: 'La combustión completa de compuestos orgánicos siempre produce CO2 y H2O.',
    topic: 'reacciones'
  },
  {
    id: '36',
    type: 'multiple-choice',
    question: '¿Qué tipo de reacción es 2H2 + O2 → 2H2O?',
    options: ['Descomposición', 'Síntesis', 'Sustitución', 'Doble sustitución'],
    correct: 'Síntesis',
    explanation: 'Es una reacción de síntesis porque dos elementos se combinan para formar un compuesto.',
    topic: 'reacciones'
  },
  {
    id: '37',
    type: 'fill-blank',
    question: 'En la ecuación Zn + HCl → ZnCl2 + H2, el coeficiente del HCl es ___',
    correct: '2',
    explanation: 'La ecuación balanceada es: Zn + 2HCl → ZnCl2 + H2.',
    topic: 'reacciones'
  },
  {
    id: '38',
    type: 'multiple-choice',
    question: '¿Qué indica que una reacción química ha ocurrido?',
    options: ['Cambio de color', 'Formación de gas', 'Cambio de temperatura', 'Todas las anteriores'],
    correct: 'Todas las anteriores',
    explanation: 'Todos estos son indicadores de que ha ocurrido una reacción química.',
    topic: 'reacciones'
  },
  {
    id: '39',
    type: 'multiple-choice',
    question: '¿Qué es un catalizador?',
    options: ['Aumenta la energía de activación', 'Disminuye la velocidad de reacción', 'Acelera la reacción sin consumirse', 'Se consume en la reacción'],
    correct: 'Acelera la reacción sin consumirse',
    explanation: 'Un catalizador acelera la reacción química sin ser consumido en el proceso.',
    topic: 'reacciones'
  },
  {
    id: '40',
    type: 'fill-blank',
    question: 'La ley de conservación de la masa dice que la masa se ___',
    correct: 'conserva',
    explanation: 'La ley de conservación de la masa establece que la masa no se crea ni se destruye.',
    topic: 'reacciones'
  },
  {
    id: '41',
    type: 'multiple-choice',
    question: '¿Qué tipo de reacción es CaCO3 → CaO + CO2?',
    options: ['Síntesis', 'Descomposición', 'Sustitución simple', 'Combustión'],
    correct: 'Descomposición',
    explanation: 'Es una reacción de descomposición porque un compuesto se divide en productos más simples.',
    topic: 'reacciones'
  },
  {
    id: '42',
    type: 'multiple-choice',
    question: '¿Qué se necesita para que ocurra una reacción química?',
    options: ['Energía de activación', 'Colisiones efectivas', 'Orientación correcta', 'Todas las anteriores'],
    correct: 'Todas las anteriores',
    explanation: 'Para que ocurra una reacción se necesita energía de activación, colisiones efectivas y orientación correcta.',
    topic: 'reacciones'
  },
  {
    id: '43',
    type: 'fill-blank',
    question: 'En una reacción exotérmica se ___ energía',
    correct: 'libera',
    explanation: 'Las reacciones exotérmicas liberan energía al ambiente, generalmente como calor.',
    topic: 'reacciones'
  },
  {
    id: '44',
    type: 'multiple-choice',
    question: '¿Qué factor NO afecta la velocidad de reacción?',
    options: ['Temperatura', 'Concentración', 'Masa molecular', 'Superficie de contacto'],
    correct: 'Masa molecular',
    explanation: 'La masa molecular por sí sola no afecta directamente la velocidad de reacción.',
    topic: 'reacciones'
  },
  {
    id: '45',
    type: 'multiple-choice',
    question: '¿Qué tipo de reacción es Mg + CuSO4 → MgSO4 + Cu?',
    options: ['Síntesis', 'Descomposición', 'Sustitución simple', 'Doble sustitución'],
    correct: 'Sustitución simple',
    explanation: 'Es una sustitución simple porque el magnesio reemplaza al cobre en el compuesto.',
    topic: 'reacciones'
  },
  {
    id: '46',
    type: 'fill-blank',
    question: 'Una reacción que absorbe energía se llama ___',
    correct: 'endotérmica',
    explanation: 'Las reacciones endotérmicas absorben energía del ambiente para ocurrir.',
    topic: 'reacciones'
  }
];

const TOPICS = {
  elementos: { name: 'Elementos Químicos', icon: Atom, color: 'bg-blue-500' },
  compuestos: { name: 'Compuestos', icon: FlaskConical, color: 'bg-purple-500' },
  'acidos-bases': { name: 'Ácidos y Bases', icon: Beaker, color: 'bg-green-500' },
  reacciones: { name: 'Reacciones', icon: Zap, color: 'bg-red-500' }
};

function App() {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [progress, setProgress] = useState<UserProgress>({
    score: 0,
    streak: 0,
    completedLessons: [],
    currentLevel: 1
  });
  const [questionQueue, setQuestionQueue] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const savedProgress = localStorage.getItem('chemistryProgress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chemistryProgress', JSON.stringify(progress));
  }, [progress]);

  const startGame = (topic: string = '') => {
    const filteredQuestions = topic 
      ? CHEMISTRY_QUESTIONS.filter(q => q.topic === topic)
      : CHEMISTRY_QUESTIONS;
    
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    setQuestionQueue(shuffled);
    setCurrentQuestion(shuffled[0]);
    setCurrentQuestionIndex(0);
    setSelectedTopic(topic);
    setGameStarted(true);
    setUserAnswer('');
    setShowResult(false);
  };

  const handleAnswer = (answer: string) => {
    setUserAnswer(answer);
    const correct = currentQuestion?.correct === answer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setProgress(prev => ({
        ...prev,
        score: prev.score + 100,
        streak: prev.streak + 1
      }));
    } else {
      setProgress(prev => ({
        ...prev,
        streak: 0
      }));
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questionQueue.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestion(questionQueue[nextIndex]);
      setCurrentQuestionIndex(nextIndex);
      setUserAnswer('');
      setShowResult(false);
    } else {
      // Lesson completed
      setGameStarted(false);
      setProgress(prev => ({
        ...prev,
        completedLessons: [...prev.completedLessons, selectedTopic || 'mixed'],
        currentLevel: prev.currentLevel + 1
      }));
    }
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <FlaskConical className="text-blue-500" size={36} />
                QuímicaPro
              </h1>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Zap className="text-yellow-500" size={24} />
                  <span className="font-bold text-lg">{progress.streak}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="text-orange-500" size={24} />
                  <span className="font-bold text-lg">{progress.score}</span>
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">¡Practica química de forma divertida!</h2>
              <p className="text-gray-600">Aprende elementos, compuestos, reacciones y más sin necesidad de registro</p>
            </div>

            {/* Topics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {Object.entries(TOPICS).map(([key, topic]) => {
                const IconComponent = topic.icon;
                const isCompleted = progress.completedLessons.includes(key);
                
                return (
                  <button
                    key={key}
                    onClick={() => startGame(key)}
                    className={`${topic.color} hover:opacity-90 text-white p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg relative group`}
                  >
                    <IconComponent size={32} className="mx-auto mb-3" />
                    <h3 className="font-bold text-lg mb-2">{topic.name}</h3>
                    <div className="text-sm opacity-90">
                      {CHEMISTRY_QUESTIONS.filter(q => q.topic === key).length} preguntas
                    </div>
                    {isCompleted && (
                      <CheckCircle2 className="absolute top-2 right-2 text-white bg-green-500 rounded-full" size={20} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Practice All Button */}
            <div className="text-center">
              <button
                onClick={() => startGame()}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-3 mx-auto text-xl"
              >
                <Play size={24} />
                Práctica Mixta
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="text-yellow-500" size={20} />
              <span className="font-bold">{progress.streak}</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="text-orange-500" size={20} />
              <span className="font-bold">{progress.score}</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="flex-1 mx-6">
            <div className="bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestionIndex + 1) / questionQueue.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <span className="text-sm font-medium text-gray-600">
            {currentQuestionIndex + 1}/{questionQueue.length}
          </span>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <BookOpen size={16} />
              {TOPICS[currentQuestion.topic as keyof typeof TOPICS]?.name || 'Química General'}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{currentQuestion.question}</h2>
          </div>

          {!showResult && (
            <div className="space-y-4">
              {currentQuestion.type === 'multiple-choice' && currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left p-4 border-2 border-gray-200 rounded-2xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="font-medium text-gray-800">{option}</span>
                </button>
              ))}
              
              {currentQuestion.type === 'fill-blank' && (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Escribe tu respuesta..."
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none text-lg text-center"
                  />
                  <button
                    onClick={() => handleAnswer(userAnswer)}
                    disabled={!userAnswer.trim()}
                    className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 disabled:cursor-not-allowed"
                  >
                    Comprobar
                  </button>
                </div>
              )}
            </div>
          )}

          {showResult && (
            <div className={`text-center p-6 rounded-2xl ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className={`text-6xl mb-4 ${isCorrect ? 'animate-bounce' : 'animate-pulse'}`}>
                {isCorrect ? '🎉' : '❌'}
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-4">
                {isCorrect ? (
                  <CheckCircle2 className="text-green-500" size={24} />
                ) : (
                  <XCircle className="text-red-500" size={24} />
                )}
                <h3 className={`text-xl font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {isCorrect ? '¡Correcto!' : '¡Incorrecto!'}
                </h3>
              </div>

              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                {currentQuestion.explanation}
              </p>
              
              <button
                onClick={nextQuestion}
                className={`${isCorrect ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105`}
              >
                {currentQuestionIndex < questionQueue.length - 1 ? 'Continuar' : '¡Completado!'}
              </button>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => setGameStarted(false)}
            className="text-white font-medium hover:text-gray-200 transition-colors duration-300"
          >
            ← Volver al menú
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;