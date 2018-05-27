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
    // Returns a boolean telling if the string ends with an operation sign
    let hasOpSigns =  new RegExp(opRegex).test(str.slice(-1));
    let hasDigits = /[0-9]/.test(str.slice(-1));
    return hasOpSigns && !hasDigits;
};

function addCharToVisor() {
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
    // Returns an array with ordered operation signs
    return Array.from(new Set(mainString.match(/[\+\-\x\÷]/g)));
};

const extractOperations = (signArray, opString) => {
    // Counts the occurrences of the operations in the string
    let out = [];

    signArray.forEach(s => {
        let pattern = new RegExp("\\d+[" + s + "]\\d+", 'g');
        let matches = opString.match(pattern);
        if (matches != null ) out = out.concat(matches);
    });

    return out;
};

const pickOperation = (matchesArray) => {
    // Picks the string with the highest priority operation
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
    // Returns the operation's result
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
    // Executes the operations inside the visor following this order:
    // - Multiplication and division
    // - Addition and subtraction
    // Also does operations from left to right.

    const calculateStep = buf => {
        // First get the operations inside the string
        let matchedSigns = getSigns(buf);

        // Edge case
        if (matchedSigns.length == 0) return buf;

        // If number is less than zero, return error.
        if (buf.startsWith('-')) return "Error!";

        // Extract operations
        let opMatches = extractOperations(matchedSigns, buf);

        // Get the highest priority operation
        let calculateThis = pickOperation(opMatches);

        // Get that operation's result
        let opResult = compute(calculateThis);

        // Store the result in a new var
        let newStepString = buf.replace(calculateThis, opResult);

        // Repeat the process
        return calculateStep(newStepString);
    };

    return calculateStep(opString);
};

const showCalculationResult = () => {
    // Replaces the operation string with its result
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
