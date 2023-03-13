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
            isNeedShowResult: false,
            isSeveralOperationsUsed: false,
            historyFirstArg: null,
            historySecondArg: null,
            historyCurrentOperation: null,
            rightEdge: null,
            bottomEdge: null,
            documentHeight: Math.max(
                document.body.scrollHeight, document.documentElement.scrollHeight,
                document.body.offsetHeight, document.documentElement.offsetHeight,
                document.body.clientHeight, document.documentElement.clientHeight
            ),
            documentWidth: Math.max(
                document.body.scrollWidth, document.documentElement.scrollWidth,
                document.body.offsetWidth, document.documentElement.offsetWidth,
                document.body.clientWidth, document.documentElement.clientWidth
            ),
            localStoragePositionX: DEFAULT_VALUES.DEFAULT_POSITION_X,
            localStoragePositionY: DEFAULT_VALUES.DEFAULT_POSITION_Y,
        }


        this.$calculator = React.createRef();

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
        this.dragAndDropOnMouseMove = this.dragAndDropOnMouseMove.bind(this);
        this.dragAndDropOnMouseDown = this.dragAndDropOnMouseDown.bind(this);
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

        //если изначально стоит 0, начальное значение или "-"
        if ((this.state.secondArg === BUTTONS_CONTENT.ZERO) ||
            (this.state.secondArg === DEFAULT_VALUES.DEFAULT_SECOND_NUMBER)) {
            //если была использована комплексная операция с началными значениями дисплея
            if (this.state.isComplexOperationPressed) {
                this.setState({
                    historySecondArg: null,
                    currentOperation: null,
                    secondArg: `${content}`,
                    isNeedShowResult: false,
                })

                return;
            }

            //если нужно очистить значения дисплея
            if (this.state.isNeededCleanResult) {
                this.setState({
                    historyFirstArg: `${this.state.historySecondArg} ${this.state.historySecondArg}`, //добавление истории
                    historyCurrentOperation: null,
                    secondArg: `${content}`,
                    isNeededCleanResult: false,
                    isOperationPressed: false,
                    isComplexOperationPressed: false,
                    isEqualPressed: false,
                    isNeedShowResult: false,
                });
                // this.history.additionFirstArg();
                // this.consoleInfo(`setNumber`);
                return;
            }

            this.setState({
                secondArg: `${content}`,
                isNeedShowResult: false,
            });
            // this.consoleInfo(`setNumber`);
            return;
        }

        //если нужно очистить значения дисплея
        if (this.state.isNeededCleanResult) {
            if (this.state.isSeveralOperationsUsed) {
                this.setState({
                    historyFirstArg:  `${this.state.historyFirstArg} ${this.state.historySecondArg}`, //добавление истории
                    historySecondArg: null,
                    secondArg: `${content}`,
                    isNeededCleanResult: false,
                    isOperationPressed: false,
                    isComplexOperationPressed: false,
                    isEqualPressed: false,
                    isNeedShowResult: false,
                    isSeveralOperationsUsed: false,
                });
                return;
            }

            if (this.state.isComplexOperationPressed) {
                if (this.state.currentOperation === DEFAULT_VALUES.DEFAULT_OPERATION) {
                    this.setState({
                        historyFirstArg:  null, //добавление истории
                        historySecondArg: null,
                        secondArg: `${content}`,
                        isNeededCleanResult: false,
                        isOperationPressed: false,
                        isComplexOperationPressed: false,
                        isEqualPressed: false,
                        isNeedShowResult: false,
                        isSeveralOperationsUsed: false,
                    });

                    return;
                }

                this.setState({
                    historyFirstArg:  `${this.state.historyFirstArg} `, //добавление истории
                    historySecondArg: null,
                    secondArg: `${content}`,
                    isNeededCleanResult: false,
                    isOperationPressed: false,
                    isComplexOperationPressed: false,
                    isEqualPressed: false,
                    isNeedShowResult: false,
                    isSeveralOperationsUsed: false,
                });

                return;
            }

            this.setState({
                historyFirstArg:  `${this.state.historySecondArg} ${this.state.historyCurrentOperation}`, //добавление истории
                historyCurrentOperation: null,
                historySecondArg: null,
                secondArg: `${content}`,
                isNeededCleanResult: false,
                isOperationPressed: false,
                isComplexOperationPressed: false,
                isEqualPressed: false,
                isNeedShowResult: false,
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
                isNeedShowResult: false,
            })
            return;
        }

        this.setState({
            secondArg: `${this.state.secondArg}${content}`,
            isOperationPressed: false,
            isComplexOperationPressed: false,
            isEqualPressed: false,
            isNeedShowResult: false,
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
                            historyCurrentOperation: content,
                            firstArg: this.state.result,
                            secondArg: this.state.result,
                            result: this.execBasicOperation(this.state.result),
                            currentOperation: content,
                            isOperationPressed: true,
                            isComplexOperationPressed: false,
                            isNeededCleanResult: true,
                            isNeedShowResult: true,
                            isEqualPressed: false,
                            isSeveralOperationsUsed: true,
                        })


                        return;
                    }
                    if (!this.state.isComplexOperationPressed) {
                        this.setState({
                            historyCurrentOperation: content,
                            historySecondArg: this.state.secondArg,
                            firstArg: this.state.result,
                            secondArg: this.state.result,
                            result: this.execBasicOperation(this.state.result),
                            currentOperation: content,
                            isOperationPressed: true,
                            isComplexOperationPressed: false,
                            isNeededCleanResult: true,
                            isNeedShowResult: true,
                            isEqualPressed: false,
                            isSeveralOperationsUsed: true,
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
                        isNeedShowResult: true,
                        isEqualPressed: false,
                        isSeveralOperationsUsed: true,
                    });
                    return;
                }

                if (this.state.isComplexOperationPressed) {
                    this.setState({
                        historyCurrentOperation: content,
                        firstArg: this.state.result,
                        result: this.execBasicOperation(this.state.result),
                        currentOperation: content,
                        historyFirstArg: `${this.state.historyFirstArg} ${this.state.historyCurrentOperation}`,
                        isOperationPressed: true,
                        isComplexOperationPressed: false,
                        isNeededCleanResult: true,
                        isNeedShowResult: true,
                        isEqualPressed: false,
                        isSeveralOperationsUsed: true,
                    })
                    return;
                }
                if (!this.state.isComplexOperationPressed) {
                    this.setState({
                        historyCurrentOperation: content,
                        historyFirstArg: `${this.state.historyFirstArg} ${this.state.historyCurrentOperation}`,
                        historySecondArg: this.state.secondArg,
                        firstArg: this.state.result,
                        result: this.execBasicOperation(this.state.result),
                        currentOperation: content,
                        isOperationPressed: true,
                        isComplexOperationPressed: false,
                        isNeededCleanResult: true,
                        isNeedShowResult: true,
                        isEqualPressed: false,
                        isSeveralOperationsUsed: true,
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
                    isSeveralOperationsUsed: true,
                })
                return;
            }

            if (this.state.isEqualPressed) {
                if (this.state.isComplexOperationPressed) {
                    this.setState({
                        historyCurrentOperation: content,
                        secondArg: this.state.result,
                        result: this.execBasicOperation(this.state.result),
                        currentOperation: content,
                        isOperationPressed: true,
                        isComplexOperationPressed: false,
                        isNeededCleanResult: true,
                        isNeedShowResult: true,
                        isEqualPressed: false,
                        isSeveralOperationsUsed: true,
                    })
                    return;
                }
                if (!this.state.isComplexOperationPressed) {
                    this.setState({
                        historyCurrentOperation: content,
                        historySecondArg: this.state.secondArg,
                        secondArg: this.state.result,
                        result: this.execBasicOperation(this.state.result),
                        currentOperation: content,
                        isOperationPressed: true,
                        isComplexOperationPressed: false,
                        isNeededCleanResult: true,
                        isNeedShowResult: true,
                        isEqualPressed: false,
                        isSeveralOperationsUsed: true,
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
                    isNeedShowResult: true,
                    isEqualPressed: false,
                    isSeveralOperationsUsed: true,
                });
                return;
            }

            if (this.state.isComplexOperationPressed) {
                this.setState({
                    historyCurrentOperation: content,
                    result: this.execBasicOperation(this.state.result),
                    currentOperation: content,
                    //historyFirstArg: `${this.state.historyFirstArg} ${this.state.currentOperation}`,
                    isOperationPressed: true,
                    isComplexOperationPressed: false,
                    isNeededCleanResult: true,
                    isNeedShowResult: true,
                    isEqualPressed: false,
                    isSeveralOperationsUsed: true,
                })
                return;
            }

            if (!this.state.isComplexOperationPressed) {
                this.setState({
                    historyCurrentOperation: content,
                    historySecondArg: this.state.secondArg,
                    result: this.execBasicOperation(this.state.result),
                    currentOperation: content,
                    isOperationPressed: true,
                    isComplexOperationPressed: false,
                    isNeededCleanResult: true,
                    isNeedShowResult: true,
                    isEqualPressed: false,
                    isSeveralOperationsUsed: true,
                })
                return;
            }

            this.setState({
                result: this.execBasicOperation(this.state.result),
                currentOperation: content,
                isOperationPressed: true,
                isComplexOperationPressed: false,
                isNeededCleanResult: true,
                isNeedShowResult: true,
                isEqualPressed: false,
                isSeveralOperationsUsed: true,
            });
            //this.consoleInfo(`equal`);
            return;
        }

        // --------------
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
                historyCurrentOperation: content,
                historySecondArg: this.state.historySecondArg
            });
        }

        if (!this.state.isComplexOperationPressed) {
            this.setState({
                historyCurrentOperation: content,
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
                    historyFirstArg: this.state.secondArg, //добавление истории
                    historySecondArg: null,
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
                historyFirstArg: this.state.secondArg, //добавление истории
                historySecondArg: null,
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
            isNeedShowResult: false,
            isNeededCleanResult: false,
            isSeveralOperationsUsed: false,
            historyFirstArg: null,
            historySecondArg: null,
            historyCurrentOperation: null,
        });
        //this.consoleInfo("cleanAll");
    }

    onClickCleanLine() {
        if (this.state.isComplexOperationPressed) {
            if (!this.state.isSeveralOperationsUsed) {
                this.setState({
                    historyFirstArg: `${this.state.historyFirstArg}`,
                    historyCurrentOperation: null,
                    historySecondArg: null,
                    secondArg: `${BUTTONS_CONTENT.ZERO}`,
                    isNeededCleanResult: false,
                    isOperationPressed: false,
                    isComplexOperationPressed: false,
                    isEqualPressed: false,
                    isNeedShowResult: false,
                })

                return
            }
            this.setState({
                historyFirstArg:  null,
                historyCurrentOperation: null,
                historySecondArg: null,
                secondArg: `${BUTTONS_CONTENT.ZERO}`,
                isNeededCleanResult: false,
                isOperationPressed: false,
                isComplexOperationPressed: false,
                isEqualPressed: false,
                isNeedShowResult: false,
            })

            return
        }

        this.setState({
            historyFirstArg:  `${this.state.historySecondArg} ${this.state.historyCurrentOperation}`, //добавление истории
            historyCurrentOperation: null,
            historySecondArg: null,
            secondArg: `${BUTTONS_CONTENT.ZERO}`,
            isNeededCleanResult: false,
            isOperationPressed: false,
            isComplexOperationPressed: false,
            isEqualPressed: false,
            isNeedShowResult: false,
        })
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
                    result: DEFAULT_VALUES.DEFAULT_RESULT,
                    isComplexOperationPressed: true,
                });

                return;
            }

            this.setState({
                secondArg: BUTTONS_CONTENT.ZERO,//!!?
                result: DEFAULT_VALUES.DEFAULT_RESULT,
                isComplexOperationPressed: true,
            });

            return;
        }

        if (this.state.isComplexOperationPressed) {
            this.setState({
                historyCurrentOperation: null,
                secondArg: `${this.state.firstArg / 100 * this.state.secondArg}`,
                historySecondArg: `${this.state.firstArg / 100 * this.state.secondArg}`,
                result: DEFAULT_VALUES.DEFAULT_RESULT,
                isComplexOperationPressed: true,
                isNeededCleanResult: true,
            });

            return;
        }

        this.setState({
            historyCurrentOperation: null,//??? this.state.secondArg
            secondArg: `${this.state.firstArg / 100 * this.state.secondArg}`,
            historySecondArg: `${this.state.firstArg / 100 * this.state.secondArg}`,
            result: DEFAULT_VALUES.DEFAULT_RESULT,
            isComplexOperationPressed: true,
            isNeededCleanResult: true,
        });
    }

    onClickReverse() {
        //для использования коппл. операции сразу после базовой операции
        if (this.state.isOperationPressed) {
            if (this.state.isEqualPressed) {
                this.setState({
                    firstArg: null,
                    secondArg: `${1 / Number(this.state.result)}`,
                    historyFirstArg: `${this.state.historySecondArg} ${this.state.currentOperation}`,
                    historySecondArg: `1/${Number(this.state.result)}`,
                    historyCurrentOperation: null,
                    isOperationPressed: false,
                    isComplexOperationPressed: true,
                    isNeededCleanResult: true,
                    isNeedShowResult: false,
                    isEqualPressed: false,
                });

                return;
            }

            //начальная передача числа при последовательном нажатии на компл. операции
            if (!this.state.isComplexOperationPressed) {
                this.setState({
                    secondArg: `${1 / Number(this.state.secondArg)}`,
                    historyFirstArg: `${this.state.historySecondArg} ${this.state.currentOperation}`,
                    historySecondArg: `1/${Number(this.state.secondArg)}`,
                    historyCurrentOperation: null,
                    isOperationPressed: false,
                    isComplexOperationPressed: true,
                    isNeededCleanResult: true,
                });

                return
            }

            this.setState({
                secondArg: `${1 / Number(this.state.secondArg)}`,
                historyFirstArg: `${this.state.historySecondArg} ${this.state.currentOperation}`,
                historySecondArg: `1/${Number(this.state.historySecondArg)}`,
                historyCurrentOperation: null,
                isOperationPressed: false,
                isComplexOperationPressed: true,
                isNeededCleanResult: true,
            });

            return;
        }

        if (this.state.isEqualPressed) {
            this.setState({
                firstArg: null,
                secondArg: `${1 / Number(this.state.result)}`,
                historySecondArg: `1/(${this.state.result})`,
                isOperationPressed: false,
                isComplexOperationPressed: true,
                isNeededCleanResult: true,
                isNeedShowResult: false,
                isEqualPressed: false,
            });

            return;
        }

        //начальная передача числа при последовательном нажатии на компл. операции
        if (!this.state.isComplexOperationPressed) {
            this.setState({
                secondArg: `${1 / Number(this.state.secondArg)}`,
                historySecondArg: `1/(${this.state.secondArg})`,
                isOperationPressed: false,
                isComplexOperationPressed: true,
                isNeededCleanResult: true,
            });

            return
        }

        this.setState({
            secondArg: `${1 / Number(this.state.secondArg)}`,
            historySecondArg: `1/(${this.state.historySecondArg})`,
            isOperationPressed: false,
            isComplexOperationPressed: true,
            isNeededCleanResult: true,
        });
    }

    onClickSquare() {
        // if (this.state.secondArg === DEFAULT_VALUES.DEFAULT_SECOND_NUMBER) {
        //     this.updateState({
        //         secondArg: BUTTONS_CONTENT.ZERO,
        //     });
        // } // !!?


        //для использования коппл. операции сразу после базовой операции
        if (this.state.isOperationPressed) {
            if (this.state.isEqualPressed) {
                this.setState({
                    firstArg: null,
                    secondArg: `${Math.pow(Number(this.state.result), 2)}`,
                    historyFirstArg: `${this.state.historySecondArg} ${this.state.currentOperation}`,
                    historySecondArg: `sqr(${Number(this.state.result)})`,
                    historyCurrentOperation: null,
                    isOperationPressed: false,
                    isComplexOperationPressed: true,
                    isNeededCleanResult: true,
                    isNeedShowResult: false,
                    isEqualPressed: false,
                });
                return;
            }

            if (!this.state.isComplexOperationPressed) {//начальная передача числа при последовательном нажатии на компл. операции
                this.setState({
                    secondArg: `${Math.pow(Number(this.state.secondArg), 2)}`,
                    historyFirstArg: `${this.state.historySecondArg} ${this.state.currentOperation}`,
                    historySecondArg: `sqr(${Number(this.state.secondArg)})`,
                    historyCurrentOperation: null,
                    isOperationPressed: false,
                    isComplexOperationPressed: true,
                    isNeededCleanResult: true,
                });
                return;
            }


            this.setState({
                secondArg: `${Math.pow(Number(this.state.secondArg), 2)}`,
                historyFirstArg: `${this.state.historySecondArg} ${this.state.currentOperation}`,
                historySecondArg: `sqr(${Number(this.state.historySecondArg)})`,
                historyCurrentOperation: null,
                isOperationPressed: false,
                isComplexOperationPressed: true,
                isNeededCleanResult: true,
            });
            return;
        }

        if (this.state.isEqualPressed) {
            this.setState({
                firstArg: null,
                secondArg: `${Math.pow(Number(this.state.result), 2)}`,
                historySecondArg: `sqr(${this.state.result})`,
                isOperationPressed: false,
                isComplexOperationPressed: true,
                isNeededCleanResult: true,
                isNeedShowResult: false,
                isEqualPressed: false,
            });
            return;
        }

        if (!this.state.isComplexOperationPressed) {
            if (this.state.isSeveralOperationsUsed) {
                this.setState({
                    secondArg: `${Math.pow(Number(this.state.secondArg), 2)}`,
                    historySecondArg: `sqr(${this.state.secondArg})`,
                    historyFirstArg: `${this.state.historyFirstArg} ${this.state.currentOperation}`,
                    isOperationPressed: false,
                    isComplexOperationPressed: true,
                    isNeededCleanResult: true,
                });
                return;
            }

            this.setState({
                secondArg: `${Math.pow(Number(this.state.secondArg), 2)}`,
                historySecondArg: `sqr(${this.state.secondArg})`,
                isOperationPressed: false,
                isComplexOperationPressed: true,
                isNeededCleanResult: true,
            });
            return;
        }


        this.setState({
            secondArg: `${Math.pow(Number(this.state.secondArg), 2)}`,
            historySecondArg: `sqr(${this.state.historySecondArg})`,
            isOperationPressed: false,
            isComplexOperationPressed: true,
            isNeededCleanResult: true,
        });
    }

    onClickSquareRoot() {
        // if (this.state.secondArg === DEFAULT_VALUES.DEFAULT_SECOND_NUMBER) {
        //     this.updateState({
        //         secondArg: BUTTONS_CONTENT.ZERO,
        //     });
        // } // !!?

        //для использования коппл. операции сразу после базовой операции
        if (this.state.isOperationPressed) {
            if (this.state.isEqualPressed) {
                this.setState({
                    firstArg: null,
                    secondArg: `${Math.sqrt(Number(this.state.result))}`,
                    historyFirstArg: `${this.state.historySecondArg} ${this.state.currentOperation}`,
                    historySecondArg: `\u221A(${Number(this.state.result)})`,
                    historyCurrentOperation: null,
                    isOperationPressed: false,
                    isComplexOperationPressed: true,
                    isNeededCleanResult: true,
                    isNeedShowResult: false,
                    isEqualPressed: false,
                });

                return;
            }

            if (!this.state.isComplexOperationPressed) {//начальная передача числа при последовательном нажатии на компл. операции
                this.setState({
                    secondArg: `${Math.sqrt(Number(this.state.secondArg))}`,
                    historyFirstArg: `${this.state.historySecondArg} ${this.state.currentOperation}`,
                    historySecondArg: `\u221A(${Number(this.state.secondArg)})`,
                    historyCurrentOperation: null,
                    isOperationPressed: false,
                    isComplexOperationPressed: true,
                    isNeededCleanResult: true,
                });

                return
            }

            this.setState({
                secondArg: `${Math.sqrt(Number(this.state.secondArg))}`,
                historyFirstArg: `${this.state.historySecondArg} ${this.state.currentOperation}`,
                historySecondArg: `\u221A(${Number(this.state.historySecondArg)})`,
                historyCurrentOperation: null,
                isOperationPressed: false,
                isComplexOperationPressed: true,
                isNeededCleanResult: true,
            });

            return;
        }

        if (this.state.isEqualPressed) {
            this.setState({
                firstArg: null,
                secondArg: `${Math.sqrt(Number(this.state.result))}`,
                historySecondArg: `\u221A(${this.state.result})`,
                isOperationPressed: false,
                isComplexOperationPressed: true,
                isNeededCleanResult: true,
                isNeedShowResult: false,
                isEqualPressed: false,
            });

            return;
        }

        if (!this.state.isComplexOperationPressed) {//начальная передача числа при последовательном нажатии на компл. операции
            this.setState({
                secondArg: `${Math.sqrt(Number(this.state.secondArg))}`,
                historySecondArg: `\u221A(${this.state.secondArg})`,
                isOperationPressed: false,
                isComplexOperationPressed: true,
                isNeededCleanResult: true,
            });

            return
        }

        this.setState({
            secondArg: `${Math.sqrt(Number(this.state.secondArg))}`,
            historySecondArg: `\u221A(${this.state.historySecondArg})`,
            isOperationPressed: false,
            isComplexOperationPressed: true,
            isNeededCleanResult: true,
        });
    }

    onClickNegate() {
        // if (this.state.secondArg === DEFAULT_VALUES.DEFAULT_SECOND_NUMBER) {
        //     this.updateState({
        //         secondArg: BUTTONS_CONTENT.ZERO,
        //     });
        // } // !!?

        //для использования коппл. операции сразу после базовой операции
        if (this.state.isOperationPressed) {
            if (this.state.isEqualPressed) {
                this.setState({
                    firstArg: null,
                    secondArg: `${Number(this.state.result) * -1}`,
                    historyFirstArg: `${this.state.historySecondArg} ${this.state.currentOperation}`,
                    historySecondArg: `negate(${Number(this.state.result)})`,
                    historyCurrentOperation: null,
                    isOperationPressed: false,
                    isComplexOperationPressed: true,
                    isNeededCleanResult: true,
                    isNeedShowResult: false,
                    isEqualPressed: false,
                });

                return;
            }

            if (!this.state.isComplexOperationPressed) {//начальная передача числа при последовательном нажатии на компл. операции
                this.setState({
                    secondArg: `${Number(this.state.secondArg) * -1}`,
                    historyFirstArg: `${this.state.historySecondArg} ${this.state.currentOperation}`,
                    historySecondArg: `negate(${Number(this.state.secondArg)})`,
                    historyCurrentOperation: null,
                    isOperationPressed: false,
                    isComplexOperationPressed: true,
                    isNeededCleanResult: true,
                });

                return;
            }

            this.setState({
                secondArg: `${Number(this.state.secondArg) * -1}`,
                historyFirstArg: `${this.state.historySecondArg} ${this.state.currentOperation}`,
                historySecondArg: `negate(${Number(this.state.historySecondArg)})`,
                historyCurrentOperation: null,
                isOperationPressed: false,
                isComplexOperationPressed: true,
                isNeededCleanResult: true,
            });

            return;
        }

        if (this.state.isEqualPressed) {
            this.setState({
                firstArg: null,
                secondArg: `${Number(this.state.result) * -1}`,
                historySecondArg: `negate(${this.state.result})`,
                isOperationPressed: false,
                isComplexOperationPressed: true,
                isNeededCleanResult: true,
                isNeedShowResult: false,
                isEqualPressed: false,
            });

            return;
        }

        if (!this.state.isComplexOperationPressed) {//начальная передача числа при последовательном нажатии на компл. операции
            this.setState({
                secondArg: `${Number(this.state.secondArg) * -1}`,
                historySecondArg: `negate(${this.state.secondArg})`,
                isOperationPressed: false,
                isComplexOperationPressed: true,
                isNeededCleanResult: true,
            });

            return;
        }

        this.setState({
            secondArg: `${Number(this.state.secondArg) * -1}`,
            historySecondArg: `negate(${this.state.historySecondArg})`,
            isOperationPressed: false,
            isComplexOperationPressed: true,
            isNeededCleanResult: true,
        });
    }

    onClickEqual() {
        if (this.state.firstArg === DEFAULT_VALUES.DEFAULT_FIRST_NUMBER) {
            this.setState({
                historyFirstArg: null,
                historySecondArg: this.state.result,
                historyCurrentOperation: null,
                result: `${Number(this.state.secondArg)}`,
                isOperationPressed: true,
                isNeedShowResult: true,
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
                    isNeedShowResult: true,
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
                isNeedShowResult: true,
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
                isNeedShowResult: true,
                isEqualPressed: true,
            });

            return;
        }

        //this.history.updateState({result: this.state.result})
        //this.history.pushInHistoryList();
        this.setState({
            historyFirstArg: null,
            historySecondArg: null,
            historyCurrentOperation: null,
            result: this.execBasicOperation(this.state.result),
            isOperationPressed: true,
            isNeededCleanResult: true,
            isNeedShowResult: true,
            isEqualPressed: true,
        });
    }

    dragAndDropOnMouseMove(event) {
        const target = event.target;

        let finalPositionX = event.pageX - this.state.shiftX;
        let finalPositionY = event.pageY - this.state.shiftY;

        if (finalPositionX < DEFAULT_VALUES.ZERO || finalPositionX > this.state.rightEdge) {
            if (finalPositionY < DEFAULT_VALUES.ZERO || finalPositionY > this.state.bottomEdge) {
                return;
            }

            this.$calculator.current.style.top = finalPositionY + 'px';
            this.setState({
                localStoragePositionY: finalPositionY,
            })

            return
        }

        if (finalPositionY < DEFAULT_VALUES.ZERO || finalPositionY > this.state.bottomEdge) {
            if (finalPositionX < DEFAULT_VALUES.ZERO || finalPositionX > this.state.rightEdge) {
                return
            }

            this.$calculator.current.style.left = finalPositionX + 'px';
            this.setState({
                localStoragePositionX: finalPositionX,
            })

            return;
        }

        this.$calculator.current.style.left = finalPositionX + 'px';
        this.$calculator.current.style.top = finalPositionY + 'px';
        this.setState({
            localStoragePositionX: finalPositionX,
            localStoragePositionY: finalPositionY,
        })
    }

    dragAndDropOnMouseDown(event) {
        const target = event.target;

        this.setState({
            documentHeight: Math.max(
                document.body.scrollHeight, document.documentElement.scrollHeight,
                document.body.offsetHeight, document.documentElement.offsetHeight,
                document.body.clientHeight, document.documentElement.clientHeight
            ),
            documentWidth: Math.max(
                document.body.scrollWidth, document.documentElement.scrollWidth,
                document.body.offsetWidth, document.documentElement.offsetWidth,
                document.body.clientWidth, document.documentElement.clientWidth
            ),
            rightEdge: this.state.documentWidth - this.$calculator.current.offsetWidth,
            bottomEdge: this.state.documentHeight - this.$calculator.current.offsetHeight,
            shiftX: event.clientX - this.$calculator.current.getBoundingClientRect().left,
            shiftY: event.clientY - this.$calculator.current.getBoundingClientRect().top,
        })

        document.addEventListener('mousemove', this.dragAndDropOnMouseMove);


        target.addEventListener("mouseup", () => {
            document.removeEventListener('mousemove', this.dragAndDropOnMouseMove);
        })
    }

    componentDidMount() {
        const localStoragePosition ={
            positionX: localStorage.getItem(DEFAULT_VALUES.LOCAL_STORAGE_POSITION_X_KEY),
            positionY: localStorage.getItem(DEFAULT_VALUES.LOCAL_STORAGE_POSITION_Y_KEY),
        }

        const position = {
            positionX: DEFAULT_VALUES.DEFAULT_POSITION_X,
            positionY: DEFAULT_VALUES.DEFAULT_POSITION_Y,
        }

        if (localStoragePosition.positionX !== null) {
            position.positionX = localStoragePosition.positionX;
        }
        if (localStoragePosition.positionY !== null) {
            position.positionY = localStoragePosition.positionY;
        }

        this.$calculator.current.style.left = position.positionX + 'px';
        this.$calculator.current.style.top =  position.positionY + 'px';
    }

    componentDidUpdate(prevProps) {
        if (this.state.localStoragePositionX !== prevProps.localStoragePositionX) {
            localStorage.setItem(`${DEFAULT_VALUES.LOCAL_STORAGE_POSITION_X_KEY}`, `${this.state.localStoragePositionX}`);
        }
        if (this.state.localStoragePositionY !== prevProps.localStoragePositionY) {
            localStorage.setItem(`${DEFAULT_VALUES.LOCAL_STORAGE_POSITION_Y_KEY}`, `${this.state.localStoragePositionY}`);
        }
    }

    setHistoryData() {
        let result = "";

        if (this.state.historyFirstArg !== null) {
            result = `${this.state.historyFirstArg}`;
        }

        if (this.state.historySecondArg !== null) {
            result = `${result} ${this.state.historySecondArg}`;
        }

        if (this.state.historyCurrentOperation !== null) {
            result = `${result} ${this.state.historyCurrentOperation}`;
        }

        return result;
    }

    render() {
        return (
            <div
                className={classes.calc}
                onDragStart={(event)=> event.preventDefault()}
                onMouseDown={this.dragAndDropOnMouseDown}
                ref={this.$calculator}
            >
                <History
                    historyData={this.setHistoryData()}
                    firstArg={this.state.historyFirstArg}
                    secondArg={this.state.historySecondArg}
                    currentOperation={this.state.historyCurrentOperation}
                />
                <Display
                    secondArg={this.state.secondArg}
                    result={this.state.result}
                    isNeedShowResult={this.state.isNeedShowResult ? 1 : 0}
                />
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