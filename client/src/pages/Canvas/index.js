import React, { Component } from 'react';
import { Stage, Layer, Line} from 'react-konva';
//Circle, Text, Path 
import Nav from '../../components/nav/Nav'
import API from '../../utils/API'
import '../../components/container/style.css'

let arr = []

class Canvas extends Component {

    state = {
        href: '/',
        xVal: "",
        linkName: 'Log out',
        value: "",
        text: [],
        drawActive: true,
        toggleClass: ["btn drag", "drawing"],
        lines: [],
        temp: [],
        zoom: 0.5,
        toggle: "drag",
        a: 1,
        b: 1,
        x: 0,
        y: 0,
        mouseX: 0,
        mouseY: 0,
        newPointVal: 2
    };

    componentDidMount() {


        API.getUsersInfo().then(res => {
            console.log(res.data.textData[0].text)
            this.setState({ lines: res.data.lines, text: res.data.textData[0].text})
        }).catch(err => {
            this.props.history.push('/login', { message: "Please login to view this resource", alert: "alert alert-warning" })
        })
    }


    handleMouseDown = () => {
        console.log(window.event.layerX, window.event.layerY)
        this.setState({mouseX: window.event.layerX * 2, mouseY: window.event.layerY * 2})
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
        console.log("_____X_____")
        console.log(this.state.x)
        console.log("___________")
    };

    handleChange = (e) => {
        this.setState({ value: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({ text: this.state.value })
        console.log(this.state.text)
        setTimeout(() => {
            API.updateUsersInfo({textData: [{text: this.state.text, x:this.state.mouseX, y:this.state.mouseY}]})
            .then(res=>{
                console.log(res)
            })
        }, 25);
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
            API.updateUsersInfo({ lines: [], temp: [] }).then(res => {
                this.setState({ lines: [], temp: [] })
            })
        } else {


        }
    }
    pointCalc = (val, n) => {
        let pointVal = val * 4 / n
        this.setState({ newPointVal: pointVal })
        console.log("THIS IS CURRENT VALUE FOR B", this.state.b)
        console.log("THIS IS CURRENT VALUE FOR A", n)
        console.log("THIS IS CURRENT VALUE FOR ZOOM SCALE", this.state.zoom)
        console.log("THIS IS CURRENT POINT VALUE ON SCALE", this.state.newPointVal)
        console.log("–––————————————")
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
            this.setState({ drawActive: false, toggle: "draw", toggleClass: ["btn draw","dragging"] })
        } else {
            this.setState({ drawActive: true, toggle: "drag", toggleClass: ["btn drag","drawing"] })
        }
    }



    render() {

      let  text = React.createElement(
            'Text',
            {

                text: this.state.text,
                fontSize: 40,
                width: 500,
                height: 35,
                stroke: "green",
                draggable: true
            }
        )
    //     let  Othertext = React.createElement(
    //         'Text',
    //         {

    //             text: this.state.text,
    //             fontSize: 60,
    //             width: 500,
    //             height: 0,
    //             stroke: "red",
    //             draggable: true,
    //         }
    //     )


        return (
            <div className="content">
                <Nav linkName={this.state.linkName} href={this.state.href} />
                <div className="row m-0">

                    <div className="col-xl-10 col-lg-9 col-md-8 col-sm-7 pl-0">
                        <div className="text-center mt-3">
                            <Stage
                                draggable={!this.state.drawActive}
                                scaleX={this.state.zoom}
                                x={this.state.x}
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
{text}
                                    {/* <Circle
                                        x={this.state.mouseX}
                                        y={this.state.mouseY}
                                        radius={25}
                                        fill="lightgray"
                                        stroke="black"
                                        strokeWidth={3}
                                        lineJoin='round'
                                        shadowColor='black'
                                        shadowBlur={20}
                                        shadowOffset= {10}
                                        shadowOpacity= {0.5}
                                        fillPatternScale={{x: 3, y: 3}}
                                    /> */}
                                    {this.state.lines.map((line, i) => (
                                        <Line key={i} points={line} stroke="black" />
                                    ))}
                                </Layer>

                            </Stage>
                        </div>
                    </div>
                    <div className="tool shadow p-3 col-xl-2 col-lg-3 col-md-4 col-sm-5 bg-light">

                        <h6 className="text-center">Action: {this.state.toggleClass[1]}</h6>
                        <h6 className="text-center">scale: {this.state.zoom}x</h6>

                        <div className="row">
                            <div className="col-2">
                                <button onClick={this.scaleUp} className="btn zoomIn"></button>
                            </div>

                            <div className="col-6">
                                <button onClick={this.scaleDown} className="btn zoomOut"></button>
                            </div>
                            <div>
                            <input type="submit" className={this.state.toggleClass[0]} value="draw/drag" onClick={this.drawToggle}></input>
                                    <input type="submit" className={this.state.toggleClass[2]} value="add node" onClick={this.addNode}></input>
                            </div>
                        </div>
                        <div>
                            <form onSubmit={this.handleSubmit}>
                                <textarea className="form-control" placeholder="Text" value={this.state.value} onChange={this.handleChange}></textarea>
                                <input className="form-control" type="submit" value="Add Text"></input>
                            </form>
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
