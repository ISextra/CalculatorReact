import React from 'react';
import classes from "./Calculator.module.sass";
import {BUTTONS_CONTENT, DEFAULT_VALUES, ELEMENTS, ELEMENTS_PROPERTY} from "../Constants/Constants";
import Button from "./UI/Button/Button";
import Display from "./UI/Display/Display";
import History from "./UI/History/History";

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstArg: null,
            secondArg: BUTTONS_CONTENT.ZERO,
            currentOperation: null,
            result: null,
            isEqualPressed: false,
            isOperationPressed: false,
            isComplexOperationPressed: false,
            isNeededCleanResult: false,
            isShownConsoleInfo: false,
            historyFirstArg: null,
            historySecondArg: null,
            historyCurrentOperation: null,
        }

        this.onClickNumber = this.onClickNumber.bind(this);
        this.onClickBasicOperation = this.onClickBasicOperation.bind(this);
        this.onClickPoint = this.onClickPoint.bind(this);
        this.onClickNegate = this.onClickNegate.bind(this);
        this.onClickCleanAll = this.onClickCleanAll.bind(this);
        this.onClickCleanLine = this.onClickCleanLine.bind(this);
        this.onClickCleanLastSymbol = this.onClickCleanLastSymbol.bind(this);
        this.onClickPercent = this.onClickPercent.bind(this);
        this.onClickReverse = this.onClickReverse.bind(this);
        this.onClickSquare = this.onClickSquare.bind(this);
        this.onClickSquareRoot = this.onClickSquareRoot.bind(this);
        this.onClickEqual = this.onClickEqual.bind(this);
    }

    setOperationsLogic(type, text) {
        switch (type) {
            case ELEMENTS_PROPERTY.OPERATION_TYPE_NUMBER: {
                return this.numberOperations(text);
            }
            case ELEMENTS_PROPERTY.OPERATION_TYPE_CLEANUP_OPERATION: {
                return this.cleanupOperations(text);
            }
            case ELEMENTS_PROPERTY.OPERATION_TYPE_COMPLEX_OPERATION: {
                return this.complexOperations(text);
            }
            case ELEMENTS_PROPERTY.OPERATION_TYPE_BASIC_OPERATION: {
                return this.basicOperations(text);
            }
            case ELEMENTS_PROPERTY.OPERATION_TYPE_EQUAL: {
                return this.equalOperation(text);
            }
            // case ELEMENTS_PROPERTY.DISPLAY_TYPE_MOVE_BUTTON: {
            //     return this.moveOperation(text);
            // }
            // default: {
            //     console.warn(`Element ${type} has no initialized logic \n\tat setOperationsLogic() \n\tat Calculator.jsx`);
            // }
        }
    }

    numberOperations(text) {
        switch (text) {
            case BUTTONS_CONTENT.ONE:
            case BUTTONS_CONTENT.TWO:
            case BUTTONS_CONTENT.THREE:
            case BUTTONS_CONTENT.FOUR:
            case BUTTONS_CONTENT.FIVE:
            case BUTTONS_CONTENT.SIX:
            case BUTTONS_CONTENT.SEVEN:
            case BUTTONS_CONTENT.EIGHT:
            case BUTTONS_CONTENT.NINE:
            case BUTTONS_CONTENT.ZERO: {
                return this.onClickNumber;
            }
            case BUTTONS_CONTENT.POINT: {
                return this.onClickPoint;
            }
            case BUTTONS_CONTENT.NEGATE: {
                return this.onClickNegate;
            }
            default: break;
        }
    }

    basicOperations(text) {
        switch (text) {
            case BUTTONS_CONTENT.ADDITION:
            case BUTTONS_CONTENT.SUBTRACTION:
            case BUTTONS_CONTENT.MULTIPLICATION:
            case BUTTONS_CONTENT.DIVISION: {
                return this.onClickBasicOperation;
            }
            default: break;
        }
    }

    cleanupOperations(text) {
        switch (text) {
            case BUTTONS_CONTENT.CLEAN_LINE: {
                return this.onClickCleanLine;
            }
            case BUTTONS_CONTENT.CLEAN_ALL: {
                return this.onClickCleanAll;
            }
            case BUTTONS_CONTENT.CLEAN_SYMBOL: {
                return this.onClickCleanLastSymbol;
            }
            default: break;
        }
    }

    complexOperations(text) {
        switch (text) {
            case BUTTONS_CONTENT.PERCENT: {
                return this.onClickPercent;
            }
            case BUTTONS_CONTENT.SQUARE: {
                return this.onClickSquare;
            }
            case BUTTONS_CONTENT.SQUARE_ROOT: {
                return this.onClickSquareRoot;
            }
            case BUTTONS_CONTENT.REVERSE: {
                return this.onClickReverse;
            }
            default: break;
        }
    }

    equalOperation(text) {
        switch (text) {
            case BUTTONS_CONTENT.EQUAL: {
                return this.onClickEqual;
            }
            default: break;
        }
    }

    execBasicOperation(param) {
        if (!param) {
            param = this.state.firstArg;
        }

        switch (this.state.currentOperation) {
            case BUTTONS_CONTENT.ADDITION: {
                return this.addition(param);
            }
            case BUTTONS_CONTENT.SUBTRACTION: {
                return this.subtraction(param);
            }
            case BUTTONS_CONTENT.MULTIPLICATION: {
                return this.multiplication(param);
            }
            case  BUTTONS_CONTENT.DIVISION: {
                return this.division(param);
            }
            default: break;
        }
    }

    addition(param) {
        return `${Number(param) + Number(this.state.secondArg)}`;
        //this.display.setResultToDisplay(this.state.result); //!!?
    }

    subtraction(param) {
        return `${Number(param) - Number(this.state.secondArg)}`;
        //this.display.setResultToDisplay(this.state.result); //!!?
    }

    multiplication(param) {
        return `${Number(param) * Number(this.state.secondArg)}`;
        //this.display.setResultToDisplay(this.state.result); //!!?
    }

    division(param) {
        // if (this.processingDivideByZero()) {
        //     return;
        // }

        return `${Number(param) / Number(this.state.secondArg)}`;
        //this.display.setResultToDisplay(this.state.result); //!!?
    }

    onClickNumber(event) {
        const content = event.target.textContent;

        //если длинна больше допустимой
        if (this.state.secondArg?.length > DEFAULT_VALUES.MAX_LINE_LENGTH) {
            return;
        }

        //если изначально стоит 0, начальное значение или "-"
        if ((this.state.secondArg === BUTTONS_CONTENT.ZERO) ||
            (this.state.secondArg === DEFAULT_VALUES.DEFAULT_SECOND_NUMBER)) {
            //если была использована комплексная операция с началными значениями дисплея
            if (this.state.isComplexOperationPressed) {
                this.setState({
                    historySecondArg: null,
                    currentOperation: null,
                    secondArg: `${content}`,
                })

                return;
            }

            //если нужно очистить значения дисплея
            if (this.state.isNeededCleanResult) {
                this.setState({
                    historyCurrentOperation: this.state.currentOperation,
                    historySecondArg: this.state.secondArg,
                    secondArg: `${content}`,
                    isNeededCleanResult: false,
                    isOperationPressed: false,
                    isComplexOperationPressed: false,
                    isEqualPressed: false,
                });
                // this.history.additionFirstArg();
                // this.consoleInfo(`setNumber`);

                return;
            }

            this.setState({
                secondArg: `${content}`,
            });
            // this.consoleInfo(`setNumber`);

            return;
        }

        //если нужно очистить значения дисплея
        if (this.state.isNeededCleanResult) {
            this.setState({
                historyCurrentOperation: this.state.currentOperation,
                historySecondArg: this.state.secondArg,
                secondArg: `${content}`,
                isNeededCleanResult: false,
                isOperationPressed: false,
                isComplexOperationPressed: false,
                isEqualPressed: false,
            });
            // this.history.additionFirstArg();
            // this.consoleInfo(`setNumber`);

            return;
        }

        //если была использована комплексная операция
        if (this.state.isComplexOperationPressed) {
            this.setState({
                historySecondArg: null,
                currentOperation: null,
                secondArg: `${this.state.secondArg}${content}`,
                isOperationPressed: false,
                isComplexOperationPressed: false,
                isEqualPressed: false,
            })

            return;
        }

        this.setState({
            secondArg: `${this.state.secondArg}${content}`,
            isOperationPressed: false,
            isComplexOperationPressed: false,
            isEqualPressed: false,
        });
        // this.consoleInfo(`setNumber`);
    }

    onClickBasicOperation(event) {
        const content = event.target.textContent;

        // if (this.state.firstArg === null && this.state.secondArg === null) {//все значения не были заданы
        //     this.updateState({
        //         secondArg: `${DEFAULT_VALUES.ZERO}`,
        //     });
        // }

        //последовательный подсчет (без нажатия на =)
        if (!this.state.isOperationPressed && this.state.firstArg !== DEFAULT_VALUES.DEFAULT_FIRST_NUMBER) {
            // if (this.processingDivideByZero()) {
            //     return;
            // }

            if (this.state.result !== DEFAULT_VALUES.DEFAULT_RESULT) {
                if (this.state.isEqualPressed) {
                    if (this.state.isComplexOperationPressed) {
                        this.setState({
                            historyCurrentOperation: this.state.currentOperation,
                            firstArg: this.state.result,
                            secondArg: this.state.result,
                            result: this.execBasicOperation(this.state.result),
                            currentOperation: content,
                            isOperationPressed: true,
                            isComplexOperationPressed: false,
                            isNeededCleanResult: true,
                            isEqualPressed: false,
                        })

                        return;
                    }
                    if (!this.state.isComplexOperationPressed) {
                        this.setState({
                            historyCurrentOperation: this.state.currentOperation,
                            historySecondArg: this.state.secondArg,
                            firstArg: this.state.result,
                            secondArg: this.state.result,
                            result: this.execBasicOperation(this.state.result),
                            currentOperation: content,
                            isOperationPressed: true,
                            isComplexOperationPressed: false,
                            isNeededCleanResult: true,
                            isEqualPressed: false,
                        })

                        return;
                    }

                    this.setState({
                        firstArg: this.state.result,
                        secondArg: this.state.result,
                        result: this.execBasicOperation(this.state.result),
                        currentOperation: content,
                        isOperationPressed: true,
                        isComplexOperationPressed: false,
                        isNeededCleanResult: true,
                        isEqualPressed: false,
                    });

                    return;
                }

                if (this.state.isComplexOperationPressed) {
                    this.setState({
                        historyCurrentOperation: this.state.currentOperation,
                        firstArg: this.state.result,
                        result: this.execBasicOperation(this.state.result),
                        currentOperation: content,
                        isOperationPressed: true,
                        isComplexOperationPressed: false,
                        isNeededCleanResult: true,
                        isEqualPressed: false,
                    })

                    return;
                }
                if (!this.state.isComplexOperationPressed) {
                    this.setState({
                        historyCurrentOperation: this.state.currentOperation,
                        historySecondArg: this.state.secondArg,
                        firstArg: this.state.result,
                        result: this.execBasicOperation(this.state.result),
                        currentOperation: content,
                        isOperationPressed: true,
                        isComplexOperationPressed: false,
                        isNeededCleanResult: true,
                        isEqualPressed: false,
                    })

                    return;
                }

                this.updateState({
                    firstArg: this.state.result,
                    result: this.execBasicOperation(this.state.result),
                    currentOperation: content,
                    isOperationPressed: true,
                    isComplexOperationPressed: false,
                    isNeededCleanResult: true,
                    isEqualPressed: false,
                })

                return;
            }

            if (this.state.isEqualPressed) {
                if (this.state.isComplexOperationPressed) {
                    this.setState({
                        historyCurrentOperation: this.state.currentOperation,
                        secondArg: this.state.result,
                        result: this.execBasicOperation(this.state.result),
                        currentOperation: content,
                        isOperationPressed: true,
                        isComplexOperationPressed: false,
                        isNeededCleanResult: true,
                        isEqualPressed: false,
                    })

                    return;
                }
                if (!this.state.isComplexOperationPressed) {
                    this.setState({
                        historyCurrentOperation: this.state.currentOperation,
                        historySecondArg: this.state.secondArg,
                        secondArg: this.state.result,
                        result: this.execBasicOperation(this.state.result),
                        currentOperation: content,
                        isOperationPressed: true,
                        isComplexOperationPressed: false,
                        isNeededCleanResult: true,
                        isEqualPressed: false,
                    })

                    return;
                }

                this.setState({
                    secondArg: this.state.result,
                    result: this.execBasicOperation(this.state.result),
                    currentOperation: content,
                    isOperationPressed: true,
                    isComplexOperationPressed: false,
                    isNeededCleanResult: true,
                    isEqualPressed: false,
                });

                return;
            }

            if (this.state.isComplexOperationPressed) {
                this.setState({
                    historyCurrentOperation: this.state.currentOperation,
                    result: this.execBasicOperation(this.state.result),
                    currentOperation: content,
                    isOperationPressed: true,
                    isComplexOperationPressed: false,
                    isNeededCleanResult: true,
                    isEqualPressed: false,
                })

                return;
            }

            if (!this.state.isComplexOperationPressed) {
                this.setState({
                    historyCurrentOperation: this.state.currentOperation,
                    historySecondArg: this.state.secondArg,
                    result: this.execBasicOperation(this.state.result),
                    currentOperation: content,
                    isOperationPressed: true,
                    isComplexOperationPressed: false,
                    isNeededCleanResult: true,
                    isEqualPressed: false,
                })

                return;
            }

            this.setState({
                result: this.execBasicOperation(this.state.result),
                currentOperation: content,
                isOperationPressed: true,
                isComplexOperationPressed: false,
                isNeededCleanResult: true,
                isEqualPressed: false,
            });
            //this.consoleInfo(`equal`);

            return;
        }

        if (this.state.result === DEFAULT_VALUES.DEFAULT_RESULT) {
            this.setState({
                firstArg: this.state.secondArg,
            });
        }

        if (this.state.result !== DEFAULT_VALUES.DEFAULT_RESULT) {
            this.setState({
                firstArg: this.state.result,
            });
        }

        if (this.state.isEqualPressed) {
            this.setState({
                secondArg: this.state.result,
            });
        }

        this.setState({
            currentOperation: content,
        });

        if (this.state.isComplexOperationPressed) {
            this.setState({
                historyCurrentOperation: this.state.currentOperation
            });
        }

        if (!this.state.isComplexOperationPressed) {
            this.setState({
                historyCurrentOperation: this.state.currentOperation,
                historySecondArg: this.state.secondArg
            });
        }

        this.setState({
            isOperationPressed: true,
            isComplexOperationPressed: false,
            isNeededCleanResult: true,
            isEqualPressed: false,
        });
        //this.consoleInfo(`setOperation`);
    }

    onClickPoint() {
        //если точка уже есть в числе
        if (this.state.secondArg?.includes(".")) {
            //this.consoleInfo(`setPoint`);
            return;
        }

        //если изначально стоит 0, начальное значение или "-"
        if ((this.state.secondArg === BUTTONS_CONTENT.ZERO) ||
            (this.state.secondArg === DEFAULT_VALUES.DEFAULT_SECOND_NUMBER)) {
            //Если была нажата комп. операция, то стираем из истории предидущее действие из истории
            if (this.state.isComplexOperationPressed) {
                this.setState({
                    historySecondArg: null,
                    historyCurrentOperation: null,
                    secondArg: `${BUTTONS_CONTENT.ZERO}.`,
                });

                return;
            }

            //если нужно очистить значения дисплея
            if (this.state.isNeededCleanResult) {
                this.setState({
                    historyCurrentOperation: this.state.currentOperation,
                    historySecondArg: this.state.secondArg,
                    secondArg: `${BUTTONS_CONTENT.ZERO}.`,
                    isNeededCleanResult: false,
                    isOperationPressed: false,
                    isComplexOperationPressed: false,
                    isEqualPressed: false,
                });
                //this.history.additionFirstArg();
                //this.consoleInfo(`setPoint`);

                return;
            }

            this.setState({
                secondArg: `${BUTTONS_CONTENT.ZERO}.`,
            });
            //this.consoleInfo(`setNumber`);

            return;
        }

        //если нужно очистить значения дисплея
        if (this.state.isNeededCleanResult) {
            this.setState({
                historyCurrentOperation: this.state.currentOperation,
                historySecondArg: this.state.secondArg,
                secondArg: `${BUTTONS_CONTENT.ZERO}.`,
                isNeededCleanResult: false,
                isOperationPressed: false,
                isComplexOperationPressed: false,
                isEqualPressed: false,
            });
            // this.history.additionFirstArg();
            // this.consoleInfo(`setNumber`);

            return;
        }

        //если была использована комплексная операция
        if (this.state.isComplexOperationPressed) {
            this.setState({
                historySecondArg: null,
                currentOperation: null,
                secondArg: `${this.state.secondArg}.`,
                isOperationPressed: false,
                isComplexOperationPressed: false,
                isEqualPressed: false,
            });

            return;
        }

        this.setState({
            secondArg: `${this.state.secondArg}.`,
            isOperationPressed: false,
            isComplexOperationPressed: false,
            isEqualPressed: false,
        });
    }

    onClickCleanAll() {
        this.setState({
            firstArg: DEFAULT_VALUES.DEFAULT_FIRST_NUMBER,
            secondArg: BUTTONS_CONTENT.ZERO,
            result: DEFAULT_VALUES.DEFAULT_RESULT,
            currentOperation: DEFAULT_VALUES.DEFAULT_OPERATION,
            isOperationPressed: false,
            isComplexOperationPressed: false,
            isEqualPressed: false,
            historyFirstArg: null,
            historySecondArg: null,
            historyCurrentOperation: null,
        });
        //this.consoleInfo("cleanAll");
    }

    onClickCleanLine() {
        if (this.state.isOperationPressed || this.state.isComplexOperationPressed) {
            this.setState({
                secondArg: BUTTONS_CONTENT.ZERO,
            })
            //this.consoleInfo("cleanLine");

            return;
        }

        this.setState({
            secondArg: BUTTONS_CONTENT.ZERO,
            historySecondArg: null,
        })
        //this.consoleInfo("cleanLine");
    }

    onClickCleanLastSymbol() {
        if (this.state.isOperationPressed ||
            this.state.isComplexOperationPressed ||
            this.state.isEqualPressed ||
            this.state.secondArg === BUTTONS_CONTENT.ZERO) {//!!?
            //this.consoleInfo("cleanLastSymbol");

            return;
        }

        if (this.state.secondArg?.slice(0, this.state.secondArg?.length - 1) === "") {
            this.setState({
                secondArg: BUTTONS_CONTENT.ZERO, //!!?
            })

            return;
        }

        this.setState({
            secondArg: this.state.secondArg?.slice(0, this.state.secondArg?.length - 1),
        })
        //this.consoleInfo("cleanLastSymbol");
    }

    onClickPercent() {
        if (!this.state.firstArg) {//для вычисления необходимы все переменные
            if (this.state.isComplexOperationPressed) {
                this.setState({
                    historySecondArg: null,
                    historyCurrentOperation: null,
                    secondArg: BUTTONS_CONTENT.ZERO,//!!?
                    result: BUTTONS_CONTENT.ZERO,
                    isComplexOperationPressed: true,
                });

                return;
            }

            this.setState({
                secondArg: BUTTONS_CONTENT.ZERO,//!!?
                result: BUTTONS_CONTENT.ZERO,
                isComplexOperationPressed: true,
            });
            //this.consoleInfo("percent");

            return;
        }

        if (this.state.isComplexOperationPressed) {
            this.setState({
                historySecondArg: null,
                historyCurrentOperation: null,
                secondArg: `${this.state.firstArg / 100 * this.state.secondArg}`,
                result: BUTTONS_CONTENT.ZERO,
                isComplexOperationPressed: true,
                isNeededCleanResult: true,
            });

            return;
        }

        this.setState({
            historySecondArg: null,
            historyCurrentOperation: this.state.secondArg,
            secondArg: `${this.state.firstArg / 100 * this.state.secondArg}`,
            result: BUTTONS_CONTENT.ZERO,
            isComplexOperationPressed: true,
            isNeededCleanResult: true,
        });
        //this.consoleInfo("percent");
    }

    onClickReverse() {
        // if (this.state.isOperationPressed) {
        //     this.history.additionFirstArg();
        // }

        //начальная передача числа при последовательном нажатии на компл. операции
        if (!this.state.isComplexOperationPressed) {
            this.setState({
                secondArg: `${1 / Number(this.state.secondArg)}`,
                historySecondArg: this.state.secondArg + "(reverse)",
                isOperationPressed: false,
                isComplexOperationPressed: true,
                isNeededCleanResult: true,
            });
            //this.history.changeToHistoryElement(BUTTONS_CONTENT.REVERSE);
            //this.history.setResultOfComplexOperationToDisplay();

            return
        }

        this.setState({
            secondArg: `${1 / Number(this.state.secondArg)}`,
            historySecondArg: this.state.secondArg + "(reverse)",
            isOperationPressed: false,
            isComplexOperationPressed: true,
            isNeededCleanResult: true,
        });
        //this.consoleInfo("reverse");
    }

    onClickSquare() {
        // if (this.state.secondArg === DEFAULT_VALUES.DEFAULT_SECOND_NUMBER) {
        //     this.updateState({
        //         secondArg: BUTTONS_CONTENT.ZERO,
        //     });
        // } // !!?

        // if (this.state.isOperationPressed) {
        //     this.history.additionFirstArg();
        // }

        if (!this.state.isComplexOperationPressed) {//начальная передача числа при последовательном нажатии на компл. операции
            this.setState({
                secondArg: `${Math.pow(Number(this.state.secondArg), 2)}`,
                historySecondArg: this.state.secondArg + "(square)",
                isOperationPressed: false,
                isComplexOperationPressed: true,
                isNeededCleanResult: true,
            });
            //this.history.changeToHistoryElement(BUTTONS_CONTENT.SQUARE);
            //this.history.setResultOfComplexOperationToDisplay();

            return;
        }


        this.setState({
            secondArg: `${Math.pow(Number(this.state.secondArg), 2)}`,
            historySecondArg: this.state.secondArg + "(square)",
            isOperationPressed: false,
            isComplexOperationPressed: true,
            isNeededCleanResult: true,
        });
        //this.consoleInfo("square");
    }

    onClickSquareRoot() {
        // if (this.state.secondArg === DEFAULT_VALUES.DEFAULT_SECOND_NUMBER) {
        //     this.updateState({
        //         secondArg: BUTTONS_CONTENT.ZERO,
        //     });
        // } // !!?

        // if (this.state.isOperationPressed) {
        //     this.history.additionFirstArg();
        // }

        if (!this.state.isComplexOperationPressed) {//начальная передача числа при последовательном нажатии на компл. операции
            this.setState({
                secondArg: `${Math.sqrt(Number(this.state.secondArg))}`,
                historySecondArg: this.state.secondArg + "sqrRoot",
                isOperationPressed: false,
                isComplexOperationPressed: true,
                isNeededCleanResult: true,
            });
            //this.history.changeToHistoryElement(BUTTONS_CONTENT.SQUARE_ROOT);
            //this.history.setResultOfComplexOperationToDisplay();

            return
        }

        this.setState({
            secondArg: `${Math.sqrt(Number(this.state.secondArg))}`,
            historySecondArg: this.state.secondArg + "sqrRoot",
            isOperationPressed: false,
            isComplexOperationPressed: true,
            isNeededCleanResult: true,
        });
        //this.consoleInfo("squareRoot");
    }

    onClickNegate() {
        // if (this.state.secondArg === DEFAULT_VALUES.DEFAULT_SECOND_NUMBER) {
        //     this.updateState({
        //         secondArg: BUTTONS_CONTENT.ZERO,
        //     });
        // } // !!?

        // if (this.state.isOperationPressed) {
        //     this.history.additionFirstArg();
        // }

        if (!this.state.isComplexOperationPressed) {//начальная передача числа при последовательном нажатии на компл. операции
            this.setState({
                secondArg: `${Number(this.state.secondArg) * -1}`,
                historySecondArg: this.state.secondArg + "(negate)",
                isOperationPressed: false,
                isComplexOperationPressed: true,
                isNeededCleanResult: true,
            });
            //this.history.changeToHistoryElement(BUTTONS_CONTENT.NEGATE);
            //this.history.setResultOfComplexOperationToDisplay();

            return;
        }

        this.setState({
            secondArg: `${Number(this.state.secondArg) * -1}`,
            historySecondArg: this.state.secondArg + "(negate)",
            isOperationPressed: false,
            isComplexOperationPressed: true,
            isNeededCleanResult: true,
        });
        this.consoleInfo("negate");
    }

    onClickEqual() {
        if (this.state.firstArg === DEFAULT_VALUES.DEFAULT_FIRST_NUMBER) {
            this.setState({
                historyFirstArg: null,
                historySecondArg: this.state.result,
                historyCurrentOperation: null,
                result: `${Number(this.state.secondArg)}`,
                isOperationPressed: true,
                isEqualPressed: true,
            });
            //this.history.updateState({result: this.state.result})
            //this.history.pushInHistoryList();
            //this.consoleInfo("equal");

            return;
        }

        //если уже был использован знак =
        if (this.state.isEqualPressed) {
            //если не было введенного значения после выбора знака
            if (this.state.secondArg === BUTTONS_CONTENT.ZERO) { //!!?
                this.setState({
                    secondArg: this.state.firstArg,
                    historyFirstArg: null,
                    historySecondArg: this.state.result,
                    historyCurrentOperation: null,
                    result: this.execBasicOperation(this.state.result),
                    isOperationPressed: true,
                    isNeededCleanResult: true,
                    isEqualPressed: true,
                });

                return;
            }

            this.setState({
                firstArg: this.state.result,
                historyFirstArg: null,
                historySecondArg: this.state.result,
                historyCurrentOperation: null,
                result: this.execBasicOperation(this.state.result),
                isOperationPressed: true,
                isNeededCleanResult: true,
                isEqualPressed: true,
            });

            return;
        }

        //если не было введенного значения после выбора знака
        if (this.state.secondArg === BUTTONS_CONTENT.ZERO) { //!!?
            this.setState({
                secondArg: this.state.firstArg,
                historyFirstArg: null,
                historySecondArg: this.state.result,
                historyCurrentOperation: null,
                result: this.execBasicOperation(this.state.result),
                isOperationPressed: true,
                isNeededCleanResult: true,
                isEqualPressed: true,
            });

            return;
        }

        //this.history.updateState({result: this.state.result})
        //this.history.pushInHistoryList();
        this.setState({
            historyFirstArg: null,
            historySecondArg: this.state.result,
            historyCurrentOperation: null,
            result: this.execBasicOperation(this.state.result),
            isOperationPressed: true,
            isNeededCleanResult: true,
            isEqualPressed: true,
        });
        //this.consoleInfo("equal");
    }

    render() {
        return (
            <div className={classes.calc}>
                <History
                    firstarg={this.state.historyFirstArg}
                    secondarg={this.state.historySecondArg}
                    currentoperation={this.state.historyCurrentOperation}
                />
                <Display>{this.state.secondArg}</Display>
                {ELEMENTS.map((button, index) =>
                    <Button
                        key={index}
                        type={button.type}
                        onClick={this.setOperationsLogic(button.type, button.content)}
                    >
                        {button.content}
                    </Button>
                )}
            </div>
        )
    }
}

export default Calculator;