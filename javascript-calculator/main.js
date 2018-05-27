// Test constants
let digits = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];

// Create an array of DOM objects
let rawDigitSelectors = digits.map(n => {
    return document.getElementById("digit-" + n);
});

let [ $digit0, $digit1, $digit2, $digit3, $digit4,
      $digit5, $digit6, $digit7, $digit8, $digit9 ] = [...rawDigitSelectors];

// Operations
let rawOperatorSelectors =
        ["plus", "minus", "multiply", "divide", "result"].map(op => {
    return document.getElementById("op-" + op);
});

let [ $opPlus, $opMinus, $opMultiply, $opDivide, $opResult ] =
        [...rawOperatorSelectors];

// Visor, CE
let rawMiscSelectors = [ "visor", "ce" ].map(f => {
    return document.getElementById(f);
});

let [ $visor, $funcCE ] = [...rawMiscSelectors];

// Constants
let opRegex = "[\\+\\-x\\÷]";

const endsWithOperationSign = str => {
    // Retorna um booleano avaliando se o string termina com um sinal
    // de operação e não termina com um dígito
    let hasOpSigns =  new RegExp(opRegex).test(str.slice(-1));
    let hasDigits = /[0-9]/.test(str.slice(-1));
    return hasOpSigns && !hasDigits;
};

function addCharToVisor() {
    // Adiciona o caractere ao visor, independente de tipo
    if ($visor.value == "0") {
        $visor.value = this.innerHTML;
    } else if (endsWithOperationSign($visor.value) &&
               !(/[0-9]/.test(this.innerHTML))) {
        console.log(new RegExp(opRegex).test(this.innerHTML));
        $visor.value = $visor.value.replace(/.$/, this.innerHTML);
    } else {
        $visor.value = $visor.value + this.innerHTML;
    }
}

const executeCE = () => {
    $visor.value = "0";
};

// Functions related to visor processing
const getSigns = mainString => {
    // Retorna um array com os sinais das operações em ordem
    return Array.from(new Set(mainString.match(/[\+\-\x\÷]/g)));
};

const extractOperations = (signArray, opString) => {
    // Retorna um array com as ocorrências de operações dentro do string
    let out = [];

    signArray.forEach(s => {
        let pattern = new RegExp("\\d+[" + s + "]\\d+", 'g');
        let matches = opString.match(pattern);
        if (matches != null ) out = out.concat(matches);
    });

    return out;
};

const pickOperation = (matchesArray) => {
    // Retorna o string com a operação com maior prioridade
    const hasFirstPriorityOps = str => str.includes("x") || str.includes("÷");
    const hasSecPriorityOps = str => str.includes("+") || str.includes("-");

    if (matchesArray.some(x => hasFirstPriorityOps(x))) {
        return matchesArray.filter(x => hasFirstPriorityOps(x)).shift();
    } else if (matchesArray.some(x => hasSecPriorityOps(x))) {
        return matchesArray.filter(x => hasSecPriorityOps(x)).shift();
    }
    return null;
};

const compute = opString => {
    // Retorna o resultado da operação
    let signal = opString.match(new RegExp(opRegex)).pop();
    switch (signal) {
    case '+':
        return opString.split(signal).reduce((x, y) => Number(x) + Number(y));
    case '-':
        return opString.split(signal).reduce((x, y) => x - y);
    case 'x':
        return opString.split(signal).reduce((x, y) => x * y);
    case '÷':
        return opString.split(signal).reduce((x, y) => x / y);
    default:
        return null;
    }
};

const calculate = opString => {
    // Executa as operações dentro do visor na ordem:
    // - Multiplicação e divisão
    // - Adição e subtração
    // Também segue as operações da esquerda pra direita.

    const calculateStep = buf => {
        // Primeiro busque as operações dentro do string
        let matchedSigns = getSigns(buf);

        // Caso de saída (se não achar nenhum operador)
        if (matchedSigns.length == 0) return buf;

        // Se o primeiro número do string for negativo, retorne "E"
        if (buf.startsWith('-')) return "Error!";

        // Extraia as operações
        let opMatches = extractOperations(matchedSigns, buf);

        // Pegue a função com maior prioridade
        let calculateThis = pickOperation(opMatches);

        // Calcule o resultado desta operação
        let opResult = compute(calculateThis);

        // Coloque o resultado da operação no lugar da operação bruta em
        // uma nova variável
        let newStepString = buf.replace(calculateThis, opResult);

        // Repita o processo
        return calculateStep(newStepString);
    };

    return calculateStep(opString);
};

const showCalculationResult = () => {
    // Substitui o string de operações pelo string de resultado
    $visor.value = calculate($visor.value);
};

// Add listeners to selected elements
$funcCE.addEventListener('click', executeCE);
$opResult.addEventListener('click', showCalculationResult);

// All buttons
[ $opPlus, $opMinus, $opMultiply, $opDivide,
  $digit0, $digit1, $digit2, $digit3, $digit4, $digit5,
  $digit6, $digit7, $digit8, $digit9].forEach(op => {
    op.addEventListener('click', addCharToVisor);
});
