import React, { Component } from 'react';
import { Stage, Layer, Line, Text } from 'react-konva';

import Nav from '../../components/nav/Nav'
import API from '../../utils/API'
import '../../components/container/style.css'

let arr = []
let textArr = []

class Canvas extends Component {

    state = {
        href: '/',
        xVal: "",
        linkName: 'Log out',
        value: "enter text here",
        id: 1,
        text: [],
        drawActive: true,
        toggleStyles: ["btn drag", "drawing", "crosshairCursor", "none"],
        lines: [],
        temp: [],
        zoom: 0.5,
        toggle: "drag",
        a: 1,
        b: 1,
        x: 0,
        y: 0,
        mouseX: 0,
        mouseY: 110,
        newPointVal: 2
    };

    componentDidMount() {
        //loading user object 
        API.getUsersInfo().then(res => {
            this.setState({ lines: res.data.lines, text: res.data.textData.flat() })

        }).catch(err => {
            this.props.history.push('/login', { message: "Please login to view this resource", alert: "alert alert-warning" })
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.text !== this.state.text) {
            textArr.push(this.state.text)
            console.log(textArr)
            API.updateUsersInfo({ textData: textArr.flat(Infinity) })
        }
    }


    handleMouseDown = () => {

        console.log(`%c Coordinate X: %c ${window.event.layerX} %c Coordinate Y: %c ${window.event.layerY}`, ' color: red;', 'background: black; color: yellow', ' color: red;', 'background: black; color: yellow')

        //SET the coordinates of the mouseX and mouseY to window.event.layer coordinates.

        this.setState({ mouseX: window.event.layerX, mouseY: window.event.layerY + 100 })


        this._drawing = this.state.drawActive;
        // add line
        this.setState({
            lines: [...this.state.lines, []]
        });
    };

    handleMouseMove = e => {
        // no drawing - skipping
        if (!this._drawing) {
            return;
        }

        const stage = this.stageRef.getStage();
        const point = stage.getPointerPosition();
        const { lines } = this.state;

        let lastLine = lines[lines.length - 1];
        // add point

        lastLine = lastLine.concat([point.x * this.state.newPointVal - (this.state.x * this.state.newPointVal), point.y * this.state.newPointVal - (this.state.y * this.state.newPointVal)]);
        // replace last
        lines.splice(lines.length - 1, 1, lastLine);
        this.setState({
            lines: lines.concat()
        });
    };

    handleMouseUp = () => {
        this._drawing = false;
        this.setState({ lines: this.state.lines })
        API.updateUsersInfo({
            temp: this.state.lines,
            lines: this.state.lines
        })

    };

    handleChange = (e) => {

        this.setState({ value: e.target.value })

    }

    handleSubmit = (e) => {
        this.setState({ text: { id: this.state.id, body: this.state.value, mouseX: this.state.mouseX * 2, mouseY: this.state.mouseY * 2} })
    }
    undoBtn = () => {
        arr = []
        const { lines } = this.state;
        if (lines.length >= 0) {
            lines.pop()
            this.setState({ lines: lines })
            API.updateUsersInfo({ lines: lines }).then(res => {
                API.getUsersInfo().then(res => {
                    this.setState({ lines: res.data.lines, temp: res.data.temp.reverse() })

                })
            }).catch(err => console.log(err))
        }
    }
    redoBtn = () => {
        const { temp } = this.state

        for (let i = 0; i < temp.length; i++) {
            if (temp[i] === temp[temp.length - 1]) {
                console.log(temp[i])
                arr.push(temp[i])
            }
        }
        this.setState({ lines: arr })
        temp.pop()
        console.log(arr)
    }

    clearBtn = () => {
        let choice = window.confirm("Are you sure? This action cannot be undone.");
        if (choice === true) {
            arr = []
            textArr =[]
            API.updateUsersInfo({ lines: [], temp: [], text: [] }).then(res => {
                this.setState({ lines: [], temp: [], text: [] })
            })
        } else {


        }
    }
    pointCalc = (val, n) => {
        let pointVal = val * 4 / n
    }
    scaleUp = () => {
        let { a } = this.state
        let { b } = this.state
        if (this.state.zoom < 4) {
            setTimeout(() => {
                this.setState({ zoom: this.state.zoom + 0.5, a: a + b + 2, b: b + 2 })
                this.pointCalc(this.state.zoom, a + b + 2)
            }, 25);
        }
    }
    scaleDown = () => {

        if (this.state.zoom > 0.5) {
            let { a } = this.state
            let { b } = this.state
            setTimeout(() => {
                this.setState({ zoom: this.state.zoom - 0.5, b: b - 2, a: a - b })
                this.pointCalc(this.state.zoom, a - b)
            }, 25);
        }
    }
    handleDragEnd = e => {

        this.setState({
            x: e.target.attrs.x,
            y: e.target.attrs.y
        });

    };
    drawToggle = () => {


        if (this.state.drawActive === true) {
            this.setState({ drawActive: false, toggle: "draw", toggleStyles: ["btn draw", "dragging", "moveCursor", "none"] })
        } else {
            this.setState({ drawActive: true, toggle: "drag", toggleStyles: ["btn drag", "drawing", "crosshairCursor", "none"] })
        }
    }
    addText = () => {
        this.setState({ drawActive: false, toggleStyles: [this.state.toggleStyles[0], this.state.toggleStyles[1], "textCursor", "block"] })


    }
    render() {
        return (
            <div className="content">
                <form onKeyPress={event => {
                    if (event.key === "Enter") {
                        this.handleSubmit()
                    }
                }}>
                    <textarea type="text" onChange={this.handleChange} value={this.state.value} className="bg-light position-absolute" style={{ zIndex: 2022, left: this.state.mouseX, top: this.state.mouseY, display: this.state.toggleStyles[3] }}></textarea>

                </form>
                <Nav linkName={this.state.linkName} href={this.state.href} />
                <div className="row m-0">

                    <div className="col-xl-10 col-lg-9 col-md-8 col-sm-7 pl-0">
                        <div className="text-center mt-3">
                            <Stage
                                className={this.state.toggleStyles[2]}
                                draggable={!this.state.drawActive}
                                scaleX={this.state.zoom}
                                scaleY={this.state.zoom}
                                width={window.innerWidth}
                                height={window.innerHeight}
                                onContentMousedown={this.handleMouseDown}
                                onContentMousemove={this.handleMouseMove}
                                onContentMouseup={this.handleMouseUp}
                                onDragEnd={this.handleDragEnd}
                                ref={node => {
                                    this.stageRef = node;
                                }}
                            >

                                <Layer>
                                    {textArr.flat().map((text, i) => (
                                        <Text key={i} text={text.body} fontSize={40} x={text.mouseX} y={text.mouseY} stroke={text.color} />
                                        // console.log(text)
                                    ))}
                                </Layer>
                                <Layer>
                                    {this.state.lines.map((line, i) => (
                                        <Line key={i} points={line} stroke="black" />
                                    ))}
                                </Layer>

                            </Stage>
                        </div>
                    </div>
                    <div className="tool shadow p-3 col-xl-2 col-lg-3 col-md-4 col-sm-5 bg-light">

                        <h6 className="text-center">Action: {this.state.toggleStyles[1]}</h6>
                        <h6 className="text-center">scale: {this.state.zoom}x</h6>

                        <div className="row">
                            <div className="col-2">
                                <button onClick={this.scaleUp} className="btn zoomIn"></button>
                            </div>

                            <div className="col-6">
                                <button onClick={this.scaleDown} className="btn zoomOut"></button>
                            </div>
                            <div>
                                <input type="submit" className={this.state.toggleStyles[0]} value="draw/drag" onClick={this.drawToggle}></input>
                                <input type="submit" className="btn textBtn" value="add text" onClick={this.addText}></input>

                            </div>
                        </div>
                        <div>

                            <input type="submit" className="btn undo " value="undo" onClick={this.undoBtn}></input>
                            <input type="submit" className="btn redo" value="redo" onClick={this.redoBtn}></input>
                            <input type="submit" className="btn delete float-right mt-5 m-1" value="  " onClick={this.clearBtn}></input>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default Canvas;
